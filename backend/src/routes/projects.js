const express = require('express');
const { getAllProjects, getProjectById } = require('../controllers/projectsController');

const router = express.Router();

// GET /api/projects         — fetch all (optional ?category=filter)
// GET /api/projects/:id     — fetch single project
router.get('/', getAllProjects);
router.get('/:id', getProjectById);

module.exports = router;
