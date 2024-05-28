# Frontend Service

This frontend service provides a user interface for managing products and users. It is built with React and communicates with the backend service for CRUD operations. This project aims to deliver a seamless and responsive user experience.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Technologies](#technologies)
- [Future Implementations](#future-implementations)
- [Contributing](#contributing)
- [License](#license)
- [Related Projects](#related-projects)

## Installation

1. **Clone the repository:**

   ```sh
   git clone https://github.com/yourusername/frontend-service.git
   cd frontend-service
   ```

2. **Install dependencies:**

   ```sh
   npm install
   ```

3. **Set up environment variables:**

   Create a `.env` file in the root directory and add the following variables:

   ```plaintext
   REACT_APP_BACKEND_URL=http://localhost:3000
   ```

4. **Start the service:**

   ```sh
   npm start
   ```

## Usage

After starting the service, it will be available at `http://localhost:3000`. Open this URL in your browser to interact with the frontend.

## Features

- **User Authentication**: Login and registration functionality using JWT tokens.
- **Product Management**: Create, read, update, and delete products.
- **User Management**: Create, read, update, and delete users.
- **Role Management**: Although roles are defined, the deployment is open to all users.
- **Admin Panel**: Admins have access to additional functionalities for managing products and users.
- **Responsive Design**: Optimized for both desktop and mobile views.

## Technologies

- **React**: A JavaScript library for building user interfaces.
- **Redux**: A predictable state container for JavaScript apps.
- **React Router**: Declarative routing for React.
- **Axios**: Promise based HTTP client for the browser and Node.js.
- **Tailwind CSS**: A utility-first CSS framework for rapidly building custom user interfaces.
- **JWT (JSON Web Tokens)**: For authentication and authorization.
- **Cloudinary**: Cloud-based image and video management services (for uploading and managing product images).

## Future Implementations

- **Password Reset**: Users will be able to reset their passwords via email. The backend for this feature has been implemented.
- **Email System**: Automated emails for account verification, password reset, and notifications. The backend for this feature has been implemented.

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch:

   ```sh
   git checkout -b feature-branch
   ```

3. Make your changes.
4. Commit your changes:

   ```sh
   git commit -m 'Add some feature'
   ```

5. Push to the branch:

   ```sh
   git push origin feature-branch
   ```

6. Open a pull request.

Please ensure your code adheres to the project's coding standards and includes appropriate tests.

## Related Projects

- **[Backend Service](https://github.com/batuncer/Ecommercial-Backend)**

- **[Order Service](https://github.com/batuncer/Ecommerce-order-service)**: Manages order creation, processing, and integration with RabbitMQ for message queuing.
