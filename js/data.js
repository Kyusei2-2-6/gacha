// ═══════════════════════════════════════════════
//  CHARACTER DATA
// ═══════════════════════════════════════════════

const CHARACTERS = [
  // ── SSR Characters ──────────────────────────
  {
    id: "ssr_01",
    name: "Seraphiel",
    rarity: "SSR",
    element: "Light",
    role: "Healer",
    color: "#fff8e1",
    avatar: null,
    description: "Archangel of the Sacred Flame"
  },
  {
    id: "ssr_02",
    name: "Voidmancer Kael",
    rarity: "SSR",
    element: "Dark",
    role: "Mage",
    color: "#1a0533",
    avatar: null,
    description: "Sorcerer of the Abyssal Rift"
  },
  {
    id: "ssr_03",
    name: "Blazewing Ryuu",
    rarity: "SSR",
    element: "Fire",
    role: "Warrior",
    color: "#ff3d00",
    avatar: null,
    description: "Dragon Knight of Eternal Ember"
  },
  {
    id: "ssr_04",
    name: "Lunara",
    rarity: "SSR",
    element: "Water",
    role: "Mage",
    color: "#0d47a1",
    avatar: null,
    description: "Tide Empress of the Azure Moon"
  },
  {
    id: "ssr_05",
    name: "Stormcaller Zephyr",
    rarity: "SSR",
    element: "Wind",
    role: "Archer",
    color: "#1b5e20",
    avatar: null,
    description: "Herald of the Tempest Peaks"
  },

  // ── SR Characters ───────────────────────────
  {
    id: "sr_01",
    name: "Ironclaw Dante",
    rarity: "SR",
    element: "Fire",
    role: "Warrior",
    color: "#bf360c",
    avatar: null,
    description: "Knight of the Crimson Forge"
  },
  {
    id: "sr_02",
    name: "Sylvara",
    rarity: "SR",
    element: "Wind",
    role: "Ranger",
    color: "#2e7d32",
    avatar: null,
    description: "Scout of the Whispering Forest"
  },
  {
    id: "sr_03",
    name: "Glacius",
    rarity: "SR",
    element: "Water",
    role: "Tank",
    color: "#01579b",
    avatar: null,
    description: "Guardian of the Frozen Citadel"
  },
  {
    id: "sr_04",
    name: "Shadowblade Nyx",
    rarity: "SR",
    element: "Dark",
    role: "Assassin",
    color: "#4a148c",
    avatar: null,
    description: "Phantom of the Night Veil"
  },
  {
    id: "sr_05",
    name: "Aurantia",
    rarity: "SR",
    element: "Light",
    role: "Support",
    color: "#e65100",
    avatar: null,
    description: "Priestess of the Golden Dawn"
  },
  {
    id: "sr_06",
    name: "Thunderax",
    rarity: "SR",
    element: "Wind",
    role: "Warrior",
    color: "#33691e",
    avatar: null,
    description: "Berserker of the Storm Plains"
  },
  {
    id: "sr_07",
    name: "Moonshard Lyra",
    rarity: "SR",
    element: "Light",
    role: "Mage",
    color: "#880e4f",
    avatar: null,
    description: "Astromancer of the Silver Comet"
  },

  // ── R Characters ────────────────────────────
  {
    id: "r_01",
    name: "Emberpaw",
    rarity: "R",
    element: "Fire",
    role: "Warrior",
    color: "#e64a19",
    avatar: null,
    description: "Novice of the Flame Guild"
  },
  {
    id: "r_02",
    name: "Breezefoot",
    rarity: "R",
    element: "Wind",
    role: "Scout",
    color: "#388e3c",
    avatar: null,
    description: "Wanderer of the Open Skies"
  },
  {
    id: "r_03",
    name: "Tideclaw",
    rarity: "R",
    element: "Water",
    role: "Fighter",
    color: "#0288d1",
    avatar: null,
    description: "Fisher of the Storm Coast"
  },
  {
    id: "r_04",
    name: "Gloomstep",
    rarity: "R",
    element: "Dark",
    role: "Rogue",
    color: "#6a1b9a",
    avatar: null,
    description: "Drifter of the Shadow Lanes"
  },
  {
    id: "r_05",
    name: "Dawnpetal",
    rarity: "R",
    element: "Light",
    role: "Healer",
    color: "#f9a825",
    avatar: null,
    description: "Apprentice of the Holy Order"
  },
  {
    id: "r_06",
    name: "Stonewall Brom",
    rarity: "R",
    element: "Wind",
    role: "Tank",
    color: "#546e7a",
    avatar: null,
    description: "Mercenary of the Broken Wall"
  },
  {
    id: "r_07",
    name: "Ashpike",
    rarity: "R",
    element: "Fire",
    role: "Lancer",
    color: "#d84315",
    avatar: null,
    description: "Soldier of the Cinder March"
  },
  {
    id: "r_08",
    name: "Frostwhisper",
    rarity: "R",
    element: "Water",
    role: "Mage",
    color: "#1565c0",
    avatar: null,
    description: "Apprentice of the Ice Sanctum"
  }
];

// Pull rates
const RATES = {
  SSR: 0.006,  // 0.6%
  SR:  0.057,  // 5.7% (adjusted so total = 100%)
  R:   0.937   // 93.7%
};

// Gem costs
const COSTS = {
  PULL_1:  160,
  PULL_10: 1600
};

// Pity threshold
const PITY_LIMIT = 90;

// Starting gems
const STARTING_GEMS = 6400;

// Element config (icon + color)
const ELEMENTS = {
  Fire:  { icon: "🔥", color: "#ff6b35", glow: "#ff4500" },
  Water: { icon: "💧", color: "#4fc3f7", glow: "#0288d1" },
  Wind:  { icon: "🌿", color: "#81c784", glow: "#388e3c" },
  Light: { icon: "✨", color: "#fff176", glow: "#f9a825" },
  Dark:  { icon: "🌑", color: "#ce93d8", glow: "#7b1fa2" }
};
