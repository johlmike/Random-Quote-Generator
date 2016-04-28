/*
Student Name: Ya-Chen Lin (亞辰   林)
English Name: Johlmike

My Mother language is Traditional Chinese, not English.
I tried my best to write comments in English and find English quotes.
*/

//Create a temporary quote list., make sure I won't change anything about  regular quote list
var quoteListTemp = quoteList;

//Create a variety to store intervalID
var intervalID;

//Create a variety to check if all quotes have displayed or not
var allDisplayed = false;

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
    //Create a variety to store the number of displayed quotes
    var quoteDisplayed = 0;

    //Check how many quotes have been displayed
    for( var i = 0 ; i < quoteListTemp.length ; i += 1 ){
        if( quoteListTemp[i].displayed === true){
            quoteDisplayed += 1;
        }
    }

    //If the number of quotes that been displayed is same as the quote list, it means all quotes have been displayed
    if( quoteDisplayed === quoteListTemp.length ){

        //Set allDisplayed to the true
        allDisplayed = true;
        quoteDisplayed = 0;
    }

    // If allDisplayed is true, reset all quote objects' displayed property to false
    if( allDisplayed ){
        //Reset the displayed value to false
        for( var i = 0; i < quoteListTemp.length ; i += 1 ){
            quoteListTemp[i].displayed = false;
        }
        allDisplayed = false;
    }

    //Random a index number for the quote, but without the quotes that have been displayed
    do {
        var randomIndex = Math.floor(Math.random() * quoteListTemp.length);
    } while( quoteListTemp[randomIndex].displayed === true );

    //(FOR DEBUG) Display the quotes on the console
    console.log( (quoteDisplayed + 1) + '. ' + quoteListTemp[randomIndex].quote );

    //Set the quote object's "displayed" property to "true", because it will be displayed on the page later
    quoteListTemp[randomIndex].displayed = true;

    //return the quote object
    return quoteListTemp[randomIndex];
}


function printQuote() {
    //Random a quote object from temporary quote list
    var quoteObj = getRandomQuote();

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

    //Clear interval
    clearInterval( intervalID );

    //Auto refresh the quote next every 10 secdons
    intervalID = setInterval(printQuote, 10000);
}

printQuote();