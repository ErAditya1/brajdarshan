"use client";

import { Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import FileUpload from "@/components/FileUpload";

interface ImageBlockEditorProps {
  block: any;
  onChange: (key: string, value: any) => void;
  onRemove: () => void;
}

export default function ImageBlockEditor({
  block,
  onChange,
  onRemove,
}: ImageBlockEditorProps) {
  return (
    <div className="space-y-4">
      {/* Upload */}
      <FileUpload
        onSuccess={(url, meta) =>
          onChange("image", {
            ...block.image,
            url,
            imageFileId: meta?.fileId,
          })
        }
      />

      {/* Preview */}
      
      {block.image.url && (
        <div className="rounded-lg border bg-muted p-3 space-y-2">
          <div
            className="w-full overflow-hidden rounded-md"
            style={{
              aspectRatio:
                block.aspectRatio !== "auto"
                  ? block.aspectRatio?.replace("/", " / ")
                  : undefined,
            }}
          >
            <img
              src={block.image.url}
              alt={block.alt || ""}
              className="w-full h-full object-cover"
            />
          </div>

          {block.caption && (
            <p className="text-xs text-center text-muted-foreground">
              {block.caption}
            </p>
          )}
        </div>
      )}

      {/* Caption */}
      <Input
        placeholder="Caption (optional)"
        value={block.caption || ""}
        onChange={(e) => onChange("caption", e.target.value)}
      />

      {/* Alt Text */}
      <Input
        placeholder="Alt text (important for SEO & accessibility)"
        value={block.alt || ""}
        onChange={(e) => onChange("alt", e.target.value)}
      />

      {/* Aspect Ratio */}
      <select
        value={block.aspectRatio || "16/9"}
        onChange={(e) => onChange("aspectRatio", e.target.value)}
        className="border rounded px-2 py-1 text-sm w-fit"
      >
        <option value="16/9">Landscape (16:9)</option>
        <option value="4/3">Classic (4:3)</option>
        <option value="1/1">Square (1:1)</option>
        <option value="auto">Auto</option>
      </select>

      {/* Remove */}
      <Button
        size="sm"
        variant="ghost"
        className="text-red-500 hover:text-red-600"
        onClick={onRemove}
      >
        <Trash2 size={16} className="mr-1" />
        Remove Image
      </Button>
    </div>
  );
}
