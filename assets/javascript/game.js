//@ts-check

let randNum = 0;
let gemNumbers =[];
let guessTotal = 0;
let wins = 0;
let losses = 0;

function randomNum(minimumVal, maximumVal) {
    let randNo = Math.floor(Math.random() * (maximumVal - minimumVal) + minimumVal);
    return randNo;
}

function getRandNums(arrButtonNums, index) {
    let gemNum = randomNum(1, 13);
    while (arrButtonNums.includes(gemNum)) {
      gemNum = randomNum(1, 13);
    }
    arrButtonNums[index] = gemNum;
    return arrButtonNums;
}

function generateGemNos() {
    let arrButtonNums = [0, 0, 0, 0];
    $.each(arrButtonNums, function(index, value){
        getRandNums(arrButtonNums, index);
    })
    return arrButtonNums;
}

function resetGame() {
    $(".score").text("");
    guessTotal = 0;
    randNum = randomNum(121, 19);
    $(".rando").text(randNum);

    let buttonNumbers = generateGemNos();
    gemNumbers = [
        {
           gem: "amber",
           gemNum: buttonNumbers[0]
        }
       ,{
           gem: "emerald",
           gemNum: buttonNumbers[1]
        }
       ,{
           gem: "ruby",
           gemNum: buttonNumbers[2]
        }
       ,{
           gem: "sapphire",
           gemNum: buttonNumbers[3]
        }
    ];

}

function restartGame() {
    if (confirm("Do you want to play again?")) {
        gemNumbers = [];
        $("#result").css("display", "none");
        resetGame();
    } else {
        alert("Thank you for playing, please close the browser page.");
    }
}

function checkForWin(usrTotal) {
    console.log($(".rando").text());
    console.log(usrTotal);
    if (usrTotal > randNum) {
        losses ++;
        $("#loser").text("Losses: " + losses);
        $("#result").css("color", "red");
        $("#result").css("display", "block");
        $("#result").text("You lose!!!");
        setTimeout(function() { restartGame() }, 200);
    } 
    else if (usrTotal === randNum) {
        wins ++;
        $("#winner").text("Wins: " + wins);
        $("#result").css("color", "green");
        $("#result").css("display", "block");
        $("#result").text("You win!!!");
        setTimeout(function() { restartGame() }, 200);
    }
}

function addClicks(clickID) { //clickID contains the id (gem name) of the button that was clicked
                              //this was set in the inline onclick event contained in wach button's
                              //html
    console.log("Button clicked: " + clickID);
    let gemSelect = gemNumbers.filter(function(findGem) {
        return findGem.gem === clickID; //returns an anonymous object inside and array
    })

    console.log(gemSelect[0].gemNum);
    guessTotal += (gemSelect[0].gemNum); //from the first (and only) array obtain the value associated
                                         //with the keyword gemNum   
    console.log(guessTotal);
    $(".score").text(guessTotal);
    checkForWin(guessTotal);
    console.log(guessTotal);
}

$(document).ready(function() {
    resetGame();
})

// $(".gem-button").click(addClicks);
