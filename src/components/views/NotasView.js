/* eslint-disable react-hooks/exhaustive-deps */
import { CloseOutlined } from "@ant-design/icons";
import {
  Button,
  Drawer,
  Spin,
  Layout,
  Switch,
  Divider,
} from "antd";
import React, { useContext, useEffect, useState } from "react";
import "./Style.css";
import NuevaNota from "../notas/NuevaNota";
import { GlobalContext } from "../context/GlobalContext";
import TimelineNotas from "../timeline/TimelineNotas";

const { Header } = Layout;

const NotasView = () => {
  const URL = process.env.REACT_APP_URL;

  const [mostrarDestacados, setMostrarDestacados] = useState(false);

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
  } = useContext(GlobalContext);


  const [cargando, setCargando] = useState(true);

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

  //console.log(infoNotas);

  useEffect(() => {
    buscarNotas();
  }, [cliSelect, isLoading]);

  const newNota = () => {
    setShowDrawer(!showDrawer);
  };

  return (
    <>
      <Header style={{ backgroundColor: "#ffff" }}>
        <div className="encabezado">
          <div className="encabezado__texto">NOTAS</div>
          <div className="encabezado_extra">
            <div className="encabezado__label">
            {!mostrarDestacados ? (
              <label>Ver Destacados</label>
            ):(
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
      )}
       {/*<div className="wrapper_Cards">
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
      </div>*/}
        
    </>
  );
};

export default NotasView;
