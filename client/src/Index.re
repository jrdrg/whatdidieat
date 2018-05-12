let token = Util.LocalStorage.get("token");

/* todo: put this stuff in env vars before committing to git */
Aws.Amplify.configure(
  ~identityPoolId=Util.Env.get("IDENTITY_POOL_ID"),
  ~region=Util.Env.get("REGION"),
  ~userPoolId=Util.Env.get("USER_POOL_ID"),
  ~userPoolWebClientId=Util.Env.get("USER_POOL_WEB_CLIENT_ID"),
);

ReactDOMRe.renderToElementWithId(<App token />, "app");

Js.log2("POOL ID", Util.Env.get("IDENTITY_POOL_ID"));
