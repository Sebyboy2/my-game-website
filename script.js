const games = [
  {id:"demo",title:"Neon Dodge",category:"arcade",icon:"⚡",description:"Dodge the falling blocks.",url:"games/demo/index.html"},
  {id:"orbit",title:"Orbit Puzzle",category:"puzzle",icon:"🪐",description:"Match the planets.",url:"games/demo/index.html"},
  {id:"pixel",title:"Pixel Arena",category:"action",icon:"👾",description:"A tiny action demo.",url:"games/demo/index.html"},
  {id:"runner",title:"Sky Runner",category:"arcade",icon:"🚀",description:"Run through the clouds.",url:"games/demo/index.html"},
  {id:"blocks",title:"Block Lab",category:"puzzle",icon:"🧩",description:"Build and solve.",url:"games/demo/index.html"},
  {id:"nova",title:"Nova Strike",category:"action",icon:"💫",description:"Fast-paced arcade action.",url:"games/demo/index.html"},
    {
  id: "polytrack",
  title: "PolyTrack",
  category: "arcade",
  icon: "🏎️",
  description: "Race through tracks in PolyTrack.",
  url: "games/polytrack/index.html"
}
];

let filter = "all";
let favorites = JSON.parse(localStorage.getItem("gamehub-favorites") || "[]");

const grid = document.querySelector("#grid");
const empty = document.querySelector("#empty");
const search = document.querySelector("#search");

function render(){
  const q = search.value.trim().toLowerCase();
  const visible = games.filter(g =>
    (filter === "all" || (filter === "favorites" ? favorites.includes(g.id) : g.category === filter)) &&
    (!q || `${g.title} ${g.category} ${g.description}`.toLowerCase().includes(q))
  );
  grid.innerHTML = visible.map(g => `
    <article class="card">
      <a href="${g.url}">
        <div class="thumb" aria-label="${g.title} thumbnail">${g.icon}</div>
      </a>
      <div class="card-body">
        <div class="title-row">
          <a class="title" href="${g.url}">${g.title}</a>
          <button class="star ${favorites.includes(g.id) ? "on" : ""}" data-id="${g.id}" aria-label="Favorite ${g.title}">
            ${favorites.includes(g.id) ? "★" : "☆"}
          </button>
        </div>
        <div class="meta">${g.category} · ${g.description}</div>
      </div>
    </article>
  `).join("");
  empty.classList.toggle("hidden", visible.length !== 0);
}

function setFilter(next){
  filter = next;
  document.querySelectorAll(".tab").forEach(t => t.classList.toggle("active", t.dataset.filter === next));
  render();
}

document.querySelectorAll(".tab").forEach(t => t.addEventListener("click", () => setFilter(t.dataset.filter)));
search.addEventListener("input", render);
document.querySelector("#favoritesBtn").addEventListener("click", () => setFilter("favorites"));
document.querySelector("#randomBtn").addEventListener("click", () => {
  const pool = games.filter(g => filter === "all" || filter === "favorites" ? true : g.category === filter);
  if (pool.length) location.href = pool[Math.floor(Math.random() * pool.length)].url;
});

grid.addEventListener("click", e => {
  const button = e.target.closest(".star");
  if (!button) return;
  e.preventDefault();
  e.stopPropagation();
  const id = button.dataset.id;
  favorites = favorites.includes(id) ? favorites.filter(x => x !== id) : [...favorites, id];
  localStorage.setItem("gamehub-favorites", JSON.stringify(favorites));
  render();
});

render();
