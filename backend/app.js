import express from "express";
import cors from "cors";
import User from "./models/user.js";
import connectDB from "./utils/mongodb.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import "dotenv/config";

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
     return res.status(400).json({ error: "Username or email already exists" });
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

