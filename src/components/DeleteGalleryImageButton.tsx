"use client";

import { Trash } from "lucide-react";
import { useTransition } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast-provider";
import { deleteGalleryImageAction } from "@/actions/gallery-actions";

export default function DeleteGalleryImageButton({
  imageId,
}: {
  imageId: string;
}) {
  const [isPending, startTransition] = useTransition();
  const toast = useToast();

  const handleDelete = () => {
    const confirmed = confirm(
      "Are you sure you want to delete this image?"
    );
    if (!confirmed) return;

    startTransition(async () => {
      try {
        await deleteGalleryImageAction(imageId);
      } catch (err) {
        console.log(err);
        toast({
          title: "Delete failed",
          description: "You are not allowed to delete this image",
        });
      }
    });
  };

  return (
    <Button
      variant="destructive"
      size="icon"
      onClick={handleDelete}
      disabled={isPending}
      className="h-8 w-8"
    >
      <Trash className="h-4 w-4" />
      <span className="sr-only">
        {isPending ? "Deleting image" : "Delete image"}
      </span>
    </Button>
  );
}
