//front
const fs = require("fs");
const path = require("path");

// add and save note
function createNewNote(body, notesArray) {
  const note = body;
  notesArray.push(note);
  writeNotesToFile(notesArray);
  return note;
}
// remove note and update
function deleteNote(id, notesArray) {
  const updatedNotesArray = notesArray.filter((el) => el.id !== id);
  reindexNotes(updatedNotesArray);
  writeNotesToFile(updatedNotesArray);
  return updatedNotesArray;
}
// write note as json
function writeNotesToFile(notesArray) {
  const filePath = path.join(__dirname, "../db/db.json");
  const data = JSON.stringify({ notesArray }, null, 2);
  fs.writeFileSync(filePath, data);
}
// Updates note IDs based on their index position
function reindexNotes(notesArray) {
  notesArray.forEach((note, index) => {
    note.id = index;
  });
}

module.exports = {
  createNewNote,
  deleteNote,
};