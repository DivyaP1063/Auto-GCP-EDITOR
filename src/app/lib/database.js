// lib/database.js
let projects = [];

export const addProjectToDatabase = (projectData) => {
  const project = { id: projects.length + 1, ...projectData };
  projects.push(project);
  return project;
};

export const getProjectsFromDatabase = () => {
  return projects;
};