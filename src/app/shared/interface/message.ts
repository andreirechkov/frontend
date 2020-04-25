export interface Message {
  command: string,
  messages: [{
      id: string,
      author: string,
      content: string,
      timestamp: string
    }
  ]
}
