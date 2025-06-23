const express = require("express");
const router = express.Router();
const {
  register,
  login,
  getProfile,
  forgotPassword,
  resetPassword,
  updatePassword,
  deleteAccount,
} = require("../controllers/authController");
const { protect } = require("../middleware/authMiddleware");

router.post("/forgotpassword", forgotPassword);
router.put("/resetpassword/:resettoken", resetPassword);
router.post("/register", register);
router.post("/login", login);
router.get("/profile", protect, getProfile);
router.post("/forgotpassword", forgotPassword);
router.delete("/delete", protect, deleteAccount);
router.put("/updatepassword", protect, updatePassword);

module.exports = router;
