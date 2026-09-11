const games = [
  {
    id: "polytrack",
    title: "PolyTrack",
    category: "arcade",
    emoji: "🏎️",
    description: "Race through colorful 3D tracks.",
    url: "games/polytrack/index.html"
  },
  {
    id: "rope-police",
    title: "Amazing Strange Rope Police",
    category: "action",
    emoji: "🚓",
    description: "Explore the city in this superhero-style game.",
    url: "games/rope-police/index.html"
  }
];

const grid = document.getElementById("grid");
const search = document.getElementById("search");
const randomBtn = document.getElementById("random");

let currentCategory = "all";
let favorites = JSON.parse(localStorage.getItem("favorites") || "[]");

function renderGames() {
  const query = search.value.toLowerCase().trim();

  const filtered = games.filter(game => {
    const matchesCategory =
      currentCategory === "all" ||
      (currentCategory === "favorites" && favorites.includes(game.id)) ||
      game.category === currentCategory;

    const matchesSearch =
      game.title.toLowerCase().includes(query) ||
      game.description.toLowerCase().includes(query);

    return matchesCategory && matchesSearch;
  });

  grid.innerHTML = "";

  if (filtered.length === 0) {
    grid.innerHTML = "<p>No games found.</p>";
    return;
  }

  filtered.forEach(game => {
    const card = document.createElement("div");
    card.className = "game-card";

    const isFavorite = favorites.includes(game.id);

    card.innerHTML = `
      <div class="game-icon">${game.emoji}</div>
      <div class="game-info">
        <h3>${game.title}</h3>
        <p>${game.description}</p>
        <span class="category">${game.category}</span>
      </div>
      <div class="game-actions">
        <a class="play-btn" href="${game.url}">Play</a>
        <button class="favorite-btn" data-id="${game.id}">
          ${isFavorite ? "★" : "☆"}
        </button>
      </div>
    `;

    grid.appendChild(card);
  });

  document.querySelectorAll(".favorite-btn").forEach(button => {
    button.addEventListener("click", () => {
      const id = button.dataset.id;

      if (favorites.includes(id)) {
        favorites = favorites.filter(item => item !== id);
      } else {
        favorites.push(id);
      }

      localStorage.setItem("favorites", JSON.stringify(favorites));
      renderGames();
    });
  });
}

document.querySelectorAll(".tab").forEach(tab => {
  tab.addEventListener("click", () => {
    document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
    tab.classList.add("active");

    currentCategory = tab.dataset.category;
    renderGames();
  });
});

search.addEventListener("input", renderGames);

randomBtn.addEventListener("click", () => {
  const game = games[Math.floor(Math.random() * games.length)];
  window.location.href = game.url;
});

renderGames();
