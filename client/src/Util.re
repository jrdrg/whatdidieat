module Env = {
  /* [@bs.module "dotenv"] external config : unit => unit = ""; */
  [@bs.val] [@bs.scope "process"] external env : Js.Dict.t(string) = "";
  let get = key => key |> Js.Dict.get(env) |> Js.Option.getWithDefault("");
};

module LocalStorage = {
  [@bs.val] [@bs.scope "localStorage"] [@bs.return nullable]
  external get : string => option(string) = "getItem";
  [@bs.val] [@bs.scope "localStorage"]
  external set : (string, string) => string = "setItem";
  [@bs.val] [@bs.scope "localStorage"] external clear : unit => unit = "";
};
