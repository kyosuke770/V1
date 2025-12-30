const cards = [
  {
    jp: "もう少しで{x}。",
    en: "I'm almost {x}.",
    slots: [
      { jp: "終わります", en: "done" },
      { jp: "準備ができます", en: "ready" }
    ]
  },
  {
    jp: "少し{x}ありますか？",
    en: "Do you have {x}?",
    slots: [
      { jp: "時間", en: "a minute" },
      { jp: "少し時間", en: "a second" }
    ]
  },
  {
    jp: "お待たせしました。",
    en: "Sorry for the wait."
  }
];

let index = 0;
let revealed = false;
let currentAnswer = "";
let currentJp = "";

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
  const slot = pickSlot(card);

  if (slot) {
    currentJp = card.jp.replace("{x}", slot.jp);
    currentAnswer = card.en.replace("{x}", slot.en);

    jpEl.textContent = currentJp;
    enEl.textContent = revealed
      ? currentAnswer
      : card.en.replace("{x}", "___");
  } else {
    currentJp = card.jp;
    currentAnswer = card.en;

    jpEl.textContent = currentJp;
    enEl.textContent = revealed ? currentAnswer : "タップして答え";
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
