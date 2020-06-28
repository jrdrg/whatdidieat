[@react.component]
let make = (~id: string) => {
  let (_, dispatch) =
    React.useContext(ContextProvider.ContextProvider.context);

  <Styles.Container>
    <a
      href="#"
      onClick={e => {
        ReactEvent.Mouse.preventDefault(e);
        dispatch(NavigateToList);
      }}>
      "< back to list"->React.string
    </a>
    <div> id->React.string </div>
  </Styles.Container>;
};
