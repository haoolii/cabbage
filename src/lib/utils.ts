import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function sumFileBytesSize(files: File[]) {
  let totalSize = 0;
  for (let file of files) {
    totalSize += file.size;
  }
  return totalSize;
}