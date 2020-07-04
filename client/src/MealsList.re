module MealsListQuery = [%graphql
  {|
query MealsList {
    meals {
        __typename
        id
        date
        recipes {
            __typename
            name
        }
    }
}
|}
];

let useMeals = () => {
  let (data, full) = ApolloHooks.useQuery(MealsListQuery.definition);
  Js.log2("D", data);
  Js.log2("F", full);
  data;
};

let mealListItems = (query: MealsListQuery.t) => {
  query##meals
  |> Js.Option.getWithDefault([||])
  |> Array.map(meal =>
       meal
       ->Belt.Option.map(m => {
           let id = m##id;
           let date = m##date;
           let recipes =
             m##recipes->Belt.Option.getWithDefault([||])
             |> Array.map(recipe =>
                  recipe
                  ->Belt.Option.map(r => r##name)
                  ->Belt.Option.getWithDefault("?")
                )
             |> Js.Array.joinWith(", ");

           Js.log3(id, date, m##recipes);

           <MealListItem key=id id date recipes />;
         })
       ->Belt.Option.getWithDefault(React.null)
     );
};

[@react.component]
let make = () => {
  let data = useMeals();

  <Styles.Container>
    {switch (data) {
     | NoData => <div> "no data"->React.string </div>
     | Loading => <div> {React.string("Loading")} </div>
     | Error(error) => <div> {React.string(error##message)} </div>
     | Data(response) =>
       <div className="">
         <div className="font-bold text-lg">
           "Recent meals: "->React.string
         </div>
         {response |> mealListItems |> ReasonReact.array}
         <CreateMeal />
       </div>
     }}
  </Styles.Container>;
};
