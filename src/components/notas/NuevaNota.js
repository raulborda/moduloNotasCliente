import { Button, Col, Form, Radio, Row } from "antd";
import React, { useContext, useState } from "react";
import Note from "./Note";
import { GlobalContext } from "../context/GlobalContext";

const NuevaNota = () => {
  const URL = process.env.REACT_APP_URL;

  const { note, setNote, setShowDrawer, idUsu, cliSelect } = useContext(GlobalContext);

  const [form] = Form.useForm();
  const [priority, setPriority] = useState(1);

  const onChangePriority = (v) => {
    setPriority(Number(v.target.value));
  };

  const onFinish = (v) => {
    const dataN = {
      ...v,
      not_desc: note,
      not_importancia: priority,
    };

    console.log(dataN.not_desc);
    console.log(dataN.not_importancia);
    console.log(idUsu);
    console.log(cliSelect);

    const data = new FormData();
    data.append("idUsu", idUsu);
    data.append("idC", cliSelect);
    data.append("notDesc", dataN.not_desc);
    data.append("notImport", dataN.not_importancia);
    fetch(`${URL}nuevaNota.php`, {
      method: "POST",
      body: data,
    }).then(function (response) {
      response.text().then((resp) => {
        const data = resp;
        console.log(data);
      });
    });




    setShowDrawer(false);
    setNote("");
    form.resetFields();
  };

  return (
    <>
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
                <Note width="100%" height={200}></Note>
                <Row gutter={[20, 20]}>
                  <Col sm={24}>
                    <Radio.Group
                      defaultValue="1"
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
    </>
  );
};

export default NuevaNota;
