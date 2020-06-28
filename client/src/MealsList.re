module GetMeals = [%graphql
  {|
query getMeals {
    meals {
        id
        date
        recipes {
          name
        }
    }
}
|}
];
module GetMealsQuery = ReasonApollo.CreateQuery(GetMeals);

[@react.component]
let make = () => {
  <Styles.Container>
    <GetMealsQuery>
      ...{({result}) => {
        switch (result) {
        | Loading => <div> {React.string("loading")} </div>
        | Error(error) => <div> {React.string(error.message)} </div>
        | Data(response) =>
          let meals =
            response##meals
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

                     <MealListItem key=id id date recipes />;
                   })
                 ->Belt.Option.getWithDefault(React.null)
               );
          <div className="">
            <div className="font-bold text-lg">
              "Recent meals: "->React.string
            </div>
            meals->ReasonReact.array
          </div>;
        }
      }}
    </GetMealsQuery>
  </Styles.Container>;
};
