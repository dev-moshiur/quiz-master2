export const userColumns = [
  { field: "id", headerName: "ID", width: 70 },
  {
    field: "question",
    headerName: "Question",
    width: 230,
    renderCell: (params) => {
      return <div className="cellWithImg">{params.row.question}</div>;
    },
  },
  {
    field: "options",
    headerName: "Options",
    width: 230,

    renderCell: (params) => {
      return (
        <div className="options">
          {params.row.options.map((item) => (
            <span>{item.option}</span>
          ))}
        </div>
      );
    },
  },

  {
    field: "age",
    headerName: "Age",
    width: 100,
  },
  {
    field: "status",
    headerName: "Status",
    width: 160,
    renderCell: (params) => {
      return (
        <div className={`cellWithStatus ${params.row.status}`}>
          {params.row.status}
        </div>
      );
    },
  },
];
