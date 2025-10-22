import { useState } from "react";
import { motion } from "framer-motion";
import { Camera, Save, Trash2 } from "lucide-react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";

export default function Profile() {
  const [formData, setFormData] = useState({
    name: "Admin User",
    email: "admin@electroastra.com",
    phone: "+1 234 567 8900",
    role: "Super Admin",
  });

  const handleSave = () => {
    toast.success("Profile updated successfully!");
  };

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete your account?")) {
      toast.error("Account deleted!");
    }
  };

  return (
    <DashboardLayout>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-3xl space-y-6"
      >
        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold text-gradient mb-2">
            Profile Settings
          </h1>
          <p className="text-muted-foreground">
            Manage your account details and preferences
          </p>
        </div>

        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="funky-card p-8"
        >
          {/* Avatar Section */}
          <div className="flex flex-col items-center mb-8">
            <motion.div
              whileHover={{ scale: 1.05 }}
              onClick={() => {
                const input = document.createElement('input');
                input.type = 'file';
                input.accept = 'image/*';
                input.onchange = (e) => {
                  const file = (e.target as HTMLInputElement).files?.[0];
                  if (file) {
                    toast.success("Profile photo updated!");
                  }
                };
                input.click();
              }}
              className="relative group cursor-pointer"
            >
              <Avatar className="w-32 h-32 border-4 border-primary/20 shadow-xl">
                <AvatarImage src="/placeholder.svg" />
                <AvatarFallback className="bg-gradient-cyber text-white text-3xl font-bold">
                  AD
                </AvatarFallback>
              </Avatar>
              <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Camera className="w-8 h-8 text-white" />
              </div>
            </motion.div>
            <p className="text-sm text-muted-foreground mt-4">
              Click to upload new photo
            </p>
          </div>

          {/* Form Fields */}
          <div className="space-y-6">
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="mt-2 h-12 rounded-2xl"
              />
            </div>

            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="mt-2 h-12 rounded-2xl"
              />
            </div>

            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                className="mt-2 h-12 rounded-2xl"
              />
            </div>

            <div>
              <Label htmlFor="role">Role</Label>
              <Input
                id="role"
                value={formData.role}
                disabled
                className="mt-2 h-12 rounded-2xl bg-muted"
              />
              <p className="text-xs text-muted-foreground mt-2">
                Role cannot be changed
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <Button
              onClick={handleSave}
              className="flex-1 h-12 rounded-2xl gradient-cyber text-white font-semibold hover:shadow-2xl hover:scale-105 transition-all duration-300"
            >
              <Save className="w-5 h-5 mr-2" />
              Save Changes
            </Button>
            <Button
              onClick={handleDelete}
              variant="outline"
              className="h-12 rounded-2xl border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground"
            >
              <Trash2 className="w-5 h-5 mr-2" />
              Delete Account
            </Button>
          </div>
        </motion.div>

        {/* Security Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="funky-card p-8"
        >
          <h2 className="text-2xl font-bold mb-4">Security</h2>
          <div className="space-y-4">
            <Button
              variant="outline"
              onClick={() => toast.info("Change password feature coming soon!")}
              className="w-full h-12 rounded-2xl justify-start"
            >
              Change Password
            </Button>
            <Button
              variant="outline"
              onClick={() => toast.info("2FA feature coming soon!")}
              className="w-full h-12 rounded-2xl justify-start"
            >
              Enable Two-Factor Authentication
            </Button>
            <Button
              variant="outline"
              onClick={() => toast.info("Login history feature coming soon!")}
              className="w-full h-12 rounded-2xl justify-start"
            >
              View Login History
            </Button>
          </div>
        </motion.div>
      </motion.div>
    </DashboardLayout>
  );
}
