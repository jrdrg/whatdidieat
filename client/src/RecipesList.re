module RecipesListQuery = [%graphql
  {|
query RecipesList {
    recipes {
        __typename
        id
        name
    }
}
|}
];

let useMeals = () => {
  let (data, _) = ApolloHooks.useQuery(RecipesListQuery.definition);
  data;
};

let recipeItems = (query: RecipesListQuery.t) => {
  query##recipes
  |> Js.Option.getWithDefault([||])
  |> Array.map(recipe =>
       recipe
       ->Belt.Option.map(r => {
           let id = r##id;
           let name = r##name;
           <div key=id> name->React.string </div>;
         })
       ->Belt.Option.getWithDefault(React.null)
     );
};

[@react.component]
let make = () => {
  let data = useMeals();

  <Styles.Container>
    <div className="font-bold text-lg"> "Recipes"->React.string </div>
    {switch (data) {
     | NoData => <div> "no data"->React.string </div>
     | Loading => <div> {React.string("Loading")} </div>
     | Error(error) => <div> {React.string(error##message)} </div>
     | Data(response) =>
       <div> {recipeItems(response)->ReasonReact.array} </div>
     }}
  </Styles.Container>;
};
