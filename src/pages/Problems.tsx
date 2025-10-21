import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Search, Filter, Edit, Trash2, Eye } from "lucide-react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

const problems = [
  {
    id: 1,
    title: "Two Sum Problem",
    language: "Python",
    difficulty: "Easy",
    tags: ["Array", "Hash Table"],
    submissions: 1234,
    solved: 892,
  },
  {
    id: 2,
    title: "Binary Search Tree",
    language: "C++",
    difficulty: "Medium",
    tags: ["Tree", "Binary Search"],
    submissions: 856,
    solved: 543,
  },
  {
    id: 3,
    title: "VHDL Full Adder",
    language: "VHDL",
    difficulty: "Easy",
    tags: ["Digital Logic", "Adder"],
    submissions: 623,
    solved: 478,
  },
  {
    id: 4,
    title: "Verilog Multiplexer",
    language: "Verilog",
    difficulty: "Medium",
    tags: ["Combinational Logic"],
    submissions: 445,
    solved: 321,
  },
];

const difficultyColors = {
  Easy: "bg-primary/10 text-primary",
  Medium: "bg-secondary/10 text-secondary",
  Hard: "bg-destructive/10 text-destructive",
};

export default function Problems() {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  return (
    <DashboardLayout>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="space-y-6"
      >
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold text-gradient mb-2">
              Problems Management
            </h1>
            <p className="text-muted-foreground">
              Manage coding problems across all languages
            </p>
          </div>
          <Button
            onClick={() => navigate("/problems/add")}
            className="gradient-cyber text-white h-12 px-6 rounded-2xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
          >
            <Plus className="w-5 h-5 mr-2" />
            Add Problem
          </Button>
        </div>

        {/* Search and Filter */}
        <div className="funky-card p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Search problems..."
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

        {/* Problems Grid */}
        <div className="grid gap-6">
          {problems.map((problem, index) => (
            <motion.div
              key={problem.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.01, y: -2 }}
              className="funky-card p-6"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-bold">{problem.title}</h3>
                    <Badge
                      className={`${
                        difficultyColors[
                          problem.difficulty as keyof typeof difficultyColors
                        ]
                      } rounded-full`}
                    >
                      {problem.difficulty}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                    <span className="flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-primary" />
                      {problem.language}
                    </span>
                    <span>{problem.submissions} submissions</span>
                    <span>{problem.solved} solved</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {problem.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="outline"
                        className="rounded-full"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="w-10 h-10 rounded-xl hover:bg-primary hover:text-primary-foreground"
                  >
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="w-10 h-10 rounded-xl hover:bg-secondary hover:text-secondary-foreground"
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="w-10 h-10 rounded-xl hover:bg-destructive hover:text-destructive-foreground"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </DashboardLayout>
  );
}
