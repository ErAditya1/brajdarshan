"use client";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/components/ui/utils";

type AvatarLayoutProps = {
  name?: string;
  email?: string;
  image?: string | null;
  size?: "sm" | "md" | "lg";
  className?: string;
};

export function AvatarLayout({
  name = "User",
  email,
  image,
  size = "md",
  className,
}: AvatarLayoutProps) {
  const initials =
    name
      ?.split(" ")
      .map((n) => n[0])
      .slice(0, 2)
      .join("")
      .toUpperCase() || "U";

  const sizeMap = {
    sm: "size-9 text-xs",
    md: "size-11 text-sm",
    lg: "size-16 text-xl",
  };

  return (
    <div className={cn("flex items-center gap-3 min-w-0", className)}>
      <Avatar className={cn(sizeMap[size])}>
        {image && <AvatarImage src={image} alt={name} />}
        <AvatarFallback className="bg-orange-100 text-orange-600 font-semibold">
          {initials}
        </AvatarFallback>
      </Avatar>

      <div className="min-w-0">
        <p className="text-sm font-semibold truncate">{name}</p>
        {email && (
          <p className="text-xs text-muted-foreground truncate">{email}</p>
        )}
      </div>
    </div>
  );
}
