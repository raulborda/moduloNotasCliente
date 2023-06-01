import { ConfigProvider } from "antd";
import "./App.css";
import { GlobalContext } from "./components/context/GlobalContext";
import esES from "antd/lib/locale/es_ES";
import Notas from "./components/notas/Notas";
import { useState } from "react";
import NotasView from "./components/views/NotasView";

function App() {


  //const idU = localStorage.getItem("usuario");
  const idU = 1;
  const [idUsu, setUsu] = useState(idU);

  //const idU = localStorage.getItem("cliSelect");
  const idC = 2049;
  const [cliSelect, setCliSelect] = useState(idC);






  return (
    <GlobalContext.Provider
      value={{
        idUsu, setUsu,
        cliSelect, setCliSelect,
      }}
    >
      <ConfigProvider
        locale={esES}
        theme={{
          token: {
            colorPrimary: "#56b43c",
          },
        }}
      >
        <NotasView />
      </ConfigProvider>
    </GlobalContext.Provider>
  );
}

export default App;
