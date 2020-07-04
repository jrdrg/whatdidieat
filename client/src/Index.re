// Entry point
[%bs.raw {|require("./tailwind.css")|}];

[@bs.val] external document: Js.t({..}) = "document";

ReactDOMRe.render(
  <ApolloHooks.Provider client=Client.instance>
    <App />
  </ApolloHooks.Provider>,
  document##getElementById("app"),
);
