# HopeChain-Frontend
This project aimed at leveraging the transparency and security of blockchain technology to support social groups such as drug addicts, children and other charitable organizations.The frontend is developed in React framework and connected with motoko backend (IC).

## Table of Contents
- Prerequisites
- Installation
- Running the App
- Environment Variables

## Prerequisites
To learn more before you start working with `hopechain-engine`, see the following documentation available online:

- [Quick Start](https://internetcomputer.org/docs/current/developer-docs/setup/deploy-locally)
- [SDK Developer Tools](https://internetcomputer.org/docs/current/developer-docs/setup/install)
- [Motoko Programming Language Guide](https://internetcomputer.org/docs/current/motoko/main/motoko)
- [Motoko Language Quick Reference](https://internetcomputer.org/docs/current/motoko/main/language-manual)

Before you begin, ensure you have the following installed on your local machine:
- Node.js (version 14.x or higher)
- npm (Node Package Manager) or yarn
- CRACO (Create React App Configuration Override)
- IC-SDK
 
 ```bash
# You can verify if IC-SDK(dfx), Node.js and npm are installed by running
node -v

npm -v

dfx -V
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

For this project please also install mops

```bash
npm i -g ic-mops
```

## Running the App

To start the development server and run the app locally:

1. Start the dApp:

```bash
# Starts the replica, running in the background
dfx start --clean --background

# Deploys your canisters to the replica and generates your candid interface
dfx deploy
```
Once the job completes, your application will be available at `http://localhost:4943?canisterId={asset_canister_id}`.

If you have made changes to your backend canister, you can generate a new candid interface with

```bash
npm run generate
```

at any time. This is recommended before starting the frontend development server, and will be run automatically any time you run `dfx deploy`.

If you are making frontend changes, you can start a development server with

```bash
npm start
```

Which will start a server at `http://localhost:8080`, proxying API requests to the replica at port 4943.

## Environment Variables

To configure the app, you need to set up environment variables. Create a .env file in the root of your project and add the environment.

```bash
REACT_APP_HOPECHAIN_ENGINE_BACKEND_CANISTER_ID=your_canister_id
```

Note: Never push your .env file to GitHub, as it may contain sensitive information.


