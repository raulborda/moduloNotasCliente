import { ConfigProvider } from "antd";
import "./App.css";
import { GlobalContext } from "./components/context/GlobalContext";
import esES from "antd/lib/locale/es_ES";
import { useState } from "react";
import NotasView from "./components/views/NotasView";
import "moment/locale/es";

function App() {
  //const idU = localStorage.getItem("usuario");
  const idU = 1;
  const [idUsu, setUsu] = useState(idU);

  //const idU = localStorage.getItem("cliSelect");
  const idC = 2049;
  const [cliSelect, setCliSelect] = useState(idC);

  const [note, setNote] = useState("");

  const [showDrawer, setShowDrawer] = useState(false);

  const [infoNotas, setInfoNotas] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [isNewNote, setIsNewNote] = useState(false);

  return (
    <GlobalContext.Provider
      value={{
        idUsu,
        setUsu,
        cliSelect,
        setCliSelect,
        note,
        setNote,
        showDrawer,
        setShowDrawer,
        infoNotas,
        setInfoNotas,
        isLoading,
        setIsLoading,
        isNewNote,
        setIsNewNote,
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
