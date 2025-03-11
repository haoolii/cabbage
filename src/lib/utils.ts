import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function sumFileBytesSize(files: File[]) {
  let totalSize = 0;
  for (const _file of files) {
    totalSize += _file.size;
  }
  return totalSize;
}