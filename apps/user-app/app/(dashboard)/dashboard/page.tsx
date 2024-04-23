import React from 'react';
import { OnRampTransactions } from '../../../components/OnRampTransactions';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../lib/auth';
import prisma from '@repo/db/client';

const Dashboard = async () => {
    interface Transaction {
        time: Date;
        amount: number;
        status: string;
        provider: string;
    }
    async function getOnRampTransactions() {
        const session = await getServerSession(authOptions);
        const txns = await prisma.onRampTransaction.findMany({
            where: {
                userId: Number(session?.user?.id)
            }
        });
        return txns.map((t): Transaction => ({
            time: t.startTime,
            amount: t.amount,
            status: t.status,
            provider: t.provider
        }))
    }
    const transactions = await getOnRampTransactions();
  return (
      <div className="container mx-auto p-4">
         
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-white p-4 shadow rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Balance</h2>
          <p className="text-2xl font-bold text-green-500">$0</p>
        </div>
        <div className="bg-white p-4 shadow rounded-lg">
                  <h2 className="text-xl font-semibold mb-2">Transactions</h2>
                  <div className="pt-4">
                    <OnRampTransactions transactions={transactions} />
                </div>
         
        </div>
        <div className="bg-white p-4 shadow rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Charts</h2>
          <p>Chart</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
