import '../css/mobile.css';
import '../css/desktop.css';

let searchBtn= document.getElementById('search');
let subjectsInput = document.getElementById('subjects');
let ofsett = 0;
let buttonAlreadyExist = 0;


// list of functions:

//returns a list of books, searched by genre
function searchByGenres(){
  let url = `https://openlibrary.org/subjects/${subjectsInput.value}.json?offset=${ofsett}&limit=12`;
  console.log(url);
  fetch(url)
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
      let worksArray = data.works;
      worksArray.forEach((item, i) => {
      console.log(item.title);
      let li = document.createElement('div');
      li.className = 'titles';
      li.id= `${item.key}`;
      li.append(item.title);
      result.append(li);
      });
  });
}

//returns the description of the selected book
function searchByKeys(event){
  let url = `https://openlibrary.org${event.target.id}.json`;
  fetch(url)
  .then((response) => response.json())
  .then((data) => {
  console.log(data); //alcuni sfruttano degli oggetti!
  let titleBook = document.createElement('div');
  titleBook.append(data.title);
  result.append(titleBook);
  titleBook.className = 'titleBook';
  let descriptionBook = document.createElement('div');
  descriptionBook.append(data.description);
  descriptionBook.className = 'descriptionBook';
  result.append(descriptionBook);
  }); 
}

//dewcriine
function addButtonsNavigation(){
  buttonAlreadyExist = 1;
  let previus = document.createElement('input');//declaration new button
  buttonMaker(previus, 'previus');//insertion button in html
  previusSearch(previus, );
  let following = document.createElement('input');//declaration new button
  buttonMaker(following, 'following');//insertion button in html
  followingSearch(following);
}

//this function allows us to initialize and append a button
function buttonMaker(node,name){ 
  node.classList.add('btn'); //used for style css
  node.setAttribute('type', 'button');
  node.setAttribute('name', name);
  node.setAttribute('value', name);
  buttons.append(node);
}

//cleans the contents of the div result !!!CAMBIA IL NOME
function deleteList(node){
  while (node.firstChild) {
    node.removeChild(node.lastChild);
  }
}


// List of events + functionEvents

searchBtn.addEventListener('click', () => {
  ofsett = 0;
  deleteList(result)
  searchByGenres();
  if(buttonAlreadyExist == 0) addButtonsNavigation();
});

//fammi sfruttare l'add button
result.addEventListener('click', (event) => { 
  deleteList(result);
  deleteList(buttons);
  searchByKeys(event)

});

function previusSearch(previus){
  previus.addEventListener('click', (event) => { 
    if (ofsett > 0){
      ofsett = ofsett - 12;
      console.log(ofsett);
    }
    else{
      ofsett=0; //useful to avoid bugs
    }
    deleteList(result);
    searchByGenres();
  });
}

function followingSearch(following){
  following.addEventListener('click', (event) => { 
    ofsett = ofsett + 12;
    console.log(ofsett);
    deleteList(result);
    searchByGenres();
  });
}