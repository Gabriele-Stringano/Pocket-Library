import '../css/mobile.css';
import '../css/desktop.css';
const axios = require('axios').default;


let searchBtn= document.getElementById('search');
let subjectsInput = document.getElementById('subjects');
let ofsett = 0; //is used to navigate through the list of books (makes use of the api settings);


// list of functions:

//returns a list of books, searched by genre
async function searchByGenres(){
  try{
    let url = `https://openlibrary.org/subjects/${subjectsInput.value.toLowerCase()}.json?offset=${ofsett}&limit=13`;
    let response = await axios.get(url);
        deleteContent(result)  //removes the message of waiting results
        deleteContent(buttons) //Avoids an overlap of buttons caused by repeated clicking
        if (response.data.work_count == 0) throw 'errorLenght'; //the search had no results
        let worksArray = response.data.works;
        worksArray.forEach((item, i) => {
         let li = document.createElement('div');
         li.className = 'titles';
         li.id= `${item.key}`;
         li.append(item.title);
         result.append(li);
         startSearchByKeys(li);
    });
    addButtonsNavigation();
  } catch (e) {
    console.log(e);
    deleteContent(result)
    let messageError = document.createElement('h2');
    if (e == 'errorLenght') messageError.append('Genere non disponibile');
    else messageError.append('Errore, riprovare oppure cambiare chiave di ricerca');
    result.append(messageError);
  }
}

//returns the description of the selected book
function searchByKeys(event){
  let url = `https://openlibrary.org${event.target.id}.json`;
  axios.get(url)
  .then((response) => {
  let titleBook = document.createElement('div');
  divMaker(titleBook, 'titleBook', response.data.title);
  if (typeof response.data.description == "string"){
    let descriptionBook = document.createElement('div');
    divMaker(descriptionBook, 'descriptionBook', response.data.description);
  }
  else{
    let searchResult = document.createElement('h2');
    searchResult.append('Descrizione non disponibile');
    result.append(searchResult);
  }
  }); 
}

//append 2 buttons below the list of books so you can browse through the titles (we assign dedicated events to them)
function addButtonsNavigation(){
  let previus = document.createElement('input');//declaration new button
  buttonMaker(previus, 'previus');//insertion button in html
  previusSearch(previus, );
  let following = document.createElement('input');//declaration new button
  buttonMaker(following, 'following');//insertion button in html
  followingSearch(following);
}

//this function allows us to append a button
function buttonMaker(node,name){ 
  node.classList.add('btn'); //used for style css
  node.setAttribute('type', 'button');
  node.setAttribute('name', name);
  node.setAttribute('value', name);
  buttons.append(node);
}

//this function allows us to append a div with a response content
function divMaker(node, className, responseValue){
  result.append(node);
  node.className = className;

  node.append(responseValue);
}

//clean the contents of the div
function deleteContent(node){
  while (node.firstChild) {
    node.removeChild(node.lastChild);
  }
}

//append a <h3> message, used to alert about the loading of resources 
function waitingMessage (){
  let messageWaiting = document.createElement('h3');
  messageWaiting.append('Attesa risultati');
  result.append(messageWaiting);
}

// List of events + functionEvents:

//allows you to search a list of books by searching by genre, by clicking on the search button!
searchBtn.addEventListener('click', () => {
  ofsett = 0;
  deleteContent(result)
  deleteContent(buttons)
  waitingMessage();
  searchByGenres();
});

//allows you to get the description of the selected book, by clicking on the title!
function startSearchByKeys(element){
  element.addEventListener('click', (event) => { 
    deleteContent(result); //clear the result div
    deleteContent(buttons);//clear the buttons div
    searchByKeys(event)

  });
}

//allows the 'previus' button to go back with the list of books, by clicking it
function previusSearch(previus){
  previus.addEventListener('click', (event) => { 
    if (ofsett > 0){
      ofsett = ofsett - 13;
    }
    else{
      ofsett=0; //useful to avoid bugs
    }
    deleteContent(result);
    waitingMessage();
    searchByGenres();
  });
}

//allows the 'followin' button to move forward with the list of books, by clicking it
function followingSearch(following){
  following.addEventListener('click', (event) => { 
    ofsett = ofsett + 13;
    console.log(ofsett);
    deleteContent(result);
    waitingMessage();
    searchByGenres();
  });
}