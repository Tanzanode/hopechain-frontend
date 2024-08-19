import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface User { 'name' : string }
export interface _SERVICE {
  'deposit' : ActorMethod<[number], number>,
  'getTotalCharityAmount' : ActorMethod<[], number>,
  'getTotalPrice' : ActorMethod<[], number>,
  'registerUser' : ActorMethod<[string], [] | [User]>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
