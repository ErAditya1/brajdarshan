"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/components/ui/utils";

type AvatarButtonProps = {
  name?: string;
  image?: string | null;
  onClick?: () => void;
  className?: string;
};

export function AvatarButton({
  name = "User",
  image,
  onClick,
  className,
}: AvatarButtonProps) {
  const initials =
    name
      .split(" ")
      .map((n) => n[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();

  return (
    <button
      onClick={onClick}
      className={cn(
        "rounded-full focus:outline-none focus:ring-2 focus:ring-orange-400",
        className
      )}
    >
      <Avatar className="size-10">
        {image && <AvatarImage src={image} alt={name} />}
        <AvatarFallback className="bg-orange-100 text-orange-600 font-semibold">
          {initials}
        </AvatarFallback>
      </Avatar>
    </button>
  );
}
