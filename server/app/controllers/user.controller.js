const db = require("../models");
const User = db.users;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { kirimEmail } = require("../helpers");

exports.daftarUser = async (req, res) => {
  const { username, email, password } = req.body;

  const emailUser = await User.findOne({ email: email });
  const usernameUser = await User.findOne({ username: username });

  if (usernameUser) {
    return res.status(404).send({
      status: false,
      message: "username sudah terdaftar",
    });
  }

  if (emailUser) {
    return res.status(404).send({
      status: false,
      message: "email sudah terdaftar",
    });
  }

  // dihash terlebih dahulu sebelum dikirim ke db
  const hashPw = await bcrypt.hash(password, 10);

  const user = new User({
    username: username,
    email: email,
    password: hashPw,
  });

  user.save();

  return res.status(200).send({
    status: true,
    message: "user behasil didaftarkan.",
  });
};

exports.loginUser = async (req, res) => {
  const { username, password } = req.body;
  //   mengubah parameter karena yang diisi bisa username atau email
  const usernameoremail = username;

  const dataUser = await User.findOne({
    $or: [{ username: usernameoremail }, { email: usernameoremail }],
  });
  if (dataUser) {
    // membandingkan pw dari req.body dengan yang ada di db
    const passwordUser = await bcrypt.compare(password, dataUser.password);
    if (passwordUser) {
      const userId = {
        id: dataUser.id,
      };
      const token = await jwt.sign(userId, process.env.JWT_SECRET);
      res.status(200).send({
        message: "berhasil loginUser",
        token: token,
      });
    } else {
      res.status(404).send({
        status: false,
        message: "username atau password salah",
      });
    }
  } else {
    return res.status(404).send({
      message: "username atau password salah",
    });
  }
};

exports.getUser = async (req, res) => {
  const user = await User.findOne({ _id: req.id });
  return res.status(200).send({
    message: "berhasil di getUser",
    data: user,
  });
};

exports.forgotPassword = async (req, res) => {
  const { email } = req.body;

  // mencari user sesuai dengan emailnya ke db
  const user = await User.findOne({ email: email });
  if (!user) {
    return res.status(404).send({
      status: false,
      message: "email tidak tersedia",
    });
  }
  const userId = {
    id: user.id,
  };
  const token = jwt.sign(userId, process.env.JWT_SECRET);

  await user.updateOne({ resetPasswordLink: token });

  const templateEmail = {
    // dikirim oleh siapa
    from: "adnan store",
    // email didapat dari req.body
    to: email,
    subject: "Link Reset Password adnan store",
    html: `<p>Silahkan klik link di bawah untuk reset password andaa</p> <p">${process.env.CLIENT_URL}/resetpassword/${user.id}</p>
    <p>token: ${token}</p>`,
  };
  kirimEmail(templateEmail);
  return res.status(200).send({
    status: true,
    message: "Link reset password berhasil terkirim",
  });
};

exports.resetPassword = async (req, res) => {
  const { id, password } = req.body;

  const user = await User.findOne({ _id: id });
  if (user) {
    const hashPassword = await bcrypt.hash(password, 10);
    await user.updateOne({ password: hashPassword });
    return res.status(201).send({
      status: true,
      message: "Password berhasil diganti",
    });
  }
};
