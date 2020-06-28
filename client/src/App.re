[@react.component]
let make = () => {
  let (state, dispatch) =
    React.useReducer(ContextProvider.reducer, ContextProvider.initialState);

  <ContextProvider.ContextProvider value=(state, dispatch)>
    <>
      <NavHeader />
      {switch (state.view) {
       | List => <MealsList />
       | Meal(id) => <MealDetails id />
       }}
    </>
  </ContextProvider.ContextProvider>;
};
