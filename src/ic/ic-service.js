import { Actor, HttpAgent } from '@dfinity/agent';
import { idlFactory as hopechain_engine_idl } from '../declarations/hopechain-engine-backend/hopechain-engine-backend.did.js';

const agent = new HttpAgent({ host: "http://127.0.0.1:4943" });
agent.fetchRootKey(); // Necessary for local development

const hopechain_engine_id = process.env.REACT_APP_HOPECHAIN_ENGINE_BACKEND_CANISTER_ID;

console.log("Canister ID:", hopechain_engine_id);

const hopechain_engine = Actor.createActor(hopechain_engine_idl, {
  agent,
  canisterId: hopechain_engine_id,
});

export default hopechain_engine;
