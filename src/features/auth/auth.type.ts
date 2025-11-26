interface AuthPayload {
     username: string;
     password: string;
}

export type LoginPayload = AuthPayload

export interface RegisterPayload extends AuthPayload {
     confirmPassword: string
}