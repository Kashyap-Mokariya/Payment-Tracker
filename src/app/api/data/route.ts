// app/api/data/route.ts
import { db } from '@/server/db';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const people = await db.person.findMany();
        const debts = await db.debt.findMany();
        return NextResponse.json({ people, debts });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    const data = await request.json();
    const { action, ...payload } = data;

    try {
        switch (action) {
            case 'addPerson':
                const person = await db.person.create({
                    data: {
                        name: payload.name,
                        totalDue: 0
                    }
                });
                return NextResponse.json(person);

            case 'addDebt':
                const newDebt = await db.debt.create({
                    data: {
                        amount: payload.amount,
                        description: payload.description,
                        date: new Date(payload.date),
                        personId: payload.personId,
                        isPaid: false
                    }
                });

                // Update person's total due
                await db.person.update({
                    where: { id: payload.personId },
                    data: {
                        totalDue: {
                            increment: payload.amount
                        }
                    }
                });

                return NextResponse.json(newDebt);

            case 'markPaid':
                const updatedDebt = await db.debt.update({
                    where: { id: payload.debtId },
                    data: {
                        isPaid: true,
                        paidDate: new Date()
                    }
                });

                // Update person's total due
                await db.person.update({
                    where: { id: payload.personId },
                    data: {
                        totalDue: {
                            decrement: payload.amount
                        }
                    }
                });

                return NextResponse.json(updatedDebt);
            
            case 'deletePerson':
                // Delete all associated debts first
                await db.debt.deleteMany({
                    where: {
                        personId: payload.personId
                    }
                });

                // Then delete the person
                const deletedPerson = await db.person.delete({
                    where: {
                        id: payload.personId
                    }
                });

                return NextResponse.json(deletedPerson);

            default:
                return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
        }
    } catch (error) {
        return NextResponse.json({ error: 'Operation failed' }, { status: 500 });
    }
}