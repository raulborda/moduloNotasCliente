/* eslint-disable no-unused-vars */
import { CopyOutlined } from "@ant-design/icons";
import { Timeline as TL } from "antd";
import React from "react";
import NotaItem from "./NotaItem";

const TimelineNotas = ({ notes, card }) => {
  const filteredNotes = notes.filter((note) => {
    if (card === "general") {
      return note
    } else if (card === "destacado") {
      return note.not_anclado !== "0";
    }
    return true;
  });

  return (
    <>
      {filteredNotes && filteredNotes.length > 0 ? (
        <div
          style={{
            height: "100%",
            width: "100%",
            boxSizing: "border-box",
            padding: "15px",
          }}
        >
          <TL>
            {filteredNotes.map((note) => (
              <TL.Item
                style={{ width: "96.5%" }}
                key={note.not_id}
                dot={<CopyOutlined className="timeline-clock-icon" />}
              >
                <NotaItem note={note} attached={false} />
              </TL.Item>
            ))}
          </TL>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default TimelineNotas;

