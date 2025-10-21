import { motion } from "framer-motion";
import { Trash2, AlertTriangle } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface Problem {
  id: number;
  title: string;
}

interface DeleteProblemDialogProps {
  problem: Problem | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
}

export const DeleteProblemDialog = ({
  problem,
  open,
  onOpenChange,
  onConfirm,
}: DeleteProblemDialogProps) => {
  if (!problem) return null;

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="rounded-3xl max-w-md">
        <AlertDialogHeader>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-destructive/10 flex items-center justify-center"
          >
            <AlertTriangle className="w-8 h-8 text-destructive" />
          </motion.div>
          <AlertDialogTitle className="text-2xl text-center">
            Delete Problem?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-center text-base">
            Are you sure you want to delete{" "}
            <span className="font-semibold text-foreground">
              "{problem.title}"
            </span>
            ? This action cannot be undone. All associated testcases and
            solutions will also be deleted.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex-col sm:flex-row gap-2">
          <AlertDialogCancel className="h-12 rounded-2xl">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            className="h-12 rounded-2xl bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Delete Problem
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
