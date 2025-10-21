import { motion } from "framer-motion";
import { Bell, Shield, Palette, Globe } from "lucide-react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

const settingsGroups = [
  {
    icon: Bell,
    title: "Notifications",
    settings: [
      { id: "email-notif", label: "Email Notifications", enabled: true },
      { id: "push-notif", label: "Push Notifications", enabled: false },
      { id: "weekly-report", label: "Weekly Reports", enabled: true },
    ],
  },
  {
    icon: Shield,
    title: "Security",
    settings: [
      { id: "2fa", label: "Two-Factor Authentication", enabled: false },
      { id: "session-timeout", label: "Auto Session Timeout", enabled: true },
      { id: "login-alerts", label: "Login Alerts", enabled: true },
    ],
  },
  {
    icon: Palette,
    title: "Appearance",
    settings: [
      { id: "dark-mode", label: "Dark Mode", enabled: false },
      { id: "compact-view", label: "Compact View", enabled: false },
      { id: "animations", label: "Animations", enabled: true },
    ],
  },
  {
    icon: Globe,
    title: "Platform",
    settings: [
      { id: "maintenance", label: "Maintenance Mode", enabled: false },
      { id: "public-signup", label: "Public Signup", enabled: true },
      { id: "api-access", label: "API Access", enabled: true },
    ],
  },
];

export default function Settings() {
  return (
    <DashboardLayout>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="space-y-6 max-w-4xl"
      >
        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold text-gradient mb-2">Settings</h1>
          <p className="text-muted-foreground">
            Manage your admin panel preferences
          </p>
        </div>

        {/* Settings Groups */}
        <div className="space-y-6">
          {settingsGroups.map((group, groupIndex) => (
            <motion.div
              key={group.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: groupIndex * 0.1 }}
              className="funky-card p-6"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                  <group.icon className="w-6 h-6 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">{group.title}</h2>
              </div>

              <div className="space-y-4">
                {group.settings.map((setting, settingIndex) => (
                  <motion.div
                    key={setting.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: groupIndex * 0.1 + settingIndex * 0.05,
                    }}
                    className="flex items-center justify-between p-4 rounded-2xl hover:bg-muted/50 transition-colors duration-200"
                  >
                    <Label
                      htmlFor={setting.id}
                      className="text-base font-medium cursor-pointer"
                    >
                      {setting.label}
                    </Label>
                    <Switch id={setting.id} defaultChecked={setting.enabled} />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </DashboardLayout>
  );
}
