module Input = {
  let targetToValue = target =>
    target |> ReactDOMRe.domElementToObj |> (o => o##value);
  let component = ReasonReact.statelessComponent("Input");
  let make = (~caption, ~_type="text", ~onChange, ~value, _children) => {
    ...component,
    render: _self =>
      <div>
        (ReasonReact.string(caption))
        <input
          _type
          value
          onChange=(
            e =>
              e |> ReactEventRe.Form.currentTarget |> targetToValue |> onChange
          )
        />
      </div>,
  };
};

type loginType =
  | NewUser
  | ExistingUser
  | PasswordReset;

type loginStatusT =
  | NotLoggedIn
  | LoginInProgress
  | LoggedIn(string)
  | LoginError(string)
  | ChangingPassword(Aws.Amplify.userT, string);

type action =
  | Login
  | LoginFailed(string)
  | LoginSuccess(string)
  | ChangeView(loginType)
  | ChangeUsername(string)
  | ChangePassword(string)
  | ResetPassword(Aws.Amplify.userT, string, string)
  | NewPassword(Aws.Amplify.userT, string);

type state = {
  loginStatus: loginStatusT,
  username: string,
  password: string,
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
            | ChangingPassword(_user, newPassword) =>
              Js.log2("Changing password", newPassword)
            | NotLoggedIn => Js.log("Not logged in!!!")
            | LoggedIn(login) => Js.log2("Logged in", login)
            | LoginError(error) => Js.log2("Login error", error)
            | LoginInProgress =>
              Js.Promise.(
                Aws.Amplify.signIn(~username, ~password)
                |> then_(result => {
                     Aws.Amplify.(
                       switch (result) {
                       | LoginSuccessful(data) => Js.log2("success", data)
                       | LoginChallenge(data, user) =>
                         Js.log3("challenge", data, user);
                         self.send(NewPassword(user, ""));
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
    | LoginFailed(error) =>
      ReasonReact.Update({...state, loginStatus: LoginError(error)})
    | LoginSuccess(token) =>
      ReasonReact.UpdateWithSideEffects(
        {...state, loginStatus: LoggedIn(token)},
        (_self => onLoginSuccess(token)),
      )
    | ChangeUsername(username) => ReasonReact.Update({...state, username})
    | ChangePassword(password) => ReasonReact.Update({...state, password})
    | ResetPassword(user, oldPassword, newPassword) =>
      ReasonReact.UpdateWithSideEffects(
        {...state, loginStatus: LoginInProgress},
        (
          _self => {
            /* Aws.Amplify.changePassword(~oldPassword, ~newPassword, user) */
            Aws.Amplify.completeNewPassword(~newPassword, user) |> ignore;
            /* |> then_(result => {
                 Js.log2("result", result);
                 resolve();
               }) */
            ();
          }
        ),
      )
    | NewPassword(user, newPassword) =>
      ReasonReact.Update({
        ...state,
        loginStatus: ChangingPassword(user, newPassword),
      })
    },
  render: self => {
    /* helper components */
    let inputs = (username, password) =>
      <div>
        <Input
          value=username
          caption="Username"
          onChange=(value => self.send(ChangeUsername(value)))
        />
        <Input
          value=password
          caption="Password"
          onChange=(value => self.send(ChangePassword(value)))
        />
      </div>;
    let loginButton = (~onClick) =>
      <div>
        <button className="login-button" onClick>
          (ReasonReact.string("Login"))
        </button>
      </div>;
    /* render login form */
    <form
      className="login" onSubmit=(e => ReactEventRe.Form.preventDefault(e))>
      (
        switch (self.state.loginStatus) {
        | LoginInProgress =>
          <div> (ReasonReact.string("Logging in...")) </div>
        | LoginError(error) =>
          <div>
            (inputs(self.state.username, self.state.password))
            (errorMessage(~error, ~visible=true))
            (loginButton(~onClick=_e => self.send(Login)))
          </div>
        | ChangingPassword(user, newPassword) =>
          <div>
            <div> (ReasonReact.string("Reset password")) </div>
            <Input
              value=newPassword
              caption="New password"
              onChange=(value => self.send(NewPassword(user, value)))
            />
            (
              loginButton(~onClick=_e =>
                self.send(
                  ResetPassword(user, self.state.password, newPassword),
                )
              )
            )
          </div>
        | _ =>
          <div>
            (inputs(self.state.username, self.state.password))
            (loginButton(~onClick=_e => self.send(Login)))
          </div>
        }
      )
    </form>;
  },
};
