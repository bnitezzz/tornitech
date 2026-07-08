export type ActionResult<T = undefined> =
  | { success: true; message: string; data?: T }
  | { success: false; message: string; errors?: Record<string, string> };

export type CatalogDownloadResult = {
  downloadUrl: string;
};
