type loginStatusT =
  | LoggedIn(string)
  | NotLoggedIn;

type action =
  | Login(string)
  | Logout;

type state = {loginStatus: loginStatusT};

let component = ReasonReact.reducerComponent("App");

let make = (~token: option(string), _children) => {
  ...component,
  initialState: () => {loginStatus: NotLoggedIn},
  didMount: _self =>
    Js.log2("token: ", token |> Js.Option.getWithDefault("No token")),
  reducer: (action, _state) =>
    switch (action) {
    | Login(token) => ReasonReact.Update({loginStatus: LoggedIn(token)})
    | Logout => ReasonReact.Update({loginStatus: NotLoggedIn})
    },
  render: self =>
    <div>
      (
        switch (self.state.loginStatus) {
        | NotLoggedIn =>
          <Login onLoginSuccess=(token => self.send(Login(token))) />
        | LoggedIn(token) =>
          <div> (ReasonReact.string("Logged in: " ++ token)) </div>
        }
      )
    </div>,
};
