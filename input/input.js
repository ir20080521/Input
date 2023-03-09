const inputEl = document.getElementById("input");
const infoTextEl = document.getElementById("info-text");
const meaningContainerEl = document.getElementById("meaning-container");
const tittleEl = document.getElementById("tittle");
const meaningEl = document.getElementById("meaning");
const audioEl = document.getElementById("audio");

async function fetchAPI(word) {
  try {
    infoTextEl.style.display = "block";
    meaningContainerEl.style.display = "none";
    infoTextEl.innerText = `Searching the meaning
    of "${word}"`;

    const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
    const result = await fetch(url).then((res) => res.json());

    if (result.tittle) {
      infoTextEl.style.display = "block";
      tittleEl.innerText = word;
      meaningEl.innerText = "N/A";

      audioEl.style.display = "none";
    } else {
      infoTextEl.style.display = "none";
      meaningContainerEl.style.display = "block";
      audioEl.style.display = "inline-flex";
      tittleEl.innerText = result[0].word;
      meaningEl.innerText = result[0].meaning[0].definitions[0].definition;

      audioEl.src = result[0].phonetics[0].audio;
    }
  } catch (error) {
    console.log(error);
  }

  const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
  const result = await fetch(url).then((res) => res.json());
}

inputEl.addEventListener("keyup", (e) => {
  if (e.target.value && e.key === "Enter") {
    fetchAPI(e.target.value);
  }
});