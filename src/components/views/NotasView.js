/* eslint-disable react-hooks/exhaustive-deps */
import { CloseOutlined } from "@ant-design/icons";
import { Button, Drawer, Spin, Layout, Switch, Divider, Select, Input } from "antd";
import React, { useContext, useEffect, useState } from "react";
import "./Style.css";
import NuevaNota from "../notas/NuevaNota";
import { GlobalContext } from "../context/GlobalContext";
import TimelineNotas from "../timeline/TimelineNotas";

const { Header } = Layout;

const NotasView = () => {
  const URL = process.env.REACT_APP_URL;

  const [mostrarDestacados, setMostrarDestacados] = useState(false);
  const [etiquetasSeleccionadas, setEtiquetasSeleccionadas] = useState([]);
  const [textoFiltrado, setTextoFiltrado] = useState("");

  const toggleMostrarDestacados = () => {
    setMostrarDestacados(!mostrarDestacados);
  };

  const {
    showDrawer,
    setShowDrawer,
    infoNotas,
    setInfoNotas,
    cliSelect,
    isLoading,
    updateNota,
  } = useContext(GlobalContext);

  const { Option } = Select;
  const [cargando, setCargando] = useState(true);
  const [etiquetasFiltradas, setEtiquetasFiltradas] = useState([]);

  //* BUSCAR NOTAS DEL CLIENTE
  const buscarNotas = () => {
    //setIsLoading(true); // Establecer isLoading en true antes de hacer la solicitud
    const data = new FormData();
    data.append("idCli", cliSelect);
    fetch(`${URL}notasCli.php`, {
      method: "POST",
      body: data,
    }).then(function (response) {
      response.text().then((resp) => {
        const data = resp;
        const objetoData = JSON.parse(data);
        setInfoNotas(objetoData);
        //console.log(objetoData);
        setCargando(false); // Establecer setCargando en false después de recibir la primer respuesta
      });
    });
  };

  console.log(infoNotas);

  useEffect(() => {
    buscarNotas();
  }, [cliSelect, isLoading, updateNota]);

  const newNota = () => {
    setShowDrawer(!showDrawer);
  };

  useEffect(() => {
    const data = new FormData();
    fetch(`${URL}buscarEtiquetas.php`, {
      method: "POST",
      body: data,
    }).then(function (response) {
      response.text().then((resp) => {
        const data = resp;
        const objetoData = JSON.parse(data);
        setEtiquetasSeleccionadas(objetoData);
      });
    });
  }, []);

  // const filtrarNotas = () => {
  //   if (etiquetasFiltradas.length === 0) {
  //     // No hay etiquetas seleccionadas, mostrar todas las notas
  //     return infoNotas;
  //   } else {
  //     // Filtrar las notas según las etiquetas seleccionadas
  //     return infoNotas.filter((nota) => {
  //       if (nota.exn) {
  //         const etiquetas = nota.exn.split(",");
  //         return etiquetas.some((etiqueta) =>
  //           etiquetasFiltradas.includes(etiqueta)
  //         );
  //       } else {
  //         return false;
  //       }
  //     });
  //   }
  // };

  const filtrarNotas = () => {
    return infoNotas.filter((nota) => {
      // Filtrar por etiquetas
      if (etiquetasFiltradas.length > 0) {
        const etiquetasNota = nota.exn.split(",");
        const interseccion = etiquetasNota.filter((etiqueta) =>
          etiquetasFiltradas.includes(etiqueta)
        );
        if (interseccion.length === 0) {
          // La nota no tiene ninguna etiqueta seleccionada, excluir la nota
          return false;
        }
      }
  
      // Filtrar por descripción
      if (textoFiltrado !== "") {
        if (!nota.not_desc.toLowerCase().includes(textoFiltrado.toLowerCase())) {
          // La descripción de la nota no contiene el texto de filtro, excluir la nota
          return false;
        }
      }
  
      return true; // Incluir la nota en el resultado final
    });
  };
  

  //console.log(etiquetasFiltradas.length);
  return (
    <>
      <Header style={{ backgroundColor: "#ffff" }}>
        <div className="encabezado">
          <div className="encabezado__texto">NOTAS</div>
          <div className="encabezado_extra">
            <div style={{ marginRight: "10px", maxHeight: "50px" }}>
              <Input
                placeholder="Filtrar por descripción"
                style={{ width: "230px", marginBottom: "10px", zIndex: "9999" }}
                value={textoFiltrado}
                onChange={(e) => setTextoFiltrado(e.target.value)}
              />
            </div>
            <div style={{ marginRight: "10px", maxHeight: "50px" }}>
              <Select
                mode="multiple"
                placeholder="Filtrar por etiquetas"
                style={{ width: "230px", marginBottom: "10px", zIndex: "9999" }}
                value={etiquetasFiltradas}
                onChange={setEtiquetasFiltradas}
              >
                {etiquetasSeleccionadas.map((etiqueta) => (
                  <Option key={etiqueta.etq_id} value={etiqueta.etq_id}>
                    {etiqueta.etq_nombre}
                  </Option>
                ))}
              </Select>
            </div>
            <div className="encabezado__label">
              {!mostrarDestacados ? (
                <label>Ver Destacados</label>
              ) : (
                <label>Ver General</label>
              )}
            </div>
            <div className="encabezado__switch">
              <Switch
                checked={mostrarDestacados}
                onChange={toggleMostrarDestacados}
              />
            </div>
            <div>
              <Button type="primary" onClick={newNota}>
                <span style={{ fontWeight: "bold" }}>Nueva Nota</span>
              </Button>
            </div>
          </div>
        </div>
      </Header>
      <Divider style={{ marginBottom: "10px", marginTop: "-8px" }} />
      {!mostrarDestacados ? (
        <div className="historial_wrapper">
          {isLoading || cargando ? (
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                // marginTop: "10%",
              }}
            >
              <Spin size="large" />
            </div>
          ) : (
            // <TimelineNotas notes={infoNotas} card="general"></TimelineNotas>
            <>
              {etiquetasFiltradas.length === 0 && textoFiltrado === "" ? (
                // No hay etiquetas seleccionadas, mostrar todas las notas
                <TimelineNotas notes={infoNotas} card="general" />
              ) : (
                // Filtrar las notas según las etiquetas seleccionadas
                <TimelineNotas notes={filtrarNotas()} card="filtradas" />
              )}
            </>
          )}
          <Drawer
            visible={showDrawer}
            onClose={() => setShowDrawer(false)}
            title={"Nueva Nota"}
            width={500}
            closeIcon={
              <CloseOutlined
                style={{ position: "absolute", top: "18px", right: "10px" }}
              />
            }
          >
            <NuevaNota />
          </Drawer>
        </div>
      ) : (
        <div className="historial_wrapper">
          {isLoading || cargando ? (
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                // marginTop: "10%",
              }}
            >
              <Spin size="large" />
            </div>
          ) : (
            // <TimelineNotas notes={infoNotas} card="destacado"></TimelineNotas>
            <>
              {etiquetasFiltradas.length === 0 && textoFiltrado === "" ? (
                // No hay etiquetas seleccionadas, mostrar todas las notas
                <TimelineNotas notes={infoNotas} card="destacado" />
              ) : (
                // Filtrar las notas según las etiquetas seleccionadas
                <TimelineNotas notes={filtrarNotas()} card="filtradas" />
              )}
            </>
          )}
          <Drawer
            visible={showDrawer}
            onClose={() => setShowDrawer(false)}
            title={"Nueva Nota"}
            width={500}
            closeIcon={
              <CloseOutlined
                style={{ position: "absolute", top: "18px", right: "10px" }}
              />
            }
          >
            <NuevaNota />
          </Drawer>
        </div>
      )}

      {/* {!mostrarDestacados ? (
        <div className="historial_wrapper">
          {isLoading || cargando ? (
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                // marginTop: "10%",
              }}
            >
              <Spin size="large" />
            </div>
          ) : (
            <TimelineNotas notes={infoNotas} card="general"></TimelineNotas>
          )}
          <Drawer
            visible={showDrawer}
            onClose={() => setShowDrawer(false)}
            title={"Nueva Nota"}
            width={500}
            closeIcon={
              <CloseOutlined
                style={{ position: "absolute", top: "18px", right: "10px" }}
              />
            }
          >
            <NuevaNota />
          </Drawer>
        </div>
      ) : (
        <div className="historial_wrapper">
          {isLoading || cargando ? (
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                // marginTop: "10%",
              }}
            >
              <Spin size="large" />
            </div>
          ) : (
            <TimelineNotas notes={infoNotas} card="destacado"></TimelineNotas>
          )}
          <Drawer
            visible={showDrawer}
            onClose={() => setShowDrawer(false)}
            title={"Nueva Nota"}
            width={500}
            closeIcon={
              <CloseOutlined
                style={{ position: "absolute", top: "18px", right: "10px" }}
              />
            }
          >
            <NuevaNota />
          </Drawer>
        </div>
      )}   */}

      {/* <div className="wrapper_Cards">
        <Col xs={24} md={17}>
          <Row>
            <Col xs={24}>
              <Card
                title="DESTACADO"
                className="card_Destacado"
                extra={
                  <Button type="primary" onClick={newNota}>
                    <span style={{ fontWeight: "bold" }}>Nueva Nota</span>
                  </Button>
                }
              >
                {isLoading || cargando ? (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                      // marginTop: "10%",
                    }}
                  >
                    <Spin size="large" />
                  </div>
                ) : (
                  <TimelineNotas
                    notes={infoNotas}
                    card="destacado"
                  ></TimelineNotas>
                )}
              </Card>
              <Col xs={24}>
                <div className="historial_wrapper">
                  <Card title="GENERAL">
                    {isLoading || cargando ? (
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "center",
                          alignItems: "center",
                          // marginTop: "10%",
                        }}
                      >
                        <Spin size="large" />
                      </div>
                    ) : (
                      <TimelineNotas
                        notes={infoNotas}
                        card="general"
                      ></TimelineNotas>
                    )}
                  </Card>
                </div>
              </Col>
            </Col>
          </Row>
        </Col> 
        <Drawer
          visible={showDrawer}
          onClose={() => setShowDrawer(false)}
          title={"Nueva Nota"}
          width={500}
          closeIcon={
            <CloseOutlined
              style={{ position: "absolute", top: "18px", right: "10px" }}
            />
          }
        >
          <NuevaNota />
        </Drawer>
      </div> */}
    </>
  );
};

export default NotasView;
