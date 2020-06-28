module Container = {
  [@react.component]
  let make = (~children, ()) => {
    <div className="mx-auto w-10/12"> children </div>;
  };
};
