export interface User {
  id: number,
  username: string,
  person: {
    firstName: string,
    lastName: string,
    email: string,
    phone: string,
    typeUser: string
  }
}
