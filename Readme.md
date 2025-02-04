# Uber Clone

A full-stack ride-sharing application that replicates core Uber functionalities. This application allows users to request rides, track drivers in real-time, and manage payments.

## Features

- 🚗 Real-time ride tracking
- 📍 Live location updates
- 🗺️ Interactive maps and routing
- 👤 User authentication
- 🚘 Driver and passenger modes
- 📱 Responsive design for mobile and desktop
- 📍 Address autocomplete
- 💰 Fare estimation

## Tech Stack

- **Frontend:**
  - React.js
  - Tailwind CSS
  - MapBox/Google Maps API

- **Backend:**
  - Node.js
  - Express.js
  - MongoDB
  - Socket.IO for real-time updates

- **Authentication:**
  - JWT
  - Bcrypt


## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- MongoDB
- npm or yarn
- MapBox/Google Maps API key

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/uber-clone.git
```

2. Install dependencies:
```bash
cd uber-clone
npm install
```

3. Configure environment variables:
Create a `.env` file in the root directory:
```env
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_api_key
MONGODB_URI=your_mongodb_uri
STRIPE_SECRET_KEY=your_stripe_key
JWT_SECRET=your_jwt_secret
```

4. Start the development server:
```bash
npm run dev
```

## Key Features Explained

### 🗺️ Real-time Tracking
- Live location updates using Socket.IO
- Interactive map interface
- Route visualization

### 👤 User System
- Driver and passenger profiles
- Rating and review system
- Ride history
- Authentication and authorization

## Mobile Responsiveness

The application is fully responsive and provides a native-like experience on mobile devices:
- Adaptive UI components
- Touch-friendly interfaces
- Mobile-first design approach


## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Inspired by Uber
- Built with modern web technologies
- Thanks to all contributors