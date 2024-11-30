import { Delete, Minus, Plus, Users } from 'lucide-react';
import { useState } from 'react';

interface Person {
  id: string;
  name: string;
  totalDue: number;
}

interface PersonListProps {
  people: Person[];
  onSelectPerson: (person: Person) => void;
  onAddPerson: (name: string) => void;
  onDeletePerson: (id: string) => void;
  selectedPersonId?: string;
}

export function PersonList({ 
  people, 
  onSelectPerson, 
  onAddPerson, 
  onDeletePerson, 
  selectedPersonId 
}: PersonListProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [newName, setNewName] = useState('');
  const [personToDelete, setPersonToDelete] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newName.trim()) {
      onAddPerson(newName.trim());
      setNewName('');
      setIsAdding(false);
    }
  };

  const handleDeleteClick = (e: React.MouseEvent, personId: string) => {
    e.stopPropagation();
    setPersonToDelete(personId);
  };

  const handleConfirmDelete = () => {
    if (personToDelete) {
      onDeletePerson(personToDelete);
      setPersonToDelete(null);
    }
  };

  return (
    <div className="w-full sm:w-80 bg-slate-900 p-3 sm:p-4 rounded-xl border border-gray-800">
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <div className="flex items-center gap-2">
          <Users className="w-4 h-4 sm:w-5 sm:h-5 text-sky-500" />
          <h2 className="font-medium text-gray-100 text-sm sm:text-base">People</h2>
        </div>
        <button
          onClick={() => setIsAdding(true)}
          className="p-1 sm:p-1.5 hover:bg-gray-800 rounded-lg text-gray-400 hover:text-gray-100"
        >
          <Plus size={18} className="sm:w-5 sm:h-5" />
        </button>
      </div>

      {isAdding && (
        <form onSubmit={handleSubmit} className="mb-3 sm:mb-4">
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder="Person's name"
            className="w-full p-2 bg-gray-800 border border-gray-700 rounded-lg mb-2 text-gray-100 placeholder-gray-500 focus:outline-none focus:border-sky-500 text-sm sm:text-base"
            autoFocus
          />
          <div className="flex gap-2">
            <button
              type="submit"
              className="px-2 sm:px-3 py-1 sm:py-1.5 bg-sky-500 text-white rounded-lg text-sm hover:bg-sky-400"
            >
              Add
            </button>
            <button
              type="button"
              onClick={() => setIsAdding(false)}
              className="px-2 sm:px-3 py-1 sm:py-1.5 bg-gray-800 text-gray-300 rounded-lg text-sm hover:bg-gray-700"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {personToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-slate-800 p-4 rounded-lg max-w-sm w-full mx-4">
            <h3 className="text-gray-100 text-lg mb-4">Confirm Delete</h3>
            <p className="text-gray-300 mb-6">Are you sure you want to delete this person?</p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setPersonToDelete(null)}
                className="px-4 py-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-1.5 sm:space-y-2">
        {people.map((person) => (
          <div
            key={person.id}
            className={`w-full p-2 sm:p-3 rounded-lg flex justify-between items-start ${
              selectedPersonId === person.id
                ? 'bg-sky-500/10 border border-sky-500/20 text-sky-400'
                : 'hover:bg-gray-800 border border-transparent'
            }`}
          >
            <button
              onClick={() => onSelectPerson(person)}
              className="text-left flex-1"
            >
              <div className="font-medium flex text-sm sm:text-base">
                {person.name}
              </div>
              <div className={`text-xs sm:text-sm ${
                selectedPersonId === person.id ? 'text-sky-300/70' : 'text-gray-400'
              }`}>
                Due: ₹{person.totalDue.toFixed(2)}
              </div>
            </button>
            
            <div>
              <button
                onClick={(e) => handleDeleteClick(e, person.id)}
                className="p-1 sm:p-1.5 hover:bg-gray-700 rounded-lg text-gray-400 hover:text-red-400"
              >
                <Minus size={14} className="sm:w-4 sm:h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// import { Delete, Minus, Plus, Users } from 'lucide-react';
// import { useState } from 'react';

// interface person {
//   id: string;
//   name: string;
//   totalDue: number;
// }

// interface PersonListProps {
//   people: person[];
//   onSelectPerson: (person: person) => void;
//   onAddPerson: (name: string) => void;
//   onDeletePerson: (id: string) => void;
//   selectedPersonId?: string;
// }

// export function PersonList({ 
//   people, 
//   onSelectPerson, 
//   onAddPerson, 
//   onDeletePerson, 
//   selectedPersonId 
// }: PersonListProps) {
//   const [isAdding, setIsAdding] = useState(false);
//   const [newName, setNewName] = useState('');

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (newName.trim()) {
//       onAddPerson(newName.trim());
//       setNewName('');
//       setIsAdding(false);
//     }
//   };

//   return (
//     <div className="w-full sm:w-80 bg-slate-900 p-3 sm:p-4 rounded-xl border border-gray-800">
//       <div className="flex items-center justify-between mb-4 sm:mb-6">
//         <div className="flex items-center gap-2">
//           <Users className="w-4 h-4 sm:w-5 sm:h-5 text-sky-500" />
//           <h2 className="font-medium text-gray-100 text-sm sm:text-base">People</h2>
//         </div>
//         <button
//           onClick={() => setIsAdding(true)}
//           className="p-1 sm:p-1.5 hover:bg-gray-800 rounded-lg text-gray-400 hover:text-gray-100"
//         >
//           <Plus size={18} className="sm:w-5 sm:h-5" />
//         </button>
//       </div>

//       {isAdding && (
//         <form onSubmit={handleSubmit} className="mb-3 sm:mb-4">
//           <input
//             type="text"
//             value={newName}
//             onChange={(e) => setNewName(e.target.value)}
//             placeholder="person's name"
//             className="w-full p-2 bg-gray-800 border border-gray-700 rounded-lg mb-2 text-gray-100 placeholder-gray-500 focus:outline-none focus:border-sky-500 text-sm sm:text-base"
//             autoFocus
//           />
//           <div className="flex gap-2">
//             <button
//               type="submit"
//               className="px-2 sm:px-3 py-1 sm:py-1.5 bg-sky-500 text-white rounded-lg text-sm hover:bg-sky-400"
//             >
//               Add
//             </button>
//             <button
//               type="button"
//               onClick={() => setIsAdding(false)}
//               className="px-2 sm:px-3 py-1 sm:py-1.5 bg-gray-800 text-gray-300 rounded-lg text-sm hover:bg-gray-700"
//             >
//               Cancel
//             </button>
//           </div>
//         </form>
//       )}

//       <div className="space-y-1.5 sm:space-y-2">
//         {people.map((person) => (
//           <div
//             key={person.id}
//             className={`w-full p-2 sm:p-3 rounded-lg flex justify-between items-start ${selectedPersonId === person.id
//                 ? 'bg-sky-500/10 border border-sky-500/20 text-sky-400'
//                 : 'hover:bg-gray-800 border border-transparent'
//               }`}
//           >
//             <button
//               onClick={() => onSelectPerson(person)}
//               className="text-left flex-1"
//             >
//               <div className="font-medium flex text-sm sm:text-base">
//                 {person.name}
//               </div>
//               <div className={`text-xs sm:text-sm ${selectedPersonId === person.id ? 'text-sky-300/70' : 'text-gray-400'
//                 }`}>
//                 Due: ${person.totalDue.toFixed(2)}
//               </div>
//             </button>
            
//             <div>
//               <button
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   onDeletePerson(person.id);
//                 }}
//                 className="p-1 sm:p-1.5 hover:bg-gray-700 rounded-lg text-gray-400 hover:text-red-400"
//               >
//                 <Minus size={14} className="sm:w-4 sm:h-4" />
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }