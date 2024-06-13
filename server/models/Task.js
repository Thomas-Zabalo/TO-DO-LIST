// models/Task.js
const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    titre: { type: String, required: true },
    description: String,
    status: { type: String, enum: ['En attente', 'En cours', 'Terminé'], default: 'En attente' },
    Date: Date
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
