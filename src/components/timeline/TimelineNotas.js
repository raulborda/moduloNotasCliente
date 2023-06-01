import { CopyOutlined } from "@ant-design/icons";
import { Timeline as TL } from "antd";
import React, { Fragment, useEffect } from "react";
import NotaItem from "./NotaItem";

const TimelineNotas = ({ notes, historial }) => {
  useEffect(() => {
    if (!historial) return;
  }, [historial]);

  const createTimeline = (item) => {
    // Esta función toma el item que viene por parámetro y lo asigna a component para retornar
    // un string que defina el tipo de componente que se imprime en pantalla

    let component = { type: "", data: {} };

    if (item.his_detalle.startsWith("####N_")) {
      const idNota = Number(item.his_detalle.slice(6));
      // Busca la Nota correspondiente al id que se obtiene del detalle del historial
      if (!notes) return;
      const NoteItem = notes.filter((item) => item.not_id === idNota)[0];
      component.type = "N";
      component.data = NoteItem;

      // si la tarea tien una nota o no
    }
  };
  
  const createComponent = (item) => {
    let component = createTimeline(item);

    if (!component) return;
    switch (component.type) {
      case "N": // nota
        if (!component.data) return "";
        return (
          <Fragment>
            <TL.Item dot={<CopyOutlined className="timeline-clock-icon" />}>
              <NotaItem note={component.data} attached={false}></NotaItem>
            </TL.Item>
          </Fragment>
        );

      default:
        break;
    }
  };

  return (
    <Fragment>
      {historial &&
        historial.map((item) => {
          return <TL rever>{createComponent(item)}</TL>;
        })}
    </Fragment>
  );
};
export default TimelineNotas;
