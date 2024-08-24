export const idlFactory = ({ IDL }) => {
  const Product = IDL.Record({
    'inventory' : IDL.Nat,
    'productName' : IDL.Text,
    'shortDescription' : IDL.Text,
    'currency' : IDL.Text,
    'price' : IDL.Float64,
    'productImage' : IDL.Text,
    'longDescription' : IDL.Text,
    'dateAdded' : IDL.Text,
  });
  const User = IDL.Record({ 'name' : IDL.Text });
  return IDL.Service({
    'addProduct' : IDL.Func(
        [
          IDL.Text,
          IDL.Text,
          IDL.Text,
          IDL.Float64,
          IDL.Text,
          IDL.Text,
          IDL.Nat,
          IDL.Text,
        ],
        [],
        [],
      ),
    'deposit' : IDL.Func([IDL.Float64, IDL.Text], [IDL.Float64], []),
    'getProducts' : IDL.Func([], [IDL.Vec(Product)], ['query']),
    'getTotalCharityAmount' : IDL.Func([], [IDL.Float64], ['query']),
    'getTotalPrice' : IDL.Func([], [IDL.Float64], ['query']),
    'getUser' : IDL.Func([IDL.Text], [IDL.Opt(User)], ['query']),
    'registerUser' : IDL.Func([IDL.Text], [IDL.Opt(User)], []),
  });
};
export const init = ({ IDL }) => { return []; };
