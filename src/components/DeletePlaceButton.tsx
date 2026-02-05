"use client";

import { Trash } from "lucide-react";
import { useTransition } from "react";
import { deletePlaceAction } from "@/actions/place-actions";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast-provider";

export default function DeletePlaceButton({
  placeId,
}: {
  placeId: string;
}) {
  const [isPending, startTransition] = useTransition();
  const toast = useToast();

  const handleDelete = () => {
    const confirmed = confirm(
      "Are you sure you want to delete this place?"
    );
    if (!confirmed) return;

    startTransition(async () => {
      try {
        await deletePlaceAction(placeId);
        toast({
          title: "Deleted",
          description: "Place deleted successfully",
        });
      } catch (err) {
        console.log(err)
        toast({
          title: "Error",
          description: "Failed to delete place",
        //   variant: "destructive",
        });
      }
    });
  };

  return (
    <Button
      variant="destructive"
      size="sm"
      onClick={handleDelete}
      disabled={isPending}
    >
      <Trash className="w-4 h-4 mr-1" />
      {isPending ? "Deleting..." : "Delete"}
    </Button>
  );
}
