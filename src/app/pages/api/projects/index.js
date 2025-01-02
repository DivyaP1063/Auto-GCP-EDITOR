import { getProjectsFromDatabase } from '../../../lib/database'; // Mock function to fetch data from DB

export default async (req, res) => {
  try {
    const projects = await getProjectsFromDatabase();
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching projects', error: error.message });
  }
};