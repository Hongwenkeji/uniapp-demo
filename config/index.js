const dev = require('./dev.env.js')
const prod = require('./prod.env.js')
module.exports =  process.env.NODE_ENV === 'development' ? dev : prod