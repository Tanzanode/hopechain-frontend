export const idlFactory = ({ IDL }) => {
  const User = IDL.Record({ 'name' : IDL.Text });
  return IDL.Service({
    'deposit' : IDL.Func([IDL.Float64], [IDL.Float64], []),
    'getTotalCharityAmount' : IDL.Func([], [IDL.Float64], ['query']),
    'getTotalPrice' : IDL.Func([], [IDL.Float64], ['query']),
    'registerUser' : IDL.Func([IDL.Text], [IDL.Opt(User)], []),
  });
};
export const init = ({ IDL }) => { return []; };
