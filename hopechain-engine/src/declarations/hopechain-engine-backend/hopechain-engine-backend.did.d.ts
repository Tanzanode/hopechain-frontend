import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface Product {
  'inventory' : bigint,
  'productName' : string,
  'shortDescription' : string,
  'currency' : string,
  'price' : number,
  'productImage' : string,
  'longDescription' : string,
  'dateAdded' : string,
}
export interface User { 'name' : string }
export interface _SERVICE {
  'addProduct' : ActorMethod<
    [string, string, string, number, string, string, bigint, string],
    undefined
  >,
  'deposit' : ActorMethod<[number], number>,
  'getProducts' : ActorMethod<[], Array<Product>>,
  'getTotalCharityAmount' : ActorMethod<[], number>,
  'getTotalPrice' : ActorMethod<[], number>,
  'getUser' : ActorMethod<[string], [] | [User]>,
  'registerUser' : ActorMethod<[string], [] | [User]>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
