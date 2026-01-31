"use client";

import * as React from "react";
import {
  PanelProps,
  Panel,
} from "react-resizable-panels";

import { cn } from "./utils";

/* -------------------------------------------------------------------------- */
/*                                   Group                                    */
/* -------------------------------------------------------------------------- */

function ResizablePanelGroup({
  className,
  ...props
}:PanelProps) {
  return (
    <ResizablePanelGroup
      data-slot="resizable-panel-group"
      className={cn(
        "flex h-full w-full data-[panel-group-direction=vertical]:flex-col",
        className,
      )}
      {...props}
    />
  );
}

/* -------------------------------------------------------------------------- */
/*                                    Panel                                   */
/* -------------------------------------------------------------------------- */

function ResizablePanel({
  className,
  ...props
}: React.ComponentProps<typeof Panel>) {
  return (
    <Panel
      data-slot="resizable-panel"
      className={cn("relative", className)}
      {...props}
    />
  );
}



export {
  ResizablePanelGroup,
  ResizablePanel,
};
