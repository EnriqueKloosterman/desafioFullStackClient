import { useState, useEffect } from 'react';

const NotesApp = () => {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState('');
  const [note, setNote] = useState('');

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await fetch('http://localhost:3000/notes/notes');
        if (response.ok) {
          const notesData = await response.json();
          setNotes(notesData);
        } else {
          console.error('Error fetching notes');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchNotes();
  }, []);

  const handleCreateNote = async () => {
    try {
      const response = await fetch('http://localhost:3000/notes/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, note }),
      });
      if (response.ok) {
        const newNote = await response.json();
        setNotes([...notes, newNote]);
        setTitle('');
        setNote('');
      } else {
        console.error('Error creating note');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleDeleteNote = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/notes/note/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setNotes(notes.filter((note) => note.id !== id));
      } else {
        console.error('Error deleting note');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Notas</h1>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 mr-2 rounded"
        />
        <input
          type="text"
          placeholder="Nota"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          className="border p-2 mr-2 rounded"
        />
        <button
          onClick={handleCreateNote}
          className="bg-blue-500 text-white p-2 rounded"
        >
          Crear Nota
        </button>
      </div>
      <ul>
        {notes.map((note) => (
          <li key={note.id} className="border p-2 mb-2 rounded flex justify-between">
            <div>
              <h2 className="font-bold">{note.title}</h2>
              <p>{note.note}</p>
            </div>
            <button
              onClick={() => handleDeleteNote(note.id)}
              className="bg-red-500 text-white p-2 rounded"
            >
              Borrar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NotesApp;
