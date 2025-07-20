interface BaseResponse<T> {
  status: string;
  message: string;
  data: T | null;
  token?: string;
  errorCode?: string;
}

interface ApiResponse<T = any> {
  status: number;
  data: T;
  message?: string;
}

interface Toast {
  id: string;
  type: "success" | "error" | "info" | "warning";
  message: string;
  duration?: number; // in milliseconds
}

interface ModalOptions {
  title: string;
  content: string | JSX.Element;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
}

interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  role?: "admin" | "user" | "moderator";
}

interface LoginRequest {
  email: string;
  password: string;
}

interface LoginResponse extends BaseResponse<AuthToken> {}

interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}
interface RegisterResponse extends BaseResponse<User> {}

interface PaginationRequest {
  page: number;
  pageSize: number;
  search?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

interface PaginatedResponse<T = any> {
  total: number;
  page: number;
  pageSize: number;
  items: T[];
}

interface FileUploadResponse {
  fileId: string;
  fileName: string;
  url: string;
  uploadedAt: string;
}

interface FileUploadRequest {
  file: File;
  uploadPath?: string; // Optional path to upload the file
}

interface FormField {
  name: string;
  label: string;
  type: "text" | "number" | "email" | "password" | "select";
  required?: boolean;
  options?: string[];
  validation?: (value: any) => string | null;
}

interface ApiError {
  status: number;
  message: string;
  details?: string[];
  timestamp?: string;
}

interface UIState {
  isLoading: boolean;
  isModalOpen: boolean;
  toastQueue: Toast[];
}

interface ApiServiceType {
  get<T>(url: string): Promise<BaseResponse<T>>;
  post<T>(url: string, data?: any): Promise<BaseResponse<T>>;
  put<T>(url: string, data?: any): Promise<BaseResponse<T>>;
  del<T>(url: string): Promise<BaseResponse<T>>;
}

interface RegisterResponse {
  id: string;
  company_id: string;
  role: string;
}

type Nullable<T> = T | null;
type Optional<T> = T | undefined;
type ApiResult<T = any> = Promise<BaseResponse<T>>;
