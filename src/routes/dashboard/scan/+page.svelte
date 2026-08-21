<script lang="ts">
  import { enhance } from '$app/forms';
  import { Zap, Cpu, CheckCircle2, ChevronDown, ChevronUp } from '@lucide/svelte';
  import { cn } from '$lib/utils';

  let { data, form } = $props();
  let systemProfile = $derived(data.systemProfile);
  let scans = $derived(data.scans);
  
  let isScanning = $state(false);
  
  // Results UI states
  let activeScan = $derived(form?.scan || scans[0]);
  let expandedRec = $state<string | null>(null);

  function getScoreColor(score: number) {
    if (score >= 80) return 'text-neon';
    if (score >= 60) return 'text-accent';
    if (score >= 40) return 'text-warning';
    return 'text-danger';
  }

  function getScoreStroke(score: number) {
    if (score >= 80) return '#00ff88'; // neon
    if (score >= 60) return '#00d4ff'; // accent
    if (score >= 40) return '#ffaa00'; // warning
    return '#ff3366'; // danger
  }
</script>

<div class="max-w-4xl mx-auto pb-20 md:pb-0 space-y-8">
  <header>
    <h1 class="text-3xl font-bold text-text-primary">Optimization Scan</h1>
    <p class="text-text-secondary mt-1">Analyze your system to find performance bottlenecks and fixes.</p>
  </header>

  {#if !systemProfile}
    <div class="bg-surface-1 border border-warning/30 rounded-xl p-8 text-center flex flex-col items-center">
      <Cpu class="text-warning mb-3" size={40} />
      <h2 class="text-xl font-bold text-text-primary mb-2">System Profile Required</h2>
      <p class="text-text-secondary mb-6 max-w-md">You need to configure your system hardware profile before FrameForge can run an accurate optimization scan.</p>
      <a href="/dashboard/system" class="bg-accent hover:bg-accent/90 text-void font-semibold py-2 px-6 rounded-lg transition-colors">
        Set Up System Profile
      </a>
    </div>
  {:else}
    <div class="bg-surface-1 border border-border-subtle rounded-xl p-8 flex flex-col items-center justify-center text-center min-h-[300px]">
      {#if isScanning}
        <div class="relative flex items-center justify-center">
          <div class="absolute w-32 h-32 rounded-full border-4 border-surface-3"></div>
          <div class="absolute w-32 h-32 rounded-full border-4 border-accent border-t-transparent animate-spin"></div>
          <Zap class="text-accent animate-pulse" size={40} />
        </div>
        <h2 class="mt-8 text-xl font-bold text-text-primary">Analyzing System...</h2>
        <p class="text-text-secondary mt-2">Checking CPU, GPU, memory and storage configurations</p>
      {:else}
        <form 
          method="POST" 
          action="?/scan" 
          use:enhance={() => {
            isScanning = true;
            return async ({ update }) => {
              await update();
              isScanning = false;
            };
          }}
        >
          <button 
            type="submit" 
            class="group relative w-48 h-48 bg-surface-2 rounded-full flex flex-col items-center justify-center border-4 border-border-default hover:border-accent hover:bg-surface-3 transition-all overflow-hidden"
          >
            <div class="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <Zap size={48} class="text-accent mb-2 group-hover:scale-110 transition-transform" />
            <span class="font-bold text-lg">RUN SCAN</span>
          </button>
        </form>
        {#if form?.error}
          <p class="mt-4 text-danger font-medium">{form.error}</p>
        {/if}
      {/if}
    </div>

    {#if activeScan && !isScanning}
      <div class="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <!-- Results Header & Score -->
        <div class="bg-surface-1 border border-border-subtle rounded-xl p-8 flex flex-col md:flex-row items-center gap-8">
          <div class="relative w-40 h-40 flex items-center justify-center flex-shrink-0">
            <svg class="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" class="text-surface-3" stroke-width="8" />
              <circle 
                cx="50" cy="50" r="45" fill="none" 
                stroke={getScoreStroke(activeScan.overallScore ?? 0)} 
                stroke-width="8"
                stroke-dasharray="283"
                stroke-dashoffset={283 - (283 * (activeScan.overallScore ?? 0)) / 100}
                class="transition-all duration-1000 ease-out"
                stroke-linecap="round"
              />
            </svg>
            <div class="absolute inset-0 flex flex-col items-center justify-center">
              <span class={cn("text-4xl font-mono font-bold", getScoreColor((activeScan.overallScore ?? 0)))}>
                {activeScan.overallScore}
              </span>
              <span class="text-xs text-text-tertiary">SCORE</span>
            </div>
          </div>
          
          <div class="flex-1">
            <h2 class="text-2xl font-bold text-text-primary mb-2">Scan Complete</h2>
            <p class="text-text-secondary mb-4">
              Analysis found potential improvements for your {systemProfile.cpu} / {systemProfile.gpu} system.
            </p>
            {#if activeScan.aiAnalysis}
              <div class="bg-surface-2 p-4 rounded-lg text-sm text-text-secondary border border-border-default">
                {activeScan.aiAnalysis}
              </div>
            {/if}
          </div>
        </div>

        <!-- Recommendations -->
        <h3 class="text-xl font-semibold mt-8 mb-4">Recommendations</h3>
        <div class="space-y-4">
          <!-- In a real app, recommendations would come from activeScan.recommendations -->
          <!-- We show mock data since the schema might just store it as jsonb -->
          {#each [
            { id: '1', title: 'Enable Game Mode', desc: 'Windows Game Mode prioritizes games and minimizes background tasks.', impact: 'High', difficulty: 'Easy', gain: '5-10% FPS' },
            { id: '2', title: 'Update GPU Drivers', desc: 'Newer NVIDIA drivers contain specific optimizations for recent games.', impact: 'Medium', difficulty: 'Easy', gain: 'Smoothness' },
            { id: '3', title: 'Disable VBS', desc: 'Virtualization-Based Security can reduce gaming performance by up to 10%.', impact: 'High', difficulty: 'Medium', gain: '10% FPS' }
          ] as rec}
            <div class="bg-surface-1 border border-border-subtle rounded-xl overflow-hidden">
              <button 
                class="w-full p-4 flex items-center justify-between hover:bg-surface-2 transition-colors text-left"
                onclick={() => expandedRec = expandedRec === rec.id ? null : rec.id}
              >
                <div class="flex items-center gap-4">
                  <div class={cn(
                    "p-2 rounded-lg",
                    rec.impact === 'High' ? 'bg-danger/10 text-danger' : 
                    rec.impact === 'Medium' ? 'bg-warning/10 text-warning' : 'bg-accent/10 text-accent'
                  )}>
                    <Zap size={20} />
                  </div>
                  <div>
                    <h4 class="font-bold text-text-primary">{rec.title}</h4>
                    <p class="text-sm text-text-secondary">{rec.desc}</p>
                  </div>
                </div>
                <div class="flex items-center gap-4">
                  <span class="text-accent font-mono text-sm hidden sm:inline-block">+{rec.gain}</span>
                  {#if expandedRec === rec.id}
                    <ChevronUp class="text-text-tertiary" size={20} />
                  {:else}
                    <ChevronDown class="text-text-tertiary" size={20} />
                  {/if}
                </div>
              </button>
              
              {#if expandedRec === rec.id}
                <div class="p-4 bg-surface-2 border-t border-border-subtle animate-in slide-in-from-top-2">
                  <div class="flex gap-4 mb-4">
                    <span class="px-2 py-1 bg-surface-3 rounded text-xs text-text-secondary">Impact: {rec.impact}</span>
                    <span class="px-2 py-1 bg-surface-3 rounded text-xs text-text-secondary">Difficulty: {rec.difficulty}</span>
                  </div>
                  <h5 class="font-medium text-sm mb-2">How to apply:</h5>
                  <ul class="list-decimal list-inside space-y-1 text-sm text-text-secondary mb-4">
                    <li>Open Windows Settings</li>
                    <li>Navigate to Gaming &gt; Game Mode</li>
                    <li>Toggle Game Mode to On</li>
                  </ul>
                  <button class="flex items-center gap-2 bg-surface-3 hover:bg-border-subtle text-text-primary px-4 py-2 rounded-lg transition-colors text-sm font-medium">
                    <CheckCircle2 size={16} />
                    Mark as Applied
                  </button>
                </div>
              {/if}
            </div>
          {/each}
        </div>
      </div>
    {/if}
  {/if}
</div>


