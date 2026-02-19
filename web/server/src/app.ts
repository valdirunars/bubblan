import express from "express";
import path from "path";
import { existsSync } from "fs";
import { usersRouter } from "./resources/users/users.routes";
import _dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";
import cookieParser from "cookie-parser";

const cors = require("cors");
const app = express();
const port = 8080;

const corsOptions = {
  origin: "http://localhost:5173",
};

export const supabaseAdmin = createClient(
  process.env.SUPABASE_URL ?? "",
  process.env.SUPABASE_SECRET_KEY ?? "",
  {
    auth: { persistSession: false },
  },
);

app.use(cors(corsOptions));
app.use(express.json());

app.use(cookieParser());

app.use("/api/users", usersRouter);

// Static files and SPA fallback last (only when client is built)
const clientDist = path.join(__dirname, "../../client/dist");
if (existsSync(clientDist)) {
  app.use(express.static(clientDist));

  app.get("/{*splat}", (req, res) => {
    res.sendFile(path.join(clientDist, "index.html"), (err) => {
      if (err) {
        res
          .status(500)
          .send(
            'Client not built. Run "npm run build" in the client directory first.',
          );
      }
    });
  });
} else {
  app.get("/{*splat}", (req, res) => {
    res
      .status(500)
      .send(
        'Client not built. Run "npm run build" in the client directory first.',
      );
  });
}

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
