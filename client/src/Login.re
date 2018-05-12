type loginStatusT =
  | LoggedIn(string)
  | LoginError(string)
  | NotLoggedIn;

type state = {
  loginStatus: loginStatusT,
  username: string,
  password: string,
};

type action =
  | Login(string, string)
  | LoginFailed(string)
  | LoginSuccess(string)
  | ChangeUsername(string)
  | ChangePassword(string);

let errorMessage = (~error, ~visible) =>
  visible ? <div> (ReasonReact.string(error)) </div> : ReasonReact.null;

let component = ReasonReact.reducerComponent("Login");

let make = (~onLoginSuccess, _children) => {
  ...component,
  initialState: () => {loginStatus: NotLoggedIn, username: "", password: ""},
  reducer: (action: action, state: state) =>
    switch (action) {
    | Login(username, password) =>
      ReasonReact.UpdateWithSideEffects(
        state,
        (
          self => {
            Js.log("trying to login");
            Js.log("do stuff with aws here");
            /* let details =
               Aws.Cognito.authData(~username="test", ~password="test"); */
            /* Aws.Cognito.details(details); */
            Js.Promise.(
              Aws.Amplify.signIn(~username, ~password)
              |> then_(result => resolve(Js.log2("Login result: ", result)))
              |> catch(err => {
                   Js.log(err);
                   let errMsg = Js.String.make(err);
                   self.send(LoginFailed(errMsg));
                   Js.Promise.resolve();
                 })
              |> ignore
            );
          }
        ),
      )
    | LoginFailed(error) =>
      ReasonReact.Update({...state, loginStatus: LoginError(error)})
    | LoginSuccess(token) =>
      ReasonReact.UpdateWithSideEffects(
        {...state, loginStatus: LoggedIn(token)},
        (_self => onLoginSuccess(token)),
      )
    | ChangeUsername(username) => ReasonReact.Update({...state, username})
    | ChangePassword(password) => ReasonReact.Update({...state, password})
    },
  render: self => {
    let eventToString = e =>
      e
      |> ReactEventRe.Focus.currentTarget
      |> ReactDOMRe.domElementToObj
      |> (o => o##value);
    <div className="login">
      <div>
        (ReasonReact.string("username"))
        <input onBlur=(e => self.send(ChangeUsername(eventToString(e)))) />
      </div>
      <div>
        (ReasonReact.string("password"))
        <input onBlur=(e => self.send(ChangePassword(eventToString(e)))) />
      </div>
      (
        switch (self.state.loginStatus) {
        | LoginError(error) => errorMessage(~error, ~visible=true)
        | _ => ReasonReact.null
        }
      )
      <div>
        <button
          className="login-button"
          onClick=(
            _e => self.send(Login(self.state.username, self.state.password))
          )>
          (ReasonReact.string("Login"))
        </button>
      </div>
    </div>;
  },
};
