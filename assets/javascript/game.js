//@ts-check

let gemNumbers;
let guessTotal = 0;
let wins = 0;
let losses = 0;

function randomNum(minimumVal, maximumVal) {
    let randNo = Math.floor(Math.random() * (maximumVal - minimumVal) + minimumVal);
    return randNo;
}

function getRandNums(arrButtonNums, index) {
    let gemNum = randomNum(1, 13);
    console.log("gemNum: " + gemNum);
    while (arrButtonNums.includes(gemNum)) {
      gemNum = randomNum(1, 13);
      console.log("gemNum: " + gemNum);
    }
    arrButtonNums[index] = gemNum;
    return arrButtonNums;
}

function generateGemNos() {
    let arrButtonNums = [0, 0, 0, 0];
    $.each(arrButtonNums, function(index, value){
        getRandNums(arrButtonNums, index);
        console.log(arrButtonNums);
    })
    return arrButtonNums;
}

function checkWin(usrTotal) {
    if (usrTotal > $(".rando").val()) {
        //You lose + timer
        losses ++;
        $("#loser").text("Losses: " + losses);
    } 
    else if (usrTotal === $(".rando").val()) {
        //You win + timer
        wins ++;
        $("#winner").text("Wins: " + wins);
        

    })
}

function addClicks(clickID) { //clickID contains the id (gem name) of the button that was clicked
                              //this was set in the inline onclick event contained in wach button's
                              //html
    console.log("Button clicked: " + clickID);
    let gemSelect = gemNumbers.filter(function(findGem) {
        
        return findGem.gem === clickID;
    })

    console.log(gemSelect[0].gemNum);
    guessTotal += (gemSelect[0].gemNum);
    console.log(guessTotal);
    $(".score").text(guessTotal);

}

$(document).ready(function() {
    let randNum = randomNum(121, 19);
    $(".rando").text(randNum);
    console.log(randNum); 

    let buttonNumbers = generateGemNos();
    console.log(buttonNumbers);
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
    console.log(gemNumbers);
})

// $(".gem-button").click(addClicks);



