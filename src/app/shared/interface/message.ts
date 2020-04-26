export interface Message {
  id: string,
  author: string,
  content: string,
  timestamp: string
}

export interface Messages {
  command: string,
  messages: Array<Message>
}
