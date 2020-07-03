[@react.component]
let make = () => {
  let (state, dispatch) =
    React.useReducer(GlobalState.reducer, GlobalState.initialState);

  let url = ReasonReactRouter.useUrl();
  Js.log(url.path);

  <GlobalState.ContextProvider value=(state, dispatch)>
    <>
      <NavHeader />
      {switch (url.path) {
       | [] => <MealsList />
       | ["meals", id] => <MealDetails id />
       | _ => <NotFound />
       }}
    </>
  </GlobalState.ContextProvider>;
};
