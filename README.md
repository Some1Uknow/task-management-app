# TaskFlow

TaskFlow is a task management application built using the MERN stack (MongoDB, Express.js, React.js, Node.js). Inspired by tools like Trello and Asana, TaskFlow allows users to create boards, add tasks to these boards, and manage tasks effectively. The application is designed to be responsive and user-friendly.

## Table of Contents

- [Features](#features)
- [Motivation](#motivation)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Deployed Link](#deployed-link)
- [License](#license)

## Features

- User authentication and authorization (signup, login, logout)
- Create, update, and delete boards
- Create, update, and delete tasks within each board
- Responsive design for various devices and screen sizes

## Motivation

TaskFlow was created to provide users with a simple yet powerful tool for managing tasks and projects. By organizing tasks into boards, users can better visualize their workflow and increase productivity. The inspiration for TaskFlow comes from popular project management tools like Trello and Asana, with the aim of delivering a similar experience with a focus on simplicity and ease of use.

## Tech Stack

- **Frontend**: React.js, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **Deployment**: Vercel

## Installation

To get a local copy up and running, follow these steps:

### Prerequisites

- Node.js and npm installed on your machine
- MongoDB installed and running locally or a MongoDB Atlas account

### Backend Setup

1. Clone the repository:

    ```sh
    git clone https://github.com/yourusername/taskflow.git
    cd taskflow
    ```

2. Install backend dependencies:

    ```sh
    cd backend
    npm install
    ```

3. Create a `.env` file in the `backend` directory and add the following environment variables:

    ```env
    MONGO_URI=your_mongodb_uri
    JWT_SECRET=your_jwt_secret
    PORT=5000
    ```

4. Start the backend server:

    ```sh
    npm start
    ```

### Frontend Setup

1. Open a new terminal window and navigate to the `frontend` directory:

    ```sh
    cd frontend
    ```

2. Install frontend dependencies:

    ```sh
    npm install
    ```

3. Create a `.env` file in the `frontend` directory and add the following environment variable:

    ```env
    VITE_BASE_URL=backend_url
    ```

4. Start the frontend development server:

    ```sh
    npm run dev
    ```

## Usage

Once both the backend and frontend servers are running, you can access the application at `http://localhost:3000`. 

- Sign up for a new account or log in with existing credentials.
- Create a new board using the form provided.
- Add tasks to your board, update them as needed, and delete tasks when completed.

## Deployed Link

The application is deployed and can be accessed at: [TaskFlow](https://taskflow1.vercel.app)

## License

Distributed under the MIT License. See `LICENSE` for more information.

