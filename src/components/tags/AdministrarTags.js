import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { Button, Col, Drawer, Form, Row, Select, Tag } from "antd";
import React, { useEffect, useState } from "react";
import "./Style.css"

const AdministrarTags = ({ notaId, prioridad, visible, onClose }) => {
  const URL = process.env.REACT_APP_URL;

  const [form] = Form.useForm();

  const [infoEtiquetas, setInfoEtiquetas] = useState([]);

  let selected;

  useEffect(() => {
    const data = new FormData();
    data.append("notId", notaId);
    fetch(`${URL}buscarEtiquetas.php`, {
      method: "POST",
      body: data,
    }).then(function (response) {
      response.text().then((resp) => {
        const data = resp;
        const objetoData = JSON.parse(data);
        setInfoEtiquetas(objetoData);
        // setNoteBody(objetoData[0].not_desc);
      });
    });
  }, [notaId]);

  console.log(infoEtiquetas);

  const onFinish = (v) => {
    console.log(v);
  };

  return (
    <>
      <Drawer
        visible={visible}
        onClose={() => onClose()}
        title={"Administrar Etiquetas"}
        width={350}
        closeIcon={
          <CloseOutlined
            style={{ position: "absolute", top: "18px", right: "10px" }}
          />
        }
      >
        {/* <Form layout="vertical" form={form} onFinish={onFinish}>
          <Col>
            <h4>Etiquetas</h4>
            <Form.Item name={"tags"}>
              <Row gutter={[8, 8]}>
                <Select
                  mode="multiple"
                  placeholder="Seleccione etiquetas"
                  style={{ width: "300px" }}
                //   onChange={(v, c) => {
                //     setTagsListFilter(
                //       c.map((item) => {
                //         return { etq_id: Number(item.key) };
                //       })
                //     );
                //   }}
                >
                  {infoEtiquetas &&
                    infoEtiquetas?.map((item) => {
                      const { etq_color, etq_id, etq_nombre } = item;
                      console.log(etq_color);
                      return (
                        <Select.Option key={etq_id}>
                          <Tag color={etq_color} key={etq_id}>
                            {etq_nombre}
                          </Tag>
                        </Select.Option>
                      );
                    })}
                </Select>
              </Row>
            </Form.Item>
          </Col>
        </Form> */}
        {infoEtiquetas &&
          infoEtiquetas?.map((tag) => {
            // if (tagsList) {
            //   selected = tagsList.filter((tagL) => {
            //     if (tagL.etq_id === tag.etq_id) {
            //       return true;
            //     } else {
            //       return false;
            //     }
            //   });
            // }

            const { etq_nombre, etq_color, etq_id } = tag;

            return (
              <div className="tags_wrapper">
                <div
                  className="tag"
                  onClick={() => console.log(etq_id)}
                  style={{
                    background: etq_color,
                  }}
                >
                  <span className="tag_name">{etq_nombre}</span>
                  {selected &&
                    selected.length > 0 &&
                    selected[0].etq_id === tag.etq_id && (
                      <CheckOutlined color="white" />
                    )}
                </div>
              </div>
            );
          })}

        <Button
          type="primary"
          block
          style={{ marginTop: 10 }}
          //onClick={editTags}
        >
          {" "}
          Guardar
        </Button>
      </Drawer>
    </>
  );
};

export default AdministrarTags;
