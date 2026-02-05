"use client";

import { useRef, useState } from "react";
import { Upload, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FileUploadProps {
  onSuccess: (url: string, meta?: any) => void;
  accept?: string;
}

export default function FileUpload({
  onSuccess,
  accept = "image/*",
}: FileUploadProps) {
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/upload/imagekit", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    setLoading(false);

    if (data?.url) {
      onSuccess(data.url, data);
    }
  }

  return (
    <div className="flex items-center gap-3">
      {/* hidden input */}
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        hidden
        onChange={handleUpload}
      />

      {/* real button */}
      <Button
        type="button"
        size="sm"
        variant="outline"
        disabled={loading}
        onClick={() => inputRef.current?.click()}
      >
        {loading ? (
          <Loader2 className="w-4 h-4 animate-spin mr-1" />
        ) : (
          <Upload className="w-4 h-4 mr-1" />
        )}
        Upload Image
      </Button>
    </div>
  );
}
