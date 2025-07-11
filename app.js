import express from 'express';

const app = express();

app.get('/', (req, res) => {
    res.send('Welcome to SubTub subscription tracker API!');
});

app.listen(3000, () => {
    console.log('SubTub API running on Local Host Port 3000');
});

export default app