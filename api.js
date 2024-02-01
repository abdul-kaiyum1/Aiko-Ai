// api.js
const { Hercai } = require('hercai');
const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

const herc = new Hercai();

app.get('/generateImage', async (req, res) => {
  const { model = 'v3', prompt = '', negative_prompt = '' } = req.query;

  try {
    const response = await herc.drawImage({ model, prompt, negative_prompt });
    res.json({ url: response.url });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
