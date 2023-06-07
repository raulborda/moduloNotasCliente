// import { CopyOutlined } from "@ant-design/icons";
// import { Empty, Timeline as TL } from "antd";
// import React, { Fragment } from "react";
// import NotaItem from "./NotaItem";

// const TimelineNotas = ({ notes }) => {
//   //console.log(" desde timeline: ", notes);

//   return (
//     <Fragment>
//       {notes && notes.length > 0 ? (
//         <div style={{height:"316px", width:"99%",overflowY:"scroll", padding:"15px"}}>
//            <style>
//             {`
//               ::-webkit-scrollbar {
//                 width: 8px;
//               }

//               ::-webkit-scrollbar-track {
//                 background-color: #f5f5f5;
//                 border-radius: 4px;
//               }

//               ::-webkit-scrollbar-thumb {
//                 background-color: #e8e8e8;
//                 border-radius: 4px;
//               }

//               ::-webkit-scrollbar-thumb:hover {
//                 background-color: #e5e5e5;
//               }
//             `}
//           </style>
//           <TL>
//             {notes.map((note) => (
//               <TL.Item
//                 style={{ width: "96.5%" }}
//                 key={note.not_id}
//                 dot={<CopyOutlined className="timeline-clock-icon" />}
//               >
//                 <NotaItem note={note} attached={false} />
//               </TL.Item>
//             ))}
//           </TL>
//         </div>
//       ) : (
//         <Empty
//           image={Empty.PRESENTED_IMAGE_SIMPLE}
//           description="No hay notas"
//         />
//       )}
//     </Fragment>
//   );
// };
// export default TimelineNotas;

import { CopyOutlined } from "@ant-design/icons";
import { Empty, Timeline as TL } from "antd";
import React, { Fragment } from "react";
import NotaItem from "./NotaItem";

const TimelineNotas = ({ notes, card }) => {
  const filteredNotes = notes.filter((note) => {
    if (card === "general") {
      return note.not_anclado !== "1";
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
            height: "316px",
            width: "99%",
            overflowY: "scroll",
            padding: "15px",
          }}
        >
          <style>
            {`
            ::-webkit-scrollbar {
              width: 8px;
            }

            ::-webkit-scrollbar-track {
              background-color: #f5f5f5;
              border-radius: 4px;
            }

            ::-webkit-scrollbar-thumb {
              background-color: #e8e8e8;
              border-radius: 4px;
            }

            ::-webkit-scrollbar-thumb:hover {
              background-color: #e5e5e5;
            }
          `}
          </style>
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
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description="No hay notas"
        />
      )}
    </>
  );
};

export default TimelineNotas;

