import { Button, Col, Form, Radio, Row } from "antd";
import React, { useState } from "react";
import Note from "./Note";

const NuevaNota = () => {

    const [form] = Form.useForm();
    const [priority, setPriority] = useState(1);

    const onChangePriority = (v) => {
        setPriority(Number(v.target.value));
      };

    const onFinish = (v) => {
        console.log(v);
    }

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
