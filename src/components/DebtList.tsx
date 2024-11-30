// import { format } from 'date-fns';
// import { Plus, Calendar, DollarSign, Check } from 'lucide-react';
// import { useState } from 'react';

// // Define interfaces for Person and Debt
// interface person {
//   id: string;
//   name: string;
//   totalDue: number;
// }

// interface debt {
//   id: string;
//   amount: number;
//   description: string;
//   date: string;
//   personId: string;
//   isPaid: boolean;
//   paidDate?: string;
// }

// interface DebtListProps {
//   person: person;
//   debts: debt[];
//   onAddDebt: (debt: Omit<debt, 'id' | 'isPaid' | 'paidDate'>) => void;
//   onMarkPaid: (debtId: string) => void;
// }

// export function DebtList({ person, debts, onAddDebt, onMarkPaid }: DebtListProps) {
//   const [isAdding, setIsAdding] = useState(false);
//   const [newDebt, setNewDebt] = useState({
//     amount: '',
//     description: '',
//     date: format(new Date(), 'yyyy-MM-dd'),
//   });

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (newDebt.amount && newDebt.description) {
//       onAddDebt({
//         personId: person.id,
//         amount: parseFloat(newDebt.amount),
//         description: newDebt.description,
//         date: newDebt.date,
//       });
//       setNewDebt({ amount: '', description: '', date: format(new Date(), 'yyyy-MM-dd') });
//       setIsAdding(false);
//     }
//   };

//   const personDebts = debts.filter((debt) => debt.personId === person.id);
//   const activeDebts = personDebts.filter((debt) => !debt.isPaid);
//   const paidDebts = personDebts.filter((debt) => debt.isPaid);

//   return (
//     <div className="flex-1 bg-slate-900 p-3 sm:p-6 rounded-xl border border-gray-800">
//       <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
//         <h2 className="text-xl font-medium text-gray-100">{person.name}'s Debts</h2>
//         <button
//           onClick={() => setIsAdding(true)}
//           className="flex items-center justify-center gap-2 px-4 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-400 w-full sm:w-auto"
//         >
//           <Plus size={20} />
//           Add debt
//         </button>
//       </div>

//       {isAdding && (
//         <form onSubmit={handleSubmit} className="mb-6 p-3 sm:p-4 border border-gray-800 rounded-xl bg-slate-900">
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
//             <div>
//               <label className="block text-sm font-medium mb-1 text-gray-300">Amount ($)</label>
//               <div className="relative">
//                 <DollarSign className="absolute left-3 top-2.5 h-5 w-5 text-gray-500" />
//                 <input
//                   type="number"
//                   step="0.01"
//                   value={newDebt.amount}
//                   onChange={(e) => setNewDebt({ ...newDebt, amount: e.target.value })}
//                   className="w-full pl-10 p-2 bg-gray-800 border border-gray-700 rounded-lg text-gray-100 focus:outline-none focus:border-sky-500"
//                   required
//                 />
//               </div>
//             </div>
//             <div>
//               <label className="block text-sm font-medium mb-1 text-gray-300">Date</label>
//               <div className="relative">
//                 <Calendar className="absolute left-3 top-2.5 h-5 w-5 text-gray-500" />
//                 <input
//                   type="date"
//                   value={newDebt.date}
//                   onChange={(e) => setNewDebt({ ...newDebt, date: e.target.value })}
//                   className="w-full pl-10 p-2 bg-gray-800 border border-gray-700 rounded-lg text-gray-100 focus:outline-none focus:border-sky-500"
//                   required
//                 />
//               </div>
//             </div>
//           </div>
//           <div className="mb-4">
//             <label className="block text-sm font-medium mb-1 text-gray-300">Description</label>
//             <input
//               type="text"
//               value={newDebt.description}
//               onChange={(e) => setNewDebt({ ...newDebt, description: e.target.value })}
//               className="w-full p-2 bg-gray-800 border border-gray-700 rounded-lg text-gray-100 focus:outline-none focus:border-sky-500"
//               required
//             />
//           </div>
//           <div className="flex flex-col sm:flex-row gap-2">
//             <button
//               type="submit"
//               className="w-full sm:w-auto px-4 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-400"
//             >
//               Add debt
//             </button>
//             <button
//               type="button"
//               onClick={() => setIsAdding(false)}
//               className="w-full sm:w-auto px-4 py-2 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700"
//             >
//               Cancel
//             </button>
//           </div>
//         </form>
//       )}

//       <div className="space-y-8">
//         <section>
//           <h3 className="text-lg font-medium mb-4 text-gray-100">Active Debts</h3>
//           <div className="space-y-2">
//             {activeDebts.map((debt) => (
//               <div
//                 key={debt.id}
//                 className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border border-gray-800 rounded-xl bg-slate-900 hover:bg-gray-900 gap-4"
//               >
//                 <div>
//                   <div className="font-medium text-gray-100">{debt.description}</div>
//                   <div className="text-sm text-gray-400">
//                     {format(new Date(debt.date), 'MMM d, yyyy')}
//                   </div>
//                 </div>
//                 <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
//                   <div className="font-medium text-gray-100">${debt.amount.toFixed(2)}</div>
//                   <button
//                     onClick={() => onMarkPaid(debt.id)}
//                     className="w-full sm:w-auto flex items-center justify-center gap-2 px-3 py-1.5 bg-green-500/10 text-green-400 rounded-lg hover:bg-green-500/20"
//                   >
//                     <Check size={16} />
//                     Mark Paid
//                   </button>
//                 </div>
//               </div>
//             ))}
//             {activeDebts.length === 0 && (
//               <p className="text-gray-500 text-center py-8">No active debts</p>
//             )}
//           </div>
//         </section>

//         <section>
//           <h3 className="text-lg font-medium mb-4 text-gray-100">Payment History</h3>
//           <div className="space-y-2">
//             {paidDebts.map((debt) => (
//               <div
//                 key={debt.id}
//                 className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl bg-gray-900/30 border border-gray-800/50 gap-4"
//               >
//                 <div>
//                   <div className="font-medium text-gray-300">{debt.description}</div>
//                   <div className="text-sm text-gray-500">
//                     Paid on {format(new Date(debt.paidDate!), 'MMM d, yyyy')}
//                   </div>
//                 </div>
//                 <div className="font-medium text-green-400">${debt.amount.toFixed(2)}</div>
//               </div>
//             ))}
//             {paidDebts.length === 0 && (
//               <p className="text-gray-500 text-center py-8">No payment history</p>
//             )}
//           </div>
//         </section>
//       </div>
//     </div>
//   );
// }

import { format } from 'date-fns';
import { Plus, Calendar, DollarSign, Check } from 'lucide-react';
import { useState } from 'react';

// Define interfaces for Person and Debt
interface person {
  id: string;
  name: string;
  totalDue: number;
}

interface debt {
  id: string;
  amount: number;
  description: string;
  date: string;
  personId: string;
  isPaid: boolean;
  paidDate?: string;
}

interface DebtListProps {
  person: person;
  debts: debt[];
  onAddDebt: (debt: Omit<debt, 'id' | 'isPaid' | 'paidDate'>) => void;
  onMarkPaid: (debtId: string) => void;
}

export function DebtList({ person, debts, onAddDebt, onMarkPaid }: DebtListProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [newDebt, setNewDebt] = useState({
    amount: '',
    description: '',
    date: format(new Date(), 'yyyy-MM-dd'),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newDebt.amount && newDebt.description) {
      onAddDebt({
        personId: person.id,
        amount: parseFloat(newDebt.amount),
        description: newDebt.description,
        date: newDebt.date,
      });
      setNewDebt({ amount: '', description: '', date: format(new Date(), 'yyyy-MM-dd') });
      setIsAdding(false);
    }
  };

  const personDebts = debts.filter((debt) => debt.personId === person.id);
  const activeDebts = personDebts.filter((debt) => !debt.isPaid);
  const paidDebts = personDebts.filter((debt) => debt.isPaid);

  return (
    <div className="flex-1 bg-slate-900 p-3 sm:p-6 rounded-xl border border-gray-800">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
        <h2 className="text-xl font-medium text-gray-100">{person.name}'s Debts</h2>
        <button
          onClick={() => setIsAdding(true)}
          className="flex items-center justify-center gap-2 px-4 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-400 w-full sm:w-auto"
        >
          <Plus size={20} />
          Add debt
        </button>
      </div>

      {isAdding && (
        <form onSubmit={handleSubmit} className="mb-6 p-3 sm:p-4 border border-gray-800 rounded-xl bg-slate-900">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-300">Amount ($)</label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-2.5 h-5 w-5 text-gray-500" />
                <input
                  type="number"
                  step="0.01"
                  value={newDebt.amount}
                  onChange={(e) => setNewDebt({ ...newDebt, amount: e.target.value })}
                  className="w-full pl-10 p-2 bg-gray-800 border border-gray-700 rounded-lg text-gray-100 focus:outline-none focus:border-sky-500"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-300">Date</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-2.5 h-5 w-5 text-gray-500" />
                <input
                  type="date"
                  value={newDebt.date}
                  onChange={(e) => setNewDebt({ ...newDebt, date: e.target.value })}
                  className="w-full pl-10 p-2 bg-gray-800 border border-gray-700 rounded-lg text-gray-100 focus:outline-none focus:border-sky-500"
                  required
                />
              </div>
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1 text-gray-300">Description</label>
            <input
              type="text"
              value={newDebt.description}
              onChange={(e) => setNewDebt({ ...newDebt, description: e.target.value })}
              className="w-full p-2 bg-gray-800 border border-gray-700 rounded-lg text-gray-100 focus:outline-none focus:border-sky-500"
              required
            />
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <button
              type="submit"
              className="w-full sm:w-auto px-4 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-400"
            >
              Add debt
            </button>
            <button
              type="button"
              onClick={() => setIsAdding(false)}
              className="w-full sm:w-auto px-4 py-2 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      <div className="space-y-8">
        <section>
          <h3 className="text-lg font-medium mb-4 text-gray-100">Active Debts</h3>
          <div className="space-y-2">
            {activeDebts.map((debt) => (
              <div
                key={debt.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border border-gray-800 rounded-xl bg-slate-900 hover:bg-gray-900 gap-4"
              >
                <div>
                  <div className="font-medium text-gray-100">{debt.description}</div>
                  <div className="text-sm text-gray-400">
                    {format(new Date(debt.date), 'dd/MM/yyyy')}
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <div className="font-medium text-gray-100">${debt.amount.toFixed(2)}</div>
                  <button
                    onClick={() => onMarkPaid(debt.id)}
                    className="w-full sm:w-auto flex items-center justify-center gap-2 px-3 py-1.5 bg-green-500/10 text-green-400 rounded-lg hover:bg-green-500/20"
                  >
                    <Check size={16} />
                    Mark Paid
                  </button>
                </div>
              </div>
            ))}
            {activeDebts.length === 0 && (
              <p className="text-gray-500 text-center py-8">No active debts</p>
            )}
          </div>
        </section>

        <section>
          <h3 className="text-lg font-medium mb-4 text-gray-100">Payment History</h3>
          <div className="space-y-2">
            {paidDebts.map((debt) => (
              <div
                key={debt.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl bg-gray-900/30 border border-gray-800/50 gap-4"
              >
                <div>
                  <div className="font-medium text-gray-300">{debt.description}</div>
                  <div className="text-sm text-gray-500">
                    Paid on {format(new Date(debt.paidDate!), 'dd/MM/yyyy')}
                  </div>
                </div>
                <div className="font-medium text-green-400">${debt.amount.toFixed(2)}</div>
              </div>
            ))}
            {paidDebts.length === 0 && (
              <p className="text-gray-500 text-center py-8">No payment history</p>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}