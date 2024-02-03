const express = require('express');
const bodyParser = require('body-parser');
const { Hercai } = require('hercai');

const app = express();
const port = process.env.PORT || 3000;
const herc = new Hercai();

app.use(bodyParser.json());

app.post('/api/ask', async (req, res) => {
  const userQuestion = req.body.question;

  try {
    const aiResponse = await herc.question({ model: "v3", content: userQuestion });
    res.json({ response: aiResponse.reply });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
