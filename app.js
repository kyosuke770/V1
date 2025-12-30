const cards = [
  {
    jp: "もう少しで終わります。",
    en: "I'm almost {x}.",
    slots: ["done", "finished"]
  },
  {
    jp: "少し時間ありますか？",
    en: "Do you have {x}?",
    slots: ["a minute", "a second"]
  },
  {
    jp: "お待たせしました。",
    en: "Sorry for the wait."
  }
];

let index = 0;
let revealed = false;
let currentAnswer = "";

const jpEl = document.getElementById("jp");
const enEl = document.getElementById("en");
const cardEl = document.getElementById("card");
const nextBtn = document.getElementById("next");

function pickSlot(card) {
  if (!card.slots) return null;
  const i = Math.floor(Math.random() * card.slots.length);
  return card.slots[i];
}

function render() {
  const card = cards[index];
  jpEl.textContent = card.jp;

  if (card.slots) {
    const slot = pickSlot(card);
    currentAnswer = card.en.replace("{x}", slot);

    enEl.textContent = revealed
      ? currentAnswer
      : card.en.replace("{x}", "___");
  } else {
    currentAnswer = card.en;
    enEl.textContent = revealed ? card.en : "タップして答え";
  }
}

cardEl.addEventListener("click", () => {
  revealed = !revealed;
  enEl.textContent = revealed ? currentAnswer : "タップして答え";
});

nextBtn.addEventListener("click", () => {
  index = (index + 1) % cards.length;
  revealed = false;
  render();
});

render();
