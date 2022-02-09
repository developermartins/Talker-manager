const fs = require('fs').promises;

const result = async function getTalkerById(id) {
  const content = await fs.readFile('talker.json', 'utf-8')

  .then((data) => JSON.parse(data));

  const talker = content.find((i) => i.id === parseInt(id, 10));

  return talker;
};

module.exports = result;
