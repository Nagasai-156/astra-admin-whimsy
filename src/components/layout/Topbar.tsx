import { motion } from "framer-motion";
import { Bell, Search } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

export const Topbar = () => {
  return (
    <motion.header
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-[280px] right-0 h-20 bg-card/80 backdrop-blur-lg border-b border-border px-8 flex items-center justify-between z-40"
    >
      {/* Search Bar */}
      <div className="flex-1 max-w-xl">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            placeholder="Search anything..."
            className="pl-12 h-12 rounded-2xl bg-muted/50 border-border focus:border-primary transition-all duration-300"
          />
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        {/* Notifications */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative w-12 h-12 rounded-2xl bg-muted flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all duration-300"
        >
          <Bell className="w-5 h-5" />
          <Badge className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center p-0 bg-accent text-accent-foreground text-xs">
            3
          </Badge>
        </motion.button>

        {/* Profile */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="flex items-center gap-3 px-4 py-2 rounded-2xl bg-muted cursor-pointer hover:bg-muted/70 transition-all duration-300"
        >
          <Avatar className="w-10 h-10 border-2 border-primary/20">
            <AvatarImage src="/placeholder.svg" />
            <AvatarFallback className="bg-primary text-primary-foreground font-semibold">
              AD
            </AvatarFallback>
          </Avatar>
          <div className="text-left">
            <p className="text-sm font-semibold">Admin User</p>
            <p className="text-xs text-muted-foreground">Super Admin</p>
          </div>
        </motion.div>
      </div>
    </motion.header>
  );
};
