import React, { FC, createContext } from "react";
import "./App.css";
import { Person, colors } from "./compo/Person";

interface AppContextInterface {
  name: string;
  age: number;
  country: string;
}

const AppContext = createContext<AppContextInterface | null>(null);
const App: FC = () => {
  const contextValue: AppContextInterface = {
    name: "ahsan",
    age: 20,
    country: "Pak",
  };

  return (
    <AppContext.Provider value={contextValue}>
      <div className="App">
        <Person name="shani" age={20} color={colors.Blue} />
      </div>
    </AppContext.Provider>
  );
};

export default App;
// const App: FC = () => {
//   return (
//     <div className="App">
//       <Person name="shani" age={20}  />
//     </div>
//   );
// };

// export default App;
