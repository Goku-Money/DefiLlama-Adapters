const { getExports } = require('../helper/heroku-api')

module.exports = {
  timetravel: false,
  misrepresentedTokens: true,
  ...getExports("jediswap", ['starknet']),
}