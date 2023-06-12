/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../context/GlobalContext";

const TagsListNota = ({ notaId }) => {
  const URL = process.env.REACT_APP_URL;
  const { updateNota } = useContext(GlobalContext);
  const [infoColorEtiquetas, setInfoColorEtiquetas] = useState([]);

  useEffect(() => {
    const data = new FormData();
    data.append("notId", notaId);
    fetch(`${URL}buscarEtiquetasxNota.php`, {
      method: "POST",
      body: data,
    }).then(function (response) {
      response.text().then((resp) => {
        const data = resp;
        const objetoData = JSON.parse(data);
        setInfoColorEtiquetas(objetoData);
      });
    });
  }, [notaId, updateNota]);

  return (
    <>
      <div className="selected_tags">
        {infoColorEtiquetas?.map((tag) => (
          <div
            className="selected_tag"
            style={{ background: tag.etq_color }}
            key={tag.etq_id}
          ></div>
        ))}
      </div>
    </>
  );
};

export default TagsListNota;
