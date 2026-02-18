import express from "express";
import path from "path";
import { existsSync } from "fs";

const cors = require("cors");
const app = express();
const port = 8080;

const corsOptions = {
  origin: "http://localhost:5173",
};

app.use(cors(corsOptions));
app.use(express.json());

// API routes first
app.get("/api/hello", (req, res) => {
  res.json({ message: "Hello World!" });
});

// Static files and SPA fallback last (only when client is built)
const clientDist = path.join(__dirname, "../../client/dist");
if (existsSync(clientDist)) {
  app.use(express.static(clientDist));

  app.get("/{*splat}", (req, res) => {
    res.sendFile(path.join(clientDist, "index.html"), (err) => {
      if (err) {
        res.status(500).send(
          'Client not built. Run "npm run build" in the client directory first.'
        );
      }
    });
  });
} else {
  app.get("/{*splat}", (req, res) => {
    res.status(500).send(
      'Client not built. Run "npm run build" in the client directory first.'
    );
  });
}

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
