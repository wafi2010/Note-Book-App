const titleInput = document.getElementById("title");
const noteInput = document.getElementById("NoteInputArea");
const tagInput = document.querySelector('input[type="text"]:nth-of-type(2)');
const saveButton = document.getElementById("SaveBtn");

// Save Note function
function saveNote(event) {
  event.preventDefault();

  const title = titleInput.value.trim();
  const noteContent = noteInput.value.trim();
  const tag = tagInput.value.trim();

  if (title === "" || noteContent === "" || tag === "") {
    alert("All fields are required!");
    return;
  }
  //create a new note object
  const note = {
    title: title,
    content: noteContent,
    tag: tag,
    date: new Date().toLocaleString(),
  };
  //user note object store by localstorage
  let notes = JSON.parse(localStorage.getItem("notes")) || [];
  //push by new note in notse object
  notes.push(note);
  //stringify for loaclsorage and setitem inotes
  localStorage.setItem("notes", JSON.stringify(notes));
  //add a new note then all input fildes is emty
  titleInput.value = "";
  noteInput.value = "";
  tagInput.value = "";

  displayNotes();
}

function displayNotes() {
  const notesContainer = document.querySelector(".noteDiv");

  notesContainer.innerHTML = "";

  const notes = JSON.parse(localStorage.getItem("notes")) || [];

  if (notes.length === 0) {
    notesContainer.innerHTML = `<p class="err" >No notes saved yet!</p>`;
    return;
  }
  notes.forEach((note, index) => {
    const noteElement = document.createElement("div");
    noteElement.classList.add("note");

    noteElement.innerHTML = `
      <h2>${note.title}</h2>
      <p>${note.content}</p>
      <span class="tag">Tag: ${note.tag}</span>
      </br>
      <small>Saved on: ${note.date}</small>
      <button class="deleteBtn" onClick="noteDelete(${index})">Delete</button>
    `;
    notesContainer.appendChild(noteElement);
  });
}

// Delete Note function
function noteDelete(index) {
  let notes = JSON.parse(localStorage.getItem("notes")) || [];

  notes.splice(index, 1);

  localStorage.setItem("notes", JSON.stringify(notes));

  displayNotes();
}

saveButton.addEventListener("click", saveNote);

window.onload = displayNotes;
