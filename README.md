# Front-end MVP

This is the front-end MVP made to fullfill the requirements in the 'Requirements for MVP Development'. It's a web application that allows users to add, view, update, and delete products. It's built with React and requires the back-end API to be up and running. -- The back-end has it own repository, the link for is below --

## Table of Contents

- [Technology Stack](#technology-stack)
- [Back-end Repository](#back-end-repository)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Docker](#docker)
- [Dependencies](#dependencies)
- [Usage](#usage)
- [Available Scripts](#available-scripts)
- [API Endpoints](#api-endpoints)
- [Authentication](#authentication)
- [Contributors](#contributors)
- [License](#license)

## Technology Stack

This front-end is built using the following technologies:

-   **React.js**: A JavaScript library for building user interfaces
-   **React Router**: For handling routing in the React application
-   **Auth0 React SDK**: For implementing authentication
-   **JavaScript (ES6+)**: The programming language used
-   **HTML5**: For structuring the web content
-   **CSS3**: For styling the application
-   **Fetch API**: For making HTTP requests to the backend
-   **npm**: As the package manager
-   **Create React App**: For bootstrapping the React application

## Back-end Repository

The back-end for this project has its own repository. You can find it here:
[https://github.com/RenatoSouzaAN/RenatoSouza/back-end-mvp](https://github.com/RenatoSouzaAN/RenatoSouza/back-end-mvp)

## Getting Started

To get a local copy up and running, follow these steps.

### Prerequisites

- Node.js and npm installed on your machine
- A running backend server with RESTful API endpoints to handle product data
- Auth0 account for authentication

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/RenatoSouzaAN/renatosouza-front-end-mvp-react.git
   ```
2. Navigate to the project directory
   ```sh
   cd renatosouza-front-end-mvp-react
   ```
3. Create a `.env` file in the root directory and add your Auth0 configuration:
   ```
   REACT_APP_AUTH0_DOMAIN=your_auth0_domain
   REACT_APP_API_AUDIENCE=your_api_audience
   REACT_APP_CLIENT_ID=your_auth0_client_id
   ```
4. Install NPM packages
   ```sh
   npm install
   ```

### Docker

To run the front-end through Docker, ensure you have [Docker](https://docs.docker.com/engine/install/) installed and running on your machine.

Navigate to the directory containing the Dockerfile and package.json in your terminal. Execute **as administrator** the following command to build the Docker image:

```
$ docker build -t renatosouza-front-end-mvp-react .
```

Once the image is created, to run the container, **execute as an administrator** the following command:

```
$ docker run -p 3000:3000 renatosouza-front-end-mvp-react
```

Once running, to access the front-end, open [http://localhost:3000/](http://localhost:3000/) in your browser. You **must** have the back-end repository downloaded and running, so you can test the whole project.

## Dependencies

The project uses the following main dependencies:

- React
- React Router
- Auth0 React SDK
- Fetch API for HTTP requests

For a full list of dependencies, please refer to the `package.json` file.

## Usage

1. Ensure your backend server is running and accessible at `http://localhost:5000/products`.
2. Start the development server:
   ```sh
   npm start
   ```
3. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## Available Scripts

In the project directory, you can run:

- `npm start`: Runs the app in development mode
- `npm test`: Launches the test runner
- `npm run build`: Builds the app for production
- `npm run eject`: Ejects from Create React App (one-way operation)

For more details on these scripts, refer to the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

## API Endpoints

- `GET /products` - Retrieves all products
- `POST /products/create` - Adds a new product
- `PUT /products/:id/update` - Updates a product by ID
- `DELETE /products/:id/delete` - Deletes a product by ID

## Authentication

This application uses Auth0 for authentication. Users can log in to add, edit, or delete products. Public users can view products without authentication.

## Contributors

-   Renato Souza de Almeida Neto <renatosouza.an@gmail.com>

## License

Distributed under the MIT License. See `LICENSE` for more information.
