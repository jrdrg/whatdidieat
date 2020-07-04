module Container = {
  [@react.component]
  let make = (~children, ()) => {
    <div className="mx-auto w-10/12 p-4"> children </div>;
  };
};

module Link = {
  [@react.component]
  let make = (~className=?, ~href, ~onClick=ignore, ~children, ()) => {
    <a
      className={Belt.Option.getWithDefault(className, "hover:text-gray-600")}
      href
      onClick={e => {
        ReactEvent.Mouse.preventDefault(e);
        ReasonReactRouter.push(href);
        onClick();
      }}>
      children
    </a>;
  };
};

module Button = {
  type buttonType =
    | Primary
    | Secondary;

  [@react.component]
  let make = (~buttonType=Primary, ~onClick, ~children, ()) => {
    let (color, text) =
      switch (buttonType) {
      | Primary => ("bg-orange-700", "text-gray-200")
      | _ => ("bg-gray-400", "text-gray-800")
      };

    <button
      className={
        "pl-2 pr-2 pt-1 pb-1 "
        ++ color
        ++ " "
        ++ text
        ++ " rounded-sm shadow-sm tracking-wide"
      }
      onClick>
      children
    </button>;
  };
};

module Input = {
  type inputType =
    | Text
    | Date;

  [@react.component]
  let make = (~label, ~name, ~onChange, ~type_=Text, ~value, ()) => {
    <>
      <div>
        <label className="font-semibold" htmlFor=name>
          label->React.string
        </label>
      </div>
      <div>
        <input
          value
          onChange
          className="border border-gray-700 rounded-sm p-1"
          name
          type_={
            switch (type_) {
            | Date => "date"
            | _ => "text"
            }
          }
        />
      </div>
    </>;
  };
};
