const projects = require('../models/projectsData');

/**
 * GET /api/projects
 * Returns all projects, optionally filtered by category
 */
const getAllProjects = (req, res) => {
  const { category } = req.query;

  let result = projects;
  if (category && category !== 'All') {
    result = projects.filter(
      (p) => p.category.toLowerCase() === category.toLowerCase()
    );
  }

  res.json({
    success: true,
    count: result.length,
    data: result,
  });
};

/**
 * GET /api/projects/:id
 * Returns a single project by ID
 */
const getProjectById = (req, res) => {
  const project = projects.find((p) => p.id === req.params.id);

  if (!project) {
    return res.status(404).json({ success: false, error: 'Project not found' });
  }

  res.json({ success: true, data: project });
};

module.exports = { getAllProjects, getProjectById };
