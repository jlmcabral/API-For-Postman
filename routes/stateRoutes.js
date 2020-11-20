const express = require("express");

const router = express.Router();
const StateController = require("../controllers/stateController");

/**
 * Company routers
 */
router.get("/", StateController.getAll);
router.get("/:id", StateController.getById);
router.post("/", StateController.create);
router.put("/:id", StateController.update);
router.delete("/:id", StateController.delete);

module.exports = router;
