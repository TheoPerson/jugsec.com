import type { GameOptimization, GameSpecs } from "../db/schema";

export type GameProfileData = {
  slug: string;
  name: string;
  description: string;
  category: string;
  publisher: string;
  isFeatured: boolean;
  recommendedSpecs: GameSpecs;
  optimizations: GameOptimization[];
};

/** Profils d'optimisation par jeu — données de seed */
export const GAME_PROFILES: GameProfileData[] = [
  {
    slug: "valorant",
    name: "Valorant",
    description:
      "Precision tactical shooter. Every frame matters for peeking, flicking, and spray control.",
    category: "fps",
    publisher: "Riot Games",
    isFeatured: true,
    recommendedSpecs: {
      minCpu: "Intel i3-4150",
      minGpu: "GeForce GT 730",
      minRamGb: 4,
      recCpu: "Intel i5-9400F",
      recGpu: "GeForce GTX 1050 Ti",
      recRamGb: 8,
    },
    optimizations: [
      {
        id: "val-1",
        title: "Material Quality: Low",
        description:
          "Reduces GPU load without affecting competitive visibility.",
        category: "graphics",
        steps: [
          "Settings → Video → Graphics Quality",
          "Set Material Quality to Low",
        ],
        impact: "high",
      },
      {
        id: "val-2",
        title: "Anti-Aliasing: MSAA 2x or Off",
        description:
          "Higher AA wastes GPU cycles with minimal visual benefit in Valorant.",
        category: "graphics",
        steps: [
          "Settings → Video → Graphics Quality",
          "Set Anti-Aliasing to MSAA 2x or None",
        ],
        impact: "medium",
      },
      {
        id: "val-3",
        title: "Multithreaded Rendering: On",
        description:
          "Enables multi-core CPU utilization for significantly better FPS.",
        category: "performance",
        steps: ["Settings → Video → General", "Enable Multithreaded Rendering"],
        impact: "high",
      },
      {
        id: "val-4",
        title: "NVIDIA Reflex: On + Boost",
        description:
          "Dramatically reduces input latency. Critical for competitive play.",
        category: "latency",
        steps: [
          "Settings → Video → General",
          'Set NVIDIA Reflex Low Latency to "On + Boost"',
        ],
        impact: "high",
      },
    ],
  },
  {
    slug: "cs2",
    name: "Counter-Strike 2",
    description:
      "The definitive competitive FPS. Smooth frames and low latency are non-negotiable at high ranks.",
    category: "fps",
    publisher: "Valve",
    isFeatured: true,
    recommendedSpecs: {
      minCpu: "Intel i5-2500K",
      minGpu: "GeForce GTX 1060",
      minRamGb: 8,
      recCpu: "Intel i7-9700K",
      recGpu: "GeForce RTX 2060",
      recRamGb: 16,
    },
    optimizations: [
      {
        id: "cs2-1",
        title: "Launch Options: -high -novid",
        description: "Sets process priority to high and skips intro video.",
        category: "performance",
        steps: [
          "Right-click CS2 in Steam → Properties",
          "In Launch Options, add: -high -novid",
          "Restart the game",
        ],
        impact: "medium",
      },
      {
        id: "cs2-2",
        title: "Shadow Quality: Medium or Low",
        description:
          "Shadows are GPU-intensive. Medium retains competitive info while saving frames.",
        category: "graphics",
        steps: ["Settings → Video → Advanced", "Set Shadow Quality to Medium"],
        impact: "high",
      },
      {
        id: "cs2-3",
        title: "NVIDIA Reflex: Enabled",
        description: "Reduces render latency. Available in CS2 natively.",
        category: "latency",
        steps: [
          "Settings → Video → Advanced",
          "Set NVIDIA Reflex Low Latency to Enabled",
        ],
        impact: "high",
      },
      {
        id: "cs2-4",
        title: "Multisampling Anti-Aliasing: 2x MSAA",
        description: "Minimal MSAA for cleaner edges without heavy GPU cost.",
        category: "graphics",
        steps: ["Settings → Video → Advanced", "Set MSAA to 2x"],
        impact: "medium",
      },
    ],
  },
  {
    slug: "fortnite",
    name: "Fortnite",
    description:
      "Fast-paced battle royale where building speed and quick edits demand high FPS and low input lag.",
    category: "battle-royale",
    publisher: "Epic Games",
    isFeatured: true,
    recommendedSpecs: {
      minCpu: "Intel i5-7300U",
      minGpu: "GeForce GTX 960",
      minRamGb: 8,
      recCpu: "Intel i7-8700",
      recGpu: "GeForce GTX 1070",
      recRamGb: 16,
    },
    optimizations: [
      {
        id: "fn-1",
        title: "Performance Mode",
        description:
          "Uses a lightweight renderer. Provides the biggest FPS boost at the cost of visual fidelity.",
        category: "performance",
        steps: [
          "Settings → Video → Rendering Mode",
          'Select "Performance"',
          "Restart the game",
        ],
        impact: "high",
      },
      {
        id: "fn-2",
        title: "Meshes: Low, Effects: Low",
        description:
          "Reduces visual clutter and improves visibility during fights.",
        category: "graphics",
        steps: [
          "Settings → Video → Quality Presets",
          "Set 3D Resolution to 100%",
          "Set Meshes and Effects to Low",
        ],
        impact: "high",
      },
      {
        id: "fn-3",
        title: "Frame Rate Limit: Match Monitor Hz",
        description:
          "Cap frames to your monitor refresh rate to reduce input lag from frame queuing.",
        category: "performance",
        steps: [
          "Settings → Video → Advanced",
          "Set Frame Rate Limit to your monitor refresh rate (e.g., 240 FPS)",
        ],
        impact: "medium",
      },
    ],
  },
  {
    slug: "apex-legends",
    name: "Apex Legends",
    description:
      "Movement-heavy battle royale where high FPS enables better tracking and smoother slides.",
    category: "battle-royale",
    publisher: "EA / Respawn",
    isFeatured: true,
    recommendedSpecs: {
      minCpu: "Intel i3-6300",
      minGpu: "GeForce GT 640",
      minRamGb: 6,
      recCpu: "Intel i5-3570K",
      recGpu: "GeForce GTX 970",
      recRamGb: 8,
    },
    optimizations: [
      {
        id: "apex-1",
        title: "Texture Streaming Budget: Low/Medium",
        description:
          "Reduces VRAM usage and prevents frame drops in busy areas.",
        category: "graphics",
        steps: [
          "Settings → Video",
          "Set Texture Streaming Budget to 2-4GB depending on your VRAM",
        ],
        impact: "high",
      },
      {
        id: "apex-2",
        title: "Launch Options: +fps_max 0 -novid",
        description: "Unlocks frame rate cap and skips intro videos.",
        category: "performance",
        steps: [
          "Right-click Apex in Steam → Properties",
          "Add launch options: +fps_max 0 -novid",
          "Restart game",
        ],
        impact: "medium",
      },
      {
        id: "apex-3",
        title: "Disable V-Sync & Triple Buffering",
        description:
          "V-Sync adds significant input lag. Disable it and use NVIDIA Reflex instead.",
        category: "latency",
        steps: [
          "Settings → Video",
          "Set V-Sync to Disabled",
          "Set Triple Buffering to Disabled",
        ],
        impact: "high",
      },
    ],
  },
  {
    slug: "overwatch-2",
    name: "Overwatch 2",
    description:
      "Team-based hero shooter. Consistent high FPS matters for tracking enemies and reacting to ultimates.",
    category: "fps",
    publisher: "Blizzard",
    isFeatured: false,
    recommendedSpecs: {
      minCpu: "Intel i3-7100",
      minGpu: "GeForce GTX 600",
      minRamGb: 6,
      recCpu: "Intel i7-8700K",
      recGpu: "GeForce GTX 1060",
      recRamGb: 8,
    },
    optimizations: [
      {
        id: "ow-1",
        title: "Render Scale: 100%",
        description:
          "Keep at 100% for clarity. Lowering makes the image blurry, which hurts aim.",
        category: "graphics",
        steps: ["Settings → Video", "Set Render Scale to 100%"],
        impact: "medium",
      },
      {
        id: "ow-2",
        title: "Dynamic Render Scale: Off",
        description:
          "Prevent automatic resolution drops during intense fights.",
        category: "performance",
        steps: ["Settings → Video", "Disable Dynamic Render Scale"],
        impact: "high",
      },
      {
        id: "ow-3",
        title: "Reduce Buffering: On",
        description: "Reduces input lag by minimizing the GPU render queue.",
        category: "latency",
        steps: ["Settings → Video → Advanced", 'Enable "Reduce Buffering"'],
        impact: "high",
      },
    ],
  },
  {
    slug: "league-of-legends",
    name: "League of Legends",
    description:
      "Premier MOBA. Consistent frames prevent micro-stutters during team fights that can cost you the game.",
    category: "moba",
    publisher: "Riot Games",
    isFeatured: false,
    recommendedSpecs: {
      minCpu: "Intel i3-530",
      minGpu: "GeForce 9600 GT",
      minRamGb: 4,
      recCpu: "Intel i5-3300",
      recGpu: "GeForce GTX 560",
      recRamGb: 8,
    },
    optimizations: [
      {
        id: "lol-1",
        title: "Cap FPS at Monitor Refresh Rate",
        description:
          "LoL can push 400+ FPS unnecessarily. Cap it to reduce GPU heat and coil whine.",
        category: "performance",
        steps: [
          "Settings → Video",
          "Set Frame Rate Cap to your monitor refresh rate",
          "This also reduces power consumption",
        ],
        impact: "medium",
      },
      {
        id: "lol-2",
        title: "Shadows: Off",
        description:
          "Shadows provide zero competitive advantage in LoL and cost performance.",
        category: "graphics",
        steps: ["Settings → Video → Graphics", "Set Shadows to Off"],
        impact: "medium",
      },
    ],
  },
];
