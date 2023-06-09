import { Button, Col, Drawer, Form, Radio, Row } from "antd";
import React, { useContext, useState } from "react";
import NoteEdit from "./NoteEdit";
import { GlobalContext } from "../context/GlobalContext";
import { CloseOutlined } from "@ant-design/icons";

const EditarNota = ({ notID, prioridad, visible, onClose }) => {
  const URL = process.env.REACT_APP_URL;
  //console.log("desde editar nota:",notID);
  //console.log("desde editar nota:",prioridad);
  const { note, setNote, setIsLoading, } = useContext(GlobalContext);


  const [form] = Form.useForm();
  const [priority, setPriority] = useState(prioridad);

  const onChangePriority = (v) => {
    setPriority(Number(v.target.value));
  };

  const onFinish = (v) => {
    setIsLoading(true);
    const dataN = {
      ...v,
      not_desc: note,
      not_importancia: priority,
    };

    // console.log(notID);
    // console.log(dataN.not_desc);
    // console.log(dataN.not_importancia);

    const data = new FormData();
    data.append("idNot", notID);
    data.append("notDesc", dataN.not_desc);
    data.append("notImport", dataN.not_importancia);
    fetch(`${URL}EditNotaSelect.php`, {
      method: "POST",
      body: data,
    }).then(function (response) {
      response.text().then((resp) => {
        const data = resp;
        console.log(data);
        setIsLoading(false);
      });
    });

    onClose();
    setNote("");
    setPriority("");
    form.resetFields();
  };

  return (
    <>
      <Drawer
        visible={visible}
        onClose={() => onClose()}
        title={"Editar Nota"}
        width={500}
        closeIcon={
          <CloseOutlined
            style={{ position: "absolute", top: "18px", right: "10px" }}
          />
        }
      >
        <div>
          <Form
            form={form}
            requiredMark="optional"
            name="etapas"
            layout="vertical"
            onFinish={onFinish}
            autoComplete="off"
          >
            <div className="layout-wrapper">
              <div className="layout-form">
                <Form.Item name="not_desc">
                  <NoteEdit
                    editValue={notID}
                    width="100%"
                    height={200}
                  ></NoteEdit>
                  <Row gutter={[20, 20]}>
                    <Col sm={24}>
                      <Radio.Group
                        defaultValue={String(prioridad)}
                        buttonStyle="solid"
                        onChange={onChangePriority}
                      >
                        <Radio.Button value="1">Alta</Radio.Button>
                        <Radio.Button value="2">Media</Radio.Button>
                        <Radio.Button value="3">Baja</Radio.Button>
                      </Radio.Group>
                    </Col>
                  </Row>
                </Form.Item>
              </div>
              <div className="layout-footer">
                <Button type="primary" htmlType="submit" block>
                  Guardar
                </Button>
              </div>
            </div>
          </Form>
        </div>
      </Drawer>
    </>
  );
};

export default EditarNota;
