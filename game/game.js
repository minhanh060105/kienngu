// --- LẤY ÂM THANH ---
const gameMusic = document.getElementById("gameMusic");
const correctSound = document.getElementById("correctSound");
const wrongSound = document.getElementById("wrongSound");
const winSound = document.getElementById("winSound");

gameMusic.volume = 0.5;
correctSound.volume = 1;
wrongSound.volume = 1;
winSound.volume = 1;

// Bật nhạc game sau lần click đầu tiên
window.addEventListener("click", () => {
  gameMusic.play();
}, { once: true });

// --- TẠO BÀI ---
const cards = document.querySelector(".cards");

let numbers = [1,2,3,4,5,6,7,8];
let arr = numbers.concat(numbers);
arr.sort(() => Math.random() - 0.5);

arr.forEach(num => {
  cards.innerHTML += `
    <li class="card">
      <div class="view front">?</div>
      <div class="view back"><img src="../images/game${num}.jpg"></div>
    </li>
  `;
});

const allCards = document.querySelectorAll(".card");

let cardOne, cardTwo;
let disableDeck = false;
let matched = 0;

function flipCard(e) {
  let clickedCard = e.target.closest(".card");
  if (!clickedCard || clickedCard === cardOne || disableDeck) return;

  clickedCard.classList.add("flip");

  if (!cardOne) {
    cardOne = clickedCard;
    return;
  }

  cardTwo = clickedCard;
  disableDeck = true;

  let img1 = cardOne.querySelector("img").src;
  let img2 = cardTwo.querySelector("img").src;

  img1 === img2 ? matchCards() : unflipCards();
}

function matchCards() {
  correctSound.currentTime = 0;
  correctSound.play();

  matched++;
  if (matched === 8) {
    setTimeout(() => {
  
      // Tắt nhạc nền hoàn toàn (nếu có)
      gameMusic.pause();
      gameMusic.currentTime = 0;
  
      // Chỉ phát nhạc WIN
      winSound.currentTime = 0;
      winSound.play();
  
      // Không shuffle, không restart
    }, 300);
  
    return;
  }
  

  cardOne.removeEventListener("click", flipCard);
  cardTwo.removeEventListener("click", flipCard);

  reset();
}

function unflipCards() {
  wrongSound.currentTime = 0;
  wrongSound.play();

  cardOne.classList.add("shake");
  cardTwo.classList.add("shake");

  setTimeout(() => {
    cardOne.classList.remove("shake", "flip");
    cardTwo.classList.remove("shake", "flip");
    reset();
  }, 600);
}

function reset() {
  [cardOne, cardTwo, disableDeck] = [null, null, false];
}

function shuffleCards() {
  matched = 0;
  cardOne = cardTwo = null;
  disableDeck = false;

  // restart nhạc game
  gameMusic.currentTime = 0;
  gameMusic.play();

  let newArr = numbers.concat(numbers);
  newArr.sort(() => Math.random() - 0.5);

  allCards.forEach((card, index) => {
    card.classList.remove("flip");
    card.querySelector("img").src = `../images/game${newArr[index]}.jpg`;
    card.addEventListener("click", flipCard);
  });
}

allCards.forEach(card => card.addEventListener("click", flipCard));
