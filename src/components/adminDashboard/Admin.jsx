import React from "react";
import { useEffect, useState } from "react";
import DataTable from "../dataTable/DataTable";
export default function Admin() {
  const [loading, setloading] = useState(true);
  const [err, seterr] = useState();
  const [data, setdata] = useState();
  const server = `https://quiz-app-api-nine.vercel.app`;
  useEffect(() => {
    fetch(`${server}/quize`)
      .then((res) => res.json())
      .then((resp) => {
        setdata(resp);
        setloading(false);
        console.log(resp);
      });
  }, []);

  return (
    <div className="admin">
      <div className="navigation"></div>
      <div className="table">
        {loading && (
          <div className="loading">
            <img src="images/Loading_2.gif" alt="" />
          </div>
        )}
        {data && <DataTable rowData={data} />}
      </div>
    </div>
  );
}
