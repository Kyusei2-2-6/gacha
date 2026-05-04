// ═══════════════════════════════════════════════
//  GACHA ENGINE
// ═══════════════════════════════════════════════

const GachaEngine = (() => {

  // ── State ────────────────────────────────────
  let state = {
    gems:       STARTING_GEMS,
    pullCount:  0,        // total pulls ever
    pityCount:  0,        // pulls since last SSR
    inventory:  {},       // { charId: count }
    history:    []        // [ { char, timestamp } ]
  };

  // ── Persistence ──────────────────────────────
  function save() {
    localStorage.setItem("gacha_state", JSON.stringify(state));
  }

  function load() {
    const raw = localStorage.getItem("gacha_state");
    if (raw) {
      try {
        state = { ...state, ...JSON.parse(raw) };
      } catch (e) {
        console.warn("Failed to parse saved state, resetting.");
        reset(false);
      }
    }
  }

  function reset(notify = true) {
    state = {
      gems:      STARTING_GEMS,
      pullCount:  0,
      pityCount:  0,
      inventory:  {},
      history:    []
    };
    save();
    if (notify) document.dispatchEvent(new CustomEvent("gacha:reset"));
  }

  // ── Core Roll ────────────────────────────────
  function rollRarity(forcedSSR = false) {
    if (forcedSSR) return "SSR";
    const rand = Math.random();
    if (rand < RATES.SSR) return "SSR";
    if (rand < RATES.SSR + RATES.SR) return "SR";
    return "R";
  }

  function pickCharacter(rarity) {
    const pool = CHARACTERS.filter(c => c.rarity === rarity);
    return pool[Math.floor(Math.random() * pool.length)];
  }

  function processPull(char) {
    const isNew = !state.inventory[char.id];
    if (!state.inventory[char.id]) state.inventory[char.id] = 0;
    state.inventory[char.id]++;

    const entry = {
      char,
      count: state.inventory[char.id],
      isNew,
      timestamp: Date.now()
    };
    state.history.unshift(entry);
    if (state.history.length > 200) state.history.pop();

    return entry;
  }

  function singleRoll() {
    state.pityCount++;
    state.pullCount++;

    const forcedSSR = state.pityCount >= PITY_LIMIT;
    const rarity = rollRarity(forcedSSR);
    if (rarity === "SSR") state.pityCount = 0;

    const char = pickCharacter(rarity);
    return processPull(char);
  }

  // ── Public API ───────────────────────────────
  function pull(count) {
    const cost = count === 1 ? COSTS.PULL_1 : COSTS.PULL_10;
    if (state.gems < cost) return null;

    state.gems -= cost;

    const results = [];
    for (let i = 0; i < count; i++) {
      results.push(singleRoll());
    }

    save();
    return results;
  }

  function addGems(amount) {
    state.gems += amount;
    save();
    document.dispatchEvent(new CustomEvent("gacha:gemsAdded", { detail: { amount } }));
  }

  function getState() { return { ...state }; }
  function getInventory() { return { ...state.inventory }; }
  function getHistory() { return [...state.history]; }
  function getPityProgress() { return state.pityCount; }

  return { load, reset, pull, addGems, getState, getInventory, getHistory, getPityProgress };
})();
