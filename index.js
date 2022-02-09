const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;
const talkers = require('./middlewares');
const validateRegister = require('./middlewares/validateRegisterTalker');

const {
  validateRegisterTalkerTalkDate,
  validateRegisterTalkerRate,
  validateTalkerName,
  validateTalkerAge,
  validateToken,
  validateDate,
} = validateRegister;

const {
  getTalkerList,
  getTalkerById,
  validateLogin,
  tokenGenerator,
  registerTalker,
  deleteTalker,
} = talkers;

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', (_req, res) => {
  const talkerList = getTalkerList();
  return res.status(200).send(talkerList);
});

app.get('/talker/search', validateToken, async (req, res) => {
  const { q } = req.query;
  const content = await fs.readFile('./talker.json');
  const talkersList = JSON.parse(content);
  const list = talkersList.filter((talker) => talker.name.toUpperCase().includes(q.toUpperCase()));

  return res.status(200).send(list);
});

app.get('/talker/:id', async (req, res) => {
  const talkerId = req.params.id;
  const talker = await getTalkerById(talkerId);

  if (!talker) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }

  return res.status(200).json(talker);
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const validation = validateLogin(email, password, res);

 if (validation) {
    const token = tokenGenerator();
    console.log(token);
    return res.status(200).json({ token });
  }
});

app.post('/talker',
validateToken,
validateTalkerName,
validateTalkerAge,
validateRegisterTalkerTalkDate,
validateDate,
validateRegisterTalkerRate,
async (req, res) => {
  const register = await registerTalker(req.body);

  return res.status(201).json(register);
});

app.put('/talker/:id',
validateToken,
validateTalkerName,
validateTalkerAge,
validateRegisterTalkerTalkDate,
validateRegisterTalkerRate,
validateDate,
async (req, res) => {
  const { id } = req.params;
  const { body } = req;

  const content = await fs.readFile('./talker.json');
  const talkersList = JSON.parse(content);

  const oldTalkers = talkersList.filter((talker) => talker.id !== +id);

  const updatedTalker = {
    id: +id,
    ...body,
  };

  await fs.writeFile('./talker.json', JSON.stringify([...oldTalkers, updatedTalker]));

  return res.status(200).json(updatedTalker);
});

app.delete('/talker/:id', validateToken,
async (req, res) => {
  const { id } = req.params;
  const delTalker = await deleteTalker(id);

  return res.status(200).json(delTalker);
});

app.listen(PORT, () => {
  console.log('Online');
});
