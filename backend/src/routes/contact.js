const express = require('express');
const { submitContact } = require('../controllers/contactController');

const router = express.Router();

// POST /api/contact — submit contact form
router.post('/', submitContact);

module.exports = router;
