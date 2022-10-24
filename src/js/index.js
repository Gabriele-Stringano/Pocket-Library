import '../css/mobile.css';
import '../css/desktop.css';
const axios = require('axios').default;


let searchBtn= document.getElementById('search');
let subjectsInput = document.getElementById('subjects');
let offsett = 0; //is used to navigate through the list of books (makes use of the api settings);


// list of functions:

//returns a list of books, searched by genre
async function searchByGenres(){
  try{
    let url = `https://openlibrary.org/subjects/${subjectsInput.value.toLowerCase()}.json?offset=${offsett}&limit=11`;
    let response = await axios.get(url);
        deleteContent(result)  //removes the message: 'waiting results'
        deleteContent(buttons) //Avoids an overlap of buttons caused by repeated clicking
        if (response.data.work_count == 0) throw 'errorLenght'; //the search had no results
        let worksArray = response.data.works;
        worksArray.forEach((item, i) => {
         let element = document.createElement('div');
         element.className = 'list';
         element.id= `${item.key}`;
         element.innerHTML= '<b>Title</b>: '+item.title+ "<br>";
         let authors = item.authors;
         element.innerHTML += '<b>Authors</b>: ';
         authors.forEach((author, i)=> {
          console.log(i);
          console.log(authors.length);
          if(authors.length == (i+1)){
            element.innerHTML += author.name;
          }
          else{
            element.innerHTML += author.name +', ';
          }
         });
         result.append(element);
         startSearchByKeys(element);
    });
    addButtonsNavigation();
  } catch (e) {
    console.log(e);
    deleteContent(result)
    let messageError = document.createElement('h2');
    if (e == 'errorLenght') messageError.append('Genre not found');
    else messageError.append('Error, try again or change search key');
    result.append(messageError);
  }
}

//returns the description of the selected book
async function searchByKeys(event){
  let url = `https://openlibrary.org${event.target.id}.json`;
  let response = await axios.get(url);
  deleteContent(result)  //removes the message: 'waiting results'
  let titleBook = document.createElement('div');
  divMaker(titleBook, 'titleBook', response.data.title);
  if (typeof response.data.description == "string"){
    let descriptionBook = document.createElement('div');
    divMaker(descriptionBook, 'descriptionBook', response.data.description);
  }
  else{
    let searchResult = document.createElement('h2');
    searchResult.append('Description unavailable');
    result.append(searchResult);
  }
}

//append 2 buttons below the list of books so you can browse through the titles (we assign dedicated events to them)
function addButtonsNavigation(){
  let previous = document.createElement('input');//declaration new button
  buttonMaker(previous, 'previous');//insertion button in html
  previousSearch(previous, );
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
  messageWaiting.append('Waiting for results');
  result.append(messageWaiting);
}

// List of events + functionEvents:

//allows you to search a list of books by searching by genre, by clicking on the search button!
searchBtn.addEventListener('click', () => {
  offsett = 0;
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
    waitingMessage ();
    searchByKeys(event);
  });
}

//allows the 'previous' button to go back with the list of books, by clicking it
function previousSearch(previous){
  previous.addEventListener('click', (event) => { 
    if (offsett > 0){
      offsett = offsett - 11;
    }
    else{
      offsett=0; //useful to avoid bugs
    }
    deleteContent(result);
    waitingMessage();
    searchByGenres();
  });
}

//allows the 'followin' button to move forward with the list of books, by clicking it
function followingSearch(following){
  following.addEventListener('click', (event) => { 
    offsett = offsett + 11;
    console.log(offsett);
    deleteContent(result);
    waitingMessage();
    searchByGenres();
  });
}