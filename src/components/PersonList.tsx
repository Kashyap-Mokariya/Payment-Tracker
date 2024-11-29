import { Plus, Users } from 'lucide-react';
import { useState } from 'react';
import { person } from '../types';

interface PersonListProps {
  people: person[];
  onSelectPerson: (person: person) => void;
  onAddPerson: (name: string) => void;
  selectedPersonId?: string;
}

export function PersonList({ people, onSelectPerson, onAddPerson, selectedPersonId }: PersonListProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [newName, setNewName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newName.trim()) {
      onAddPerson(newName.trim());
      setNewName('');
      setIsAdding(false);
    }
  };

  return (
    <div className="w-80 bg-slate-900 p-4 rounded-xl border border-gray-800">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Users className="w-5 h-5 text-sky-500" />
          <h2 className="font-medium text-gray-100">People</h2>
        </div>
        <button
          onClick={() => setIsAdding(true)}
          className="p-1.5 hover:bg-gray-800 rounded-lg text-gray-400 hover:text-gray-100"
        >
          <Plus size={20} />
        </button>
      </div>

      {isAdding && (
        <form onSubmit={handleSubmit} className="mb-4">
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder="person's name"
            className="w-full p-2 bg-gray-800 border border-gray-700 rounded-lg mb-2 text-gray-100 placeholder-gray-500 focus:outline-none focus:border-sky-500"
            autoFocus
          />
          <div className="flex gap-2">
            <button
              type="submit"
              className="px-3 py-1.5 bg-sky-500 text-white rounded-lg text-sm hover:bg-sky-400"
            >
              Add
            </button>
            <button
              type="button"
              onClick={() => setIsAdding(false)}
              className="px-3 py-1.5 bg-gray-800 text-gray-300 rounded-lg text-sm hover:bg-gray-700"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      <div className="space-y-2">
        {people.map((person) => (
          <button
            key={person.id}
            onClick={() => onSelectPerson(person)}
            className={`w-full p-3 text-left rounded-lg ${selectedPersonId === person.id
              ? 'bg-sky-500/10 border border-sky-500/20 text-sky-400'
              : 'hover:bg-gray-800 border border-transparent'
              }`}
          >
            <div className="font-medium">{person.name}</div>
            <div className={`text-sm ${selectedPersonId === person.id ? 'text-sky-300/70' : 'text-gray-400'
              }`}>
              Due: ${person.totalDue.toFixed(2)}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}