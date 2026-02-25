// ========= Projects data (MODIFIE ICI) =========
const projects = [
  {
    title: "Predictive Maintenance — Aéronautique (Casse outillages)",
    tag: "predictive",
    summary: "Modélisation du risque de casse + exploration facteurs (site, client, catégorie) pour guider maintenance et stock.",
    methods: ["Random Forest", "GLM", "Feature engineering", "Metrics"],
    impact: "Priorisation des risques + meilleure visibilité sur les causes et la récurrence.",
    links: {
      code: "https://github.com/",
      demo: ""
    }
  },
  {
    title: "NLP — Extraction pièces cassées depuis logs techniques",
    tag: "nlp",
    summary: "Pipeline spaCy/Transformers pour extraire PART/ACTION/OBS/QTY dans des descriptions de réparation.",
    methods: ["spaCy", "xlm-roberta", "NER", "Evaluation"],
    impact: "Transformation de texte brut en variables structurées pour analyses + prédiction.",
    links: {
      code: "https://github.com/",
      demo: ""
    }
  },
  {
    title: "Séries temporelles — Prévision demandes SAV",
    tag: "predictive",
    summary: "Démarche complète : nettoyage, décomposition, stationnarité, modélisation SARIMA, validation, prévision.",
    methods: ["SARIMA", "Stationarity", "Backtesting"],
    impact: "Aide à anticiper la charge et planifier les ressources.",
    links: {
      code: "https://github.com/",
      demo: ""
    }
  },
  {
    title: "Pricing — Marine Liability (Actuariat)",
    tag: "risk",
    summary: "Cadre ratemaking : fréquence/sévérité, experience rating, hypothèses, recommandations de prime.",
    methods: ["Frequency-Severity", "GLM", "Experience rating"],
    impact: "Base technique claire pour tarification et pilotage du risque.",
    links: {
      code: "https://github.com/",
      demo: ""
    }
  },
  {
    title: "Power BI — Dashboard qualité & suivi SAV",
    tag: "bi",
    summary: "KPIs, filtres, tendances, segments (site/région/client) pour lecture rapide par les équipes.",
    methods: ["Power BI", "DAX", "Storytelling"],
    impact: "Décision plus rapide et alignement des équipes sur les priorités.",
    links: {
      code: "",
      demo: ""
    }
  }
];

// ========= UI =========
const grid = document.getElementById("projectsGrid");
const pills = document.querySelectorAll(".pill");
const searchInput = document.getElementById("searchInput");
const yearEl = document.getElementById("year");
const statProjects = document.getElementById("statProjects");
const themeBtn = document.getElementById("themeBtn");

yearEl.textContent = new Date().getFullYear();
statProjects.textContent = String(projects.length);

let activeFilter = "all";
let query = "";

function tagLabel(tag){
  const map = {
    predictive: "Prédictif",
    nlp: "NLP",
    risk: "Risk/Actuariat",
    bi: "Power BI"
  };
  return map[tag] || tag;
}

function render(){
  const q = query.trim().toLowerCase();

  const filtered = projects.filter(p => {
    const okFilter = (activeFilter === "all") || (p.tag === activeFilter);
    const hay = (p.title + " " + p.summary + " " + p.methods.join(" ") + " " + p.impact).toLowerCase();
    const okSearch = !q || hay.includes(q);
    return okFilter && okSearch;
  });

  grid.innerHTML = filtered.map(p => `
    <article class="card glass project">
      <div class="proj-top">
        <span class="tag mono">${tagLabel(p.tag)}</span>
        <span class="tag mono">Case study</span>
      </div>

      <h3 class="proj-title">${escapeHtml(p.title)}</h3>
      <p class="proj-desc">${escapeHtml(p.summary)}</p>

      <div class="proj-meta">
        ${p.methods.slice(0,4).map(m => `<span class="meta mono">${escapeHtml(m)}</span>`).join("")}
      </div>

      <p class="proj-desc" style="margin-top:10px;">
        <span class="mono">Impact:</span> ${escapeHtml(p.impact)}
      </p>

      <div class="proj-actions">
        ${p.links.code ? `<a class="link" target="_blank" rel="noreferrer" href="${p.links.code}">Code</a>` : ""}
        ${p.links.demo ? `<a class="link secondary" target="_blank" rel="noreferrer" href="${p.links.demo}">Demo</a>` : ""}
      </div>
    </article>
  `).join("");

  if(filtered.length === 0){
    grid.innerHTML = `<div class="card glass" style="padding:16px;">
      <p class="muted">Aucun projet ne correspond à ce filtre / recherche.</p>
    </div>`;
  }
}

function escapeHtml(str){
  return String(str)
    .replaceAll("&","&amp;")
    .replaceAll("<","&lt;")
    .replaceAll(">","&gt;")
    .replaceAll('"',"&quot;")
    .replaceAll("'","&#039;");
}

// Filters
pills.forEach(btn => {
  btn.addEventListener("click", () => {
    pills.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    activeFilter = btn.dataset.filter;
    render();
  });
});

// Search
searchInput.addEventListener("input", (e) => {
  query = e.target.value || "";
  render();
});

// Theme toggle (simple)
let alt = false;
themeBtn.addEventListener("click", () => {
  alt = !alt;
  document.documentElement.style.setProperty("--bg", alt ? "#06050D" : "#070A12");
  document.documentElement.style.setProperty("--bg2", alt ? "#050612" : "#050812");
  document.documentElement.style.setProperty("--neon1", alt ? "#FF2BD6" : "#7C3AED");
  document.documentElement.style.setProperty("--neon2", alt ? "#00FFA8" : "#22D3EE");
  document.documentElement.style.setProperty("--neon3", alt ? "#FFD000" : "#A3FF12");
});

// Typing effect
const typeTarget = document.getElementById("typeTarget");
const phrases = [
  "un projet prédictif maintenance + NLP 💫",
  "un dashboard Power BI orienté décision",
  "un modèle risk/actuariat (pricing) data-driven",
  "un portfolio prêt recruteur (case studies)"
];
let pi = 0, ci = 0, deleting = false;

function tick(){
  const current = phrases[pi];
  if(!deleting){
    ci++;
    typeTarget.textContent = current.slice(0, ci);
    if(ci >= current.length){
      deleting = true;
      setTimeout(tick, 900);
      return;
    }
  }else{
    ci--;
    typeTarget.textContent = current.slice(0, ci);
    if(ci <= 0){
      deleting = false;
      pi = (pi + 1) % phrases.length;
    }
  }
  setTimeout(tick, deleting ? 25 : 45);
}

render();
tick();