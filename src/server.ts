
import dotenv from 'dotenv';
import express from 'express';
import { TaskController } from './controllers/TaskController';
import { initializeDatabase } from './data-source';

dotenv.config();

const app = express();

app.use(express.json());

const taskController = new TaskController();

app.get('/tasks', async (req, res) => {
    try {
        const tasks = await taskController.getAll();
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve tasks' });
    }
});

app.get('/tasks/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const task = await taskController.getById(Number(id));
        if (task) {
            res.json(task);
        } else {
            res.status(404).json({ error: 'Task not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve task' });
    }
});

app.post('/tasks', async (req, res) => {
    const { title, description, completed } = req.body;
    try {
        const task = await taskController.create(title, description, completed);
        res.status(201).json(task);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create task' });
    }
});

app.put('/tasks/:id', async (req, res) => {
    const { id } = req.params;
    const updates = req.body;
    try {
        const task = await taskController.update(Number(id), updates);
        if (task) {
            res.json(task);
        } else {
            res.status(404).json({ error: 'Task not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to update task' });
    }
});

app.delete('/tasks/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const wasDeleted = await taskController.delete(Number(id));
        if (wasDeleted) {
            res.status(204).send();
        } else {
            res.status(404).json({ error: 'Task not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete task' });
    }
});

async function startServer() {
    await initializeDatabase();

    app.listen(process.env.PORT || 3000, () => {
        console.log(`Server running on http://localhost:${process.env.PORT || 3000}`);
    });
}

startServer();
