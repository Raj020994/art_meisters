"use client";

import { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  MoreVertical,
  Shield,
  ShieldAlert,
  Ban,
  Search,
  Users,
  ShieldCheck,
  AlertCircle,
  UserCheck,
  UserX,
  RotateCcw,
} from "lucide-react";
import useFetch from "@/hooks/useFetch";
import { changeUserRoleStatus } from "@/service/admin";
import { useAuthStore } from "@/store/user";
import { toast } from "sonner";

const ManageAccount = ({ users }) => {
  const currUser = useAuthStore((state) => state.user);
  const [userList, setUserList] = useState(() =>
    (users || []).filter((u) => u.ID !== currUser?.ID),
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const {
    data,
    fn: changeFn,
    loading: updating,
  } = useFetch(changeUserRoleStatus);

  const [pendingUpdate, setPendingUpdate] = useState(null);

  const updateUser = (id, updates) => {
    setUserList((prev) =>
      prev.map((user) => (user.ID === id ? { ...user, ...updates } : user)),
    );
  };

  const handleApprove = (id) => {
    setPendingUpdate({
      id,
      updates: { Status: "approved" },
    });

    changeFn(id, { status: "approved" });
  };

  const handleReject = (id) => {
    setPendingUpdate({
      id,
      updates: { Status: "rejected" },
    });

    changeFn(id, { status: "rejected" });
  };

  const handleRoleToggle = (id, currentRole) => {
    const user = userList.find((u) => u.ID === id);
    if (user?.Status !== "approved"){
      toast.error("User must be approved before changing role");
      return;
    }
    const newRole = currentRole === "admin" ? "user" : "admin";
    setPendingUpdate({
      id,
      updates: { Role: newRole },
    });

    changeFn(id, { role: newRole });
  };

  const handleBanToggle = (id, currentStatus) => {
    const newStatus = currentStatus === "banned" ? "approved" : "banned";

    setPendingUpdate({
      id,
      updates: { Status: newStatus },
    });

    changeFn(id, { status: newStatus });
  };

  useEffect(() => {
    if (!updating && data?.Success && pendingUpdate) {
      updateUser(pendingUpdate.id, pendingUpdate.updates);

      setPendingUpdate(null);
    }
  }, [data, updating, pendingUpdate]);
  let totalUsers = userList.length;
  let pendingUsers = userList.filter((u) => u.Status === "pending").length;
  let adminUsers = userList.filter((u) => u.Role === "admin").length;
  let bannedUsers = userList.filter((u) => u.Status === "banned").length;
  useEffect(() => {
    totalUsers = userList.length;
    pendingUsers = userList.filter((u) => u.Status === "pending").length;
    adminUsers = userList.filter((u) => u.Role === "admin").length;
    bannedUsers = userList.filter((u) => u.Status === "banned").length;
  }, [users]);

  const filteredUsers = userList.filter((user) => {
    const matchesSearch =
      (user.Name || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (user.Email || "").toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = roleFilter === "all" ? true : user.Role === roleFilter;
    const matchesStatus =
      statusFilter === "all" ? true : user.Status === statusFilter;
    return matchesSearch && matchesRole && matchesStatus;
  });

  return (
    <div className="w-full max-w-6xl mx-auto space-y-8 animate-fade-in">
      <div>
        <h2 className="text-3xl font-serif text-white mb-2 tracking-wide">
          Manage Users
        </h2>
        <p className="text-gray-400 text-sm">
          Approve, reject, promote, demote, or ban user accounts from a
          centralized control panel.
        </p>
      </div>

      {/* Metrics Section */}
      <div className="flex flex-wrap gap-2.5 pt-1">
        <Badge
          variant="outline"
          className="px-3 py-1 bg-white/5 border-white/10 text-gray-300 text-xs font-normal gap-1.5 rounded-xl"
        >
          <Users className="w-3.5 h-3.5 text-red-500" />
          <span>Total Users:</span>
          <span className="font-semibold text-white">{totalUsers}</span>
        </Badge>

        <Badge
          variant="outline"
          className="px-3 py-1 bg-white/5 border-white/10 text-gray-300 text-xs font-normal gap-1.5 rounded-xl"
        >
          <AlertCircle className="w-3.5 h-3.5 text-red-500" />
          <span>Pending:</span>
          <span className="font-semibold text-white">{pendingUsers}</span>
        </Badge>

        <Badge
          variant="outline"
          className="px-3 py-1 bg-white/5 border-white/10 text-gray-300 text-xs font-normal gap-1.5 rounded-xl"
        >
          <ShieldCheck className="w-3.5 h-3.5 text-red-500" />
          <span>Admins:</span>
          <span className="font-semibold text-white">{adminUsers}</span>
        </Badge>

        <Badge
          variant="outline"
          className="px-3 py-1 bg-white/5 border-white/10 text-gray-300 text-xs font-normal gap-1.5 rounded-xl"
        >
          <Ban className="w-3.5 h-3.5 text-red-500" />
          <span>Banned:</span>
          <span className="font-semibold text-white">{bannedUsers}</span>
        </Badge>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-stretch md:items-center p-4 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search users by name or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 transition-all"
          />
        </div>

        <div className="flex flex-wrap gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-400 hidden sm:inline">
              Role:
            </span>
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-red-500/50"
            >
              <option value="all">All Roles</option>
              <option value="admin">Admin</option>
              <option value="user">User</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-400 hidden sm:inline">
              Status:
            </span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-red-500/50"
            >
              <option value="all">All</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
              <option value="banned">Banned</option>
            </select>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {filteredUsers.map((user) => {
          const getStatusBadge = (status) => {
            switch (status) {
              case "approved":
                return (
                  <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 capitalize font-medium">
                    {status}
                  </Badge>
                );
              case "pending":
                return (
                  <Badge className="bg-amber-500/10 text-amber-400 border-amber-500/20 capitalize font-medium">
                    {status}
                  </Badge>
                );
              case "rejected":
                return (
                  <Badge className="bg-red-500/10 text-red-400 border-red-500/20 capitalize font-medium">
                    {status}
                  </Badge>
                );
              case "banned":
                return (
                  <Badge className="bg-rose-900/25 text-rose-400 border-rose-900/50 capitalize font-medium">
                    {status}
                  </Badge>
                );
              default:
                return (
                  <Badge className="bg-gray-500/10 text-gray-400 border-gray-500/20 capitalize font-medium">
                    {status}
                  </Badge>
                );
            }
          };

          const getRoleBadge = (role) => {
            if (role === "admin") {
              return (
                <Badge className="bg-indigo-500/10 text-indigo-400 border-indigo-500/20 font-medium flex items-center gap-1">
                  <Shield className="w-3 h-3" /> Admin
                </Badge>
              );
            }
            return (
              <Badge className="bg-slate-500/10 text-slate-400 border-slate-500/20 font-medium">
                User
              </Badge>
            );
          };

          return (
            <div
              key={user.ID}
              className="p-5 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-lg hover:bg-white/10 hover:border-white/20 transition-all duration-300 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
            >
              <div className="flex items-center gap-4">
                <div className="relative">
                  <img
                    src={
                      user.Image?.Valid ? user.Image.String : "/default.jpeg"
                    }
                    alt={user.Name}
                    className="w-14 h-14 rounded-full object-cover border border-white/10 shadow-inner"
                  />
                  {user.Status === "approved" && (
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-black rounded-full" />
                  )}
                  {user.Status === "banned" && (
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-red-500 border-2 border-black rounded-full" />
                  )}
                  {user.Status === "pending" && (
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-amber-500 border-2 border-black rounded-full animate-pulse" />
                  )}
                </div>

                <div className="space-y-1.5">
                  <h3 className="text-lg font-semibold text-white tracking-wide">
                    {user.Name}
                  </h3>

                  <p className="text-sm text-gray-400">{user.Email}</p>

                  <div className="flex gap-2 flex-wrap items-center">
                    {getRoleBadge(user.Role)}
                    {getStatusBadge(user.Status)}
                  </div>
                </div>
              </div>

              <div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-gray-400 hover:text-white hover:bg-white/10 rounded-full h-9 w-9"
                    >
                      <MoreVertical className="w-5 h-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    className="bg-[#181818] border border-white/10 text-white rounded-xl shadow-2xl p-1.5 min-w-44"
                  >
                    <DropdownMenuLabel className="text-gray-400 text-xs px-2.5 py-1.5">
                      Actions
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator className="bg-white/10" />

                    {user.Status === "pending" && (
                      <>
                        <DropdownMenuItem
                          onClick={() => handleApprove(user.ID)}
                          className="flex items-center gap-2 px-2.5 py-2 hover:bg-emerald-500/10 hover:text-emerald-400 rounded-lg cursor-pointer"
                        >
                          <UserCheck className="w-4 h-4 text-emerald-400" />
                          <span>Approve User</span>
                        </DropdownMenuItem>

                        <DropdownMenuItem
                          onClick={() => handleReject(user.ID)}
                          className="flex items-center gap-2 px-2.5 py-2 hover:bg-red-500/10 hover:text-red-400 rounded-lg cursor-pointer"
                        >
                          <UserX className="w-4 h-4 text-red-400" />
                          <span>Reject User</span>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator className="bg-white/10" />
                      </>
                    )}

                    {user.Status !== "pending" && (
                      <DropdownMenuItem
                        onClick={() => handleRoleToggle(user.ID, user.Role)}
                        className="flex items-center gap-2 px-2.5 py-2 hover:bg-indigo-500/10 hover:text-indigo-400 rounded-lg cursor-pointer"
                      >
                        {user.Role === "admin" ? (
                          <>
                            <ShieldAlert className="w-4 h-4 text-indigo-400" />
                            <span>Make User</span>
                          </>
                        ) : (
                          <>
                            <Shield className="w-4 h-4 text-indigo-400" />
                            <span>Make Admin</span>
                          </>
                        )}
                      </DropdownMenuItem>
                    )}

                    <DropdownMenuItem
                      onClick={() => handleBanToggle(user.ID, user.Status)}
                      className={`flex items-center gap-2 px-2.5 py-2 rounded-lg cursor-pointer ${
                        user.Status === "banned"
                          ? "hover:bg-emerald-500/10 hover:text-emerald-400"
                          : "hover:bg-rose-950/40 hover:text-rose-400"
                      }`}
                    >
                      {user.Status === "banned" ? (
                        <>
                          <RotateCcw className="w-4 h-4 text-emerald-400" />
                          <span>Unban User</span>
                        </>
                      ) : (
                        <>
                          <Ban className="w-4 h-4 text-rose-400" />
                          <span>Ban User</span>
                        </>
                      )}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          );
        })}

        {filteredUsers.length === 0 && (
          <div className="text-center py-16 text-gray-500 border border-white/5 rounded-2xl bg-white/5 border-dashed">
            No users match the search/filter criteria.
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageAccount;
