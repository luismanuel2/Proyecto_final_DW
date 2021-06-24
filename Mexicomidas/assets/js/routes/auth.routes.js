const { validateJwt } = require("../middlewares/validate.jwt");
const controller = require("../controllers/auth.controller");
const express = require("express");
const router = express.Router();

router.post("/login", controller.login);

router.post("/remove", controller.remove);

router.post("/update", controller.update);

router.post("/signUp", controller.signUp);

router.get("/me", controller.getCurrentUser);

module.exports = router;
