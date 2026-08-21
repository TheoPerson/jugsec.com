<script lang="ts">
  import { enhance } from '$app/forms';
  import { Mail, Lock, User, Eye, EyeOff, Loader2 } from '@lucide/svelte';
  import type { ActionData } from './$types';

  let { form }: { form: ActionData } = $props();

  let loading = $state(false);
  let showPassword = $state(false);
  let showConfirmPassword = $state(false);

  // Client-side validation states
  let password = $state('');
  let confirmPassword = $state('');
  let passwordsMatch = $derived(password === confirmPassword || confirmPassword === '');
</script>

<div class="min-h-screen flex items-center justify-center bg-base py-12 px-4 sm:px-6 lg:px-8">
  <div class="max-w-md w-full space-y-8 bg-surface-1 p-8 rounded-xl border border-border-subtle shadow-2xl">
    <div>
      <h2 class="mt-2 text-center text-3xl font-extrabold text-text-primary">
        Create an account
      </h2>
      <p class="mt-2 text-center text-sm text-text-secondary">
        Join FrameForge today
      </p>
    </div>
    
    <form 
      class="mt-8 space-y-6" 
      method="POST" 
      use:enhance={() => {
        loading = true;
        return async ({ update }) => {
          loading = false;
          update();
        };
      }}
    >
      {#if form?.error}
        <div class="bg-danger/10 border border-danger/20 text-danger px-4 py-3 rounded-lg text-sm">
          {form.error}
        </div>
      {/if}

      <div class="space-y-4">
        <div>
          <label for="username" class="block text-sm font-medium text-text-secondary">Username</label>
          <div class="mt-1 relative">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-text-tertiary">
              <User size={18} />
            </div>
            <input 
              id="username" 
              name="username" 
              type="text" 
              required 
              minlength="3"
              maxlength="50"
              value={form?.username ?? ''}
              class="appearance-none block w-full pl-10 pr-3 py-3 border border-border-default rounded-lg bg-surface-2 text-text-primary placeholder-text-tertiary focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent sm:text-sm transition-colors" 
              placeholder="coolgamer99"
            />
          </div>
        </div>

        <div>
          <label for="email" class="block text-sm font-medium text-text-secondary">Email address</label>
          <div class="mt-1 relative">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-text-tertiary">
              <Mail size={18} />
            </div>
            <input 
              id="email" 
              name="email" 
              type="email" 
              required 
              value={form?.email ?? ''}
              class="appearance-none block w-full pl-10 pr-3 py-3 border border-border-default rounded-lg bg-surface-2 text-text-primary placeholder-text-tertiary focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent sm:text-sm transition-colors" 
              placeholder="you@example.com"
            />
          </div>
        </div>

        <div>
          <label for="password" class="block text-sm font-medium text-text-secondary">Password</label>
          <div class="mt-1 relative">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-text-tertiary">
              <Lock size={18} />
            </div>
            <input 
              id="password" 
              name="password" 
              type={showPassword ? 'text' : 'password'} 
              required 
              minlength="8"
              bind:value={password}
              class="appearance-none block w-full pl-10 pr-10 py-3 border border-border-default rounded-lg bg-surface-2 text-text-primary placeholder-text-tertiary focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent sm:text-sm transition-colors" 
              placeholder="••••••••"
            />
            <button 
              type="button"
              class="absolute inset-y-0 right-0 pr-3 flex items-center text-text-tertiary hover:text-text-primary focus:outline-none"
              onclick={() => showPassword = !showPassword}
            >
              {#if showPassword}
                <EyeOff size={18} />
              {:else}
                <Eye size={18} />
              {/if}
            </button>
          </div>
        </div>

        <div>
          <label for="confirmPassword" class="block text-sm font-medium text-text-secondary">Confirm Password</label>
          <div class="mt-1 relative">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-text-tertiary">
              <Lock size={18} />
            </div>
            <input 
              id="confirmPassword" 
              name="confirmPassword" 
              type={showConfirmPassword ? 'text' : 'password'} 
              required 
              minlength="8"
              bind:value={confirmPassword}
              class="appearance-none block w-full pl-10 pr-10 py-3 border {passwordsMatch ? 'border-border-default focus:border-accent focus:ring-accent' : 'border-danger focus:border-danger focus:ring-danger'} rounded-lg bg-surface-2 text-text-primary placeholder-text-tertiary focus:outline-none focus:ring-1 sm:text-sm transition-colors" 
              placeholder="••••••••"
            />
            <button 
              type="button"
              class="absolute inset-y-0 right-0 pr-3 flex items-center text-text-tertiary hover:text-text-primary focus:outline-none"
              onclick={() => showConfirmPassword = !showConfirmPassword}
            >
              {#if showConfirmPassword}
                <EyeOff size={18} />
              {:else}
                <Eye size={18} />
              {/if}
            </button>
          </div>
          {#if !passwordsMatch}
            <p class="mt-1 text-xs text-danger">Passwords do not match</p>
          {/if}
        </div>
      </div>

      <div>
        <button 
          type="submit" 
          disabled={loading || !passwordsMatch || password.length < 8}
          class="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-semibold rounded-lg text-base bg-accent hover:bg-accent/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent focus:ring-offset-base transition-colors disabled:opacity-75 disabled:cursor-not-allowed"
        >
          {#if loading}
            <Loader2 class="animate-spin -ml-1 mr-2 h-5 w-5" />
            Creating account...
          {:else}
            Create account
          {/if}
        </button>
      </div>
    </form>
    
    <div class="text-center mt-4">
      <p class="text-sm text-text-secondary">
        Already have an account? 
        <a href="/auth/login" class="font-medium text-accent hover:text-accent/80 transition-colors">
          Sign in
        </a>
      </p>
    </div>
  </div>
</div>

