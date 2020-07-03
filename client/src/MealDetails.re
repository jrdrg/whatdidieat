[@react.component]
let make = (~id: string) => {
  <Styles.Container>
    <Styles.Link href="/"> "< back to list"->React.string </Styles.Link>
    <div> id->React.string </div>
  </Styles.Container>;
};
