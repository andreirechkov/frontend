export interface User {
  id?: string,
  password?: string
  username: string,
  person?: {
    firstName: string,
    lastName: string,
    email: string,
    phone: string,
    typeUser: string
  }
}
