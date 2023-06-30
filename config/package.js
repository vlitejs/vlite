const { license, name, version, author } = require('../package.json')

exports.libraryName = 'Vlitejs'
exports.banner = `@license ${license}
@name ${name}
@version ${version}
@copyright ${new Date().getUTCFullYear()} ${author}`

exports.providers = ['youtube', 'vimeo', 'dailymotion']
exports.plugins = ['subtitle', 'pip', 'cast', 'airplay', 'ima', 'volume-bar', 'sticky']
