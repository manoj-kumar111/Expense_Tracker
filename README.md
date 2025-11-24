# Expense Tracker

A full-stack expense tracking application built with React (frontend) and Node.js/Express (backend) with MongoDB.

## Features

- User authentication (signup/login)
- Add, update, delete expenses
- Categorize expenses
- Mark expenses as done
- Responsive UI with Tailwind CSS

## Tech Stack

### Frontend
- React 19
- Vite
- Redux Toolkit
- Tailwind CSS
- Radix UI components
- Axios for API calls

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- bcryptjs for password hashing

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- Git

### Installation

1. Clone the repository:
```bash
git clone https://github.com/manoj-kumar111/Expense_Tracker.git
cd ExpenseTracker-Final
```

2. Install backend dependencies:
```bash
cd BackEnd
npm install
```

3. Install frontend dependencies:
```bash
cd ../FrontEnd
npm install
```

4. Set up environment variables:

Create `.env` file in `BackEnd/` directory:
```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
CORS_ORIGIN=http://localhost:5173
```

5. Start the backend server:
```bash
cd BackEnd
npm run dev
```

6. Start the frontend development server:
```bash
cd ../FrontEnd
npm run dev
```

The application will be running at:
- Frontend: http://localhost:5173
- Backend: http://localhost:3000

## API Endpoints

### User Routes
- `POST /api/v1/user/register` - Register new user
- `POST /api/v1/user/login` - User login
- `GET /api/v1/user/logout` - User logout

### Expense Routes
- `POST /api/v1/expense/add` - Add new expense
- `GET /api/v1/expense/getall` - Get all expenses (with optional category and done filters)
- `PUT /api/v1/expense/update/:id` - Update expense
- `PUT /api/v1/expense/:id/done` - Mark expense as done/undone
- `DELETE /api/v1/expense/remove/:id` - Delete expense

## Deployment

### Backend on Render
1. Create a new web service on Render
2. Connect your GitHub repository
3. Set build command: `npm install`
4. Set start command: `npm start`
5. Add environment variables:
   - `MONGO_URI`
   - `JWT_SECRET`
   - `CORS_ORIGIN` (set to your Vercel frontend URL)

### Frontend on Vercel
1. Create a new project on Vercel
2. Connect your GitHub repository
3. Set build command: `npm run build`
4. Set output directory: `dist`
5. Add environment variable:
   - `VITE_API_BASE_URL` (set to your Render backend URL)

## Project Structure

```
ExpenseTracker-Final/
├── BackEnd/
│   ├── controllers/
│   ├── database/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── .env
│   ├── .gitignore
│   ├── index.js
│   └── package.json
├── FrontEnd/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── lib/
│   │   ├── redux/
│   │   └── assets/
│   ├── .gitignore
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── README.md
└── README.md
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License.
