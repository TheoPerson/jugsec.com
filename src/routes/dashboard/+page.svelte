<script lang="ts">
  import { Gauge, Zap, Cpu, Gamepad2, History } from '@lucide/svelte';
  import { cn } from '$lib/utils';
  
  let { data } = $props();
  let user = $derived(data.user);
  let stats = $derived(data.stats);
  let systemProfile = $derived(data.systemProfile);
  let latestScan = $derived(data.latestScan);
  let recentActivity = $derived(data.recentActivity);

  let hour = new Date().getHours();
  let greeting = $derived(hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening');

  let scoreColor = $derived(
    !latestScan?.overallScore ? 'text-text-secondary' :
    latestScan.overallScore >= 80 ? 'text-neon' :
    latestScan.overallScore >= 60 ? 'text-accent' :
    latestScan.overallScore >= 40 ? 'text-warning' : 'text-danger'
  );
</script>

<div class="max-w-6xl mx-auto space-y-8 pb-20 md:pb-0">
  <header>
    <h1 class="text-3xl font-bold text-text-primary">{greeting}, {user.username}</h1>
    <p class="text-text-secondary mt-1">Here's your system performance overview.</p>
  </header>

  <!-- Stats Grid -->
  <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
    <div class="bg-surface-1 border border-border-subtle rounded-xl p-6 flex flex-col items-center justify-center text-center">
      <div class="flex items-center gap-2 text-text-tertiary mb-2">
        <Gauge size={18} />
        <span class="text-sm font-medium">Performance Score</span>
      </div>
      <div class={cn("text-4xl font-mono font-bold", scoreColor)}>
        {latestScan?.overallScore || '--'}
      </div>
    </div>
    
    <div class="bg-surface-1 border border-border-subtle rounded-xl p-6 flex flex-col items-center justify-center text-center">
      <div class="flex items-center gap-2 text-text-tertiary mb-2">
        <Zap size={18} />
        <span class="text-sm font-medium">Total Scans</span>
      </div>
      <div class="text-4xl font-mono font-bold text-text-primary">{stats.scans}</div>
    </div>

    <div class="bg-surface-1 border border-border-subtle rounded-xl p-6 flex flex-col items-center justify-center text-center">
      <div class="flex items-center gap-2 text-text-tertiary mb-2">
        <Cpu size={18} />
        <span class="text-sm font-medium">Optimizations</span>
      </div>
      <div class="text-4xl font-mono font-bold text-text-primary">{stats.optimizations}</div>
    </div>

    <div class="bg-surface-1 border border-border-subtle rounded-xl p-6 flex flex-col items-center justify-center text-center">
      <div class="flex items-center gap-2 text-text-tertiary mb-2">
        <Gamepad2 size={18} />
        <span class="text-sm font-medium">Games</span>
      </div>
      <div class="text-4xl font-mono font-bold text-text-primary">{stats.games}</div>
    </div>
  </div>

  <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
    <div class="lg:col-span-2 space-y-8">
      <!-- Quick Actions -->
      <section>
        <h2 class="text-xl font-semibold mb-4">Quick Actions</h2>
        <div class="flex flex-wrap gap-4">
          <a href="/dashboard/scan" class="bg-accent hover:bg-accent/90 text-void font-semibold py-3 px-6 rounded-lg transition-colors flex items-center gap-2">
            <Zap size={20} />
            Run New Scan
          </a>
          <a href="/dashboard/system" class="bg-surface-2 hover:bg-surface-3 border border-border-default text-text-primary font-medium py-3 px-6 rounded-lg transition-colors flex items-center gap-2">
            <Cpu size={20} />
            Edit System
          </a>
        </div>
      </section>

      <!-- Recent Activity -->
      <section>
        <h2 class="text-xl font-semibold mb-4">Recent Activity</h2>
        {#if recentActivity && recentActivity.length > 0}
          <div class="bg-surface-1 border border-border-subtle rounded-xl p-0 overflow-hidden">
            <ul class="divide-y divide-border-subtle">
              {#each recentActivity as activity}
                <li class="p-4 hover:bg-surface-2 transition-colors">
                  <p class="text-text-primary font-medium">{activity.action || 'Optimization applied'} ({activity.category})</p>
                  <p class="text-sm text-text-secondary">{new Date(activity.appliedAt).toLocaleString()}</p>
                </li>
              {/each}
            </ul>
          </div>
        {:else}
          <div class="bg-surface-1 border border-border-subtle rounded-xl p-8 text-center">
            <History class="mx-auto text-text-tertiary mb-3" size={32} />
            <p class="text-text-primary font-medium">No activity yet</p>
            <p class="text-text-secondary text-sm mt-1">Run a scan to find optimizations</p>
          </div>
        {/if}
      </section>
    </div>

    <!-- System Summary -->
    <div class="lg:col-span-1">
      <h2 class="text-xl font-semibold mb-4">System Profile</h2>
      {#if systemProfile}
        <div class="bg-surface-1 border border-border-subtle rounded-xl p-6 space-y-4">
          <h3 class="font-bold text-accent">{systemProfile.name}</h3>
          
          <div class="space-y-3 text-sm">
            <div>
              <span class="text-text-tertiary block text-xs uppercase tracking-wider">CPU</span>
              <span class="text-text-primary font-medium">{systemProfile.cpu || 'Unknown'}</span>
            </div>
            <div>
              <span class="text-text-tertiary block text-xs uppercase tracking-wider">GPU</span>
              <span class="text-text-primary font-medium">{systemProfile.gpu || 'Unknown'}</span>
            </div>
            <div>
              <span class="text-text-tertiary block text-xs uppercase tracking-wider">RAM</span>
              <span class="text-text-primary font-medium">{systemProfile.ramGb ? `${systemProfile.ramGb} GB` : 'Unknown'}</span>
            </div>
            <div>
              <span class="text-text-tertiary block text-xs uppercase tracking-wider">Storage</span>
              <span class="text-text-primary font-medium">{systemProfile.storageType || 'Unknown'}</span>
            </div>
            <div>
              <span class="text-text-tertiary block text-xs uppercase tracking-wider">OS</span>
              <span class="text-text-primary font-medium">{systemProfile.osVersion || 'Unknown'}</span>
            </div>
          </div>
        </div>
      {:else}
        <div class="bg-surface-1 border border-border-subtle rounded-xl p-8 text-center flex flex-col items-center">
          <Cpu class="text-text-tertiary mb-3" size={32} />
          <h3 class="text-text-primary font-medium mb-1">No Profile Found</h3>
          <p class="text-text-secondary text-sm mb-4">Set up your PC specs for personalized recommendations.</p>
          <a href="/dashboard/system" class="bg-surface-2 hover:bg-surface-3 border border-border-default text-text-primary text-sm font-medium py-2 px-4 rounded-lg transition-colors">
            Set Up System
          </a>
        </div>
      {/if}
    </div>
  </div>
</div>

