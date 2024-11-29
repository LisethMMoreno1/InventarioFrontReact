import React from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef, GridValidRowModel } from "@mui/x-data-grid";
import { Container, Typography } from "@mui/material";

interface DataGridProps<T extends GridValidRowModel> {
  rows: T[];
  columns: GridColDef<T>[];
  children?: React.ReactNode;
}

const DataGridComponent = <T extends GridValidRowModel>({
  rows,
  columns,
  children,
}: DataGridProps<T>) => {
  return (
    <Container
      maxWidth={false}
      sx={{
        height: "calc(75vh - 90px)",
        padding: "15px",
        overflowX: "hidden", 
      }}
    >
      <Box
        sx={{
          backgroundColor: "background.paper",
          borderRadius: 1,
          overflow: "hidden",
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {children && (
          <Box sx={{ padding: 2, borderBottom: 1, borderColor: "divider" }}>
            <Typography variant="h6" component="h2">
              {children}
            </Typography>
          </Box>
        )}
        <Box sx={{ flexGrow: 1, width: "100%" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 15,
                },
              },
            }}
            pageSizeOptions={[15, 25, 50]}
            checkboxSelection
            disableRowSelectionOnClick
            sx={{
              border: "none",
              "& .MuiDataGrid-cell": {
                borderBottom: "none",
              },
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: "background.default",
                borderBottom: 1,
                borderColor: "divider",
              },
              "& .MuiDataGrid-row:nth-of-type(even)": {
                backgroundColor: "action.hover",
              },
              "& .MuiDataGrid-columnHeaderTitle": {
                fontWeight: "bold",
              },
              "& .MuiDataGrid-root": {
                width: "100%", 
              },
            }}
          />
        </Box>
      </Box>
    </Container>
  );
};

export default DataGridComponent;
