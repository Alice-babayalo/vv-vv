import express from 'express';
import { addStory, allStories, deleteStory, getStory, updateStory } from '../controllers/story.controller.js';
import upload from '../middleware/multer.js';
import { storyValidation } from '../utils/validation.js';
import authMiddleware from '../middleware/authorisation.js';

const storyRoute = express.Router();

storyRoute.post('/add', authMiddleware, upload.single('file'), storyValidation, addStory)
storyRoute.patch('/update', authMiddleware, upload.single('file'), storyValidation, updateStory);
storyRoute.delete('/delete/:id', authMiddleware, deleteStory);
storyRoute.get('/all', allStories);
storyRoute.get('/get/:id', getStory);

export default storyRoute;