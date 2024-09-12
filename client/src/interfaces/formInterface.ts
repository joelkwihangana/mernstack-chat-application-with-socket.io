// Basic form data interface
export interface IFormData {
  name?: string;
  email: string;
  password: string;
  confirmPassword?: string;
  [key: string]: unknown; // Allows additional form fields
}

// Interface for form state handlers
export interface IFormStateHandlers {
  setName?: (name: string) => void;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  setField?: (field: string, value: unknown) => void; // Generic setter
}

// Interface for form event handlers
export interface IFormEventHandlers {
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

// Combine interfaces for complete form props
export interface IFormProps
  extends IFormData,
    IFormStateHandlers,
    IFormEventHandlers {}
