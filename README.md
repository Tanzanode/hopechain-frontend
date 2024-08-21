# HopeChain-Frontend
This is the front end developed in React framework and will be connected with motoko backend (IC).

## Table of Contents
- Prerequisites
- Installation
- Running the App
- Environment Variables

## Prerequisites
Before you begin, ensure you have the following installed on your local machine:
- Node.js (version 14.x or higher)
- npm (Node Package Manager) or yarn
- CRACO (Create React App Configuration Override)
 
 ```bash
# You can verify if Node.js and npm are installed by running
node -v

npm -v
```
## Installation

1. Clone the repository:

```bash
git clone https://github.com/Tanzanode/hopechain-frontend.git

cd hopechain-frontend
```
2. Install dependencies:

If you're using npm:
```bash
npm install
```

Or if you're using yarn:
```bash
yarn install
```
## Running the App

To start the development server and run the app locally:

1. Start the React app using CRACO:

If you're using npm:
```bash
npm start
```

Or if you're using yarn:
```bash
yarn start
```

## Environment Variables

To configure the app, you need to set up environment variables. Create a .env file in the root of your project and add the environment.

```bash
REACT_APP_HOPECHAIN_ENGINE_BACKEND_CANISTER_ID=your_canister_id
```

Note: Never push your .env file to GitHub, as it may contain sensitive information.


