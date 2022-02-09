function validateToken(req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Token não encontrado' });
  }

  if (token.length !== 16) {
    return res.status(401).json({ message: 'Token inválido' });
  }
  next();
}

function validateTalkerName(req, res, next) {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: 'O campo "name" é obrigatório' });
  }
  if (name.length < 3) {
    return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }
  next();
}

function validateTalkerAge(req, res, next) {
  const { age } = req.body;

  if (!age) {
    return res.status(400).json({ message: 'O campo "age" é obrigatório' });
  }
  if (age < 18) {
    return res.status(400).json({ message: 'A pessoa palestrante deve ser maior de idade' });
  }
  next();
}

function validateRegisterTalkerTalkDate(req, res, next) {
  const { talk } = req.body;

  if (!talk || !talk.watchedAt || (!talk.rate && talk.rate !== 0)) {
    return res.status(400).json({
     message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' });
   }

  next();
}

function validateDate(req, res, next) {
  const { talk } = req.body;
  // https://www.regextester.com/99555
  const validFormat = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/i;

  if (validFormat.test(talk.watchedAt) === false) {
    return res.status(400).json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }
  next();
}

function validateRegisterTalkerRate(req, res, next) {
  const { talk } = req.body;
  if (typeof talk.rate !== 'number' || talk.rate > 5 || talk.rate < 1) {
    return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
  next();
}

module.exports = {
  validateTalkerName,
  validateTalkerAge,
  validateRegisterTalkerTalkDate,
  validateDate,
  validateRegisterTalkerRate,
  validateToken,
};
