import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Save, Upload } from "lucide-react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

const languages = [
  "Verilog",
  "VHDL",
  "SystemVerilog",
  "C",
  "C++",
  "Python",
  "Java",
];
const difficulties = ["Easy", "Medium", "Hard"];

export default function EditProblem() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    language: "Python",
    title: "Two Sum Problem",
    category: "",
    difficulty: "Easy",
    description: "Given an array of integers, return indices of two numbers that add up to target.",
    inputFormat: "First line: n (number of elements)\nSecond line: n space-separated integers\nThird line: target integer",
    outputFormat: "Two space-separated integers representing the indices",
    constraints: "1 ≤ n ≤ 10^5\n-10^9 ≤ nums[i] ≤ 10^9",
    tags: "Array, Hash Table",
    sampleTestcase1: "Input: [2,7,11,15], target = 9\nOutput: [0,1]",
    sampleTestcase2: "Input: [3,2,4], target = 6\nOutput: [1,2]",
    hiddenTestcases: '[\n  {"input": "[2,7,11,15], 9", "output": "[0,1]"},\n  {"input": "[3,2,4], 6", "output": "[1,2]"}\n]',
    solution: "# Python solution\ndef twoSum(nums, target):\n    seen = {}\n    for i, num in enumerate(nums):\n        complement = target - num\n        if complement in seen:\n            return [seen[complement], i]\n        seen[num] = i\n    return []",
  });

  const totalSteps = 7;

  useEffect(() => {
    // In a real app, fetch problem data by ID
    // For demo, we're using mock data
    console.log("Loading problem with ID:", id);
  }, [id]);

  const handleNext = () => {
    if (step < totalSteps) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = () => {
    toast.success("Problem updated successfully!");
    navigate("/problems");
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Button
            variant="ghost"
            onClick={() => navigate("/problems")}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Problems
          </Button>
          <h1 className="text-4xl font-bold text-gradient mb-2">
            Edit Problem #{id}
          </h1>
          <p className="text-muted-foreground">
            Step {step} of {totalSteps}
          </p>
        </motion.div>

        {/* Progress Bar */}
        <div className="mb-8 bg-muted rounded-full h-3 overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${(step / totalSteps) * 100}%` }}
            className="h-full gradient-cyber"
            transition={{ duration: 0.3 }}
          />
        </div>

        {/* Form Card */}
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="funky-card p-8"
        >
          {step === 1 && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold mb-2">Select Language</h2>
                <p className="text-muted-foreground">
                  Choose the programming language for this problem
                </p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {languages.map((lang) => (
                  <motion.button
                    key={lang}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setFormData({ ...formData, language: lang })}
                    className={`p-6 rounded-2xl border-2 transition-all duration-300 ${
                      formData.language === lang
                        ? "border-primary bg-primary/10 shadow-lg"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    <p className="font-semibold text-lg">{lang}</p>
                  </motion.button>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold mb-6">Basic Information</h2>
              <div>
                <Label htmlFor="title">Problem Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  className="mt-2 h-12 rounded-2xl"
                  placeholder="e.g., Two Sum Problem"
                />
              </div>
              <div>
                <Label htmlFor="difficulty">Difficulty *</Label>
                <Select
                  value={formData.difficulty}
                  onValueChange={(value) =>
                    setFormData({ ...formData, difficulty: value })
                  }
                >
                  <SelectTrigger className="mt-2 h-12 rounded-2xl">
                    <SelectValue placeholder="Select difficulty" />
                  </SelectTrigger>
                  <SelectContent>
                    {difficulties.map((diff) => (
                      <SelectItem key={diff} value={diff}>
                        {diff}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="tags">Tags (comma-separated)</Label>
                <Input
                  id="tags"
                  value={formData.tags}
                  onChange={(e) =>
                    setFormData({ ...formData, tags: e.target.value })
                  }
                  className="mt-2 h-12 rounded-2xl"
                  placeholder="e.g., Array, Hash Table, Dynamic Programming"
                />
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold mb-6">Problem Description</h2>
              <div>
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className="mt-2 min-h-[200px] rounded-2xl"
                  placeholder="Describe the problem in detail..."
                />
              </div>
              <Button
                variant="outline"
                className="w-full h-12 rounded-2xl border-dashed"
              >
                <Upload className="w-5 h-5 mr-2" />
                Upload Images
              </Button>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold mb-6">Format & Constraints</h2>
              <div>
                <Label htmlFor="inputFormat">Input Format *</Label>
                <Textarea
                  id="inputFormat"
                  value={formData.inputFormat}
                  onChange={(e) =>
                    setFormData({ ...formData, inputFormat: e.target.value })
                  }
                  className="mt-2 min-h-[100px] rounded-2xl"
                  placeholder="Describe the input format..."
                />
              </div>
              <div>
                <Label htmlFor="outputFormat">Output Format *</Label>
                <Textarea
                  id="outputFormat"
                  value={formData.outputFormat}
                  onChange={(e) =>
                    setFormData({ ...formData, outputFormat: e.target.value })
                  }
                  className="mt-2 min-h-[100px] rounded-2xl"
                  placeholder="Describe the output format..."
                />
              </div>
              <div>
                <Label htmlFor="constraints">Constraints</Label>
                <Textarea
                  id="constraints"
                  value={formData.constraints}
                  onChange={(e) =>
                    setFormData({ ...formData, constraints: e.target.value })
                  }
                  className="mt-2 min-h-[100px] rounded-2xl"
                  placeholder="e.g., 1 ≤ n ≤ 10^5"
                />
              </div>
            </div>
          )}

          {step === 5 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold mb-6">Sample Testcases</h2>
              <p className="text-muted-foreground mb-4">
                Add at least 2 visible sample testcases
              </p>
              <div>
                <Label htmlFor="testcase1">Sample Testcase 1 *</Label>
                <Textarea
                  id="testcase1"
                  value={formData.sampleTestcase1}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      sampleTestcase1: e.target.value,
                    })
                  }
                  className="mt-2 min-h-[100px] rounded-2xl font-mono text-sm"
                  placeholder="Input: [2,7,11,15], target = 9&#10;Output: [0,1]"
                />
              </div>
              <div>
                <Label htmlFor="testcase2">Sample Testcase 2 *</Label>
                <Textarea
                  id="testcase2"
                  value={formData.sampleTestcase2}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      sampleTestcase2: e.target.value,
                    })
                  }
                  className="mt-2 min-h-[100px] rounded-2xl font-mono text-sm"
                  placeholder="Input: [3,2,4], target = 6&#10;Output: [1,2]"
                />
              </div>
            </div>
          )}

          {step === 6 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold mb-6">Hidden Testcases</h2>
              <p className="text-muted-foreground mb-4">
                Provide all testcases in JSON format for automated testing
              </p>
              <div>
                <Label htmlFor="hiddenTestcases">
                  All Testcases (JSON) *
                </Label>
                <Textarea
                  id="hiddenTestcases"
                  value={formData.hiddenTestcases}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      hiddenTestcases: e.target.value,
                    })
                  }
                  className="mt-2 min-h-[300px] rounded-2xl font-mono text-sm"
                  placeholder={`[\n  {\n    "input": "[2,7,11,15], 9",\n    "output": "[0,1]"\n  }\n]`}
                />
              </div>
            </div>
          )}

          {step === 7 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold mb-6">Solution</h2>
              <p className="text-muted-foreground mb-4">
                Update the reference solution for this problem
              </p>
              <div>
                <Label htmlFor="solution">Solution Code</Label>
                <Textarea
                  id="solution"
                  value={formData.solution}
                  onChange={(e) =>
                    setFormData({ ...formData, solution: e.target.value })
                  }
                  className="mt-2 min-h-[300px] rounded-2xl font-mono text-sm"
                  placeholder="// Your solution code here..."
                />
              </div>
              <div className="p-6 bg-secondary/10 border-2 border-secondary/20 rounded-2xl">
                <h3 className="font-semibold text-secondary mb-2">
                  Ready to update?
                </h3>
                <p className="text-sm text-muted-foreground">
                  Review your changes and click "Update Problem" to save them.
                </p>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8 pt-6 border-t border-border">
            <Button
              onClick={handleBack}
              disabled={step === 1}
              variant="outline"
              className="h-12 px-6 rounded-2xl"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back
            </Button>
            {step < totalSteps ? (
              <Button
                onClick={handleNext}
                className="h-12 px-6 rounded-2xl gradient-cyber text-white hover:shadow-2xl hover:scale-105 transition-all duration-300"
              >
                Next
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                className="h-12 px-6 rounded-2xl gradient-cyber text-white hover:shadow-2xl hover:scale-105 transition-all duration-300"
              >
                <Save className="w-5 h-5 mr-2" />
                Update Problem
              </Button>
            )}
          </div>
        </motion.div>
      </div>
    </DashboardLayout>
  );
}
