<script lang="ts">
  import { enhance } from '$app/forms';
  import { Mail, Lock, Eye, EyeOff, Loader2 } from '@lucide/svelte';
  import type { ActionData } from './$types';

  let { form }: { form: ActionData } = $props();

  let loading = $state(false);
  let showPassword = $state(false);
</script>

<div class="min-h-screen flex items-center justify-center bg-base py-12 px-4 sm:px-6 lg:px-8">
  <div class="max-w-md w-full space-y-8 bg-surface-1 p-8 rounded-xl border border-border-subtle shadow-2xl">
    <div>
      <h2 class="mt-2 text-center text-3xl font-extrabold text-text-primary">
        Welcome to FrameForge
      </h2>
      <p class="mt-2 text-center text-sm text-text-secondary">
        Sign in to your account
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
      </div>

      <div class="flex items-center justify-between">
        <div class="flex items-center">
          <input id="remember-me" name="remember-me" type="checkbox" class="h-4 w-4 text-accent focus:ring-accent border-border-default rounded bg-surface-2">
          <label for="remember-me" class="ml-2 block text-sm text-text-secondary">
            Remember me
          </label>
        </div>
      </div>

      <div>
        <button 
          type="submit" 
          disabled={loading}
          class="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-semibold rounded-lg text-base bg-accent hover:bg-accent/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent focus:ring-offset-base transition-colors disabled:opacity-75 disabled:cursor-not-allowed"
        >
          {#if loading}
            <Loader2 class="animate-spin -ml-1 mr-2 h-5 w-5" />
            Signing in...
          {:else}
            Sign in
          {/if}
        </button>
      </div>
    </form>
    
    <div class="text-center mt-4">
      <p class="text-sm text-text-secondary">
        Don't have an account? 
        <a href="/auth/register" class="font-medium text-accent hover:text-accent/80 transition-colors">
          Register here
        </a>
      </p>
    </div>
  </div>
</div>

