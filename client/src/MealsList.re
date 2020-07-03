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

let useMeals = () => {
  let (data, _) = ApolloHooks.useQuery(GetMeals.definition);
  data;
};

let mealListItems = (query: GetMeals.t) => {
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

           <MealListItem key=id id date recipes />;
         })
       ->Belt.Option.getWithDefault(React.null)
     );
};

[@react.component]
let make = () => {
  let data = useMeals();
  let (isOpen, openModal, closeModal) = Modal.useModal();

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
         <Styles.Button onClick={_ => openModal()}>
           "new"->React.string
         </Styles.Button>
         <Modal
           isOpen
           header="What did you eat?"
           onSubmit={_ => {
             Js.log("ok");
             ();
           }}
           onClose={_ => {closeModal()}}>
           <CreateMeal />
         </Modal>
       </div>
     }}
  </Styles.Container>;
};
