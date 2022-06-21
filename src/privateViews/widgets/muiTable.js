import MUIDataTable from "mui-datatables";
import { CircularProgress, Box } from "@material-ui/core";
import React, { useState, useCallback, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
/*
  scrollIntoView: boolean (default is true) - scroll MuiTable into view everytime change page is called
  setChangePage: function - to allow parent component to access setPage function
 */

const MuiTable = ({
  setChangePage,
  parentCallback,
  data,
  columns,
  totalCount,
  tableId,
  scrollIntoView = true,
}) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [isLoading, setIsLoading] = useState(false);
  const tableRef = useCallback(
    (node) => {
      if (node !== null && scrollIntoView) {
        node.scrollIntoView({ behaviour: "smooth" });
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [data]
  );

  const textLabels = {
    body: {
      noMatch: "No Matching Records Found",
      tooltip: "Sort",
    },
    pagination: {
      next: "Next Page",
      previous: "Previous Page",
      rowsPerPage: "RowsPer Page",
      displayRows: "Of",
      jumpToPage: "Jump To Page",
    },
  };

  const changePage = async (page, limit = rowsPerPage) => {
    setPage(page);
    setIsLoading(true);
    if (limit !== rowsPerPage) setRowsPerPage(limit);

    const skip = page * limit;
    await parentCallback(skip, limit);
    setIsLoading(false);
  };
  let tableName;
  if (tableId === null || tableId === undefined || tableId === "") {
    tableName = `table${uuidv4()}`;
  } else {
    tableName = tableId;
  }
  const options = {
    textLabels: textLabels,
    jumpToPage: true,
    selectableRows: "none",
    filter: false,
    search: false,
    page: page,
    serverSide: true,
    rowsPerPage: rowsPerPage,
    sort: true,
    responsive: "standard",
    rowsPerPageOptions: [3, 5, 10],
    download: false,
    print: false,
    count: totalCount,
    tableId: tableName,
    onTableChange: (action, tableState) => {
      switch (action) {
        case "changePage":
          changePage(tableState.page);
          break;
        case "changeRowsPerPage":
          changePage(tableState.page, tableState.rowsPerPage);
          break;
        default:
      }
    },
  };
  /* reference for custom too bar
     customToolbar: () => {
       return (
         <Button
           className="float-right rounded"
           onClick={handleShowCreateLogisticCompanyModal}
         >
           Create Logistic Company
         </Button>
       )
     },
  */

  useEffect(() => {
    //return setPage function to and set it as a state in parent component
    if (setChangePage !== undefined && setChangePage !== null)
      setChangePage(() => setPage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return isLoading ? (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <CircularProgress />
    </Box>
  ) : (
    <div ref={tableRef}>
      <MUIDataTable data={data} columns={columns} options={options} />
    </div>
  );
};
export default React.memo(MuiTable, (prevProps, nextProps) => {
  return (
    prevProps.isLoading === nextProps.isLoading &&
    prevProps.data === nextProps.data &&
    prevProps.totalCount === nextProps.totalCount
  );
});
