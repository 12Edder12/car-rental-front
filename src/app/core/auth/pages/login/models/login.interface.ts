// login.interface.ts
export interface ILoginRequest {
  email: string;
  password: string;
}

export interface ILoginResponse {
  GetUserResult: {
    Address: string;
    Dni: string;
    Email: string;
    Id: number;
    LastName: string;
    Name: string;
    Password: string;
    Phone: string;
    Status: boolean;
    role?: string; // Añadimos el role que agregaremos manualmente
  } | null;
}