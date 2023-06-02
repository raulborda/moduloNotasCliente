/* eslint-disable react-hooks/exhaustive-deps */
import { CloseOutlined } from "@ant-design/icons";
import { Button, Card, Col, Drawer, Empty, Row } from "antd";
import React, { useContext, useEffect, useState } from "react";
import "./Style.css";
import NuevaNota from "../notas/NuevaNota";
import { GlobalContext } from "../context/GlobalContext";
import TimelineNotas from "../timeline/TimelineNotas";

const NotasView = () => {
  const URL = process.env.REACT_APP_URL;

  const { showDrawer, setShowDrawer, idUsu, infoNotas, setInfoNotas, cliSelect } =
    useContext(GlobalContext);

  const [notas, setNotas] = useState();
  const [NotasFiajadas, setNotasFiajadas] = useState();

  //* BUSCAR NOTAS DEL CLIENTE
  const buscarNotas = () => {
    //setIsLoadingTI(true); // Establecer isLoadingTI en true antes de hacer la solicitud
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
        //setIsLoadingTI(false); // Establecer isLoadingTI en false después de recibir la respuesta
      });
    });
  };

  console.log(infoNotas);

  useEffect(() => {
    buscarNotas();
  }, [cliSelect]);

  const newNota = () => {
    setShowDrawer(!showDrawer);
  };

  return (
    <>
      <div className="wrapper_Cards">
        <Col xs={24} md={17}>
          <Row>
            <Col xs={24}>
              <Card
                title="DESTACADO"
                className="card_Destacado"
                extra={
                  <Button type="primary" onClick={newNota}>
                    {/* <PlusOutlined /> */}
                    <span style={{ fontWeight: "bold" }}>Nueva Nota</span>
                  </Button>
                }
              >
                {/* {AnchorNotes.length === 0 && (
              <Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                description="No hay notas fijadas"
              />
            )}
            {AnchorNotes.map((note) => {
              return (
                <div className="note_wrapper_anchor">
                  <NoteItem note={note} attached={false}></NoteItem>
                </div>
              );
            })} */}
                <Empty
                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                  description="No hay notas fijadas"
                />

                {/* <div className="add">                
                    <Button shape="circle" type="primary" onClick={newNota}>
                      <PlusOutlined />
                    </Button>

                </div> */}
              </Card>
              <Col xs={24}>
                <div className="historial_wrapper">
                  <Card title="Completado">
                    <TimelineNotas
                    //notes={notes}
                    // historial={historyFilter.length === 0 ? historial : historyFilter}
                    >
                      {" "}
                      <h1>Notas</h1>
                    </TimelineNotas>
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
      </div>
    </>
  );
};

export default NotasView;
