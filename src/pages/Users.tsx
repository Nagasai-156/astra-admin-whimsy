import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Filter, Ban, CheckCircle, MoreVertical } from "lucide-react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

const users = [
  {
    id: 1,
    name: "Alice Johnson",
    email: "alice@example.com",
    status: "active",
    problems: 45,
    submissions: 128,
    joined: "Jan 2024",
  },
  {
    id: 2,
    name: "Bob Smith",
    email: "bob@example.com",
    status: "active",
    problems: 32,
    submissions: 89,
    joined: "Feb 2024",
  },
  {
    id: 3,
    name: "Carol White",
    email: "carol@example.com",
    status: "blocked",
    problems: 12,
    submissions: 34,
    joined: "Mar 2024",
  },
  {
    id: 4,
    name: "David Brown",
    email: "david@example.com",
    status: "active",
    problems: 67,
    submissions: 201,
    joined: "Jan 2024",
  },
];

export default function Users() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <DashboardLayout>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="space-y-6"
      >
        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold text-gradient mb-2">
            User Management
          </h1>
          <p className="text-muted-foreground">
            View and manage all registered users
          </p>
        </div>

        {/* Search Bar */}
        <div className="funky-card p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Search users by name or email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-12 rounded-2xl"
              />
            </div>
            <Button
              variant="outline"
              className="h-12 px-6 rounded-2xl border-2 hover:border-primary hover:bg-primary/5"
            >
              <Filter className="w-5 h-5 mr-2" />
              Filters
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { label: "Total Users", value: "2,547", color: "primary" },
            { label: "Active Users", value: "2,134", color: "secondary" },
            { label: "Blocked Users", value: "13", color: "destructive" },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="funky-card p-6"
            >
              <h3 className="text-3xl font-bold mb-1">{stat.value}</h3>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Users Table */}
        <div className="funky-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="text-left p-4 font-semibold">User</th>
                  <th className="text-left p-4 font-semibold">Status</th>
                  <th className="text-left p-4 font-semibold">Problems</th>
                  <th className="text-left p-4 font-semibold">Submissions</th>
                  <th className="text-left p-4 font-semibold">Joined</th>
                  <th className="text-left p-4 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <motion.tr
                    key={user.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="border-b border-border hover:bg-muted/30 transition-colors duration-200"
                  >
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <Avatar className="w-10 h-10 border-2 border-primary/20">
                          <AvatarImage src="/placeholder.svg" />
                          <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                            {user.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{user.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {user.email}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <Badge
                        className={`rounded-full ${
                          user.status === "active"
                            ? "bg-primary/10 text-primary"
                            : "bg-destructive/10 text-destructive"
                        }`}
                      >
                        {user.status}
                      </Badge>
                    </td>
                    <td className="p-4">
                      <span className="font-semibold">{user.problems}</span>
                    </td>
                    <td className="p-4">
                      <span className="font-semibold">{user.submissions}</span>
                    </td>
                    <td className="p-4">
                      <span className="text-muted-foreground">
                        {user.joined}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        {user.status === "active" ? (
                          <Button
                            variant="outline"
                            size="icon"
                            className="w-9 h-9 rounded-xl hover:bg-destructive hover:text-destructive-foreground"
                          >
                            <Ban className="w-4 h-4" />
                          </Button>
                        ) : (
                          <Button
                            variant="outline"
                            size="icon"
                            className="w-9 h-9 rounded-xl hover:bg-primary hover:text-primary-foreground"
                          >
                            <CheckCircle className="w-4 h-4" />
                          </Button>
                        )}
                        <Button
                          variant="outline"
                          size="icon"
                          className="w-9 h-9 rounded-xl"
                        >
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </motion.div>
    </DashboardLayout>
  );
}
