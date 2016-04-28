// event listener to respond to clicks on the page
// when user clicks anywhere on the page, the "makeQuote" function is called
document.getElementById('loadQuote').addEventListener("click", printQuote, false);

function randomRGB() {
    var rgbString = 'rgb(';
    rgbString += Math.floor( Math.random() * 257 ) + ',';
    rgbString += Math.floor( Math.random() * 257 ) + ',';
    rgbString += Math.floor( Math.random() * 257 ) + ')';
    return rgbString;
}

function getRandomQuote() {
    if( quoteListTemp.length === 0 ){
        quoteListTemp = quoteList;
        for( var i = 0; i < quoteListTemp.length ; i += 1 ){
            quoteListTemp[i].displayed = false;
        }
    }
    var randomIndex = Math.floor( Math.random() * quoteListTemp.length );
    quoteListTemp[randomIndex].displayed = true;
    return quoteListTemp[randomIndex];
}


function printQuote() {
    //Random a quote from temp quote list
    var quoteObj = getRandomQuote(); //get an quote object
    var nDisplayedList = [];
    var html = '<p class="quote">';

    //Get element by ID and body tag
    var divQuote = document.getElementById('quote-box');
    var bodyTag = document.getElementsByTagName('body');

    //Put quote into html
    html += quoteObj['quote'] + '</p> <p class="source">';
    html += quoteObj['source'];

    if( quoteObj['citation'] !== ''){
        html += '<span class="citation">' + quoteObj['citation'] + '</span>';
    }

    if( quoteObj['year'] !== null){
        html += '<span class="citation">' + quoteObj['year'] + '</span>';
    }

    html += '</p>';

    divQuote.innerHTML = html;

    //Random background color
    bodyTag[0].style.backgroundColor = randomRGB();

    //Check quotes that  showed before
    console.log( quoteObj['quote'] );

    //Sort not displayed  quotes and put it back to the quoteListTemp
    for( var i = 0 ; i < quoteListTemp.length ; i += 1){
        if( quoteListTemp[i].displayed === false ){
            nDisplayedList.push( quoteListTemp[i] );
        }
    }
    quoteListTemp = nDisplayedList;
}

var quoteListTemp = quoteList;