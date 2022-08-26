export default (o, c, d) => {
  const proto = c.prototype
  const oldFormat = proto.format
  
  proto.format = function (formatStr) {
    const locale = this.$locale()

    if (!this.isValid()) {
      return oldFormat.bind(this)(formatStr)
    }

    const utils = this.$utils()
    const str = formatStr || 'YYYY-MM-DDTHH:mm:ssZ'
    const result = str.replace(/\[([^\]]+)]|SSS|SS|S/g, (match) => {
      switch (match) {
	    case 'S':
			return utils.s(Math.floor(this.$ms/100), 1, '0')
	    case 'SS':
			return utils.s(Math.floor(this.$ms/10), 2, '0')
        default:
          return match
      }
    })
    return oldFormat.bind(this)(result)
  }
}