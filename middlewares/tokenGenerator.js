const { randomBytes } = require('crypto');

function tokenGenerator() {
  const token = randomBytes(8).toString('hex');

  return token;
}

module.exports = tokenGenerator;
