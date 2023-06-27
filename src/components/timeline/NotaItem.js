/* eslint-disable no-unused-vars */
/* eslint-disable eqeqeq */
import {
  DeleteOutlined,
  EditOutlined,
  PushpinOutlined,
  TagsOutlined,
} from "@ant-design/icons";
import { Badge, Button, Popconfirm } from "antd";
import moment from "moment";
import React, { Fragment, useContext, useState } from "react";
import "moment/locale/es"; // Importar el idioma español
import "./Style.css";
import { GlobalContext } from "../context/GlobalContext";
import EditarNota from "../notas/EditarNota";
import AdministrarTags from "../tags/AdministrarTags";
import TagsListNota from "../tags/TagsListNota";

const NotaItem = ({ note, attached }) => {
  const URL = process.env.REACT_APP_URL;

  const { isLoading, setIsLoading } = useContext(GlobalContext);

  const [showDrawerEdit, setShowDrawerEdit] = useState(false);
  const [showDrawerTags, setShowDrawerTags] = useState(false);
  moment.locale("es"); // Establecer el idioma en español

  const {
    not_desc,
    not_fechahora,
    not_id,
    pri_desc,
    usu_nombre,
    not_anclado,
    not_importancia,
  } = note;

  let color;

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

    if (anclado == 0) {
      estado = 1;
    } else {
      estado = 0;
    }

    setIsLoading(true);
    const data = new FormData();
    data.append("idNot", id);
    data.append("estado", estado);
    fetch(`${URL}anclarNota.php`, {
      method: "POST",
      body: data,
    }).then(function (response) {
      response.text().then((resp) => {
        const data = resp;
        //console.log(data);
        setIsLoading(false);
      });
    });

    //console.log("fijado: ", id, estado);
  };

  const onEdit = (id) => {
    setShowDrawerEdit(true);
    //setNotaID(id)
  };

  const tags = (id) => {
    setShowDrawerTags(true);
    //setNotaID(id)
  };

  const onArchive = (not_id) => {
    setIsLoading(true);
    const data = new FormData();
    data.append("notId", not_id);
    fetch(`${URL}borrarNota.php`, {
      method: "POST",
      body: data,
    }).then(function (response) {
      response.text().then((resp) => {
        const data = resp;
        //console.log(data);
        setIsLoading(false);
      });
    });
  };

  return (
    <Fragment>
      <Badge.Ribbon
        className="ribbon"
        text={pri_desc}
        color={color}
        style={{ marginRight: "-34px" }}
      >
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
            <div style={{position: "absolute", left: 20, bottom: "12px"}}>
              <TagsListNota notaId={not_id}/>
            </div>
            {!attached && (
              <div className="note_anchor">
                <Button
                  type="link"
                  style={{ padding: 5 }}
                  onClick={() => onAnchor(not_id, not_anclado)}
                >
                  {not_anclado == 1 ? (
                    <PushpinOutlined
                      className="anchor"
                      style={{ color: "#56b43c" }}
                    />
                  ) : (
                    <PushpinOutlined
                      className="unanchor"
                      style={{ color: "#56b43c" }}
                    />
                  )}
                </Button>
                <Button
                  type="link"
                  style={{ padding: 5 }}
                  onClick={() => onEdit(not_id)}
                >
                  <EditOutlined style={{ color: "#56b43c" }} />
                </Button>
                <EditarNota
                  notID={not_id}
                  prioridad={not_importancia}
                  visible={showDrawerEdit}
                  onClose={() => setShowDrawerEdit(false)}
                />
                <Button
                  type="link"
                  style={{ padding: 5 }}
                  onClick={() => tags(not_id)}
                >
                  <TagsOutlined style={{ color: "#56b43c" }} />
                </Button>
                <AdministrarTags
                  notaId={not_id}
                  prioridad={not_importancia}
                  visible={showDrawerTags}
                  onClose={() => setShowDrawerTags(false)}
                />
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
