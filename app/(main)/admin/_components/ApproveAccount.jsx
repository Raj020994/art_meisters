import React from 'react';

const ApproveAccount = ({ users }) => {
  const pendingUsers = users?.filter(
    (user) => user.Status === "pending"
  );

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8">
      <div>
        <h2 className="text-3xl font-serif text-white mb-2">
          Manage Accounts
        </h2>
        <p className="text-gray-400 text-sm">
          Review and manage account registrations.
        </p>
      </div>

      <div className="space-y-4">
        {pendingUsers?.map((user) => (
          <div
            key={user.ID}
            className="group p-5 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-lg hover:bg-white/10 transition-all duration-300 flex flex-col md:flex-row justify-between items-start md:items-center gap-5"
          >
            <div className="flex items-center gap-4">
              <img
                src={
                  user.Image?.Valid
                    ? user.Image.String
                    : "/default.jpeg"
                }
                alt={user.Name}
                className="w-14 h-14 rounded-full object-cover border border-white/10"
              />

              <div className="space-y-1">
                <h3 className="text-lg text-white font-semibold">
                  {user.Name}
                </h3>

                <p className="text-sm text-gray-400">
                  {user.Email}
                </p>

                <div className="flex gap-3 text-xs">
                  <span className="px-2 py-1 rounded-full bg-red-500/20 text-red-300">
                    {user.Role}
                  </span>

                  <span className="text-gray-500">
                    {new Date(user.CreatedAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex gap-3 w-full md:w-auto">
              <button className="flex-1 md:flex-none px-4 py-2 rounded-xl border border-red-500/40 text-red-400 hover:bg-red-500/10 transition">
                Reject
              </button>

              <button className="flex-1 md:flex-none px-4 py-2 rounded-xl bg-red-600 text-white hover:bg-red-500 transition">
                Approve
              </button>
            </div>
          </div>
        ))}

        {pendingUsers?.length === 0 && (
          <div className="text-center py-12 text-gray-500 border border-white/10 rounded-2xl bg-white/5 border-dashed">
            No pending accounts to review.
          </div>
        )}
      </div>
    </div>
  );

};

export default ApproveAccount;
