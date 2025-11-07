import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const transformApiImages = (images: any[]) => {
  return images?.map((img) => ({
    preview: img.url,
    uploaded: true,
    public_id: img.public_id,
    _id: img._id,
  }))
}

export const appendFormData = (formData: FormData, data: Record<string, any>, ignoreFiles: boolean) => {
    Object.entries(data).forEach(([key, value]) => {
        if (Array.isArray(value)) {
            value.forEach((item) => {
                if (item instanceof File) {
                    // Append files with the original key (like 'images')
                    if (!ignoreFiles) formData.append(key, item);
                } else {
                    // Append non-file items as strings, with 'key[]' to treat as array
                    formData.append(`${key}[]`, String(item));
                }
            });
        } else if (value instanceof File) {
            // Single file
            if (!ignoreFiles) formData.append(key, value);
        } else if (value !== undefined && value !== null) {
            // Scalar values
            formData.append(key, String(value));
        }
    });
}