[@react.component]
let make = (~date: string, ~recipes: string, ~id: string, ()) => {
  let (_, dispatch) =
    React.useContext(ContextProvider.ContextProvider.context);

  <div className="border-gray-100 rounded-sm p-2">
    <div className="text-gray-900">
      <a
        href="#"
        onClick={e => {
          ReactEvent.Mouse.preventDefault(e);
          dispatch(NavigateToMeal(id));
        }}>
        date->React.string
      </a>
    </div>
    <div className="text-gray-700"> recipes->React.string </div>
  </div>;
};
