<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	let firstname = '';
	let lastname = '';
	let email = '';
	let github = '';
	let agreed = false;

	const submit = (e: Event) => {
		e.preventDefault();
		// Simple client-side validation
		if (!firstname.trim() || !lastname.trim() || !email.trim()) {
			return alert('Please provide a name and email');
		}
		if (!agreed) return alert('Please accept the terms');
		dispatch('submit', { firstname, lastname, email, github });
	};
		import Label from './ui/Label.svelte';
		import Input from './ui/Input.svelte';
		import Button from './ui/Button.svelte';
		import Checkbox from './ui/Checkbox.svelte';
</script>

<div class="mx-auto max-w-2xl rounded-2xl border border-violet-500/20 p-8 md:p-12">
	<form class="space-y-6" on:submit={submit} novalidate aria-label="Registration form">
		<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
			<div>
				<Label forId="firstname">First name</Label>
				<Input id="firstname" name="firstname" bind:value={firstname} placeholder="First name" required />
			</div>

			<div>
				<Label forId="lastname">Last name</Label>
				<Input id="lastname" name="lastname" bind:value={lastname} placeholder="Last name" required />
			</div>
		</div>

		<div>
			<Label forId="email">Email address</Label>
			<Input id="email" name="email" type="email" bind:value={email} placeholder="name@example.com" required />
		</div>

		<div>
			<Label forId="github">GitHub username (optional)</Label>
			<Input id="github" name="github" bind:value={github} placeholder="https://github.com/username" />
		</div>

			<div>
				<Checkbox id="terms" bind:checked={agreed} className="text-sm text-gray-300">I agree to the terms and conditions and want to participate in Hacktoberfest 205</Checkbox>
			</div>

		<div class="flex gap-4">
			<Button type="submit">Register</Button>
			<Button type="button" variant="ghost" on:click={() => { firstname=''; lastname=''; email=''; github=''; agreed=false; }}>Reset</Button>
		</div>
	</form>
</div>
