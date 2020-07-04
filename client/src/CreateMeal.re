type recipe = {
  name: string,
  url: string,
  notes: string,
};

type state = {
  date: string,
  error: option(string),
  recipes: array(recipe),
};

type action =
  | AddRecipe
  | ChangeDate(string)
  | ChangeName(int, string)
  | ResetForm
  | Error(string);

let newRecipe = () => {name: "", url: "", notes: ""};

let initialState = {date: "", error: None, recipes: [|newRecipe()|]};

let reducer = (state: state, action: action): state => {
  switch (action) {
  | AddRecipe => {
      ...state,
      recipes: Array.append(state.recipes, [|newRecipe()|]),
    }
  | ChangeDate(date) => {...state, error: None, date}
  | ChangeName(index, name) => {
      ...state,
      error: None,
      recipes:
        state.recipes
        |> Array.mapi((i, recipe) =>
             if (i === index) {
               {...recipe, name};
             } else {
               recipe;
             }
           ),
    }
  | ResetForm => initialState
  | Error(error) => {...state, error: Some(error)}
  };
};

module CreateMealMutation = [%graphql
  {|
mutation CreateMeal($input: AddMealMutationInput!) {
    addMeal(input: $input) {
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

module RefetchMeals = [%graphql
  {|
  query Meals {
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

let useCreateMeal = (state, dispatch, closeModal) => {
  let (create, result, _full) =
    ApolloHooks.useMutation(
      ~update=
        (cache, result) => {
          Js.log("UPDATE");
          Js.log(cache);
          Js.log("UPDATE 2");
          Js.log(result);
          ();
        },
      ~refetchQueries=
        x => {
          Js.log("REFETCH");
          Js.log(x);
          [|RefetchMeals.make() |> ApolloHooks.toQueryObj|];
        },
      CreateMealMutation.definition,
    );

  React.useEffect1(
    () => {
      switch (result) {
      | NotCalled => ()
      | Loading => ()
      | NoData => ()
      | Error(error) =>
        dispatch(Error(error##message));
        ();
      | Data(data) =>
        Js.log("RES");
        Js.log(data);
        dispatch(ResetForm);
        closeModal();
        ();
      };
      None;
    },
    [|result|],
  );

  let createMeal =
    React.useCallback1(
      () => {
        create(
          ~variables=
            CreateMealMutation.makeVariables(
              ~input={
                "date": state.date,
                "recipes":
                  state.recipes
                  |> Array.map(recipe =>
                       {
                         "id": None,
                         "name": Some(recipe.name),
                         "notes": Some("test notes"),
                         "url": Some("http://www.example.com"),
                       }
                     ),
              },
              (),
            ),
          (),
        )
        |> Js.Promise.then_(_res => {Js.Promise.resolve()})
        |> Js.Promise.catch(_err => {Js.Promise.resolve()})
      },
      [|state|],
    );

  createMeal;
};

[@react.component]
let make = () => {
  let (isOpen, openModal, closeModal) = Modal.useModal();
  let (state, dispatch) = React.useReducer(reducer, initialState);
  let create = useCreateMeal(state, dispatch, closeModal);

  <>
    <Styles.Button onClick={_ => openModal()}>
      "new"->React.string
    </Styles.Button>
    <Modal
      isOpen
      header="What did you eat?"
      onSubmit={_ => {create() |> ignore}}
      onClose={_ => {
        dispatch(ResetForm);
        closeModal();
      }}>
      <div>
        <div className="pb-2">
          <Styles.Input
            label="Date"
            name="date"
            type_=Styles.Input.Date
            value={state.date}
            onChange={e => {
              dispatch(ChangeDate(ReactEvent.Form.currentTarget(e)##value))
            }}
          />
        </div>
        {state.recipes
         |> Array.mapi((i, recipe) => {
              <div key={i->string_of_int}>
                <Styles.Input
                  label="Recipe name"
                  name="recipe-name"
                  value={recipe.name}
                  onChange={e => {
                    dispatch(
                      ChangeName(i, ReactEvent.Form.currentTarget(e)##value),
                    )
                  }}
                />
              </div>
            })
         |> React.array}
        <div className="text-sm text-red-600">
          {state.error->Belt.Option.getWithDefault("")->React.string}
        </div>
        <div>
          <a
            href="#"
            onClick={e => {
              ReactEvent.Mouse.preventDefault(e);
              dispatch(AddRecipe);
            }}>
            "+ Add recipe"->React.string
          </a>
        </div>
      </div>
    </Modal>
  </>;
};
