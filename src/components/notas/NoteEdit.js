/* eslint-disable no-unused-vars */
import React, { Fragment, useContext, useEffect, useState } from "react";
import { Col, Row } from "antd";
import { useQuill } from "react-quilljs";
import "react-quill/dist/quill.snow.css";
import { GlobalContext } from "../context/GlobalContext";

const NoteEdit = ({ editValue, width, height }) => {
  const URL = process.env.REACT_APP_URL;

  const [infoNotaSelect, setInfoNotaSelect] = useState();
  const [noteBody, setNoteBody] = useState("");

  useEffect(() => {
    const data = new FormData();
    data.append("notId", editValue);
    fetch(`${URL}notaSelectEdit.php`, {
      method: "POST",
      body: data,
    }).then(function (response) {
      response.text().then((resp) => {
        const data = resp;
        const objetoData = JSON.parse(data);
        setInfoNotaSelect(objetoData);
        setNoteBody(objetoData[0].not_desc);
      });
    });
  }, [editValue]);

  console.log(infoNotaSelect);
  console.log(noteBody);

  const [value, setValue] = useState("");
  const { setNote } = useContext(GlobalContext);
  var toolbarOptions = [
    ["bold", "italic", "underline"],
    [{ link: true }],
    [{ list: "ordered" }, { list: "bullet" }],
    ["clean"],
  ];
  const { quill, quillRef, Quill } = useQuill({
    modules: { magicUrl: true, toolbar: toolbarOptions },
  });
  // Idioma

  if (Quill && !quill) {
    // For execute this line only once.
    const MagicUrl = require("quill-magic-url").default; // Install with 'yarn add quill-magic-url'
    Quill.register("modules/magicUrl", MagicUrl);
  }

  useEffect(() => {
    // si existe una nota la debe setear como valor
    if (noteBody) {
      setValue(noteBody);
      //

      if (quill) {
        quill.clipboard.dangerouslyPasteHTML(noteBody);
        setValue(noteBody);
        setNote(noteBody);
      }
    }
    if (quill) {
      quill.on("text-change", (v) => {
        setValue(noteBody);
        setNote(noteBody);
      });
    }
  }, [editValue, quill, setNote]);

  return (
    <Fragment>
      <Row gutter={[20, 20]}>
        <Col sm={24}>
          <div style={{ width: width }}>
            <div ref={quillRef} style={{ minHeight: height }} />
          </div>
        </Col>
      </Row>
    </Fragment>
  );
};

export default NoteEdit;
