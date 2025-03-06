import React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import {
  DataGrid,
  GridColDef,
  GridValidRowModel,
  GridToolbar,
} from "@mui/x-data-grid";
import { Typography } from "@mui/material";

interface DataGridProps<T extends GridValidRowModel> {
  rows: T[];
  columns: GridColDef<T>[];
  title?: string;
}

const DataGridComponent = <T extends GridValidRowModel>({
  rows,
  columns,
  title,
}: DataGridProps<T>) => {
  return (
    <Paper
      sx={{
        height: "calc(100vh - 380px)",
        minHeight: "400px",
        borderRadius: 2,
        overflow: "hidden",
        boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
        m: 2,
      }}
    >
      {title && (
        <Box sx={{ p: 2, borderBottom: "1px solid", borderColor: "divider" }}>
          <Typography variant="h6">{title}</Typography>
        </Box>
      )}
      <Box sx={{ height: "100%", width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 },
            },
            sorting: {
              sortModel: [],
            },
          }}
          pageSizeOptions={[5, 10, 25]}
          checkboxSelection
          disableRowSelectionOnClick
          slots={{ toolbar: GridToolbar }}
          slotProps={{
            toolbar: {
              showQuickFilter: true,
              quickFilterProps: { debounceMs: 500 },
            },
          }}
          sx={{
            border: "none",
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: "background.paper",
              borderBottom: "1px solid",
              borderColor: "divider",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: "none",
            },
            "& .MuiDataGrid-row": {
              borderBottom: "1px solid",
              borderColor: "divider",
              transition: "background-color 0.2s",
              "&:hover": {
                backgroundColor: "action.hover",
              },
            },
            "& .MuiDataGrid-row:nth-of-type(even)": {
              backgroundColor: "action.hover",
            },
          }}
        />
      </Box>
    </Paper>
  );
};

export default DataGridComponent;
