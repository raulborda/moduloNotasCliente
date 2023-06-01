import { CloseOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Card, Col, Drawer, Empty, Row, Timeline } from "antd";
import React, { useState } from "react";
import "./Style.css";

const NotasView = () => {

    const [showDrawer, setShowDrawer] = useState(false);



    const nuevaNota = () => {
        setShowDrawer(!showDrawer);
      };




  return (
    <>
      <div className="wrapper_Cards">
        <Col xs={24} md={17}>
          <Row>
            <Col xs={24}>
              <Card title="DESTACADO" className="card_Destacado" extra="0">
                {/* <Tabs defaultActiveKey="1"> */}
                  {/* <div className="add_wrapper"></div> */}
                  {/* <TabPane
                    tab={
                      <span>
                        <FileDoneOutlined />
                        Notas ({AnchorNotes.length})
                        Notas(4)
                      </span>
                    }
                    disabled={false}
                    key="1"
                  >
                    <h2>Notas</h2>
                  </TabPane>
                </Tabs> */}
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
                    <Button shape="circle" type="primary" onClick={nuevaNota}>
                      <PlusOutlined />
                    </Button>

                </div>
              </Card>
              <Col xs={24}>
                <div className="historial_wrapper">
                  <Card title="Completado">
                    <Timeline
                      taskStatus={2}
                      // notes={notes}
                      // historial={historyFilter.length === 0 ? historial : historyFilter}
                    >
                      {" "}
                      <h1>Notas</h1>
                    </Timeline>
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
                      style={{ position: "absolute", top: "20px", right: "10px" }}
                    />}
            >

            </Drawer>
      
      </div>
    </>
  );
};

export default NotasView;
