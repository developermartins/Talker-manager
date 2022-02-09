const getTalkerList = require('./getTalkers');
const getTalkerById = require('./getTalker');
const validateLogin = require('./validateLogin');
const tokenGenerator = require('./tokenGenerator');
const registerTalker = require('./registerTalker');
const deleteTalker = require('./deleteTalker');

module.exports = {
  getTalkerList,
  getTalkerById,
  validateLogin,
  tokenGenerator,
  registerTalker,
  deleteTalker,
};
