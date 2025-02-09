export interface Credentials {
  email: string;
  password: string;
}

export type CredentialsErrors = Partial<Credentials>;

type ResponseStatus = "Success" | "InvalidCredentials";

export type ResponseErrors = {
  field: string;
  message: string;
};

export type Response = {
  status: ResponseStatus;
  errors?: ResponseErrors[];
};
