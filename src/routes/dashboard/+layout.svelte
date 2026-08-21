<script lang="ts">
  import { page } from '$app/stores';
  import { Gauge, Zap, Cpu, Gamepad2, History, Settings, LogOut } from '@lucide/svelte';
  import { cn } from '$lib/utils';
  
  let { data, children } = $props();
  let user = $derived(data.user);

  let navItems = [
    { name: 'Overview', href: '/dashboard', icon: Gauge },
    { name: 'Scan', href: '/dashboard/scan', icon: Zap },
    { name: 'System', href: '/dashboard/system', icon: Cpu },
    { name: 'Games', href: '/dashboard/games', icon: Gamepad2 },
    { name: 'History', href: '/dashboard/history', icon: History },
    { name: 'Settings', href: '/dashboard/settings', icon: Settings }
  ];
</script>

<div class="flex h-screen bg-base text-text-primary">
  <!-- Desktop Sidebar -->
  <aside class="hidden md:flex flex-col w-64 bg-surface-1 border-r border-border-subtle h-full">
    <div class="p-6 border-b border-border-subtle">
      <h1 class="text-2xl font-bold font-mono text-accent">FrameForge</h1>
    </div>
    
    <nav class="flex-1 py-4">
      <ul class="space-y-1 px-3">
        {#each navItems as item}
          {@const isActive = $page.url.pathname === item.href || ($page.url.pathname.startsWith(item.href) && item.href !== '/dashboard')}
          <li>
            <a 
              href={item.href}
              class={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
                isActive 
                  ? "bg-accent/10 text-accent border-l-2 border-accent rounded-l-none" 
                  : "text-text-secondary hover:text-text-primary hover:bg-surface-2"
              )}
            >
              <item.icon size={20} />
              <span class="font-medium">{item.name}</span>
            </a>
          </li>
        {/each}
      </ul>
    </nav>

    <div class="p-4 border-t border-border-subtle">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-full bg-surface-3 flex items-center justify-center text-accent font-bold">
            {user?.username?.charAt(0).toUpperCase() || 'U'}
          </div>
          <div>
            <p class="text-sm font-semibold">{user?.username}</p>
            <p class="text-xs text-text-tertiary">{user?.tier || 'Free Tier'}</p>
          </div>
        </div>
        <form action="/auth/logout" method="POST">
          <button type="submit" class="p-2 text-text-tertiary hover:text-danger transition-colors">
            <LogOut size={20} />
          </button>
        </form>
      </div>
    </div>
  </aside>

  <!-- Main Content -->
  <main class="flex-1 flex flex-col h-full overflow-y-auto">
    <div class="p-4 md:p-8 flex-1">
      {@render children?.()}
    </div>
  </main>

  <!-- Mobile Bottom Bar -->
  <div class="md:hidden fixed bottom-0 w-full bg-surface-1 border-t border-border-subtle flex justify-around p-3 z-50">
    {#each navItems as item}
      {@const isActive = $page.url.pathname === item.href || ($page.url.pathname.startsWith(item.href) && item.href !== '/dashboard')}
      <a 
        href={item.href}
        class={cn(
          "p-2 rounded-xl flex flex-col items-center gap-1",
          isActive ? "text-accent bg-accent/10" : "text-text-secondary"
        )}
      >
        <item.icon size={24} />
      </a>
    {/each}
  </div>
</div>

