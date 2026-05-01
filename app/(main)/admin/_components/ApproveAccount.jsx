import React from 'react';

const ApproveAccount = () => {
  const dummyAccounts = [
    { id: 1, name: 'Alice Smith', email: 'alice@example.com', role: 'Artist', date: '2026-05-01' },
    { id: 2, name: 'Bob Johnson', email: 'bob@example.com', role: 'Curator', date: '2026-04-28' },
  ];

  return (
    <div className="space-y-6 w-full max-w-4xl mx-auto">
      <div>
        <h2 className="text-3xl font-serif text-white mb-2">Pending Accounts</h2>
        <p className="text-gray-400 text-sm">Review and manage account registrations.</p>
      </div>

      <div className="space-y-4">
        {dummyAccounts.map((account) => (
          <div key={account.id} className="p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="space-y-1">
              <h3 className="text-xl text-white font-medium">{account.name}</h3>
              <p className="text-sm text-gray-400">{account.email} • <span className="text-red-400">{account.role}</span></p>
              <p className="text-xs text-gray-500">Registered on {account.date}</p>
            </div>
            <div className="flex items-center gap-3 w-full md:w-auto">
              <button className="flex-1 md:flex-none px-4 py-2 rounded-lg border border-red-500/50 text-red-400 hover:bg-red-500/10 transition-colors text-sm font-medium">
                Reject
              </button>
              <button className="flex-1 md:flex-none px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-500 transition-colors text-sm font-medium">
                Approve
              </button>
            </div>
          </div>
        ))}

        {dummyAccounts.length === 0 && (
          <div className="text-center py-12 text-gray-500 border border-white/5 rounded-2xl bg-white/5 border-dashed">
            No pending accounts to review.
          </div>
        )}
      </div>
    </div>
  );
};

export default ApproveAccount;
