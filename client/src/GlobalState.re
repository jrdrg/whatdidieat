type view =
  | List
  | Meal(string);

type state = {view};

type action =
  | NavigateTo(view);

let reducer = (_state: state, action: action): state => {
  switch (action) {
  | NavigateTo(view) => {view: view}
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
