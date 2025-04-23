const express = require('express');
const router = express.Router();
const Item = require('../models/Item');

/**
 * @swagger
 * /api/items:
 *   get:
 *     summary: Get all items
 *     responses:
 *       200:
 *         description: Success
 */
router.get('/', async (req, res) => {
  const items = await Item.find();
  res.json(items);
});

/**
 * @swagger
 * /api/items:
 *   post:
 *     summary: Create a new item
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       201:
 *         description: Created
 */
router.post('/', async (req, res) => {
  const item = new Item({ name: req.body.name });
  await item.save();
  res.status(201).json(item);
});

module.exports = router;