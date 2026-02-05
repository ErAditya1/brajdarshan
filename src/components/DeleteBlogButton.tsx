"use client";

import { Trash } from "lucide-react";
import { useTransition } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast-provider";
import { deleteBlogAction } from "@/actions/blog-actions";

export default function DeleteBlogButton({ blogId }: { blogId: string }) {
  const [isPending, startTransition] = useTransition();
  const toast = useToast();

  const handleDelete = () => {
    if (!confirm("Are you sure you want to delete this blog?")) return;

    startTransition(async () => {
      try {
        await deleteBlogAction(blogId);
      } catch {
        toast({
          title: "Delete failed",
          description: "You are not allowed to delete this blog",
          
        });
      }
    });
  };

  return (
    <Button
      size="sm"
      variant="destructive"
      onClick={handleDelete}
      disabled={isPending}
    >
      <Trash className="w-4 h-4 mr-1" />
      {isPending ? "Deleting..." : "Delete"}
    </Button>
  );
}
