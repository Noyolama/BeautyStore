import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

// --- Types ---
interface FileWithPreview {
  preview: string;
  file?: File;
  uploaded?: boolean;
  public_id?: string;
  _id?: string;
}

interface MultipleImageUploadProps {
  value?: FileWithPreview[];
  onValueChange?: (files: FileWithPreview[]) => void;
  maxImages?: number;
  className?: string;
  name?: string;
  imageRegex?: RegExp;
  accept?: string;
}

// --- Preview ---
const ImagePreview = ({
  src,
  alt = "File preview",
  onDelete,
}: {
  src: string;
  alt?: string;
  onDelete?: () => void;
}) => {
  return (
    <div className="relative flex-shrink-0 w-20 h-20 sm:w-50 sm:h-50 rounded-md">
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover rounded-md"
      />
      {onDelete && (
        <button
          onClick={onDelete}
          className="absolute right-1 top-1 rounded-full bg-gray-200 p-1 text-gray-600 hover:bg-gray-300"
          aria-label="Remove file"
          type="button"
        >
          <X className="h-3 w-3 sm:h-4 sm:w-4" />
        </button>
      )}
    </div>
  );
};

// --- Main Component ---
export const MultipleImageUpload: React.FC<MultipleImageUploadProps> = ({
  value,
  onValueChange,
  maxImages,
  className,
  name,
  accept = "image/*",
}) => {
  const isControlled = value !== undefined && onValueChange !== undefined;
  const [internalFiles, setInternalFiles] = useState<FileWithPreview[]>([]);

  const files = isControlled ? value! : internalFiles;

  // Cleanup blob URLs on unmount
  useEffect(() => {
    return () => {
      (value || internalFiles).forEach((file) => {
        if (!file.uploaded) URL.revokeObjectURL(file.preview);
      });
    };
  }, [value, internalFiles]);

  const addFiles = (fileList: FileList) => {
    const selected = Array.from(fileList);
    const limited = maxImages
      ? selected.slice(0, maxImages - files.length)
      : selected;

    const withPreview: FileWithPreview[] = limited.map((file) => ({
      preview: URL.createObjectURL(file),
      file,
    }))

    const updated = [...files, ...withPreview];
    if (isControlled) {
      onValueChange?.(updated);
    } else {
      setInternalFiles(updated);
    }
  };

  const removeFile = (preview: string) => {
    const updated = files.filter((f) => f.preview !== preview);
    if (isControlled) {
      onValueChange?.(updated);
    } else {
      setInternalFiles(updated);
    }
  };

  return (
    <div className={cn("flex flex-col w-full", className)}>
      {/* Input for file upload */}
      <input
        id={`upload-input-${name}`}
        type="file"
        accept={accept}
        multiple
        className="hidden"
        onChange={(e) => {
          if (e.target.files) {
            addFiles(e.target.files);
            e.target.value = ""; // Reset input
          }
        }}
      />

      <div className="flex flex-wrap gap-4">
        {(maxImages === undefined || files.length < maxImages) && (
          <Button
            variant="outline"
            className="h-20 w-20 sm:h-50 sm:w-50 flex-shrink-0"
            asChild
          >
            <label
              htmlFor={`upload-input-${name}`}
              className="flex h-full w-full cursor-pointer items-center justify-center text-sm sm:text-base"
            >
              Browse
            </label>
          </Button>
        )}

        {files.map((file, index) => (
          <ImagePreview
            key={file.preview}
            src={file.preview}
            alt={`File ${index}`}
            onDelete={() => removeFile(file.preview)}
          />
        ))}
      </div>
    </div>
  );
};
