<script lang="ts">
  import { enhance } from '$app/forms';
  import { User, Key, Shield, AlertTriangle } from '@lucide/svelte';

  let { data, form } = $props();
  let user = $derived(data.user);
  
  let profileUpdating = $state(false);
  let passwordUpdating = $state(false);
</script>

<div class="max-w-3xl mx-auto pb-20 md:pb-0 space-y-8">
  <header>
    <h1 class="text-3xl font-bold text-text-primary">Settings</h1>
    <p class="text-text-secondary mt-1">Manage your account and preferences.</p>
  </header>

  <!-- Profile Settings -->
  <section class="bg-surface-1 border border-border-subtle rounded-xl overflow-hidden">
    <div class="p-6 border-b border-border-subtle flex items-center gap-3">
      <User class="text-accent" size={24} />
      <h2 class="text-xl font-semibold text-text-primary">Profile</h2>
    </div>
    
    <div class="p-6">
      <form 
        method="POST" 
        action="?/updateProfile"
        class="space-y-4"
        use:enhance={() => {
          profileUpdating = true;
          return async ({ update }) => {
            await update();
            profileUpdating = false;
          };
        }}
      >
        <div>
          <label for="email" class="block text-sm font-medium text-text-secondary mb-1">Email (cannot be changed)</label>
          <input 
            type="email" 
            id="email" 
            disabled 
            value={user.email} 
            class="w-full bg-surface-2 border border-border-default rounded-lg px-4 py-2 text-text-tertiary cursor-not-allowed opacity-70"
          />
        </div>
        
        <div>
          <label for="displayName" class="block text-sm font-medium text-text-secondary mb-1">Display Name</label>
          <input 
            type="text" 
            id="displayName" 
            name="displayName"
            value={user.username} 
            class="w-full bg-surface-2 border border-border-default rounded-lg px-4 py-2 text-text-primary focus:outline-none focus:border-accent transition-colors"
          />
        </div>

        <button 
          type="submit" 
          disabled={profileUpdating}
          class="bg-surface-3 hover:bg-border-subtle text-text-primary font-medium py-2 px-6 rounded-lg transition-colors mt-2"
        >
          {profileUpdating ? 'Saving...' : 'Update Profile'}
        </button>
      </form>
    </div>
  </section>

  <!-- Subscription Tier -->
  <section class="bg-surface-1 border border-border-subtle rounded-xl overflow-hidden">
    <div class="p-6 border-b border-border-subtle flex items-center gap-3">
      <Shield class="text-neon" size={24} />
      <h2 class="text-xl font-semibold text-text-primary">Subscription</h2>
    </div>
    <div class="p-6 flex items-center justify-between">
      <div>
        <p class="text-text-secondary mb-1">Current Plan</p>
        <p class="text-2xl font-bold text-text-primary capitalize">{user.tier}</p>
      </div>
      <button class="bg-accent hover:bg-accent/90 text-void font-semibold py-2 px-6 rounded-lg transition-colors">
        Upgrade Plan
      </button>
    </div>
  </section>

  <!-- Change Password -->
  <section class="bg-surface-1 border border-border-subtle rounded-xl overflow-hidden">
    <div class="p-6 border-b border-border-subtle flex items-center gap-3">
      <Key class="text-warning" size={24} />
      <h2 class="text-xl font-semibold text-text-primary">Security</h2>
    </div>
    
    <div class="p-6">
      <form 
        method="POST" 
        action="?/changePassword"
        class="space-y-4"
        use:enhance={() => {
          passwordUpdating = true;
          return async ({ update }) => {
            await update();
            passwordUpdating = false;
          };
        }}
      >
        <div>
          <label for="currentPassword" class="block text-sm font-medium text-text-secondary mb-1">Current Password</label>
          <input 
            type="password" 
            id="currentPassword" 
            name="currentPassword"
            required
            class="w-full bg-surface-2 border border-border-default rounded-lg px-4 py-2 text-text-primary focus:outline-none focus:border-accent transition-colors"
          />
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label for="newPassword" class="block text-sm font-medium text-text-secondary mb-1">New Password</label>
            <input 
              type="password" 
              id="newPassword" 
              name="newPassword"
              required
              minlength="8"
              class="w-full bg-surface-2 border border-border-default rounded-lg px-4 py-2 text-text-primary focus:outline-none focus:border-accent transition-colors"
            />
          </div>
          <div>
            <label for="confirmPassword" class="block text-sm font-medium text-text-secondary mb-1">Confirm New Password</label>
            <input 
              type="password" 
              id="confirmPassword" 
              name="confirmPassword"
              required
              minlength="8"
              class="w-full bg-surface-2 border border-border-default rounded-lg px-4 py-2 text-text-primary focus:outline-none focus:border-accent transition-colors"
            />
          </div>
        </div>

        {#if form?.error && form?.message !== 'Profile updated'}
          <p class="text-danger text-sm">{form.error}</p>
        {/if}
        {#if form?.success && form?.message === 'Password changed successfully'}
          <p class="text-neon text-sm">{form.message}</p>
        {/if}

        <button 
          type="submit" 
          disabled={passwordUpdating}
          class="bg-surface-3 hover:bg-border-subtle text-text-primary font-medium py-2 px-6 rounded-lg transition-colors mt-2"
        >
          {passwordUpdating ? 'Updating...' : 'Change Password'}
        </button>
      </form>
    </div>
  </section>

  <!-- Danger Zone -->
  <section class="border border-danger/30 rounded-xl overflow-hidden mt-8">
    <div class="bg-danger/10 p-6 flex flex-col md:flex-row items-center justify-between gap-4">
      <div>
        <h3 class="text-danger font-bold flex items-center gap-2 mb-1">
          <AlertTriangle size={20} />
          Danger Zone
        </h3>
        <p class="text-text-secondary text-sm">Once you delete your account, there is no going back. Please be certain.</p>
      </div>
      <button class="bg-danger hover:bg-danger/90 text-white font-medium py-2 px-6 rounded-lg transition-colors whitespace-nowrap">
        Delete Account
      </button>
    </div>
  </section>
</div>

