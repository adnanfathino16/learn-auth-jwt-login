module.exports = (app) => {
  const { daftarUser, loginUser, getUser, forgotPassword, resetPassword } = require("../controllers/user.controller");
  const router = require("express").Router();
  const { runValidation, validationDaftar, validationLogin } = require("../validation");
  const middleware = require("../middleware/middleware");

  router.post("/daftar", validationDaftar, runValidation, daftarUser);
  router.post("/login", validationLogin, runValidation, loginUser);
  router.get("/user", middleware, getUser);

  router.put("/forgotpassword", forgotPassword);
  router.put("/resetpassword", resetPassword);

  app.use("/api", router);
};
