"use client"
import { useEffect, useState } from 'react';
import { CircleDollarSign } from 'lucide-react';
import { PersonList } from '@/components/PersonList';
import { DebtList } from '@/components/DebtList';

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

export default function Home() {
  const [people, setPeople] = useState<person[]>([]);
  const [debts, setDebts] = useState<debt[]>([]);
  const [selectedPerson, setSelectedPerson] = useState<person | null>(null);

  useEffect(() => {
    async function loadData() {
      const response = await fetch('/api/data');
      const data = await response.json();
      setPeople(data.people);
      setDebts(data.debts.map((debt: debt) => ({
        ...debt,
        date: debt.date,
        paidDate: debt.paidDate
      })));
    }

    loadData();
  }, []);

  const handleAddPerson = async (name: string) => {
    const response = await fetch('/api/data', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'addPerson', name })
    });
    const newPerson = await response.json();
    setPeople([...people, newPerson]);
  };
  
  const handleDeletePerson = async (id: string) => {
    try {
      const response = await fetch('/api/data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'deletePerson',
          personId: id
        })
      });

      if (!response.ok) throw new Error('Failed to delete person');

      await response.json(); // Handle the response

      // Remove person from local state
      setPeople(people.filter(person => person.id !== id));

      // Remove associated debts from local state
      setDebts(debts.filter(debt => debt.personId !== id));

      // If the deleted person was selected, clear the selection
      if (selectedPerson?.id === id) {
        setSelectedPerson(null);
      }
    } catch (error) {
      console.error('Error deleting person:', error);
    }
  };

  const handleAddDebt = async (debt: Omit<debt, 'id' | 'isPaid' | 'paidDate'>) => {
    const response = await fetch('/api/data', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'addDebt', ...debt })
    });
    const newDebt = await response.json();
    setDebts([...debts, {
      ...newDebt,
      date: newDebt.date,
      paidDate: newDebt.paidDate
    }]);

    const updatedPerson = people.find(p => p.id === debt.personId);
    if (updatedPerson) {
      setPeople(people.map(person =>
        person.id === debt.personId
          ? { ...person, totalDue: person.totalDue + debt.amount }
          : person
      ));
    }
  };

  const handleMarkPaid = async (debtId: string) => {
    const debtToPay = debts.find(d => d.id === debtId);
    if (!debtToPay) return;

    const response = await fetch('/api/data', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'markPaid',
        debtId,
        personId: debtToPay.personId,
        amount: debtToPay.amount
      })
    });
    const updatedDebt = await response.json();

    setDebts(debts.map(d =>
      d.id === debtId
        ? { ...updatedDebt, date: updatedDebt.date, paidDate: updatedDebt.paidDate }
        : d
    ));

    setPeople(people.map(person =>
      person.id === debtToPay.personId
        ? { ...person, totalDue: person.totalDue - debtToPay.amount }
        : person
    ));
  };

  return (
    <div className="min-h-screen text-gray-100">
      <header className="border-b border-gray-800 bg-slate-900 backdrop-blur-xl sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <CircleDollarSign className="w-8 h-8 text-sky-500" />
            <h1 className="text-xl font-semibold text-gray-100">debt Tracker</h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex gap-8">
          <PersonList
            people={people}
            onSelectPerson={setSelectedPerson}
            onAddPerson={handleAddPerson}
            onDeletePerson={handleDeletePerson}
            selectedPersonId={selectedPerson?.id}
          />

          {selectedPerson ? (
            <DebtList
              person={selectedPerson}
              debts={debts}
              onAddDebt={handleAddDebt}
              onMarkPaid={handleMarkPaid}
            />
          ) : (
            <div className="flex-1 flex items-center justify-center bg-slate-900 p-8 rounded-xl border border-gray-800">
              <p className="text-gray-400 text-lg">
                Select a person to view or add debts
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}


// "use client"
// import { useEffect, useState } from 'react';
// import { CircleDollarSign } from 'lucide-react';
// import { db } from '@/server/db';
// import { PersonList } from '@/components/PersonList';
// import { DebtList } from '@/components/DebtList';

// // Define interfaces for person and debt
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

// export default async function Home() {
//   const [people, setPeople] = useState<person[]>([]);
//   const [debts, setDebts] = useState<debt[]>([]);
//   const [selectedPerson, setSelectedPerson] = useState<person | null>(null);

//   // Load data from database on mount
//   useEffect(() => {
//     async function loadData() {
//       const dbPeople = await db.person.findMany();
//       const dbDebts = await db.debt.findMany();

//       setPeople(dbPeople);
//       setDebts(dbDebts.map(debt => ({
//         ...debt,
//         date: debt.date.toISOString(),
//         paidDate: debt.paidDate?.toISOString()
//       })));
//     }

//     loadData();
//   }, []);

//   const handleAddPerson = async (name: string) => {
//     const newPerson = await db.person.create({
//       data: {
//         name,
//         totalDue: 0,
//       }
//     });
//     setPeople([...people, newPerson]);
//   };

//   const handleAddDebt = async (debt: Omit<debt, 'id' | 'isPaid' | 'paidDate'>) => {
//     const newDebt = await db.debt.create({
//       data: {
//         amount: debt.amount,
//         description: debt.description,
//         date: new Date(debt.date),
//         personId: debt.personId,
//         isPaid: false,
//       }
//     });

//     setDebts([...debts, {
//       ...newDebt,
//       date: newDebt.date.toISOString(),
//       paidDate: newDebt.paidDate?.toISOString()
//     }]);

//     // Update person's total due
//     await db.person.update({
//       where: { id: debt.personId },
//       data: {
//         totalDue: {
//           increment: debt.amount
//         }
//       }
//     });

//     setPeople(people.map(person =>
//       person.id === debt.personId
//         ? { ...person, totalDue: person.totalDue + debt.amount }
//         : person
//     ));
//   };

//   const handleMarkPaid = async (debtId: string) => {
//     const debt = await db.debt.update({
//       where: { id: debtId },
//       data: {
//         isPaid: true,
//         paidDate: new Date()
//       }
//     });

//     setDebts(debts.map(d =>
//       d.id === debtId
//         ? { ...debt, date: debt.date.toISOString(), paidDate: debt.paidDate?.toISOString() }
//         : d
//     ));

//     // Update person's total due
//     const paidDebt = debts.find(d => d.id === debtId);
//     if (paidDebt) {
//       await db.person.update({
//         where: { id: paidDebt.personId },

//         data: {
//           totalDue: {
//             decrement: paidDebt.amount
//           }
//         }
//       });

//       setPeople(people.map(person =>
//         person.id === paidDebt.personId
//           ? { ...person, totalDue: person.totalDue - paidDebt.amount }
//           : person
//       ));
//     }
//   };

//   return (
//     <div className="min-h-screen text-gray-100">
//       <header className="border-b border-gray-800 bg-slate-900 backdrop-blur-xl sticky top-0 z-10">
//         <div className="max-w-7xl mx-auto px-4 py-4">
//           <div className="flex items-center gap-3">
//             <CircleDollarSign className="w-8 h-8 text-sky-500" />
//             <h1 className="text-xl font-semibold text-gray-100">debt Tracker</h1>
//           </div>
//         </div>
//       </header>

//       <main className="max-w-7xl mx-auto px-4 py-8">
//         <div className="flex gap-8">
//           <PersonList
//             people={people}
//             onSelectPerson={setSelectedPerson}
//             onAddPerson={handleAddPerson}
//             selectedPersonId={selectedPerson?.id}
//           />

//           {selectedPerson ? (
//             <DebtList
//               person={selectedPerson}
//               debts={debts}
//               onAddDebt={handleAddDebt}
//               onMarkPaid={handleMarkPaid}
//             />
//           ) : (
//             <div className="flex-1 flex items-center justify-center bg-slate-900 p-8 rounded-xl border border-gray-800">
//               <p className="text-gray-400 text-lg">
//                 Select a person to view or add debts
//               </p>
//             </div>
//           )}
//         </div>
//       </main>
//     </div>
//   );
// }
