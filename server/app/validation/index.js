const { check, validationResult } = require("express-validator");

exports.runValidation = (req, res, next) => {
  const errors = validationResult(req);
  //   console.log(errors);
  //   --output--
  //   errors: [
  //     {
  //       value: 'jisoo@gmail',
  //       msg: 'email harus bertanda @',
  //       param: 'email',
  //       location: 'body'
  //     }
  //   ]
  if (!errors.isEmpty()) {
    return res.status(404).send({
      status: false,
      message: errors.array()[0].msg,
    });
  }
  next();
};

exports.validationDaftar = [
  check("username", "username tidak boleh kosong").notEmpty(),
  check("email", "email tidak boleh kosong").notEmpty().isEmail().withMessage("email tidak valid"),
  check("password", "password tidak boleh kosong").notEmpty().isLength({ min: 6 }).withMessage("password minimal 6 karakter"),
];

exports.validationLogin = [check("username", "username tidak boleh kosong").notEmpty(), check("password", "password tidak boleh kosong").notEmpty()];
