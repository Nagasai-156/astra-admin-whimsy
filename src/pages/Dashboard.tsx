import { motion } from "framer-motion";
import {
  Users,
  Code2,
  TrendingUp,
  Activity,
  Award,
  Zap,
  Target,
  Clock,
} from "lucide-react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";

const stats = [
  {
    icon: Users,
    label: "Total Users",
    value: "2,547",
    change: "+12.5%",
    color: "from-primary to-primary-glow",
  },
  {
    icon: Code2,
    label: "Total Problems",
    value: "342",
    change: "+8.2%",
    color: "from-secondary to-accent",
  },
  {
    icon: Activity,
    label: "Daily Submissions",
    value: "1,892",
    change: "+23.1%",
    color: "from-accent to-secondary",
  },
  {
    icon: Award,
    label: "Problems Solved",
    value: "45,234",
    change: "+15.7%",
    color: "from-primary to-secondary",
  },
];

const languages = [
  { name: "Verilog", count: 856, color: "bg-primary" },
  { name: "VHDL", count: 723, color: "bg-secondary" },
  { name: "SystemVerilog", count: 645, color: "bg-accent" },
  { name: "Python", count: 534, color: "bg-primary/60" },
  { name: "C++", count: 423, color: "bg-secondary/60" },
];

const recentActivity = [
  { user: "Alice Smith", action: "Solved Problem #234", time: "2 mins ago" },
  { user: "Bob Johnson", action: "Added new problem", time: "15 mins ago" },
  { user: "Carol White", action: "Updated testcases", time: "1 hour ago" },
  { user: "David Brown", action: "Blocked user", time: "2 hours ago" },
];

export default function Dashboard() {
  return (
    <DashboardLayout>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="space-y-8"
      >
        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold text-gradient mb-2">
            Welcome Back, Admin! 👋
          </h1>
          <p className="text-muted-foreground">
            Here's what's happening with your platform today
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02, y: -4 }}
              className="funky-card p-6"
            >
              <div className="flex items-start justify-between mb-4">
                <div
                  className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-lg`}
                >
                  <stat.icon className="w-7 h-7 text-white" />
                </div>
                <span className="text-sm font-semibold text-primary">
                  {stat.change}
                </span>
              </div>
              <h3 className="text-3xl font-bold mb-1">{stat.value}</h3>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Language Usage */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="funky-card p-6"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <Zap className="w-5 h-5 text-primary" />
              </div>
              <h2 className="text-xl font-bold">Language Usage</h2>
            </div>
            <div className="space-y-4">
              {languages.map((lang, index) => (
                <motion.div
                  key={lang.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">{lang.name}</span>
                    <span className="text-sm text-muted-foreground">
                      {lang.count} problems
                    </span>
                  </div>
                  <div className="h-3 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{
                        width: `${(lang.count / languages[0].count) * 100}%`,
                      }}
                      transition={{ delay: 0.6 + index * 0.1, duration: 0.6 }}
                      className={`h-full ${lang.color} rounded-full`}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="funky-card p-6"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center">
                <Clock className="w-5 h-5 text-secondary" />
              </div>
              <h2 className="text-xl font-bold">Recent Activity</h2>
            </div>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="flex items-start gap-3 p-3 rounded-xl hover:bg-muted/50 transition-colors duration-300 cursor-pointer"
                >
                  <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                  <div className="flex-1">
                    <p className="font-medium text-sm">{activity.user}</p>
                    <p className="text-sm text-muted-foreground">
                      {activity.action}
                    </p>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {activity.time}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="funky-card p-6"
        >
          <h2 className="text-xl font-bold mb-6">Quick Actions</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: Code2, label: "Add Problem", color: "primary", path: "/problems/add" },
              { icon: Users, label: "View Users", color: "secondary", path: "/users" },
              { icon: Target, label: "Analytics", color: "accent", path: "/dashboard" },
              { icon: TrendingUp, label: "Reports", color: "primary", path: "/dashboard" },
            ].map((action, index) => (
              <motion.button
                key={action.label}
                whileHover={{ scale: 1.05, y: -4 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.location.href = action.path}
                className="p-4 rounded-2xl bg-muted hover:bg-primary hover:text-primary-foreground transition-all duration-300 group"
              >
                <action.icon className="w-8 h-8 mx-auto mb-2 group-hover:animate-bounce-in" />
                <p className="text-sm font-medium">{action.label}</p>
              </motion.button>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </DashboardLayout>
  );
}
