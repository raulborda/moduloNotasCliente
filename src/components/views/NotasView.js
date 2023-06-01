import { CloseOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Card, Col, Drawer, Empty, Row, Timeline } from "antd";
import React, { useContext, useState } from "react";
import "./Style.css";
import NuevaNota from "../notas/NuevaNota";
import { GlobalContext } from "../context/GlobalContext";
import TimelineNotas from "../timeline/TimelineNotas";

const NotasView = () => {

    const { showDrawer, setShowDrawer } = useContext(GlobalContext);

    const [notas, setNotas] = useState();
    const [NotasFiajadas, setNotasFiajadas] = useState( );

    const newNota = () => {
        setShowDrawer(!showDrawer);
      };




  return (
    <>
      <div className="wrapper_Cards">
        <Col xs={24} md={17}>
          <Row>
            <Col xs={24}>
              <Card title="DESTACADO" className="card_Destacado" extra={<span style={{color:"#56b43c", fontWeight:"bold"}} >0</span>}>
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

                <div className="add">                
                    <Button shape="circle" type="primary" onClick={newNota}>
                      <PlusOutlined />
                    </Button>

                </div>
              </Card>
              <Col xs={24}>
                <div className="historial_wrapper">
                  <Card title="Completado">
                    <TimelineNotas
                      taskStatus={2}
                      // notes={notes}
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
                    />}
            >
                <NuevaNota/>

            </Drawer>
      
      </div>
    </>
  );
};

export default NotasView;
