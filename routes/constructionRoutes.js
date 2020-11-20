const express = require("express");

const router = express.Router();
const ConstructionController = require("../controllers/constructionController");

/**
 * Company routers
 */
router.get("/", ConstructionController.getAll);
router.get("/:id", ConstructionController.getById);
router.post("/", ConstructionController.create);
router.put("/:id", ConstructionController.update);
router.delete("/:id", ConstructionController.delete);

module.exports = router;
