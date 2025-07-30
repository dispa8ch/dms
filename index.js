import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

// __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static assets
const clientDist = path.join(__dirname, "dist");
app.use(express.static(clientDist));

app.get("/", (req, res) => {
  res.sendFile(path.join(clientDist, "index.html"), (err) => {
    if (err) {
      res.status(500).send(err);
    }
  });
});

// Fallback route (for SPA)
app.use((req, res) => {
  const indexPath = path.join(clientDist, "index.html");

  app.use((req, res) => {
    fs.access(indexPath, fs.constants.F_OK, (err) => {
      if (err) {
        return res.status(404).send("index.html not found");
      }

      res.sendFile(indexPath, (err) => {
        if (err) res.status(500).send("Error loading index.html");
      });
    });
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
