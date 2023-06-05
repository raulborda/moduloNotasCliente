import {
    DeleteOutlined,
    EditOutlined,
    PushpinOutlined,
  } from "@ant-design/icons";
  import { Badge, Button, Popconfirm } from "antd";
  import moment from "moment";
  import React, { Fragment } from "react";
  import "moment/locale/es"; // Importar el idioma español
  import "./Style.css"
  
  const NotaItem = ({ note, attached }) => {

    moment.locale('es'); // Establecer el idioma en español
  
    const { not_desc, not_fechahora, not_id, pri_desc, usu_nombre, not_anclado } = note;
    let color;

    console.log(not_fechahora)
  
    switch (pri_desc) {
      case "ALTA":
        color = "#f12d2d";
        break;
      case "MEDIA":
        color = "#e8bc0d";
        break;
      case "BAJA":
        color = "#00b33c";
        break;
      default:
        color = "#f12d2d";
    }
    const onAnchor = (id, anclado) => {
      // estado = anclado;
      let estado;
  
      if (anclado === 0) {
        estado = 1;
      } else {
        estado = 0;
      }
  
    };
  
    const onEdit = (id) => {
 
    };
  
    const onArchive = (not_id) => {
      //
     
    };
    return (
      <Fragment>
        <Badge.Ribbon className="ribbon" text={pri_desc} color={color} style={{marginRight:"-34px"}}>
          <div className={!attached ? `note_wrapper` : `note_wrapper attached`}>
            <div className="note_header">
              <div className="note_date">
                {moment(not_fechahora).format("LL")}
              </div>
              <div className="note_author">{usu_nombre}</div>
            </div>
            <div
              className="note_description"
              dangerouslySetInnerHTML={{ __html: not_desc }}
            ></div>
  
            <Fragment>
              {!attached && (
                <div className="note_anchor">
                  <Button
                    type="link"
                    style={{ padding: 5 }}
                    onClick={() => onAnchor(not_id, not_anclado)}
                  >
                    <PushpinOutlined
                      className={not_anclado === 1 ? `anchor` : `unanchor`}
                      style={{ color: "#56b43c" }}
                    />
                  </Button>
                  <Button
                    type="link"
                    style={{ padding: 5 }}
                    onClick={() => onEdit(not_id)}
                  >
                    <EditOutlined style={{ color: "#56b43c" }}/>
                  </Button>
                  <Popconfirm
                    style={{ width: 200 }}
                    title="¿Deseas eliminar esta nota?"
                    okText="Borrar"
                    cancelText="Cerrar"
                    onConfirm={() => onArchive(not_id)}
                    placement="left"
                  >
                    <Button type="link">
                      <DeleteOutlined style={{ color: "red" }} />
                    </Button>
                  </Popconfirm>
                </div>
              )}
            </Fragment>
          </div>
        </Badge.Ribbon>
      </Fragment>
    );
  };
  
  export default NotaItem;
  