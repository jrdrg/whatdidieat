[@react.component]
let make = (~date: string, ~recipes: string, ~id: string, ()) => {
  let (_, _dispatch) = React.useContext(GlobalState.ContextProvider.context);

  <div
    className="border-gray-400 border-t border-l border-b border-r rounded-md p-2 m-2 shadow-sm">
    <div className="text-gray-900">
      <Styles.Link href={j|/meals/$id|j}> date->React.string </Styles.Link>
    </div>
    <div className="text-gray-700"> recipes->React.string </div>
  </div>;
};
