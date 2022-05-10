class Alert {
  constructor(opened = false, message = '', severity = 'success') {
    this.opened = opened
    this.message = message
    this.severity = severity
  }

  open(message, severity = 'success') {
    return new Alert(true, message, severity)
  }

  close() {
    return new Alert(false, '', this.severity)
  }
}

export default Alert
