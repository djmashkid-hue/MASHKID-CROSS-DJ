const decks = {};
for (const id of ["A","B"]) {
  const media = document.getElementById("media"+id);
  const file = document.getElementById("file"+id);
  const empty = document.getElementById("empty"+id);
  file.addEventListener("change", () => {
    const chosen = file.files[0];
    if (!chosen) return;
    if (media.dataset.url) URL.revokeObjectURL(media.dataset.url);
    const url = URL.createObjectURL(chosen);
    media.dataset.url = url;
    media.src = url;
    media.style.display = "block";
    empty.style.display = "none";
    document.getElementById("name"+id).textContent = chosen.name;
    media.load();
  });
  document.getElementById("play"+id).onclick = () => media.play().catch(()=>{});
  document.getElementById("pause"+id).onclick = () => media.pause();
  document.getElementById("stop"+id).onclick = () => { media.pause(); media.currentTime = 0; };
  document.getElementById("vol"+id).addEventListener("input", e => {
    media.volume = Number(e.target.value);
    updateMix();
  });
  decks[id] = media;
}
function updateMix() {
  const x = Number(document.getElementById("cross").value)/100;
  decks.A.volume = Number(document.getElementById("volA").value) * (1-x);
  decks.B.volume = Number(document.getElementById("volB").value) * x;
  document.getElementById("mixStatus").textContent =
    x < .45 ? "Mix favouring Deck A" : x > .55 ? "Mix favouring Deck B" : "Balanced mix — both decks";
}
document.getElementById("cross").addEventListener("input", updateMix);
updateMix();
if ("serviceWorker" in navigator) window.addEventListener("load", () => navigator.serviceWorker.register("./sw.js").catch(()=>{}));
