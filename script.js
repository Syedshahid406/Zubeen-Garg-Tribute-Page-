// ---------- Song data (alphabetical) ----------
// videoId: a verified, real YouTube video ID -> song plays INLINE on this
// page via an embedded player (no redirect).
// videoId: null -> could not confirm a single dedicated official upload
// (only appears inside a multi-song compilation video), so it falls back
// to opening a YouTube search in a new tab instead of embedding the wrong
// track.
const songs = [
  { title: "Aahe Ba Naahe", videoId: "U2RfRF1OgRU" },
  { title: "Aasin Aayang Mane Ki", videoId: "trXFdTHvNqc" },
  { title: "Abegey", videoId: "MwKhOI_YlSk" },
  { title: "Anuradha", videoId: "Yc4MBfMLENE" },
  { title: "Baahi Tumi", videoId: "X3a7eKxi8WA" },
  { title: "Endhar Hobo Nuware", videoId: "GiHjLyK-W-I" },
  { title: "Fagun", videoId: "yxlRmnK9EpE" },
  { title: "Ganane Ki Aane", videoId: "fvk0pfpMxTU" },
  { title: "Hiradoi", videoId: "kjTBmsg_ESg" },
  { title: "Janu Janu", videoId: "zrY2Mw8Zpaw" },
  { title: "Jodi Tumi Ketiyaba", videoId: "hm8gaPdqmMs" },
  { title: "Ki Naam Di Maatim", videoId: "Le3nece3kAM" },
  { title: "Kolia Meghe", videoId: "IZa5Vo8Jt6E" },
  { title: "Kun Tumi", videoId: "_w-wTRzp9JU" },
  { title: "Maya", videoId: "WTxoegRRkFY" },
  { title: "Mayabini Ratir Bukut", videoId: "AqUonMjxaog" },
  { title: "Nahor", videoId: "NXHlZbY7CWg" },
  { title: "Nila Nila Dusokute", videoId: "fmjlj99Dhu8" },
  { title: "Nishigandha", videoId: "v2Z2BzA1G5U" },
  { title: "Nodi Barhile", videoId: "YNK3KXeuh0c" },
  { title: "Pogola Pogola", videoId: "7StSzyA5xyY" },
  { title: "Protidine", videoId: "rAhgpCrYN4c" },
  { title: "Rodali Tumi", videoId: "O87s5hXjyr4" },
  { title: "Rong Diya Morom", videoId: "by93lpnjSOQ" },
  { title: "Rumaal", videoId: "aGl0HqoiqzI" },
  { title: "Tumi Dusokute", videoId: "Vv1SsPrG92g" },
  { title: "Zarou Pungni Somao", videoId: "wVcjtmSJSWQ" },
];

const songList = document.getElementById("songList");

songs.forEach((song, i) => {
  const card = document.createElement("div");
  card.className = "song-card";
  card.dataset.videoId = song.videoId || "";
  card.innerHTML = `
    <span class="song-index">${String(i + 1).padStart(2, "0")}</span>
    <button class="song-play" aria-label="Play ${song.title}">▶</button>
    <div class="song-info">
      <h4>${song.title}</h4>
      <p>Zubeen Garg${song.videoId ? "" : " · opens on YouTube"}</p>
    </div>
    <div class="song-bars">
      <span></span><span></span><span></span><span></span>
    </div>
    <div class="song-player"></div>
  `;
  songList.appendChild(card);
});

songList.addEventListener("click", (e) => {
  const btn = e.target.closest(".song-play");
  if (!btn) return;
  const card = btn.closest(".song-card");
  const title = card.querySelector("h4").textContent;
  const videoId = card.dataset.videoId;
  const isPlaying = card.classList.contains("is-playing");

  // Close any other open player first
  document.querySelectorAll(".song-card.is-playing").forEach((c) => {
    c.classList.remove("is-playing");
    c.querySelector(".song-play").textContent = "▶";
    c.querySelector(".song-player").innerHTML = "";
  });

  if (isPlaying) return; // it was already open -> just closed it above

  if (videoId) {
    // Real, verified video -> embed and play right here on the page.
    card.classList.add("is-playing");
    btn.textContent = "❚❚";
    const player = card.querySelector(".song-player");
    player.innerHTML = `<iframe
      src="https://www.youtube.com/embed/${videoId}?autoplay=1&playsinline=1"
      referrerpolicy="strict-origin-when-cross-origin"
      title="${title} player"
      allow="autoplay; encrypted-media"
      allowfullscreen
      loading="lazy"></iframe>
      <a class="yt-fallback" href="https://www.youtube.com/watch?v=${videoId}" target="_blank" rel="noopener">Not playing? Watch on YouTube ↗</a>`;
  } else {
    // Not yet verified -> fall back to a real YouTube search in a new tab
    // rather than embed a guessed/incorrect video.
    const query = encodeURIComponent(`${title} Zubeen Garg`);
    window.open(`https://www.youtube.com/results?search_query=${query}`, "_blank", "noopener");
  }
});

// ---------- Mobile nav toggle ----------
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("open");
});

navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => navLinks.classList.remove("open"));
});
