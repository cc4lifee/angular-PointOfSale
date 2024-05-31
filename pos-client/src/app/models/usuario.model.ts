export class Usuario {
  constructor(
    public uid: string,
    public nombre: string,
    public email: string,
    public google?: boolean,
    public password?: string, // Opcional si no quieres incluir la contraseña en las respuestas
    public role?: string,
    public token?: string // Opcional para almacenar el JWT
  ) {}
}
