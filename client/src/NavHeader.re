[@react.component]
let make = () => {
  <header
    className="w-screen h-16 bg-black text-white flex flex-row items-center">
    <div className="flex-1 m-4 font-bold  flex-shrink-0">
      "what did i eat"->React.string
    </div>
    <nav className="flex-1 flex-grow-0">
      <ul className="flex flex-row justify-between">
        <li className="m-4">
          <a className="hover:text-gray-500" href="/recipes">
            "Recipes"->React.string
          </a>
        </li>
        <li className="m-4">
          <a className="hover:text-gray-500" href="/">
            "Meals"->React.string
          </a>
        </li>
      </ul>
    </nav>
  </header>;
};
