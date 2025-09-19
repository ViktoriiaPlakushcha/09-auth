interface RegisterRequest {
  email: string;
  password: string;
}

interface LoginRequest {
  email: string;
  password: string;
}

type CheckSessionRequest = {
  success: boolean;
};

export { type RegisterRequest, type LoginRequest, type CheckSessionRequest };