const fs = require('fs').promises;

async function registerTalker(talker) {
  let content = await fs.readFile('./talker.json', 'utf-8')
    .then((data) => JSON.parse(data));

  const nextId = content[content.length - 1].id + 1;

  const newTalker = { ...talker, id: nextId };

  content = [...content, newTalker];

  const newTalkerList = JSON.stringify(content);

    await fs.writeFile('./talker.json', newTalkerList);
    return newTalker;
}

module.exports = registerTalker;
