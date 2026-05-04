// ═══════════════════════════════════════════════
//  MAIN UI CONTROLLER
// ═══════════════════════════════════════════════

document.addEventListener("DOMContentLoaded", () => {
  GachaEngine.load();

  // ── DOM Refs ────────────────────────────────
  const gemCount    = document.getElementById("gem-count");
  const pullCount   = document.getElementById("pull-count");
  const pityBar     = document.getElementById("pity-bar");
  const pityText    = document.getElementById("pity-text");
  const btn1        = document.getElementById("btn-pull1");
  const btn10       = document.getElementById("btn-pull10");
  const btnGems     = document.getElementById("btn-add-gems");
  const btnReset    = document.getElementById("btn-reset");
  const overlay     = document.getElementById("result-overlay");
  const resultGrid  = document.getElementById("result-grid");
  const btnClose    = document.getElementById("btn-close-result");
  const tabBtns     = document.querySelectorAll(".tab-btn");
  const tabPanels   = document.querySelectorAll(".tab-panel");
  const inventoryEl = document.getElementById("inventory-grid");
  const historyEl   = document.getElementById("history-list");

  updateHUD();
  renderInventory();
  renderHistory();

  // ── HUD Update ──────────────────────────────
  function updateHUD() {
    const s = GachaEngine.getState();
    gemCount.textContent  = s.gems.toLocaleString();
    pullCount.textContent = s.pullCount;

    const pity = GachaEngine.getPityProgress();
    const pct  = Math.min((pity / PITY_LIMIT) * 100, 100);
    pityBar.style.width   = pct + "%";
    pityText.textContent  = pity + " / " + PITY_LIMIT;

    // Disable pull buttons if not enough gems
    btn1.disabled  = s.gems < COSTS.PULL_1;
    btn10.disabled = s.gems < COSTS.PULL_10;
    btn1.classList.toggle("disabled",  btn1.disabled);
    btn10.classList.toggle("disabled", btn10.disabled);
  }

  // ── Card Builder ─────────────────────────────
  function buildCard(entry, delay = 0) {
    const { char, isNew, count } = entry;
    const el    = ELEMENTS[char.element] || { icon: "❓", color: "#aaa", glow: "#aaa" };
    const card  = document.createElement("div");
    card.className = `char-card rarity-${char.rarity}`;
    card.style.animationDelay = delay + "ms";

    const stars = "★".repeat(char.rarity === "SSR" ? 5 : char.rarity === "SR" ? 4 : 3);

    card.innerHTML = `
      <div class="card-shine"></div>
      <div class="card-avatar" style="--elem-glow:${el.glow}">
        ${buildAvatarSVG(char)}
      </div>
      <div class="card-body">
        <div class="card-name">${char.name}</div>
        <div class="card-stars">${stars}</div>
        <div class="card-meta">
          <span class="elem-badge" style="background:${el.color}20;border-color:${el.color};color:${el.color}">
            ${el.icon} ${char.element}
          </span>
          <span class="role-badge">${char.role}</span>
        </div>
        <div class="card-status ${isNew ? "status-new" : "status-dupe"}">
          ${isNew ? "✦ NEW" : `⟳ DUPE ×${count}`}
        </div>
      </div>
    `;
    return card;
  }

  // ── SVG Avatar ───────────────────────────────
  function buildAvatarSVG(char) {
    const el = ELEMENTS[char.element] || { color: "#aaa", glow: "#aaa" };
    const r  = char.rarity;
    const bg = r === "SSR" ? `url(#ssrGrad_${char.id})` :
               r === "SR"  ? `url(#srGrad_${char.id})`  : `url(#rGrad_${char.id})`;

    // pick a silhouette shape by id hash
    const hash  = char.id.split("").reduce((a, c) => a + c.charCodeAt(0), 0);
    const shape = hash % 5;

    const silhouettes = [
      // Mage
      `<ellipse cx="80" cy="55" rx="18" ry="22" fill="rgba(255,255,255,0.25)"/>
       <rect x="62" y="75" width="36" height="50" rx="6" fill="rgba(255,255,255,0.2)"/>
       <polygon points="70,75 90,75 96,110 64,110" fill="rgba(255,255,255,0.1)"/>
       <line x1="80" y1="55" x2="80" y2="25" stroke="rgba(255,255,255,0.5)" stroke-width="2"/>
       <circle cx="80" cy="22" r="5" fill="${el.color}" opacity="0.9"/>`,
      // Warrior
      `<ellipse cx="80" cy="52" rx="16" ry="20" fill="rgba(255,255,255,0.25)"/>
       <rect x="60" y="70" width="40" height="55" rx="4" fill="rgba(255,255,255,0.2)"/>
       <rect x="46" y="70" width="14" height="30" rx="3" fill="rgba(255,255,255,0.15)"/>
       <rect x="100" y="70" width="14" height="30" rx="3" fill="rgba(255,255,255,0.15)"/>`,
      // Archer
      `<ellipse cx="80" cy="50" rx="15" ry="19" fill="rgba(255,255,255,0.25)"/>
       <rect x="64" y="67" width="32" height="45" rx="5" fill="rgba(255,255,255,0.2)"/>
       <path d="M95 45 Q110 55 95 65" stroke="rgba(255,255,255,0.6)" stroke-width="2" fill="none"/>
       <line x1="95" y1="45" x2="95" y2="65" stroke="rgba(255,255,255,0.5)" stroke-width="1.5"/>
       <line x1="88" y1="55" x2="112" y2="55" stroke="rgba(255,255,255,0.7)" stroke-width="1.5"/>`,
      // Healer
      `<ellipse cx="80" cy="52" rx="16" ry="20" fill="rgba(255,255,255,0.25)"/>
       <rect x="62" y="70" width="36" height="48" rx="8" fill="rgba(255,255,255,0.2)"/>
       <path d="M72 86 h8 v-8 h8 v8 h8 v8 h-8 v8 h-8 v-8 h-8 z" fill="${el.color}" opacity="0.6"/>`,
      // Assassin
      `<ellipse cx="80" cy="50" rx="14" ry="18" fill="rgba(255,255,255,0.25)"/>
       <path d="M66 68 Q80 63 94 68 L98 125 H62 Z" fill="rgba(255,255,255,0.2)"/>
       <path d="M74 60 Q80 72 86 60" stroke="rgba(255,255,255,0.5)" stroke-width="1.5" fill="none"/>
       <line x1="60" y1="80" x2="50" y2="100" stroke="rgba(255,255,255,0.5)" stroke-width="2"/>
       <line x1="100" y1="80" x2="110" y2="100" stroke="rgba(255,255,255,0.5)" stroke-width="2"/>`
    ];

    return `<svg viewBox="0 0 160 130" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="ssrGrad_${char.id}" cx="50%" cy="40%" r="60%">
      <stop offset="0%" stop-color="${el.glow}" stop-opacity="0.9"/>
      <stop offset="100%" stop-color="#1a0000"/>
    </radialGradient>
    <radialGradient id="srGrad_${char.id}" cx="50%" cy="40%" r="60%">
      <stop offset="0%" stop-color="${el.glow}" stop-opacity="0.7"/>
      <stop offset="100%" stop-color="#0d1a2a"/>
    </radialGradient>
    <radialGradient id="rGrad_${char.id}" cx="50%" cy="40%" r="60%">
      <stop offset="0%" stop-color="${el.glow}" stop-opacity="0.4"/>
      <stop offset="100%" stop-color="#0a0a14"/>
    </radialGradient>
  </defs>
  <rect width="160" height="130" fill="${bg}"/>
  ${silhouettes[shape]}
</svg>`;
  }

  // ── Pull Flow ────────────────────────────────
  function doPull(count) {
    const results = GachaEngine.pull(count);
    if (!results) {
      shakeGems();
      return;
    }

    updateHUD();

    // Sort: SSR first, then SR, then R
    const order = { SSR: 0, SR: 1, R: 2 };
    results.sort((a, b) => order[a.char.rarity] - order[b.char.rarity]);

    showResults(results);
    renderInventory();
    renderHistory();
  }

  function shakeGems() {
    const el = document.getElementById("gem-display");
    el.classList.remove("shake");
    void el.offsetWidth;
    el.classList.add("shake");
    setTimeout(() => el.classList.remove("shake"), 600);
  }

  // ── Result Overlay ───────────────────────────
  function showResults(results) {
    resultGrid.innerHTML = "";
    overlay.classList.add("active");
    document.body.style.overflow = "hidden";

    // Stagger cards
    results.forEach((entry, i) => {
      const card = buildCard(entry, i * 120);
      resultGrid.appendChild(card);
    });

    // SSR flash effect
    const hasSSR = results.some(r => r.char.rarity === "SSR");
    if (hasSSR) {
      overlay.classList.add("ssr-flash");
      setTimeout(() => overlay.classList.remove("ssr-flash"), 800);
    }
  }

  btnClose.addEventListener("click", () => {
    overlay.classList.remove("active");
    document.body.style.overflow = "";
  });

  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) {
      overlay.classList.remove("active");
      document.body.style.overflow = "";
    }
  });

  // ── Buttons ──────────────────────────────────
  btn1.addEventListener("click",  () => doPull(1));
  btn10.addEventListener("click", () => doPull(10));

  btnGems.addEventListener("click", () => {
    GachaEngine.addGems(3200);
    updateHUD();
    sparkleGems();
  });

  btnReset.addEventListener("click", () => {
    if (confirm("Reset semua data? (gem, inventory, history) Action ini tidak bisa dibatalkan.")) {
      GachaEngine.reset();
      updateHUD();
      renderInventory();
      renderHistory();
    }
  });

  function sparkleGems() {
    const el = document.getElementById("gem-display");
    el.classList.remove("sparkle");
    void el.offsetWidth;
    el.classList.add("sparkle");
    setTimeout(() => el.classList.remove("sparkle"), 800);
  }

  // ── Tabs ─────────────────────────────────────
  tabBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      tabBtns.forEach(b => b.classList.remove("active"));
      tabPanels.forEach(p => p.classList.remove("active"));
      btn.classList.add("active");
      document.getElementById("tab-" + btn.dataset.tab).classList.add("active");
    });
  });

  // ── Inventory Render ─────────────────────────
  function renderInventory() {
    const inv = GachaEngine.getInventory();
    inventoryEl.innerHTML = "";

    if (Object.keys(inv).length === 0) {
      inventoryEl.innerHTML = `<p class="empty-msg">No characters yet.<br>Start pulling!</p>`;
      return;
    }

    // Sort by rarity
    const order = { SSR: 0, SR: 1, R: 2 };
    const sorted = CHARACTERS
      .filter(c => inv[c.id])
      .sort((a, b) => order[a.rarity] - order[b.rarity]);

    sorted.forEach(char => {
      const count = inv[char.id] || 0;
      const el    = ELEMENTS[char.element] || { icon: "❓", color: "#aaa" };
      const stars = "★".repeat(char.rarity === "SSR" ? 5 : char.rarity === "SR" ? 4 : 3);

      const item = document.createElement("div");
      item.className = `inv-item rarity-${char.rarity}`;
      item.innerHTML = `
        <div class="inv-avatar">${buildAvatarSVG(char)}</div>
        <div class="inv-name">${char.name}</div>
        <div class="inv-stars">${stars}</div>
        <div class="inv-elem" style="color:${el.color}">${el.icon} ${char.element}</div>
        ${count > 1 ? `<div class="inv-count">×${count}</div>` : ""}
      `;
      inventoryEl.appendChild(item);
    });
  }

  // ── History Render ───────────────────────────
  function renderHistory() {
    const hist = GachaEngine.getHistory();
    historyEl.innerHTML = "";

    if (hist.length === 0) {
      historyEl.innerHTML = `<p class="empty-msg">No pull history yet.</p>`;
      return;
    }

    hist.slice(0, 100).forEach(entry => {
      const { char, isNew, timestamp } = entry;
      const el   = ELEMENTS[char.element] || { icon: "❓", color: "#aaa" };
      const time = new Date(timestamp).toLocaleTimeString();

      const row = document.createElement("div");
      row.className = `hist-row rarity-${char.rarity}`;
      row.innerHTML = `
        <div class="hist-rarity rarity-dot-${char.rarity}">${char.rarity}</div>
        <div class="hist-info">
          <span class="hist-name">${char.name}</span>
          <span class="hist-elem" style="color:${el.color}">${el.icon}</span>
        </div>
        <div class="hist-status ${isNew ? "status-new" : "status-dupe"}">${isNew ? "NEW" : "DUPE"}</div>
        <div class="hist-time">${time}</div>
      `;
      historyEl.appendChild(row);
    });
  }

  // ── Event Listeners ──────────────────────────
  document.addEventListener("gacha:reset", () => {
    updateHUD();
    renderInventory();
    renderHistory();
  });

  document.addEventListener("gacha:gemsAdded", updateHUD);
});
