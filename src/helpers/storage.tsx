import { State } from '../providers/game.provider'

class Storage {
  private readonly key: string

  constructor() {
    this.key = 'game'
  }

  getData(): State {
    const data = localStorage.getItem(this.key)
    return data ? JSON.parse(data) : { signedin: false }
  }

  storeData(data: State): void {
    localStorage.setItem(this.key, JSON.stringify(data))
  }
}

export default new Storage()
