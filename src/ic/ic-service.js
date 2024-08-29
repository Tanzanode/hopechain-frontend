import { Actor, HttpAgent } from '@dfinity/agent';
import { idlFactory as hopechain_engine_idl } from '../declarations/hopechain-engine-backend/hopechain-engine-backend.did.js';

const agent = new HttpAgent({ host: "http://127.0.0.1:4943" });
agent.fetchRootKey(); 

const hopechain_engine_id = process.env.REACT_APP_HOPECHAIN_ENGINE_BACKEND_CANISTER_ID;

console.log("Canister ID:", hopechain_engine_id);

const hopechain_engine = Actor.createActor(hopechain_engine_idl, {
  agent,
  canisterId: hopechain_engine_id,
});

console.log("Available methods:", Object.keys(hopechain_engine));

export const registerUser = async (name) => {
  try {
    const user = await hopechain_engine.registerUser(name);
    if (user) {
      console.log('User registered:', user);
      return user;
    } else {
      console.log('User already exists');
      return null;
    }
  } catch (error) {
    console.error('Error registering user:', error);
    throw error;
  }
};

export const getUser = async (name) => {
  try {
    const user = await hopechain_engine.getUser(name);

    console.log('User from getUser:', user); 

    if (user) {
      return user;
    } else {
      console.log('User does not exist');
      return null;
    }
  } catch (error) {
    console.error('Error checking user:', error);
    throw error;
  }
};


