const year4Digit = (req, res, next) => {
  function validarNumero(numero) {
    return numero.toString().length === 4;
  }

  if (!validarNumero(req.body.year)) {
    return res.status(400).json({ message: "year must have 4 digits" });
  }

  next();
};

module.exports = year4Digit;
