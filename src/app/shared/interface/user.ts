export interface User {
  id?: string
  password?: string
  username: string
  person?: {
    firstName: string
    lastName: string
    email?: string
    phone?: string
    typeUser?: string
    image?: string
    link?: Array<string>
    city: string
    area: string
    content: string
  }
}
