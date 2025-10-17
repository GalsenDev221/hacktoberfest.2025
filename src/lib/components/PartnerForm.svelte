<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import Label from './ui/Label.svelte';
	import Input from './ui/Input.svelte';
	import Select from './ui/Select.svelte';
	import Textarea from './ui/Textarea.svelte';
	import Button from './ui/Button.svelte';
	import Checkbox from './ui/Checkbox.svelte';

	const dispatch = createEventDispatcher();

	let organization = '';
	let contactName = '';
	let email = '';
	let website = '';
	let tier: string = 'gold';
	let message = '';
	let agreed = false;

	let submitted = false;
	let error: string | null = null;
	let isLoading = false;

	const submit = async (e: Event) => {
		e.preventDefault();
		error = null;
		isLoading = true;

		if (!organization.trim() || !contactName.trim() || !email.trim()) {
			error = 'Please provide organization, contact name and email.';
			isLoading = false;
			return;
		}
		if (!agreed) {
			error = 'Please accept the partnership terms.';
			isLoading = false;
			return;
		}

		const payload = {
			organization: organization.trim(),
			contactName: contactName.trim(),
			email: email.trim(),
			website: website.trim() || undefined,
			tier,
			message: message.trim() || undefined
		};

		try {
			const response = await fetch('/api/partner', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(payload)
			});

			const result = await response.json();

			if (response.ok) {
				dispatch('partnerRequest', payload);
				submitted = true;
			} else {
				error = result.error || 'Failed to send partnership request. Please try again.';
			}
		} catch (err) {
			console.error('Error submitting partnership request:', err);
			error = 'Network error. Please check your connection and try again.';
		} finally {
			isLoading = false;
		}
	};
</script>

<section class="bg-slate-800 py-12 md:py-20" aria-labelledby="partner-form-title">
	<div class="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
		<div class="mb-6 text-center">
			<h2 id="partner-form-title" class="mb-3 text-3xl font-bold text-white md:text-4xl">
				Devenir <span
					class="bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent"
					>Partenaire</span
				>
			</h2>
			<p class="mx-auto max-w-2xl text-base text-gray-300 md:text-xl">
				Devenez partenaire pour soutenir la communauté et toucher des milliers de développeurs
				passionnés.
			</p>
		</div>

		{#if submitted}
			<div class="rounded-lg border border-green-500/20 bg-green-900/20 p-6 text-center">
				<h3 class="mb-2 text-2xl font-semibold text-white">Merci — demande reçue</h3>
				<p class="text-gray-300">
					Nous avons bien reçu votre demande de partenariat. Nous vous contacterons bientôt à <strong
						class="text-white">{email}</strong
					>.
				</p>
			</div>
		{:else}
			<form on:submit={submit} novalidate aria-describedby="partner-form-error">
				<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
					<div>
						<Label forId="organization">Organisation</Label>
						<Input
							id="organization"
							name="organization"
							bind:value={organization}
							placeholder="Nom de l'entreprise ou de l'organisation"
							required
						/>
					</div>

					<div>
						<Label forId="contactName">Nom du contact</Label>
						<Input
							id="contactName"
							name="contactName"
							bind:value={contactName}
							placeholder="Votre nom"
							required
						/>
					</div>

					<div>
						<Label forId="email">Email</Label>
						<Input
							id="email"
							name="email"
							type="email"
							bind:value={email}
							placeholder="nom@entreprise.com"
							required
						/>
					</div>

					<div>
						<Label forId="website">Site web (optionnel)</Label>
						<Input
							id="website"
							name="website"
							type="url"
							bind:value={website}
							placeholder="https://exemple.com"
						/>
					</div>
				</div>

				<!-- <div class="mt-4">
					<Label forId="tier">Niveau de partenariat</Label>
					<Select
						id="tier"
						bind:value={tier}
						items={[
							{ value: 'gold', label: 'Gold' },
							{ value: 'silver', label: 'Silver' },
							{ value: 'community', label: 'Community' }
						]}
					/>
				</div> -->

				<div class="mt-4">
					<Label forId="message">Message (optionnel)</Label>
					<Textarea
						id="message"
						bind:value={message}
						placeholder="Dites-nous comment vous souhaitez collaborer"
					/>
				</div>

				<div class="mt-4">
					<Checkbox id="agree" bind:checked={agreed} className="text-sm text-gray-300"
						>J'accepte d'être contacté pour des opportunités de partenariat.</Checkbox
					>
				</div>

				{#if error}
					<div
						id="partner-form-error"
						class="mb-4 rounded border border-red-500/20 bg-red-900/20 p-3 text-sm text-red-200"
					>
						{error}
					</div>
				{/if}

				<div class="mt-6 flex items-center gap-4">
					<Button type="submit" disabled={isLoading}>
						{isLoading ? 'Envoi...' : 'Envoyer la demande'}
					</Button>
					<!-- <Button
						type="button"
						variant="ghost"
						className="px-4 py-2"
						disabled={isLoading}
						on:click={() => {
							organization = '';
							contactName = '';
							email = '';
							website = '';
							message = '';
							agreed = false;
							error = null;
						}}>Réinitialiser</Button
					> -->
				</div>
			</form>
		{/if}
	</div>
</section>
