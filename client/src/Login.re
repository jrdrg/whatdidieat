type loginStatusT =
  | LoggedIn(string)
  | LoginError(string)
  | ResetPassword
  | NotLoggedIn;

type loginType =
  | SignUp
  | LogIn;

type action =
  | Login
  | LoginFailed(string)
  | LoginSuccess(string)
  | ChangeUsername(string)
  | ChangePassword(string);

type state = {
  loginStatus: loginStatusT,
  username: string,
  password: string,
};

let targetToValue = target =>
  target |> ReactDOMRe.domElementToObj |> (o => o##value);

let errorMessage = (~error, ~visible) =>
  visible ? <div> (ReasonReact.string(error)) </div> : ReasonReact.null;

let input = (~caption, ~onEnter, ~onBlur) => {
  let loginOnEnter = e => {
    let keyCode = e |> ReactEventRe.Keyboard.key;
    if (keyCode == "Enter") {
      onBlur(e |> ReactEventRe.Keyboard.currentTarget |> targetToValue);
      onEnter();
    };
  };
  <div>
    (ReasonReact.string(caption))
    <input
      onKeyDown=loginOnEnter
      onBlur=(
        e => onBlur(e |> ReactEventRe.Focus.currentTarget |> targetToValue)
      )
    />
  </div>;
};

let component = ReasonReact.reducerComponent("Login");

let make = (~onLoginSuccess, _children) => {
  ...component,
  initialState: () => {loginStatus: NotLoggedIn, username: "", password: ""},
  reducer: (action: action, state: state) =>
    switch (action) {
    | Login =>
      ReasonReact.UpdateWithSideEffects(
        state,
        (
          self => {
            let {username, password} = self.state;
            Js.log2(username, password);
            Js.Promise.(
              Aws.Amplify.signIn(~username, ~password)
              |> then_(result
                   /* self.send(LoginSuccess(result)); */
                   => resolve(Js.log2("Login result: ", result)))
              |> catch(err => {
                   Js.log(err);
                   let errMsg = Js.String.make(err);
                   self.send(LoginFailed(errMsg));
                   resolve();
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
  render: self =>
    <div className="login">
      (
        input(
          ~caption="Username",
          ~onBlur=value => self.send(ChangeUsername(value)),
          ~onEnter=_e => self.send(Login),
        )
      )
      (
        input(
          ~caption="Password",
          ~onBlur=value => self.send(ChangePassword(value)),
          ~onEnter=_e => self.send(Login),
        )
      )
      (
        switch (self.state.loginStatus) {
        | LoginError(error) => errorMessage(~error, ~visible=true)
        | _ => ReasonReact.null
        }
      )
      <div>
        <button className="login-button" onClick=(_e => self.send(Login))>
          (ReasonReact.string("Login"))
        </button>
      </div>
    </div>,
};
