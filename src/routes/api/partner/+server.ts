import { json } from '@sveltejs/kit';
import nodemailer from 'nodemailer';
import type { RequestHandler } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';

interface PartnershipRequest {
	organization: string;
	contactName: string;
	email: string;
	website?: string;
	tier: string;
	message?: string;
}

export const POST: RequestHandler = async ({ request }) => {
	if (!env.EMAIL_USER || !env.EMAIL_PASS || !env.EMAIL_HOST || !env.EMAIL_PORT) {
		console.warn('⚠️ Some email environment variables are missing.');
	}

	try {
		const data: PartnershipRequest = await request.json();

		// Validate required fields
		if (!data.organization || !data.contactName || !data.email) {
			return json(
				{ error: 'Missing required fields: organization, contactName, and email are required' },
				{ status: 400 }
			);
		}

		// Email validation
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(data.email)) {
			return json({ error: 'Invalid email format' }, { status: 400 });
		}

		// Create transporter. If credentials are missing or malformed, fall back to a test account (Ethereal)
		let transporter;
		let usingTestAccount = false;
		let notificationRecipient: string | undefined;

		// Basic sanity checks for credentials
		const missingCreds: string[] = [];
		if (!env.EMAIL_USER) missingCreds.push('EMAIL_USER');
		if (!env.EMAIL_PASS) missingCreds.push('EMAIL_PASS');
		if (!env.RECIPIENT_EMAIL) missingCreds.push('RECIPIENT_EMAIL');

		if (missingCreds.length) {
			console.warn(
				'Email environment variables appear missing or malformed:',
				missingCreds.join(', ')
			);
		}

		if (env.EMAIL_USER && env.EMAIL_PASS) {
			transporter = nodemailer.createTransport({
				host: env.EMAIL_HOST,
				port: env.EMAIL_PORT,
				secure: Number(env.EMAIL_PORT) === 465,
				auth: {
					user: env.EMAIL_USER,
					pass: env.EMAIL_PASS
				}
			} as any);
			notificationRecipient = env.RECIPIENT_EMAIL || env.EMAIL_USER;

			// Verify transporter configuration
			try {
				await transporter.verify();
			} catch (err) {
				console.error('Email transporter verification failed:', err);
				// Provide a helpful error to the client (no secrets)
				return json(
					{
						error:
							'Email service verification failed. Please check EMAIL_HOST, EMAIL_PORT, EMAIL_USER and EMAIL_PASS in your .env (no quotes, trimmed). If you intended to use test mode, unset EMAIL_USER/EMAIL_PASS.'
					},
					{ status: 500 }
				);
			}
		}

		if (!transporter) {
			// Create a test account for development (Ethereal)
			usingTestAccount = true;
			const testAccount = await nodemailer.createTestAccount();
			transporter = nodemailer.createTransport({
				host: testAccount.smtp.host,
				port: testAccount.smtp.port,
				secure: testAccount.smtp.secure,
				auth: {
					user: testAccount.user,
					pass: testAccount.pass
				}
			} as any);
			// Use RECIPIENT_EMAIL if set, otherwise the test account user so developer can view the message
			notificationRecipient = env.RECIPIENT_EMAIL || testAccount.user;
		}

		// Email content
		const emailSubject = `New Partnership Request from ${data.organization}`;
		const emailHtml = `
      <h2>New Partnership Request</h2>
      <p><strong>Organization:</strong> ${data.organization}</p>
      <p><strong>Contact Name:</strong> ${data.contactName}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Website:</strong> ${data.website || 'Not provided'}</p>
      <p><strong>Partnership Tier:</strong> ${data.tier}</p>
      <p><strong>Message:</strong></p>
      <p>${data.message || 'No message provided'}</p>
      <hr>
      <p><em>This request was submitted through the Hacktoberfest 2025 website partnership form.</em></p>
    `;

		const emailText = `
New Partnership Request

Organization: ${data.organization}
Contact Name: ${data.contactName}
Email: ${data.email}
Website: ${data.website || 'Not provided'}
Partnership Tier: ${data.tier}
Message: ${data.message || 'No message provided'}

This request was submitted through the Hacktoberfest 2025 website partnership form.
    `;

		// Send email
		const infoNotification = await transporter.sendMail({
			from: env.EMAIL_USER || 'no-reply@example.com',
			to: env.RECIPIENT_EMAIL || undefined,
			subject: emailSubject,
			text: emailText,
			html: emailHtml
		});

		// Optional: Send confirmation email to the partner
		const infoConfirmation = await transporter.sendMail({
			from: env.EMAIL_USER || 'no-reply@example.com',
			to: data.email,
			subject: 'Partnership Request Received - Hacktoberfest 2025',
			text: `Hi ${data.contactName},

Thank you for your interest in partnering with Hacktoberfest 2025!

We have received your partnership request for ${data.organization} and will review it shortly. Our team will get back to you within 2-3 business days.

Partnership Details:
- Organization: ${data.organization}
- Partnership Tier: ${data.tier}
- Website: ${data.website || 'Not provided'}

We appreciate your support of the open source community!

Best regards,
The Hacktoberfest 2025 Team`,
			html: `
        <h2>Partnership Request Received</h2>
        <p>Hi ${data.contactName},</p>
        <p>Thank you for your interest in partnering with Hacktoberfest 2025!</p>
        <p>We have received your partnership request for <strong>${data.organization}</strong> and will review it shortly. Our team will get back to you within 2-3 business days.</p>
        
        <h3>Partnership Details:</h3>
        <ul>
          <li><strong>Organization:</strong> ${data.organization}</li>
          <li><strong>Partnership Tier:</strong> ${data.tier}</li>
          <li><strong>Website:</strong> ${data.website || 'Not provided'}</li>
        </ul>
        
        <p>We appreciate your support of the open source community!</p>
        
        <p>Best regards,<br>
        The Hacktoberfest 2025 Team</p>
      `
		});

		// If using test account, provide preview URLs for developer convenience
		if (usingTestAccount) {
			const previewNotification = (nodemailer.getTestMessageUrl as any)(infoNotification) || null;
			const previewConfirmation = (nodemailer.getTestMessageUrl as any)(infoConfirmation) || null;
			return json({
				success: true,
				message: 'Partnership request sent (test account).',
				previewNotification,
				previewConfirmation
			});
		}

		return json({ success: true, message: 'Partnership request sent successfully!' });
	} catch (error) {
		console.error('Error processing partnership request:', error);
		return json(
			{ error: 'Failed to process partnership request. Please try again later.' },
			{ status: 500 }
		);
	}
};

// Debug endpoint: returns presence flags and masked sanitized env values (no secrets)
export const GET: RequestHandler = async () => {
	// Load dotenv in dev to ensure process.env is populated when using preview
	if (process.env.NODE_ENV !== 'production') {
		try {
			// eslint-disable-next-line @typescript-eslint/no-var-requires
			require('dotenv').config();
		} catch (e) {
			// ignore
		}
	}

	const sanitize = (v: unknown) => (v == null ? null : String(v).trim().replace(/^"|"$/g, ''));
	const emailUser = sanitize(env.EMAIL_USER);
	const recipient = sanitize(env.RECIPIENT_EMAIL || env.EMAIL_USER);
	const host = sanitize(env.EMAIL_HOST || 'smtp.gmail.com');
	const port = parseInt(sanitize(env.EMAIL_PORT) || '587', 10) || 587;

	const masked = (s: string | null) => {
		if (!s) return null;
		const parts = s.split('@');
		if (parts.length === 2) {
			return parts[0][0] + '***@' + parts[1];
		}
		return s.slice(0, 2) + '***';
	};

	return json({
		ok: true,
		emailUserPresent: !!emailUser,
		recipientPresent: !!recipient,
		emailUser: masked(emailUser),
		recipient: masked(recipient),
		host,
		port,
		nodeEnv: process.env.NODE_ENV || 'development'
	});
};
