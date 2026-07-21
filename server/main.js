const express = require('express');
const fs = require('node:fs/promises');
const cors = require('cors');

const app = express();
const port = 21478;

app.use(cors());
app.use(express.json()); 

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://your-frontend-domain.com');
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  // Instantly respond to preflight
  if (req.method === 'OPTIONS') {
    return res.sendStatus(204);
  }
  next();
});

async function writeTextFile(name, content) {
    console.log("Recieved plan form from: " + name)
    try {
        await fs.writeFile(name + '.txt', content, 'utf8');
        return true;
        console.log('File written successfully!');
    } catch (err) {
        console.error('Error writing file:', err);
        return false;
    }
}

app.post('/submit', async (req, res) => {
    const body = req.body;
    console.log(body)
    const content = [body.name, body.plan, body.email, body.phone, body.webapp].join("\n")
    res.send(await writeTextFile(body.name, content));
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
