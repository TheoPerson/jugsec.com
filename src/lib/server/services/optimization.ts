import { db } from "../db";
import {
  optimizationScans,
  systemProfiles,
  type Recommendation,
} from "../db/schema";
import { eq } from "drizzle-orm";
import crypto from "crypto";

/**
 * Analyse un profil système et génère des recommandations d'optimisation.
 * Utilise l'IA Gemini si la clé API est disponible, sinon un moteur de règles.
 */
export async function runOptimizationScan(userId: string, profileId: string) {
  // Récupérer le profil système
  const [profile] = await db
    .select()
    .from(systemProfiles)
    .where(eq(systemProfiles.id, profileId))
    .limit(1);

  if (!profile) throw new Error("System profile not found");

  // Créer le scan en statut "running"
  const [scan] = await db
    .insert(optimizationScans)
    .values({
      userId,
      systemProfileId: profileId,
      status: "running",
    })
    .returning();

  try {
    // Générer les recommandations (règles + IA)
    const recommendations = generateRecommendations(profile);
    const scores = calculateScores(profile, recommendations);

    let aiAnalysis: string | null = null;
    if (process.env.XAI_API_KEY) {
      aiAnalysis = await getAIAnalysis(profile);
    }

    // Mettre à jour le scan avec les résultats
    const [updated] = await db
      .update(optimizationScans)
      .set({
        overallScore: scores.overall,
        cpuScore: scores.cpu,
        gpuScore: scores.gpu,
        ramScore: scores.ram,
        storageScore: scores.storage,
        networkScore: scores.network,
        recommendations,
        aiAnalysis,
        status: "completed",
      })
      .where(eq(optimizationScans.id, scan.id))
      .returning();

    return updated;
  } catch (error) {
    await db
      .update(optimizationScans)
      .set({ status: "failed" })
      .where(eq(optimizationScans.id, scan.id));
    throw error;
  }
}

/** Moteur de règles — génère des recommandations basées sur les specs */
function generateRecommendations(
  profile: typeof systemProfiles.$inferSelect,
): Recommendation[] {
  const recs: Recommendation[] = [];

  // CPU recommendations
  recs.push({
    id: crypto.randomUUID(),
    title: "Optimize CPU Power Plan",
    description:
      'Switch Windows power plan to "High Performance" or "Ultimate Performance" to prevent CPU throttling during competitive matches.',
    category: "cpu",
    impact: "high",
    difficulty: "easy",
    estimatedGain: "+5-15 FPS",
    steps: [
      "Open Windows Settings → System → Power & battery",
      'Click "Power mode" and select "Best performance"',
      "For advanced: open CMD as admin and run: powercfg -duplicatescheme e9a42b02-d5df-448d-aa00-03f14749eb61",
      'Set the new "Ultimate Performance" plan as active',
    ],
    applied: false,
  });

  recs.push({
    id: crypto.randomUUID(),
    title: "Disable CPU Core Parking",
    description:
      "Core parking puts CPU cores to sleep to save power. Disabling it ensures all cores are active for gaming.",
    category: "cpu",
    impact: "medium",
    difficulty: "moderate",
    estimatedGain: "+3-8 FPS, reduced stuttering",
    steps: [
      "Download and run ParkControl or use registry editor",
      "Navigate to HKLM\\SYSTEM\\CurrentControlSet\\Control\\Power\\PowerSettings",
      "Set core parking minimum to 100%",
      "Restart your PC",
    ],
    applied: false,
  });

  // GPU recommendations
  recs.push({
    id: crypto.randomUUID(),
    title: "Update GPU Drivers (Game Ready)",
    description:
      "Running the latest Game Ready drivers ensures optimal performance and compatibility with new game patches.",
    category: "gpu",
    impact: "high",
    difficulty: "easy",
    estimatedGain: "+5-20 FPS",
    steps: [
      "Open GeForce Experience (NVIDIA) or AMD Adrenalin",
      "Check for driver updates",
      'Select "Game Ready Driver" (not Studio)',
      "Perform a clean installation",
    ],
    applied: false,
  });

  recs.push({
    id: crypto.randomUUID(),
    title: "Optimize GPU Control Panel Settings",
    description:
      "Configure NVIDIA/AMD control panel for maximum competitive gaming performance: low latency, high refresh rate, optimal render settings.",
    category: "gpu",
    impact: "high",
    difficulty: "moderate",
    estimatedGain: "+10-25 FPS, lower input lag",
    steps: [
      "Open NVIDIA Control Panel → Manage 3D Settings",
      'Set "Low Latency Mode" to Ultra',
      'Set "Power management mode" to "Prefer maximum performance"',
      'Set "Texture filtering - Quality" to "High Performance"',
      'Disable "Vertical Sync" globally',
      'Set "Max Frame Rate" to your monitor refresh rate + 3',
    ],
    applied: false,
  });

  // RAM recommendations
  if (profile.ramGb && profile.ramGb < 32) {
    recs.push({
      id: crypto.randomUUID(),
      title: "Enable XMP/EXPO Memory Profile",
      description:
        "Your RAM likely runs below its rated speed by default. Enabling XMP/EXPO in BIOS unlocks full memory performance.",
      category: "ram",
      impact: "high",
      difficulty: "moderate",
      estimatedGain: "+5-15 FPS, faster load times",
      steps: [
        "Restart PC and enter BIOS (usually DEL or F2)",
        "Navigate to memory/overclocking settings",
        "Enable XMP (Intel) or EXPO (AMD) profile",
        "Save and exit BIOS",
        "Verify in Task Manager → Performance → Memory",
      ],
      applied: false,
    });
  }

  recs.push({
    id: crypto.randomUUID(),
    title: "Optimize Virtual Memory Settings",
    description:
      "Configure Windows page file for gaming: set a fixed size on your fastest drive to prevent stuttering.",
    category: "ram",
    impact: "medium",
    difficulty: "easy",
    estimatedGain: "Reduced stuttering",
    steps: [
      "Open System Properties → Advanced → Performance Settings",
      "Go to Advanced tab → Virtual Memory → Change",
      'Uncheck "Automatically manage paging file size"',
      "Set Initial and Maximum size to 1.5x your RAM (e.g., 24576 MB for 16GB RAM)",
      "Apply and restart",
    ],
    applied: false,
  });

  // Storage recommendations
  if (profile.storageType === "hdd") {
    recs.push({
      id: crypto.randomUUID(),
      title: "Migrate Games to SSD",
      description:
        "HDD storage severely limits load times and can cause texture streaming stutters. Moving games to an SSD is the single biggest quality-of-life upgrade.",
      category: "storage",
      impact: "critical",
      difficulty: "easy",
      estimatedGain: "50-80% faster load times",
      steps: [
        "Install games on your SSD (preferably NVMe)",
        "In Steam: right-click game → Properties → Local Files → Move Install Folder",
        "For other launchers: reinstall to SSD directory",
      ],
      applied: false,
    });
  }

  // OS recommendations
  recs.push({
    id: crypto.randomUUID(),
    title: "Disable Game Bar & Background Recording",
    description:
      "Windows Game Bar and background recording consume GPU resources even when not actively used.",
    category: "os",
    impact: "medium",
    difficulty: "easy",
    estimatedGain: "+3-8 FPS",
    steps: [
      "Open Windows Settings → Gaming → Game Bar → disable",
      'Go to Captures → disable "Record in the background"',
      'Disable "Xbox Game Bar" in Apps → Installed apps',
    ],
    applied: false,
  });

  recs.push({
    id: crypto.randomUUID(),
    title: "Disable Startup Bloatware",
    description:
      "Background applications consume RAM and CPU cycles. Disable non-essential startup programs.",
    category: "os",
    impact: "medium",
    difficulty: "easy",
    estimatedGain: "More available RAM, less background CPU usage",
    steps: [
      "Open Task Manager → Startup tab",
      "Disable non-essential applications (keep antivirus, GPU software)",
      "Common bloatware: Discord overlay, Spotify, OneDrive, Skype, Teams",
      "Right-click → Disable for each unnecessary entry",
    ],
    applied: false,
  });

  // Network recommendations
  recs.push({
    id: crypto.randomUUID(),
    title: "Optimize Network for Low Latency",
    description:
      "Reduce ping and network jitter by optimizing Windows network settings for competitive gaming.",
    category: "network",
    impact: "high",
    difficulty: "moderate",
    estimatedGain: "-5-20ms ping reduction",
    steps: [
      "Use Ethernet instead of Wi-Fi whenever possible",
      "Disable Nagle's Algorithm: set TcpNoDelay=1 in registry",
      'Disable "Auto-tuning": run "netsh interface tcp set global autotuninglevel=disabled"',
      "Set DNS to Cloudflare (1.1.1.1) or Google (8.8.8.8)",
      "Disable other devices streaming/downloading during matches",
    ],
    applied: false,
  });

  // Monitor recommendations
  if (profile.monitorRefreshRate && profile.monitorRefreshRate >= 144) {
    recs.push({
      id: crypto.randomUUID(),
      title: "Verify Monitor Running at Max Refresh Rate",
      description:
        "Many high-refresh monitors default to 60Hz in Windows. Verify your display settings.",
      category: "gpu",
      impact: "critical",
      difficulty: "easy",
      estimatedGain: `Unlock full ${profile.monitorRefreshRate}Hz experience`,
      steps: [
        "Right-click desktop → Display Settings → Advanced Display",
        `Verify refresh rate shows ${profile.monitorRefreshRate}Hz`,
        "If not, select it from the dropdown",
        "Also check in NVIDIA Control Panel → Change Resolution",
      ],
      applied: false,
    });
  }

  return recs;
}

/** Calcule les scores par catégorie basé sur les specs et recommandations */
function calculateScores(
  profile: typeof systemProfiles.$inferSelect,
  recommendations: Recommendation[],
) {
  let cpu = 70;
  let gpu = 70;
  let ram = 70;
  let storage = 70;
  let network = 65;

  // Ajustement selon RAM
  if (profile.ramGb) {
    if (profile.ramGb >= 32) ram = 90;
    else if (profile.ramGb >= 16) ram = 75;
    else if (profile.ramGb >= 8) ram = 55;
    else ram = 30;
  }

  // Ajustement selon stockage
  if (profile.storageType === "nvme") storage = 95;
  else if (profile.storageType === "ssd") storage = 80;
  else if (profile.storageType === "hdd") storage = 35;

  // Ajustement selon refresh rate
  if (profile.monitorRefreshRate) {
    if (profile.monitorRefreshRate >= 240) gpu += 10;
    else if (profile.monitorRefreshRate >= 144) gpu += 5;
  }

  // Pénalité pour les recommandations critiques/hautes non appliquées
  const criticalCount = recommendations.filter(
    (r) => r.impact === "critical" && !r.applied,
  ).length;
  const highCount = recommendations.filter(
    (r) => r.impact === "high" && !r.applied,
  ).length;

  const penalty = criticalCount * 8 + highCount * 3;
  const overall = Math.max(
    20,
    Math.min(
      100,
      Math.round((cpu + gpu + ram + storage + network) / 5 - penalty),
    ),
  );

  return {
    overall,
    cpu: Math.min(100, cpu),
    gpu: Math.min(100, gpu),
    ram: Math.min(100, ram),
    storage: Math.min(100, storage),
    network: Math.min(100, network),
  };
}

/** Analyse IA via xAI Grok */
import OpenAI from 'openai';

async function getAIAnalysis(profile: typeof systemProfiles.$inferSelect): Promise<string | null> {
  if (!process.env.XAI_API_KEY) return 'AI analysis skipped: No XAI_API_KEY provided.';
  try {
    const openai = new OpenAI({
      apiKey: process.env.XAI_API_KEY,
      baseURL: 'https://api.x.ai/v1',
    });

    const prompt = `You are an expert PC optimization specialist for competitive gaming. Analyze this gaming PC setup and provide a brief, actionable performance summary (3-4 sentences max).

System Specs:
- CPU: ${profile.cpu || "Unknown"}
- GPU: ${profile.gpu || "Unknown"}
- RAM: ${profile.ramGb || "Unknown"}GB
- Storage: ${profile.storageType || "Unknown"}
- Monitor: ${profile.monitorResolution || "Unknown"} @ ${profile.monitorRefreshRate || "Unknown"}Hz
- OS: ${profile.osVersion || "Unknown"}

Focus on: bottlenecks, the single most impactful upgrade, and whether this rig is competitive-ready.`;

    const response = await openai.chat.completions.create({
      model: "grok-4.6",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 150
    });

    return response.choices[0].message.content ?? null;
  } catch (error) {
    console.error("Grok error:", error);
    return null;
  }
}

