// routes/tasks.js
const express = require('express');
const router = express.Router();
const Task = require('../../models/Task');

// Route pour créer une nouvelle tâche
router.post('/tasks', async (req, res) => {
    try {
        const { titre, description, status, Date } = req.body;
        const newTask = new Task({ titre, description, status, Date });
        const savedTask = await newTask.save();
        res.status(201).json(savedTask);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Route pour récupérer toutes les tâches
router.get('/tasks', async (req, res) => {
    try {
        const tasks = await Task.find();
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Route pour récupérer une tâche par son ID
router.get('/tasks/:id', async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) {
            return res.status(404).json({ error: 'Tâche non trouvée' });
        }
        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Route pour mettre à jour une tâche par son ID
router.put('/tasks/:id', async (req, res) => {
    try {
        const { titre, description, status, Date } = req.body;
        const updatedTask = await Task.findByIdAndUpdate(req.params.id, { titre, description, status, Date }, { new: true });
        if (!updatedTask) {
            return res.status(404).json({ error: 'Tâche non trouvée' });
        }
        res.status(200).json(updatedTask);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Route pour supprimer une tâche par son ID
router.delete('/tasks/:id', async (req, res) => {
    try {
        const deletedTask = await Task.findByIdAndDelete(req.params.id);
        if (!deletedTask) {
            return res.status(404).json({ error: 'Tâche non trouvée' });
        }
        res.status(204).send(); // Réponse 204 No Content
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
