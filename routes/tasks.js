// routes/tasks.js
const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

// Créer une tâche
router.post('/tasks', async (req, res) => {
    try {
        const { title, description, status, dueDate } = req.body;
        const task = new Task({ title, description, status, dueDate });
        await task.save();
        res.status(201).json(task);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Lire toutes les tâches
router.get('/tasks', async (req, res) => {
    try {
        const tasks = await Task.find();
        res.status(200).json(tasks);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Lire une tâche spécifique
router.get('/tasks/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const task = await Task.findById(id);
        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }
        res.status(200).json(task);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Mettre à jour une tâche
router.put('/tasks/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, status, dueDate } = req.body;
        const task = await Task.findByIdAndUpdate(id, { title, description, status, dueDate }, { new: true });
        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }
        res.status(200).json(task);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Supprimer une tâche
router.delete('/tasks/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const task = await Task.findByIdAndDelete(id);
        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }
        res.status(204).send();
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;
