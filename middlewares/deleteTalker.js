const fs = require('fs').promises;

async function deleteTalker(id) {
  const promise = await fs.readFile('./talker.json');
  const response = JSON.parse(promise);

  const talkerToDelete = response.filter((i) => i.id !== +id);

  await fs.writeFile('./talker.json', JSON.stringify(talkerToDelete));

  return { message: 'Pessoa palestrante deletada com sucesso' };
}

module.exports = deleteTalker;