type loginType =
  | NewUser
  | ExistingUser
  | PasswordReset;

type loginStatusT =
  | NotLoggedIn
  | LoginInProgress
  | LoggedIn(string)
  | LoginError(string)
  | ChangingPassword;

type action =
  | Login
  | ResetPassword
  | ChangeView(loginType)
  | LoginFailed(string)
  | LoginSuccess(string)
  | ChangeUsername(string)
  | ChangePassword(string);

type state = {
  loginStatus: loginStatusT,
  username: string,
  password: string,
};

module Input = {
  let targetToValue = target =>
    target |> ReactDOMRe.domElementToObj |> (o => o##value);
  let handleEnter = (~onBlur, ~onEnter, e) => {
    let keyCode = e |> ReactEventRe.Keyboard.key;
    if (keyCode == "Enter") {
      onBlur(e |> ReactEventRe.Keyboard.currentTarget |> targetToValue);
      onEnter();
    };
  };
  let component = ReasonReact.statelessComponent("Input");
  let make = (~caption, ~_type="text", ~onEnter, ~onBlur, _children) => {
    ...component,
    render: _self =>
      <div>
        (ReasonReact.string(caption))
        <input
          _type
          onKeyDown=(handleEnter(~onBlur, ~onEnter))
          onBlur=(
            e =>
              onBlur(e |> ReactEventRe.Focus.currentTarget |> targetToValue)
          )
        />
      </div>,
  };
};

let errorMessage = (~error, ~visible) =>
  visible ? <div> (ReasonReact.string(error)) </div> : ReasonReact.null;

let component = ReasonReact.reducerComponent("Login");

let make = (~onLoginSuccess, _children) => {
  ...component,
  initialState: () => {loginStatus: NotLoggedIn, username: "", password: ""},
  reducer: (action: action, state: state) =>
    switch (action) {
    | ChangeView(_view) => ReasonReact.NoUpdate
    | Login =>
      ReasonReact.UpdateWithSideEffects(
        {...state, loginStatus: LoginInProgress},
        (
          self => {
            let {username, password} = self.state;
            Js.log2(username, password);
            switch (self.state.loginStatus) {
            | ChangingPassword =>
              /* Js.Promise.(
                   Aws.Amplify.currentAuthenticatedUser()
                   |> then_(user => Aws.Amplify.changePassword(~oldPassword=password, ~newPassword=password, user))
                   /* |> then_(result => {
                     Js.log2("result", result);
                     resolve();
                   }) */
                 ); */
              /* Js.Promise.resolve() */
              ()
            | _ =>
              Js.Promise.(
                Aws.Amplify.signIn(~username, ~password)
                |> then_(result => {
                     Aws.Amplify.(
                       switch (result) {
                       | LoginSuccessful(data) => Js.log2("success", data)
                       | LoginChallenge(data) =>
                         Js.log2("challenge", data);
                         self.send(ResetPassword);
                       | LoginFailure(error) =>
                         switch (error) {
                         | Message(msg) => self.send(LoginFailed(msg))
                         | Response(res) =>
                           self.send(
                             LoginFailed(
                               res
                               |> Js.Json.stringifyAny
                               |> Js.Option.getWithDefault(""),
                             ),
                           )
                         }
                       }
                     );
                     resolve();
                   })
                |> catch(err => {
                     Js.log(err);
                     let errMsg =
                       "An error occurred: " ++ Js.String.make(err);
                     self.send(LoginFailed(errMsg));
                     resolve();
                   })
                |> ignore
              )
            };
          }
        ),
      )
    | ResetPassword =>
      ReasonReact.Update({...state, loginStatus: ChangingPassword})
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
    /* helper components */
    let inputs =
      <div>
        <Input
          caption="Username"
          onBlur=(value => self.send(ChangeUsername(value)))
          onEnter=(_e => self.send(Login))
        />
        <Input
          caption="Password"
          onBlur=(value => self.send(ChangePassword(value)))
          onEnter=(_e => self.send(Login))
        />
      </div>;
    let loginButton =
      <div>
        <button className="login-button" onClick=(_e => self.send(Login))>
          (ReasonReact.string("Login"))
        </button>
      </div>;
    /* render login form */
    <div className="login">
      (
        switch (self.state.loginStatus) {
        | LoginInProgress =>
          <div> (ReasonReact.string("logging in...")) </div>
        | LoginError(error) =>
          <div>
            inputs
            (errorMessage(~error, ~visible=true))
            loginButton
          </div>
        | ChangingPassword =>
          <div>
            <div> (ReasonReact.string("reset password")) </div>
            <Input
              caption="new password"
              onBlur=(value => self.send(ChangePassword(value)))
              onEnter=(_e => self.send(Login))
            />
            loginButton
          </div>
        | _ => <div> inputs loginButton </div>
        }
      )
    </div>;
  },
};
