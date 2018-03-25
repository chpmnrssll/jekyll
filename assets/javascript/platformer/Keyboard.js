class Keyboard {
  constructor () {
    this.keys = {}
    document.addEventListener('keydown', this.keydownHandler.bind(this))
    document.addEventListener('keyup', this.keyupHandler.bind(this))
  }

  keydownHandler (event) {
    if (!event.repeat) {
      this.keys[event.key] = true
    } else {
      this.keys[event.key] = 'holding'
    }
  }

  keyupHandler (event) {
    this.keys[event.key] = false
  }
}
