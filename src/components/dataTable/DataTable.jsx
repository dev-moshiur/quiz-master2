import "./dataTable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns } from "../../dataheading";
import { Link } from "react-router-dom";
import { useState } from "react";

const Datatable = ({ rowData }) => {
  const [data, setData] = useState(rowData);
  const [loading, setLoading] = useState(false);
  const server = `https://quiz-app-api-nine.vercel.app`;
  rowData.forEach((item) => (item.id = item._id));

  const handleDelete = (id) => {
    setLoading(true);
    fetch(`${server}/quize/${id}`, {
      method: "delete",
    }).then((respo) => {
      console.log(respo);
      setData(data.filter((item) => item.id !== id));
      setLoading(false);
    });
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to="/users/test" style={{ textDecoration: "none" }}>
              <div className="viewButton">View</div>
            </Link>
            <div
              className="deleteButton"
              onClick={() => {
                if (!loading) {
                  handleDelete(params.row.id);
                }
              }}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];
  return (
    <div className="dataTable">
      <div className="datatableTitle">Add New User</div>
      <DataGrid
        className="datagrid"
        rows={data}
        columns={userColumns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
      />
    </div>
  );
};

export default Datatable;
