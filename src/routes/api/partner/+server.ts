import { json } from '@sveltejs/kit';
import nodemailer from 'nodemailer';
import type { RequestHandler } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';

interface PartnershipRequest {
	organization: string;
	contactName: string;
	email: string;
	website?: string;
	message?: string;
}

export const POST: RequestHandler = async ({ request }) => {
	if (!env.EMAIL_USER || !env.EMAIL_PASS || !env.EMAIL_HOST || !env.EMAIL_PORT) {
		console.warn('⚠️ Certaines variables d’environnement email sont manquantes.');
	}

	try {
		const data: PartnershipRequest = await request.json();

		// Validate required fields
		if (!data.organization || !data.contactName || !data.email) {
			return json(
				{
					error: 'Champs obligatoires manquants : organization, nom du contact et email sont requis'
				},
				{ status: 400 }
			);
		}

		// Email validation
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(data.email)) {
			return json({ error: 'Format d’email invalide' }, { status: 400 });
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
				'Certaines variables d’environnement email semblent manquantes ou incorrectes :',
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
				console.error('Échec de la vérification du service email :', err);
				return json(
					{
						error:
							'La vérification du service email a échoué. Veuillez vérifier EMAIL_HOST, EMAIL_PORT, EMAIL_USER et EMAIL_PASS dans votre .env (sans guillemets, bien renseignés). Si vous souhaitez utiliser le mode test, retirez EMAIL_USER/EMAIL_PASS.'
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
			notificationRecipient = env.RECIPIENT_EMAIL || testAccount.user;
		}

		// Email content
		const emailSubject = `Nouvelle demande de partenariat de ${data.organization}`;
		const emailHtml = `
      <h2>Nouvelle demande de partenariat</h2>
      <p><strong>Organisation :</strong> ${data.organization}</p>
      <p><strong>Nom du contact :</strong> ${data.contactName}</p>
      <p><strong>Email :</strong> ${data.email}</p>
      <p><strong>Site web :</strong> ${data.website || 'Non renseigné'}</p>
      <p><strong>Message :</strong></p>
      <p>${data.message || 'Aucun message fourni'}</p>
      <hr>
      <p><em>Cette demande a été soumise via le formulaire de partenariat du site Hacktoberfest 2025 de la communauté Galsen DEV.</em></p>
    `;

		const emailText = `
Nouvelle demande de partenariat

Organisation : ${data.organization}
Nom du contact : ${data.contactName}
Email : ${data.email}
Site web : ${data.website || 'Non renseigné'}
Message : ${data.message || 'Aucun message fourni'}

Cette demande a été soumise via le formulaire de partenariat du site Hacktoberfest 2025 de la communauté Galsen DEV.
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
			subject: 'Demande de partenariat reçue - Hacktoberfest 2025',
			text: `Bonjour ${data.contactName},

Merci pour votre intérêt à devenir partenaire pour le Hacktoberfest 2025 de la communauté Galsen DEV !

Nous avons bien reçu votre demande de partenariat pour ${data.organization} et l’examinerons prochainement. Notre équipe vous répondra sous peu.

Détails du partenariat :
- Organisation : ${data.organization}
- Site web : ${data.website || 'Non renseigné'}
- Message : ${data.message || 'Aucun message fourni'}

Merci pour votre soutien à la communauté !

Cordialement,
L’équipe de Galsen DEV`,
			html: `
        <h2>Demande de partenariat reçue</h2>
        <p>Bonjour ${data.contactName},</p>
        <p>Merci pour votre intérêt à devenir partenaire pour le Hacktoberfest 2025 de la communauté Galsen DEV !</p>
        <p>Nous avons bien reçu votre demande de partenariat pour <strong>${data.organization}</strong> et l’examinerons prochainement. Notre équipe vous répondra sous peu.</p>
        
        <h3>Détails du partenariat :</h3>
        <ul>
          <li><strong>Organisation :</strong> ${data.organization}</li>
          <li><strong>Site web :</strong> ${data.website || 'Non renseigné'}</li>
					<li><strong>Message :</strong> ${data.message || 'Aucun message fourni'}</li>
        </ul>
        
        <p>Merci pour votre soutien à la communauté !</p>
        
        <p>Cordialement,<br>
        L’équipe de Galsen DEV</p>
      `
		});

		// If using test account, provide preview URLs for developer convenience
		if (usingTestAccount) {
			const previewNotification = (nodemailer.getTestMessageUrl as any)(infoNotification) || null;
			const previewConfirmation = (nodemailer.getTestMessageUrl as any)(infoConfirmation) || null;
			return json({
				success: true,
				message: 'Demande de partenariat envoyée (compte de test).',
				previewNotification,
				previewConfirmation
			});
		}

		return json({ success: true, message: 'Demande de partenariat envoyée avec succès !' });
	} catch (error) {
		console.error('Erreur lors du traitement de la demande de partenariat :', error);
		return json(
			{ error: 'Échec du traitement de la demande de partenariat. Veuillez réessayer plus tard.' },
			{ status: 500 }
		);
	}
};

// Debug endpoint: returns presence flags and masked sanitized env values (no secrets)
export const GET: RequestHandler = async () => {
	// Load dotenv in dev to ensure process.env is populated when using preview
	if (process.env.NODE_ENV !== 'production') {
		try {
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
