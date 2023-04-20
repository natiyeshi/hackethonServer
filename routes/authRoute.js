const {signup, login} = require("../controllers/authController");
const company = require("../controllers/companyAuth")
const express = require("express");
const router = express.Router();

router.post("/signup", signup); 
router.post("/login", login);
router.post("/company/login", company.login)
router.post("/company/signup", company.signup);

module.exports = router; 