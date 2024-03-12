const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { translate } = require('@vitalets/google-translate-api');

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.listen(3000, () => {
    console.log('Server running');
});

app.post("/translate", async (req, res) => {
    try {
        const { query, language } = req.body;
        if (!query || !language) {
            return res.status(400).json({ error: 'Text and language are required.' });
        }
        const translation = await translate(query, { to: language });
        res.send(translation.text)
    } catch (error) {
        console.error('Translation error:', error);
        res.status(500).json({ error: 'An error occurred during translation.' });
    }
});