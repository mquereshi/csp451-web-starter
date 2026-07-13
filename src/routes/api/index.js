const express = require("express");
const { router: healthRouter } = require("./health");
const { router: itemsRouter } = require("./items");

const router = express.Router();

router.use(healthRouter);
router.use(itemsRouter);

module.exports = { router };
