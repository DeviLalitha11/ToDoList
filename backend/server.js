const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// Use environment variable for MongoDB URI
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/mydatabase';
const PORT = process.env.PORT || 3000;

// MongoDB Connection
mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('Connected to MongoDB'))
    .catch(error => console.error('Error connecting:', error))

// Schema & Model
const textSchema = new mongoose.Schema({
    name: String
});

const Text = mongoose.model('Text', textSchema);

// Routes
app.get('/data', async (req, res) => {
    try {
        const data = await Text.find();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching data...' });
    }
});

app.post('/text', async (req, res) => {
    try {
        const newText = new Text(req.body);
        if (!newText) return res.status(400).json({ error: 'Invalid data' });
        await newText.save();
        res.json({ success: true, message: 'Text added successfully!' });
    } catch (error) {
        res.status(500).json({ error: 'Error Adding Text' });
    }
});

app.delete('/delete/:id', async (req, res) => {
    try {
        const id = req.params.id;
        if (!id) return res.status(400).json({ error: 'Invalid id' });
        await Text.findByIdAndDelete(id);
        res.json({ success: true, message: 'Text deleted successfully!' });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting text' });
    }
});

// Listen
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
