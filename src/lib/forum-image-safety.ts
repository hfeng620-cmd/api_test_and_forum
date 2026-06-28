const MAX_FORUM_IMAGE_BYTES = 5 * 1024 * 1024;
export const ALLOWED_FORUM_IMAGE_TYPES = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
} as const;

export const FORUM_IMAGE_ACCEPT = Object.keys(ALLOWED_FORUM_IMAGE_TYPES).join(",");

export function getForumImageUploadError(file: File): string | null {
  if (file.size <= 0) {
    return "图片文件不能为空。";
  }

  if (file.size > MAX_FORUM_IMAGE_BYTES) {
    return "图片不能超过 5MB。";
  }

  if (!(file.type.toLowerCase() in ALLOWED_FORUM_IMAGE_TYPES)) {
    return "仅支持 JPG、PNG 或 WebP 图片。";
  }

  return null;
}
