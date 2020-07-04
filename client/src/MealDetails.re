module MealDetailsQuery = [%graphql
  {|
query MealDetails($id: String!) {
    meal(id: $id) {
        __typename
        id
        date
        recipes {
            __typename
            id
            name
            notes
            url
        }
    }
}
|}
];

module Recipe = {
  [@react.component]
  let make = (~name, ~notes, ~url) => {
    <div>
      <div> name->React.string </div>
      <div> notes->React.string </div>
      <div> url->React.string </div>
    </div>;
  };
};

[@react.component]
let make = (~id: string) => {
  let (result, _) =
    ApolloHooks.useQuery(
      ~variables=MealDetailsQuery.makeVariables(~id, ()),
      MealDetailsQuery.definition,
    );

  <Styles.Container>
    <Styles.Link href="/"> "< Back to list"->React.string </Styles.Link>
    <div className="pt-4">
      {switch (result) {
       | NoData => <div> "No data."->React.string </div>
       | Loading => <div> {React.string("Loading")} </div>
       | Error(error) => <div> {React.string(error##message)} </div>
       | Data(data) =>
         let details =
           data##meal
           ->Belt.Option.map(meal => {
               let date = meal##date;
               let recipes =
                 meal##recipes
                 ->Belt.Option.getWithDefault([||])
                 ->Belt.Array.map(recipeOpt =>
                     recipeOpt->Belt.Option.mapWithDefault(
                       "No recipe found..."->React.string, r =>
                       <Recipe
                         key=r##id
                         name=r##name
                         notes={r##notes->Belt.Option.getWithDefault("")}
                         url={r##url->Belt.Option.getWithDefault("")}
                       />
                     )
                   );

               <>
                 <div className="text-lg font-bold">
                   "Date"->React.string
                 </div>
                 <div className="pb-8"> date->React.string </div>
                 <div className="text-lg font-bold">
                   "Recipes"->React.string
                 </div>
                 <div> recipes->React.array </div>
               </>;
             })
           ->Belt.Option.getWithDefault(React.null);

         <div> details </div>;
       }}
    </div>
  </Styles.Container>;
};
