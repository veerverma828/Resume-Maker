import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.join(__dirname, 'data');
const DATA_FILE = path.join(DATA_DIR, 'resumes.json');

// Ensure data directory and file exist
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}
if (!fs.existsSync(DATA_FILE)) {
  fs.writeFileSync(DATA_FILE, JSON.stringify([], null, 2), 'utf8');
}

// Helper to read resumes
const readResumes = () => {
  try {
    const data = fs.readFileSync(DATA_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading resumes file:', error);
    return [];
  }
};

// Helper to write resumes
const writeResumes = (resumes) => {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(resumes, null, 2), 'utf8');
    return true;
  } catch (error) {
    console.error('Error writing resumes file:', error);
    return false;
  }
};

// GET all resumes
router.get('/resumes', (req, res) => {
  const resumes = readResumes();
  // Return summarized info for dashboard list (omit heavy details if needed, but for local it's fine)
  res.json(resumes.map(r => ({
    id: r.id,
    title: r.title || 'Untitled Resume',
    updatedAt: r.updatedAt,
    templateId: r.templateId,
    personalInfo: r.personalInfo ? { name: r.personalInfo.name, email: r.personalInfo.email } : {}
  })));
});

// GET resume by ID
router.get('/resumes/:id', (req, res) => {
  const resumes = readResumes();
  const resume = resumes.find(r => r.id === req.params.id);
  if (!resume) {
    return res.status(404).json({ message: 'Resume not found' });
  }
  res.json(resume);
});

// POST save a new resume or update existing
router.post('/resumes', (req, res) => {
  const newResume = req.body;
  if (!newResume.id) {
    return res.status(400).json({ message: 'Resume ID is required' });
  }
  
  const resumes = readResumes();
  const index = resumes.findIndex(r => r.id === newResume.id);
  
  newResume.updatedAt = new Date().toISOString();
  
  if (index !== -1) {
    resumes[index] = { ...resumes[index], ...newResume };
  } else {
    newResume.createdAt = new Date().toISOString();
    resumes.push(newResume);
  }
  
  if (writeResumes(resumes)) {
    res.status(200).json(newResume);
  } else {
    res.status(500).json({ message: 'Failed to write resume data' });
  }
});

// PUT update existing resume
router.put('/resumes/:id', (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;
  const resumes = readResumes();
  const index = resumes.findIndex(r => r.id === id);
  
  if (index === -1) {
    return res.status(404).json({ message: 'Resume not found' });
  }
  
  resumes[index] = {
    ...resumes[index],
    ...updatedData,
    id, // Ensure ID remains immutable
    updatedAt: new Date().toISOString()
  };
  
  if (writeResumes(resumes)) {
    res.json(resumes[index]);
  } else {
    res.status(500).json({ message: 'Failed to update resume data' });
  }
});

// DELETE a resume
router.delete('/resumes/:id', (req, res) => {
  const { id } = req.params;
  const resumes = readResumes();
  const filtered = resumes.filter(r => r.id !== id);
  
  if (resumes.length === filtered.length) {
    return res.status(404).json({ message: 'Resume not found' });
  }
  
  if (writeResumes(filtered)) {
    res.json({ message: 'Resume deleted successfully' });
  } else {
    res.status(500).json({ message: 'Failed to delete resume' });
  }
});

export default router;
