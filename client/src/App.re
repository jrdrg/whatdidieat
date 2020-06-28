module GetMeals = [%graphql
  {|
query getMeals {
    meals {
        id
    }
}
|}
];
module GetMealsQuery = ReasonApollo.CreateQuery(GetMeals);

[@react.component]
let make = () => {
  <GetMealsQuery>
    ...{({result}) => {
      switch (result) {
      | Loading => <div> {React.string("loading")} </div>
      | Error(error) => <div> {React.string(error.message)} </div>
      | Data(response) =>
        let meals = response##meals |> Js.Option.getWithDefault([||]);
        let m =
          meals
          |> Array.map(meal => {
               let mealId =
                 meal
                 ->Belt.Option.map(m => m##id)
                 ->Belt.Option.getWithDefault("");
               <div key=mealId> {React.string(mealId)} </div>;
             });
        <div className="flex-row">
          <div> "Test"->React.string </div>
          "Recent meals: "->React.string
          m->ReasonReact.array
        </div>;
      }
    }}
  </GetMealsQuery>;
};
