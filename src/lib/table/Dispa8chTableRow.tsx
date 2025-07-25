import React from "react";
import styles from "@/lib/table/style/Index.module.css";

function Dispa8chTableRow(props: Dispa8chTableRow) {
  const values = [
    props.one,
    props.two,
    props.three,
    props.four,
    props.five,
    props.six,
    props.seven,
    props.eight,
    props.nine,
    props.ten,
    props.eleven,
    props.twelve,
    props.thirteen,
    props.fourteen,
    props.fifteen,
  ];
  return (
    <tr>
      {values.map((cell, idx) =>
        cell !== undefined ? <td key={idx}>{cell}</td> : null
      )}
    </tr>
  );
}

export default Dispa8chTableRow;
