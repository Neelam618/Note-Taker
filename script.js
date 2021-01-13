retrieveNoteText();

function focusInput() {
    document.getElementById('inputtitle').focus();
}
focusInput();

document.getElementById('addbtn').addEventListener('click', verifyAndDisplay);

function verifyAndDisplay(){
    
    let titleErrorMsg = document.getElementById('error-msg-title');
    let desErrorMsg = document.getElementById('error-msg-des');
    desErrorMsg.style.display = "none";
    titleErrorMsg.style.display = "none";

    let inputTitleValue = document.getElementById('inputtitle').value;
    let inputDesValue = document.getElementById('formControlTextarea').value;

    if(!inputTitleValue){
        titleErrorMsg.style.display = "block";
        return;
    }

    if(!inputDesValue){
        desErrorMsg.style.display = "block";
        return;
    }

    displayNote();
    focusInput();
}

function displayNote(){

    let valueFromTitleInput = document.getElementById('inputtitle').value;
    let valueFromDesInput = document.getElementById('formControlTextarea').value;
 
    document.getElementById('row').appendChild(createNoteCard(valueFromTitleInput, valueFromDesInput));
    document.getElementById('formControlTextarea').value = "";
    document.getElementById('inputtitle').value = "";

    storeNoteText(valueFromTitleInput, valueFromDesInput);
    focusInput();

}

function createNoteCard(inputTitleValue, inputDesValue){

    let columnInRow = document.createElement('div');
    columnInRow.className ='col';

    let card = document.createElement('div');
    card.className = 'card h-200';

    let cardBody = document.createElement('div');
    cardBody.className = 'card-body';

    let cardTitle = document.createElement('h3');
    cardTitle.className = 'card-title';
    cardTitle.innerText = inputTitleValue;

    let cardText = document.createElement('p');
    cardText.className = 'card-text';
    cardText.innerText = inputDesValue;

    let detailBtn = document.createElement('button');
    detailBtn.className = 'btn viewDetail';
    detailBtn.innerText = 'View detail';
    detailBtn.setAttribute("data-bs-toggle", "modal");
    detailBtn.setAttribute("data-bs-target", "#exampleModal");
    detailBtn.addEventListener('click', viewModal);

    let deleteBtn = document.createElement('button');
    deleteBtn.className = 'deletebtn btn mx-2';
    deleteBtn.innerText = 'Delete';
    deleteBtn.id = 'deleteBtn' + document.getElementsByClassName('card').length;;
    deleteBtn.addEventListener('click', deleteNote);

    cardBody.appendChild(cardTitle);
    cardBody.appendChild(cardText);
    cardBody.appendChild(detailBtn);
    cardBody.appendChild(deleteBtn); 
    card.appendChild(cardBody);
    columnInRow.appendChild(card);
    
    return columnInRow;
}

function viewModal(event){
    let paraText = event.target.previousElementSibling.innerText;
    let titleText = event.target.parentNode.firstChild.innerText;

    document.getElementsByClassName('modal-title')[0].innerText = titleText;
    document.getElementsByClassName('modal-text')[0].innerText = paraText;
}

function deleteNote(event){

    event.target.parentNode.parentNode.remove();
    
    let items = JSON.parse(localStorage.getItem('items')) || [];

    let indexToDelete = parseInt(event.target.id.replace('deleteBtn', ""));   //means eg. from id deleteBtn0 only 0 will stay //suppose targeted button has id='deleteBtn1':  step1:[deleteBtn0, deleteBtn1, deleteBtn2] step2:[deleteBtn0, 1, deleteBtn2]
    items.splice(indexToDelete, 1);       //deletes 1 delete button element starting from indexToDelete   //step3: [deleteBtn0, deleteBtn2]

    localStorage.setItem("items", JSON.stringify(items));

    // to reassign ids to delete button element ( because id's sequence will be changed after deleting middle row)
    document.querySelectorAll(".row .card").forEach((card, index) => {
    card.getElementsByClassName("deletebtn")[0].id = "deleteBtn" + index;
    });
    location.reload();
}

function storeNoteText(noteTitle, noteDes){
    let obj ={
        title: noteTitle,
        des: noteDes
    }
    let notes =  JSON.parse(localStorage.getItem('items')) || [];
    notes.push(obj);
    localStorage.setItem("items", JSON.stringify(notes));

}
function retrieveNoteText(){

    let itemsfromLS = JSON.parse(localStorage.getItem('items'));
    if (itemsfromLS) {
        itemsfromLS.forEach(obj => {
            document.getElementById('row').appendChild(createNoteCard(obj.title, obj.des));
        });
    }
}

    