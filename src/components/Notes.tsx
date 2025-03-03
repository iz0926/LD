import React, { useState } from 'react';
import { UserCircle2 } from 'lucide-react';
import type { Profile } from '../App';

interface Note {
  id: number;
  text: string;
  timestamp: Date;
  sender: Profile;
}

interface NotesProps {
  currentProfile: Profile | null;
}

const Notes: React.FC<NotesProps> = ({ currentProfile }) => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [newNote, setNewNote] = useState('');

  const addNote = () => {
    if (!currentProfile) {
      alert('Please select your profile first!');
      return;
    }

    if (newNote.trim()) {
      setNotes([
        ...notes,
        {
          id: Date.now(),
          text: newNote,
          timestamp: new Date(),
          sender: currentProfile,
        },
      ]);
      setNewNote('');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex space-x-4">
        <input
          type="text"
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          placeholder={currentProfile ? "Write a sweet note..." : "Select your profile to write notes"}
          disabled={!currentProfile}
          className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
          onKeyPress={(e) => e.key === 'Enter' && addNote()}
        />
        <button
          onClick={addNote}
          disabled={!currentProfile}
          className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          Send Note
        </button>
      </div>

      <div className="space-y-4">
        {notes.map((note) => (
          <div
            key={note.id}
            className="bg-white p-4 rounded-lg shadow border border-gray-100"
          >
            <div className="flex items-center space-x-2 mb-2">
              <UserCircle2 
                className="h-6 w-6"
                style={{ color: note.sender.color }}
              />
              <span className="font-medium" style={{ color: note.sender.color }}>
                {note.sender.name}
              </span>
            </div>
            <p className="text-gray-800">{note.text}</p>
            <p className="text-sm text-gray-500 mt-2">
              {note.timestamp.toLocaleString()}
            </p>
          </div>
        )).reverse()}
      </div>
    </div>
  );
};

export default Notes;