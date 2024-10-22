import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";

/* import middleware */
import { verifyToken } from "./middleware/auth.js";
/* import routes */
import authRoutes from "./routes/auth.js";
import examQuestionRoutes from "./routes/ExamQuestionRoutes.js";
import labSessionRoutes from "./routes/labSession.js";
import forumRoutes from "./routes/forum.js";
import examRoutes from "./routes/ExamRoutes.js";
import examResultRoutes from "./routes/ExamResultRoutes.js";
import compilationRoutes from "./routes/compilationRoutes.js";
import userRoutes from "./routes/UserRoutes.js";
import aiChatRoutes from "./routes/aiChatRoutes.js";
import { setupWebSocketServer } from "./utils/websocket.js";
import labattendanceRoutes from "./routes/LabAttendanceRoutes.js";

dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

/* ROUTES */
app.use("/api/auth", authRoutes);
app.use("/api/v1/questions", examQuestionRoutes);
app.use("/api/v1/exams", examRoutes);
app.use("/api/v1/results", examResultRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/labs", verifyToken, labSessionRoutes);
app.use("/api/forum", verifyToken, forumRoutes);
/**api route  */
app.use("/api/v1/compilations", compilationRoutes);
app.use("/api/v1/ai-chat-responses", aiChatRoutes);

//TODO: testing routes

app.use("/api/v1/admin", labattendanceRoutes);

app.get("/api/student", verifyToken, (req, res) => {
  res.json({
    message: "You made it to the secure route",
    user: req.user,
  });
});

// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 5000;
mongoose // eslint-disable-next-line no-undef
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    const server = app.listen(PORT, () =>
      console.log(`Server running on port: ${PORT}`)
    );
    setupWebSocketServer(server);
  })
  .catch((error) => console.log(`${error} did not connect`));
