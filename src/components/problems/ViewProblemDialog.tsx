import { motion } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Problem {
  id: number;
  title: string;
  language: string;
  difficulty: string;
  tags: string[];
  submissions: number;
  solved: number;
  description?: string;
  inputFormat?: string;
  outputFormat?: string;
  constraints?: string;
}

interface ViewProblemDialogProps {
  problem: Problem | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const difficultyColors = {
  Easy: "bg-primary/10 text-primary",
  Medium: "bg-secondary/10 text-secondary",
  Hard: "bg-destructive/10 text-destructive",
};

export const ViewProblemDialog = ({
  problem,
  open,
  onOpenChange,
}: ViewProblemDialogProps) => {
  if (!problem) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] rounded-3xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gradient">
            {problem.title}
          </DialogTitle>
        </DialogHeader>

        <ScrollArea className="max-h-[70vh] pr-4">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Meta Information */}
            <div className="flex flex-wrap gap-3">
              <Badge
                className={`${
                  difficultyColors[
                    problem.difficulty as keyof typeof difficultyColors
                  ]
                } rounded-full px-4 py-1`}
              >
                {problem.difficulty}
              </Badge>
              <Badge
                variant="outline"
                className="rounded-full px-4 py-1 border-primary/20"
              >
                {problem.language}
              </Badge>
              {problem.tags.map((tag) => (
                <Badge
                  key={tag}
                  variant="outline"
                  className="rounded-full px-4 py-1"
                >
                  {tag}
                </Badge>
              ))}
            </div>

            {/* Statistics */}
            <div className="grid grid-cols-2 gap-4">
              <div className="funky-card p-4">
                <p className="text-2xl font-bold text-primary">
                  {problem.submissions}
                </p>
                <p className="text-sm text-muted-foreground">Submissions</p>
              </div>
              <div className="funky-card p-4">
                <p className="text-2xl font-bold text-secondary">
                  {problem.solved}
                </p>
                <p className="text-sm text-muted-foreground">Solved</p>
              </div>
            </div>

            <Separator />

            {/* Description */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Description</h3>
              <p className="text-muted-foreground leading-relaxed">
                {problem.description ||
                  "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target. You may assume that each input would have exactly one solution, and you may not use the same element twice."}
              </p>
            </div>

            {/* Input Format */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Input Format</h3>
              <div className="bg-muted/50 rounded-2xl p-4 font-mono text-sm">
                {problem.inputFormat ||
                  "First line contains n (number of elements)\nSecond line contains n space-separated integers\nThird line contains target integer"}
              </div>
            </div>

            {/* Output Format */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Output Format</h3>
              <div className="bg-muted/50 rounded-2xl p-4 font-mono text-sm">
                {problem.outputFormat ||
                  "Two space-separated integers representing the indices"}
              </div>
            </div>

            {/* Constraints */}
            {problem.constraints && (
              <div>
                <h3 className="text-lg font-semibold mb-3">Constraints</h3>
                <div className="bg-muted/50 rounded-2xl p-4 font-mono text-sm">
                  {problem.constraints}
                </div>
              </div>
            )}

            {/* Example */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Example</h3>
              <div className="space-y-3">
                <div className="bg-muted/50 rounded-2xl p-4">
                  <p className="text-sm font-semibold text-primary mb-2">
                    Input:
                  </p>
                  <pre className="font-mono text-sm">
                    nums = [2,7,11,15], target = 9
                  </pre>
                </div>
                <div className="bg-muted/50 rounded-2xl p-4">
                  <p className="text-sm font-semibold text-secondary mb-2">
                    Output:
                  </p>
                  <pre className="font-mono text-sm">[0,1]</pre>
                </div>
                <div className="bg-muted/50 rounded-2xl p-4">
                  <p className="text-sm font-semibold mb-2">Explanation:</p>
                  <p className="text-sm text-muted-foreground">
                    Because nums[0] + nums[1] == 9, we return [0, 1].
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
