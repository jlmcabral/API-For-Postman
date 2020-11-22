const express = require("express");

const router = express.Router();
const ConstructionController = require("../controllers/constructionController");

/**
 * Company routers
 */
router.get("/", ConstructionController.getAll);
router.get("/:ref", ConstructionController.getByRef);
router.post("/", ConstructionController.create);
router.put("/:ref", ConstructionController.update);
router.delete("/:ref", ConstructionController.delete);

module.exports = router;
