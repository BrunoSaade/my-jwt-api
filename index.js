const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

const app = express();
const PORT = 8080;
const SECRET_KEY = 'chaveSecretaUtfprDesenvolvimentoBackEnd';

app.use(bodyParser.json());

function generateRandomMessage() {
    const messages = [
        'Nodejs',
        'Discplina de back end',
        'JWT é fácil',
        'Eu sou o Bruno Saade',
        'Quero formar'
    ];
    const randomIndex = Math.floor(Math.random() * messages.length);
    return messages[randomIndex];
}

app.get('/generate-token', (req, res) => {
    const message = generateRandomMessage();
    const token = jwt.sign({ message }, SECRET_KEY, { expiresIn: '1h' });
    res.json({ token });
});

app.post('/decode-token', (req, res) => {
    const { token } = req.body;
    if (!token) {
        return res.status(400).json({ error: 'Token is required' });
    }

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        res.json({ message: decoded.message });
    } catch (err) {
        res.status(401).json({ error: 'Invalid token' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
