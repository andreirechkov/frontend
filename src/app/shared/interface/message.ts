export interface Message {
  id: string,
  author: string,
  content: string,
  timestamp: string
}

export interface ChannelMessage {
  command: string,
  messages: Array<Message>
}
