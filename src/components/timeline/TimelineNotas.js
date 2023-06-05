import { CopyOutlined } from "@ant-design/icons";
import { Empty, Timeline as TL } from "antd";
import React, { Fragment} from "react";
import NotaItem from "./NotaItem";

const TimelineNotas = ({ notes }) => {
  console.log(" desde timeline: ", notes);

  return (
    <Fragment>
      {notes && notes.length > 0 ? (
        <TL>
          {notes.map((note) => (
            <TL.Item
            style={{width:"96.5%"}}
              key={note.not_id}
              dot={<CopyOutlined className="timeline-clock-icon" />}
            >
              <NotaItem note={note} attached={false} />
            </TL.Item>
          ))}
        </TL>
      ) : (
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description="No hay notas"
        />
      )}
    </Fragment>
  );
};
export default TimelineNotas;
