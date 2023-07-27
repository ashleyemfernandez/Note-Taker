const router = require("express").Router();
const notesArray = require("../../db/notes.json");

// GET route to retrieve all notes
router.get("/notes", (req, res) => {
  res.json(notesArray);
});

// POST route to create a new note
router.post("/notes", (req, res) => {
  const newNote = {
    id: notesArray.length.toString(),
    ...req.body,
  };

  notesArray.push(newNote);
  res.json(newNote);
});

// DELETE route to delete a note
router.delete("/notes/:id", (req, res) => {
  const { id } = req.params;
  const index = notesArray.findIndex((note) => note.id === id);

  if (index !== -1) {
    const deletedNote = notesArray.splice(index, 1)[0];
    res.json(deletedNote);
  } else {
    res.status(404).json({ error: "Note not found" });
  }
});

module.exports = router;