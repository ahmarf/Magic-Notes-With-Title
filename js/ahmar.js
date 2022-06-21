showNotes(); //takke page reload hone ke saath hi notes display hojaye

//If a user adds a note, add it to local storage

let addBtn = document.getElementById('addBtn');

addBtn.addEventListener('click', func1);

function func1() 
{
    let addTxt = document.getElementById('addTxt');
    let addTitle = document.getElementById('addtitle');

    let notes = localStorage.getItem('notes');  

    if (notes == null) 
    {
        notesObj = []; // notesObj array of objects ha is me pehle array of string tha last app me
    } 
    else 
    {
        notesObj = JSON.parse(notes);   
    }

    let myObj =         //myObj aik object bana lya ha is me title aur text rak dya ha
    {
        title: addTitle.value,
        text: addTxt.value
    }

    notesObj.push(myObj); //myobj ko push karde gye notesObj me

    localStorage.setItem('notes', JSON.stringify(notesObj)); //localStorage ko update kardya aur stringify se notes array se string me convert , string me is lye convert kya kyunke local storage me string me hi store karna parhta ha
    addTxt.value = ""; // takke baad me text area blank hojaye likha ka likha na rah jye
    addTitle.value ="";

    showNotes();     
}

//function to show notes from local storage
function showNotes() {
    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);  
    }
    let html = "";
    notesObj.forEach(function (element,index)
     {
        html += `
        <div class=" noteCard my-2 mx-2 card" style="width: 18rem;">

        <div class="card-body">
          <h5 class="card-title">${element.title}</h5>
          <p class="card-text">${element.text}</p>
          <button id ="${index}" onclick = "deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
        </div>
      </div>
      `;
    });

    let notesElement = document.getElementById('notes');
    if(notesObj.length  != 0)   
    {
        notesElement.innerHTML= html;  //if not 0 then innerHTML me html rakhwa do
    }
    else
    {
        notesElement.innerHTML = `Nothing to show! Use "Add a Note" section above to add notes.`;  //if empty then show this
    }

}

//function to delete note
function deleteNote(index)    //array ki index de ge jo delete karna chahte ho
{
    let notes = localStorage.getItem('notes');
    if (notes == null)
    {
        notesObj = [];
    } 
    else 
    {
        notesObj = JSON.parse(notes);
    }
    notesObj.splice(index,1); //(starting index, kitne element delete karna chahte ha)
    localStorage.setItem('notes', JSON.stringify(notesObj)); //local storage ko update   
    showNotes();  //shownotes ko dubara call karo ga
}

//search
let search = document.getElementById('searchTxt');
search.addEventListener('input' , function()
{
    let inputVal = search.value.toLowerCase();  //so at search time it can search by lowercase
    let noteCards = document.getElementsByClassName('noteCard');
    Array.from(noteCards).forEach(function(element)   //sare notecards get karlye aur check kare gye ke inputval se match karrah ha
    {         
        let CardTxt = element.getElementsByTagName('h5')[0].innerText;    //un ke paragraphs ka content Cardtxt me save kardya  -- innertext takke string me mile aur neeche usye include kya ja sakhe
        if(CardTxt.includes(inputVal))
        {
            element.style.display = "block";  // display
        }
        else
        {
            element.style.display = "none";  //not display
        }
    });
}); 
