/* use dotenv via parcel to load env vars */
module Env = {
  let graphqlServer: string = [%bs.raw {|process.env.GRAPHQL_SERVER|}];
};

module LocalStorage = {
  [@bs.val] [@bs.scope "localStorage"] [@bs.return nullable]
  external get: string => option(string) = "getItem";
  [@bs.val] [@bs.scope "localStorage"]
  external set: (string, string) => string = "setItem";
  [@bs.val] [@bs.scope "localStorage"]
  external clear: unit => unit = "localStorage";
};
