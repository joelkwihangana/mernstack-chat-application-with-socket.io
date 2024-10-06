declare namespace NodeJS {
  interface ProcessEnv {
    VITE_CLOUDINARY_UPLOAD_URL: string;
    VITE_CLOUDINARY_UPLOAD_PRESET: string;
    VITE_BACKEND_URL: string;
  }
}

export {};
