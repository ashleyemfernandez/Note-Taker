const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'notes.html'));
});

app.get('/api/notes', (req, res) => {
    fs.readFile('db.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal Error' });
        }

        try {
            const notes = JSON.parse(data);
            res.json(notes);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Internal Error' });
        }
    });
});

app.post('/api/notes', (req, res) => {
    fs.readFile('db.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal Error' });
        }

        try {
            const notes = JSON.parse(data);
            const newNote = req.body;
            newNote.id = notes.length + 1;
            notes.push(newNote);

            fs.writeFile('db.json', JSON.stringify(notes, null, 2), (err) => {
                if (err) {
                    console.error(err);
                    return res.status(500).json({ error: 'Internal Error' });
                }
                res.json(newNote);
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Internal Error' });
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
