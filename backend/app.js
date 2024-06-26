import express from "express";
import cors from "cors";
import User from "./models/user.js";
import connectDB from "./utils/mongodb.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import "dotenv/config";
import Board from "./models/board.js";
import Task from "./models/task.js";

var saltRounds = 10;
const app = express();
app.use(cookieParser());
connectDB();

var corsOptions = {
  origin: process.env.FRONTEND_URL,
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.use(express.json());

app.listen(process.env.PORT, () => {
  console.log("App is listening");
});

app.get("/", (req, res) => {
  res.send("<h1>Hello</h1>");
});

app.post("/register", async (req, res) => {
  console.log(req.body);
  const { username, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res
        .status(400)
        .json({ error: "Username or email already exists" });
    }

    const hashedPassword = bcrypt.hashSync(password, saltRounds);
    const userData = await User.create({
      username,
      email,
      password: hashedPassword,
    });
    res.status(200).json(userData);
  } catch (error) {
    console.error("Error registering:", error);
    res.status(500).json({ error: "Failed to register user" });
  }
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const userData = await User.findOne({ username: username });
  if (!userData) {
    return res.status(400).json({ message: "Invalid username or password" });
  }
  bcrypt.compare(password, userData.password, function (err, result) {
    if (result == true) {
      jwt.sign(
        { username, id: userData._id },
        process.env.JWT,
        {},
        (err, token) => {
          if (err) throw err;

          res
            .cookie("token", token, {
              httpOnly: true,
              secure: true,
              sameSite: "none",
            })
            .status(200)
            .json({ id: userData._id, username, message: "Authenticated" });
        }
      );
    } else {
      console.log(err);
      res.status(400).json({ message: "Invalid username or password" });
    }
  });
});

app.post("/logout", (req, res) => {
  res
    .cookie("token", "", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    })
    .json({ message: "Logout successful" })
    .status(201);
});

app.get("/profile", (req, res) => {
  const { token } = req.cookies;
  if (!token) {
    return res.status(401).json({ message: "Token missing" });
  }
  jwt.verify(token, process.env.JWT, {}, (err, info) => {
    if (err) {
      console.error(err);
      return res.status(401).json({ message: "Invalid token" });
    }
    res.status(200).json(info);
  });
});

app.post("/board", async (req, res) => {
  const { token } = req.cookies;
  if (!token) {
    return res.status(401).json({ message: "Token missing" });
  }

  jwt.verify(token, process.env.JWT, {}, async (err, info) => {
    if (err) {
      console.error(err);
      return res.status(401).json({ message: "Invalid token" });
    }

    const { board } = req.body;
    const { id } = info;
    console.log(id);

    try {
      const newBoard = await Board.create({ title: board, user: id });
      res.status(201).json(newBoard);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error creating board" });
    }
  });
});

app.get("/boards", async (req, res) => {
  const { token } = req.cookies;
  if (!token) {
    return res.status(401).json({ message: "Token missing" });
  }

  jwt.verify(token, process.env.JWT, {}, async (err, info) => {
    if (err) {
      console.error(err);
      return res.status(401).json({ message: "Invalid token" });
    }
    const { id } = info;
    try {
      const boards = await Board.find({ user: id });
      res.status(200).json(boards);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to fetch boards" });
    }
  });
});

app.delete("/board", async (req, res) => {
  const { id } = req.body;
  const board = await Board.findByIdAndDelete(id);
  if (!board) {
    res.status(404).json({ message: "Board not found" });
  }
  res.status(201).json({ message: "Board Deleted" });
});

app.get("/board/:id", async (req, res) => {
  const boardId = req.params.id;
  const board = await Board.findById(boardId);
  if (!board) {
    res.status(404).json({ message: "Board not found" });
  }
  console.log(board);
  res.json(board).status(201);
});

app.get("/board/:boardId/tasks", async (req, res) => {
  try {
    const tasks = await Task.find({ board: req.params.boardId });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.delete("/tasks/:id", async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post("/tasks", async (req, res) => {
  try {
    const { title, description, boardId } = req.body;
    const board = await Board.findById(boardId);

    if (!board) {
      return res.status(404).json({ message: "Board not found" });
    }

    const task = new Task({
      title,
      description,
      board: boardId,
    });

    await task.save();
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
