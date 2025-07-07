# EraseIt - Background Remover

EraseIt is a modern web application that automatically removes backgrounds from images using ClipDrop's third-party API. Built with React, Node.js, and integrated with Clerk for authentication and Razorpay for payments.

- **Landing Page**

![Landing Page](Client\public\landing_page.png)

- **Result Page**

![Result Page](Client\public\result.png)

- **Buy Credit Page** 

![Result Page](Client\public\buy.png)

[Click Here to view Live Project](https://erase-it-vw2d.vercel.app/)

## Features

-  Automatic background removal using ClipDrop third-party API
-  User authentication with Clerk
-  Credit-based system with Razorpay payment integration
-  Responsive design with Tailwind CSS
-  Fast and modern UI built with React + Vite
-  Real-time credit balance tracking

## Tech Stack

### Frontend
- **React** - UI library
- **Vite** - Build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router DOM** - Client-side routing
- **Clerk** - Authentication and user management
- **Axios** - HTTP client
- **React Toastify** - Toast notifications
- **Lucide React** - Icon library

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database with Mongoose ODM
- **Multer** - File upload middleware
- **Razorpay** - Payment gateway
- **ClipDrop API** - AI background removal
- **CORS** - Cross-origin resource sharing
- **JWT** - JSON Web Tokens for authentication

## API Endpoints

### User Routes (`/api/user`)

| Method | Endpoint | Description | Authentication |
|--------|----------|-------------|----------------|
| POST | `/webhooks` | Handle Clerk webhooks for user management | None |
| GET | `/credits` | Get user's available credits | Required |
| POST | `/pay-razor` | Create Razorpay payment order | Required |
| POST | `/verify-razor` | Verify Razorpay payment success | None |

### Image Routes (`/api/image`)

| Method | Endpoint | Description | Authentication |
|--------|----------|-------------|----------------|
| POST | `/remove-bg` | Remove background from uploaded image | Required |

## Environment Variables

### Frontend (.env)
```env
VITE_CLERK_PUBLISHABLE_KEY=pk_test_xxxxx
VITE_BACKEND_URL=http://localhost:4000
VITE_RAZORPAY_KEY_ID=rzp_test_xxxxx
```

### Backend (.env)
```env
PORT=4000
MONGODB_URI=mongodb://localhost:27017/eraseit
CLERK_WEBHOOK_SECRET=whsec_xxxxx
RAZORPAY_KEY_ID=rzp_test_xxxxx
RAZORPAY_KEY_SECRET=xxxxx
CLIPDROP_API_KEY=xxxxx
CURRENCY=INR
```

## Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local installation or MongoDB Atlas)
- Clerk account for authentication
- Razorpay account for payments
- ClipDrop API key for background removal

### Backend Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd EraseIt/Server
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   Create a `.env` file in the Server directory with the following variables:
   ```env
   PORT=4000
   MONGODB_URI=mongodb://localhost:27017/eraseit
   CLERK_WEBHOOK_SECRET=your_clerk_webhook_secret
   RAZORPAY_KEY_ID=your_razorpay_key_id
   RAZORPAY_KEY_SECRET=your_razorpay_key_secret
   CLIPDROP_API_KEY=your_clipdrop_api_key
   CURRENCY=INR
   ```

4. **Start the server**
   ```bash
   npm start
   # or for development with auto-reload
   npm run server
   ```

The server will start on `http://localhost:4000`

### Frontend Setup

1. **Navigate to Client directory**
   ```bash
   cd ../Client
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   The `.env` file is already present in the Client directory. Update the values as needed:
   ```env
   VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   VITE_BACKEND_URL=http://localhost:4000
   VITE_RAZORPAY_KEY_ID=your_razorpay_key_id
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

The application will start on `http://localhost:5173`

### Third-Party Service Setup

#### 1. Clerk Authentication
- Create a Clerk account at [clerk.com](https://clerk.com)
- Create a new application
- Get your publishable key and webhook secret
- Configure webhooks to point to your backend `/api/user/webhooks`

#### 2. Razorpay Payments
- Create a Razorpay account at [razorpay.com](https://razorpay.com)
- Get your Key ID and Key Secret from the dashboard
- Configure webhook URLs if needed

#### 3. ClipDrop API
- Sign up at [ClipDrop API](https://clipdrop.co/apis)
- Get your API key for background removal

## Credit System

The application uses a credit-based system with three plans:

| Plan | Credits | Price |
|------|---------|-------|
| Basic | 100 | ₹10 |
| Advanced | 500 | ₹50 |
| Business | 5000 | ₹250 |

Each background removal operation consumes 1 credit.

## Project Structure

```
EraseIt/
├── Client/                 # Frontend React application
│   ├── src/
│   │   ├── components/     # Reusable React components
│   │   ├── pages/         # Page components
│   │   ├── context/       # React context providers
│   │   └── assets/        # Static assets
│   ├── public/            # Public static files
│   └── package.json
└── Server/                # Backend Node.js application
    ├── controllers/       # Route controllers
    ├── models/           # MongoDB models
    ├── routes/           # API routes
    ├── middlewares/      # Custom middleware
    ├── configs/          # Configuration files
    └── package.json
```

## Development Commands

### Frontend
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

### Backend
```bash
npm start        # Start production server
npm run server   # Start development server with nodemon
```

## Deployment

### Frontend (Vercel)
The frontend is configured for Vercel deployment with `vercel.json`. Simply connect your repository to Vercel.

### Backend (Railway/Heroku)
1. Set up environment variables in your hosting platform
2. Ensure MongoDB connection is configured for production
3. Update CORS settings if needed

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License.
