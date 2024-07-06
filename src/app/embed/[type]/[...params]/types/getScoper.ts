export interface GetScoper {
    key: boolean
    val: string
    vtt: string
    val_bak: string
    pos: number
    type: string
    subs: Sub[]
    ip: string
  }
  
  export interface Sub {
    name: string
    link: string
  }
  