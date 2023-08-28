const cards = document.querySelectorAll(".card"),
timeTag = document.querySelector(".time b"),
flipsTag = document.querySelector(".flips b"),
refreshBtn = document.querySelector(".details button");

let maxTime = 20;
let timeLeft = maxTime;
let flips = 0;
let matchedCard = 0;
let disableDeck = false;
let isPlaying = false;
let cardOne, cardTwo, timer;

function initTimer() {
    if(timeLeft <= 0) {
        //return clearInterval(timer);
        Lose();
    }
    timeLeft--;
    timeTag.innerText = timeLeft;
}

function flipCard({target: clickedCard}) {
    //The function flipCard is defined with a parameter using object destructuring. The parameter is an object with a property named target, and its value is assigned to the variable clickedCard. This function is likely used as an event handler for a card flip action.
    if(!isPlaying) {
        isPlaying = true;
        timer = setInterval(initTimer, 1000);
        // By calling setInterval(initTimer, 1000), the initTimer function will be called every 1 second.
        // timer: It is a variable that will store the reference to the timer created by setInterval(). By assigning the timer reference to this variable, it allows you to later use clearInterval(timer) to stop the timer if needed.
    }
    if(clickedCard !== cardOne && !disableDeck && timeLeft > 0) {
        flips++;
        flipsTag.innerText = flips;
        clickedCard.classList.add("flip");
        if(!cardOne) {
            return cardOne = clickedCard;
        }
        cardTwo = clickedCard;
        disableDeck = true;
        let cardOneImg = cardOne.querySelector(".back-view img").src,
        cardTwoImg = cardTwo.querySelector(".back-view img").src;
        matchCards(cardOneImg, cardTwoImg);
    }
}

function matchCards(img1, img2) {
    if(img1 === img2) {
        matchedCard++;
        if(matchedCard == 6 && timeLeft > 0) {
           // return clearInterval(timer);
           Win();
        }
        // The clearInterval(timer) function does not reset the timer to its original value. It solely stops the execution of the timer that was previously set using the setInterval() function.
        cardOne.removeEventListener("click", flipCard);
        cardTwo.removeEventListener("click", flipCard);
        cardOne = cardTwo = "";
        return disableDeck = false;
    }

    setTimeout(() => {
        cardOne.classList.add("shake");
        cardTwo.classList.add("shake");
    }, 400);

    setTimeout(() => {
        cardOne.classList.remove("shake", "flip");
        cardTwo.classList.remove("shake", "flip");
        cardOne = cardTwo = "";
        disableDeck = false;
    }, 1200);
}

function shuffleCard() {
    document.querySelector("#end-screen").style.display="none";
    document.querySelector("#end").style.display="none";
    document.querySelector(".wrapper").style.display="block";
    timeLeft = maxTime;
    flips = matchedCard = 0;
    cardOne = cardTwo = "";
    clearInterval(timer);
    timeTag.innerText = timeLeft;
    flipsTag.innerText = flips;
    disableDeck = isPlaying = false;

    let arr = [1, 2, 3, 4, 5, 6, 1, 2, 3, 4, 5, 6];
    arr.sort(() => Math.random() > 0.5 ? 1 : -1);
//if the random returns 1 i.e greater than 0.5,then then we swap else we dont
    cards.forEach((card, index) => {
        card.classList.remove("flip");
        let imgTag = card.querySelector(".back-view img");
        
            imgTag.src = `images/img-${arr[index]}.png`;
        
        card.addEventListener("click", flipCard);
    });
    //The meaning of above forEach loop
//     for (let i = 0; i < cards.length; i++) {
//   const card = cards[i];
//   card.addEventListener("click", flipCard);
// }

}

shuffleCard();

refreshBtn.addEventListener("click", shuffleCard);

cards.forEach(card => {
    card.addEventListener("click", flipCard);
});


function Win() {
         clearInterval(timer);
        let end_screen = document.querySelector("#end-screen");
        let board = document.querySelector(".wrapper");
        let restart_button = document.querySelector("#restart-screen");

        end_screen.style.display = "block";
        board.style.display = "none";
        restart_button.style.display = "block";

        restart_button.addEventListener("click", shuffleCard);

    
}
function Lose() {
    clearInterval(timer);
   let end_screen = document.querySelector("#end");
   let board = document.querySelector(".wrapper");
   let restart_button = document.querySelector("#restart");

   end_screen.style.display = "block";
   board.style.display = "none";
   restart_button.style.display = "block";

   restart_button.addEventListener("click", shuffleCard);


}
