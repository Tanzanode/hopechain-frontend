import { Actor, HttpAgent } from '@dfinity/agent';
import { idlFactory as hopechain_engine_idl } from '../declarations/hopechain-engine-backend/hopechain-engine-backend.did.js';

const agent = new HttpAgent({ host: "http://127.0.0.1:4943" });
agent.fetchRootKey();

const hopechain_engine_id = process.env.REACT_APP_HOPECHAIN_ENGINE_BACKEND_CANISTER_ID;

const product_actor = Actor.createActor(hopechain_engine_idl, {
  agent,
  canisterId: hopechain_engine_id,
});

export const addProduct = async (product) => {
  try {
    const { productName, shortDescription, longDescription, price, currency, productImage, inventory, dateAdded } = product;
    await product_actor.addProduct(
      productName,
      shortDescription,
      longDescription,
      parseFloat(price),
      currency,
      productImage,
      parseInt(inventory),
      dateAdded
    );
  } catch (error) {
    console.error('Error adding product:', error);
    throw error;
  }
};


export const getProducts = async () => {
  try {
    return await product_actor.getProducts();
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};


export const deposit = async (amount, currency) => {
  try {
    console.log("Amount passed to deposit:", parseFloat(amount));
    console.log("Currency passed to deposit:", currency);
    
    const remainingBalance = await product_actor.deposit(parseFloat(amount), currency);
    return remainingBalance;
  } catch (error) {
    console.error('Error during deposit:', error);
    throw error;
  }
};