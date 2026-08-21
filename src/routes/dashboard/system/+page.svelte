<script lang="ts">
  import { enhance } from '$app/forms';
  import { Save, Check } from '@lucide/svelte';

  let { data, form } = $props();
  let systemProfile = $derived(data.systemProfile);
  let saving = $state(false);

  let success = $derived(form?.success ?? false);
</script>

<div class="max-w-3xl mx-auto pb-20 md:pb-0 space-y-8">
  <header>
    <h1 class="text-3xl font-bold text-text-primary">System Profile</h1>
    <p class="text-text-secondary mt-1">Define your PC hardware so FrameForge can tailor its optimizations.</p>
  </header>

  <div class="bg-surface-1 border border-border-subtle rounded-xl p-6 md:p-8">
    {#if success}
      <div class="mb-6 p-4 bg-neon/10 border border-neon/20 rounded-lg flex items-center gap-3 text-neon">
        <Check size={20} />
        <span class="font-medium">System profile saved successfully!</span>
      </div>
    {/if}

    <form 
      method="POST" 
      action="?/save" 
      class="space-y-6"
      use:enhance={() => {
        saving = true;
        return async ({ update }) => {
          await update();
          saving = false;
        };
      }}
    >
      <div class="space-y-4">
        <div>
          <label for="name" class="block text-sm font-medium text-text-secondary mb-1">Profile Name</label>
          <input 
            type="text" 
            id="name" 
            name="name" 
            value={systemProfile?.name || 'My Gaming PC'} 
            class="w-full bg-surface-2 border border-border-default rounded-lg px-4 py-2 text-text-primary focus:outline-none focus:border-accent transition-colors"
          />
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label for="cpu" class="block text-sm font-medium text-text-secondary mb-1">CPU</label>
            <input 
              type="text" 
              id="cpu" 
              name="cpu" 
              placeholder="e.g. Intel Core i7-13700K"
              value={systemProfile?.cpu || ''} 
              class="w-full bg-surface-2 border border-border-default rounded-lg px-4 py-2 text-text-primary focus:outline-none focus:border-accent transition-colors"
            />
          </div>
          <div>
            <label for="gpu" class="block text-sm font-medium text-text-secondary mb-1">GPU</label>
            <input 
              type="text" 
              id="gpu" 
              name="gpu" 
              placeholder="e.g. NVIDIA RTX 4070 Ti"
              value={systemProfile?.gpu || ''} 
              class="w-full bg-surface-2 border border-border-default rounded-lg px-4 py-2 text-text-primary focus:outline-none focus:border-accent transition-colors"
            />
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label for="ramGb" class="block text-sm font-medium text-text-secondary mb-1">RAM (GB)</label>
            <select 
              id="ramGb" 
              name="ramGb"
              class="w-full bg-surface-2 border border-border-default rounded-lg px-4 py-2 text-text-primary focus:outline-none focus:border-accent transition-colors appearance-none"
            >
              <option value="" disabled selected={!systemProfile?.ramGb}>Select RAM</option>
              {#each [4, 8, 16, 32, 64, 128] as amount}
                <option value={amount} selected={systemProfile?.ramGb === amount}>{amount} GB</option>
              {/each}
            </select>
          </div>
          <div>
            <label for="storageType" class="block text-sm font-medium text-text-secondary mb-1">Storage Type</label>
            <select 
              id="storageType" 
              name="storageType"
              class="w-full bg-surface-2 border border-border-default rounded-lg px-4 py-2 text-text-primary focus:outline-none focus:border-accent transition-colors appearance-none"
            >
              <option value="" disabled selected={!systemProfile?.storageType}>Select Storage</option>
              <option value="HDD" selected={systemProfile?.storageType === 'HDD'}>HDD</option>
              <option value="SSD" selected={systemProfile?.storageType === 'SSD'}>SSD (SATA)</option>
              <option value="NVMe SSD" selected={systemProfile?.storageType === 'NVMe SSD'}>NVMe SSD</option>
            </select>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label for="monitorResolution" class="block text-sm font-medium text-text-secondary mb-1">Monitor Resolution</label>
            <select 
              id="monitorResolution" 
              name="monitorResolution"
              class="w-full bg-surface-2 border border-border-default rounded-lg px-4 py-2 text-text-primary focus:outline-none focus:border-accent transition-colors appearance-none"
            >
              <option value="" disabled selected={!systemProfile?.monitorResolution}>Select Resolution</option>
              {#each ['1080p', '1440p', '4K', 'Ultrawide'] as res}
                <option value={res} selected={systemProfile?.monitorResolution === res}>{res}</option>
              {/each}
            </select>
          </div>
          <div>
            <label for="monitorRefreshRate" class="block text-sm font-medium text-text-secondary mb-1">Refresh Rate (Hz)</label>
            <select 
              id="monitorRefreshRate" 
              name="monitorRefreshRate"
              class="w-full bg-surface-2 border border-border-default rounded-lg px-4 py-2 text-text-primary focus:outline-none focus:border-accent transition-colors appearance-none"
            >
              <option value="" disabled selected={!systemProfile?.monitorRefreshRate}>Select Refresh Rate</option>
              {#each [60, 75, 120, 144, 165, 240, 360] as hz}
                <option value={hz} selected={systemProfile?.monitorRefreshRate === hz}>{hz} Hz</option>
              {/each}
            </select>
          </div>
        </div>

        <div>
          <label for="osVersion" class="block text-sm font-medium text-text-secondary mb-1">Operating System</label>
          <select 
            id="osVersion" 
            name="osVersion"
            class="w-full bg-surface-2 border border-border-default rounded-lg px-4 py-2 text-text-primary focus:outline-none focus:border-accent transition-colors appearance-none"
          >
            <option value="" disabled selected={!systemProfile?.osVersion}>Select OS</option>
            <option value="Windows 10" selected={systemProfile?.osVersion === 'Windows 10'}>Windows 10</option>
            <option value="Windows 11" selected={systemProfile?.osVersion === 'Windows 11'}>Windows 11</option>
            <option value="Linux" selected={systemProfile?.osVersion === 'Linux'}>Linux</option>
          </select>
        </div>
      </div>

      <div class="pt-4 border-t border-border-subtle flex justify-end">
        <button 
          type="submit" 
          disabled={saving}
          class="bg-accent hover:bg-accent/90 text-void font-semibold py-2 px-6 rounded-lg transition-colors flex items-center gap-2 disabled:opacity-50"
        >
          <Save size={18} />
          {saving ? 'Saving...' : 'Save Profile'}
        </button>
      </div>
    </form>
  </div>
</div>

