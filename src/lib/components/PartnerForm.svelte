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
          'Content-Type': 'application/json',
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
  <h2 id="partner-form-title" class="text-3xl md:text-4xl font-bold text-white mb-3">Become a <span class="bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent">Partner</span></h2>
  <p class="mx-auto max-w-2xl text-base md:text-xl text-gray-300">Partner with us to support the open source community and reach thousands of passionate developers.</p>
    </div>

    {#if submitted}
      <div class="rounded-lg bg-green-900/20 border border-green-500/20 p-6 text-center">
        <h3 class="text-2xl font-semibold text-white mb-2">Thank you — request received</h3>
        <p class="text-gray-300">We received your partnership request. We'll contact you at <strong class="text-white">{email}</strong> soon.</p>
      </div>
    {:else}
      <form on:submit={submit} novalidate aria-describedby="partner-form-error">
        <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <Label forId="organization">Organization</Label>
            <Input id="organization" name="organization" bind:value={organization} placeholder="Company or organization name" required />
          </div>

          <div>
            <Label forId="contactName">Contact name</Label>
            <Input id="contactName" name="contactName" bind:value={contactName} placeholder="Your name" required />
          </div>

          <div>
            <Label forId="email">Email</Label>
            <Input id="email" name="email" type="email" bind:value={email} placeholder="name@company.com" required />
          </div>

          <div>
            <Label forId="website">Website (optional)</Label>
            <Input id="website" name="website" type="url" bind:value={website} placeholder="https://example.com" />
          </div>
        </div>

        <div class="mt-4">
          <Label forId="tier">Partnership tier</Label>
          <Select id="tier" bind:value={tier} items={[{ value: 'gold', label: 'Gold' }, { value: 'silver', label: 'Silver' }, { value: 'community', label: 'Community' }]} />
        </div>

        <div class="mt-4">
          <Label forId="message">Message (optional)</Label>
          <Textarea id="message" bind:value={message} placeholder="Tell us how you'd like to partner with us" />
        </div>

        <div class="mt-4">
          <Checkbox id="agree" bind:checked={agreed} className="text-sm text-gray-300">I agree to be contacted about partnership opportunities.</Checkbox>
        </div>

        {#if error}
          <div id="partner-form-error" class="mb-4 rounded bg-red-900/20 border border-red-500/20 p-3 text-sm text-red-200">{error}</div>
        {/if}

        <div class="mt-6 flex items-center gap-4">
          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Sending...' : 'Send request'}
          </Button>
          <Button type="button" variant="ghost" className="px-4 py-2" disabled={isLoading} on:click={() => { organization=''; contactName=''; email=''; website=''; message=''; agreed=false; error=null; }}>Reset</Button>
        </div>
      </form>
    {/if}
  </div>
</section>
