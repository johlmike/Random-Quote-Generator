/*
Student Name: Ya-Chen Lin (亞辰   林)
English Name: Johlmike

My Mother language is Traditional Chinese, not English.
I tried my best to write comments in English and find English quotes.
*/

//Make a temporary quote list.
var quoteListTemp = quoteList;

//Create a variety to store intervalID
var intervalID;

// event listener to respond to clicks on the page
// when user clicks anywhere on the page, the "makeQuote" function is called
document.getElementById('loadQuote').addEventListener("click", printQuote, false);

//Create function to random dark color.  I think 256 is too light.
function randomDarkRGB() {
    var rgbString = 'rgb(';
    rgbString += Math.floor( Math.random() * 129 ) + ',';
    rgbString += Math.floor( Math.random() * 129 ) + ',';
    rgbString += Math.floor( Math.random() * 129 ) + ')';
    return rgbString;
}

//get the Random Quote from quote list
function getRandomQuote() {

    //Check if quoteListTemp is empty or not. If it is empty, reset it.
    if( quoteListTemp.length === 0 ){

        //Put the quoteList to quoteListTemp
        quoteListTemp = quoteList;

        //Reset the displayed value to false
        for( var i = 0; i < quoteListTemp.length ; i += 1 ){
            quoteListTemp[i].displayed = false;
        }
    }

    //Random a index number for the quote
    var randomIndex = Math.floor( Math.random() * quoteListTemp.length );

    //Set the quote object's "displayed" property to "true", because it will be displayed on the page later.
    quoteListTemp[randomIndex].displayed = true;

    //return the quote object
    return quoteListTemp[randomIndex];
}


function printQuote() {
    //Random a quote object from temporary quote list
    var quoteObj = getRandomQuote();

    //Make an array to help me sort the quotes that not displayed
    var nDisplayedList = [];

    //Store the string that I want to write on the page
    var html = '<p class="quote">';

    //Get element and body
    var divQuote = document.getElementById('quote-box');
    var bodyTag = document.getElementsByTagName('body');

    //Put quote into html variety
    html += quoteObj['quote'] + '</p> <p class="source">';
    html += quoteObj['source'];

    //Check if the quote object have citation property
    if( quoteObj['citation'] !== ''  && quoteObj['citation'] !== undefined){
        html += '<span class="citation">' + quoteObj['citation'] + '</span>';
    }

    //Check if the quote object have year property
    if( quoteObj['year'] !== null && quoteObj['year'] !== undefined){
        html += '<span class="year">' + quoteObj['year'] + '</span>';
    }

    //Close the p tag
    html += '</p>';

    //Display the quote on the page
    divQuote.innerHTML = html;

    //Random background color
    bodyTag[0].style.backgroundColor = randomDarkRGB();

    //  ( FOR DEBUG ) Check quotes that  showed before on the console
    console.log( quoteObj['quote'] );

    //Sort not displayed quotes
    for( var i = 0 ; i < quoteListTemp.length ; i += 1) {

        //Put not displayed quote objects to the nDisplayedList
        if (quoteListTemp[i].displayed === false) {
            nDisplayedList.push(quoteListTemp[i]);
        }
    }
    //and put nDisplayedList back to the quoteListTemp
    quoteListTemp = nDisplayedList;

    //Clear interval
    clearInterval( intervalID );

    //Auto refresh the quote next every 10 secdons
    intervalID = setInterval(printQuote, 10000);
}

printQuote();