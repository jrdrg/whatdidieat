type view =
  | List
  | Meal(string);

type state = {view};

type action =
  | NavigateToList
  | NavigateToMeal(string);

let reducer = (_state: state, action: action): state => {
  switch (action) {
  | NavigateToList => {view: List}
  | NavigateToMeal(id) => {view: Meal(id)}
  };
};

let initialState = {view: List};

module ContextProvider = {
  let context = React.createContext((initialState, (_: action) => ignore()));

  let makeProps = (~value, ~children, ()) => {
    "value": value,
    "children": children,
  };
  let make = React.Context.provider(context);
};
