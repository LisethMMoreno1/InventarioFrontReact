import React, { useState } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import {
  DataGrid,
  GridColDef,
  GridValidRowModel,
  GridToolbar,
  GridPaginationModel,
} from "@mui/x-data-grid";
import { Typography, useMediaQuery, useTheme } from "@mui/material";

interface DataGridProps<T extends GridValidRowModel> {
  rows: T[];
  columns: GridColDef<T>[];
  title?: string;
  getRowId?: (row: T) => any;
}

const DataGridComponent = <T extends GridValidRowModel>({
  rows,
  columns,
  title,
  getRowId,
}: DataGridProps<T>) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    page: 0,
    pageSize: isMobile ? 5 : 10,
  });

  return (
    <Paper
      sx={{
        height: "calc(80vh - 380px)",
        minHeight: "500px",
        borderRadius: 2,
        overflow: "hidden",
        boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
        m: 2,
        p: 1,
      }}
    >
      {title && (
        <Box
          sx={{
            p: 2,
            borderBottom: "1px solid",
            borderColor: "divider",
          }}
        >
          <Typography variant="h6">{title}</Typography>
        </Box>
      )}
      <Box
        sx={{
          height: "100%",
          width: "100%",
          maxWidth: "100vw",
          minWidth: "300px",
        }}
      >
        <DataGrid
          rows={rows}
          columns={columns}
          getRowId={getRowId}
          pagination
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          pageSizeOptions={isMobile ? [5, 10, 25] : [10, 25, 50]}
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
            "& .MuiDataGrid-cell": { borderBottom: "none" },
            "& .MuiDataGrid-row": {
              borderBottom: "1px solid",
              borderColor: "divider",
              transition: "background-color 0.2s",
              "&:hover": { backgroundColor: "action.hover" },
            },
            "& .MuiDataGrid-row:nth-of-type(even)": {
              backgroundColor: "action.hover",
            },
            "& .MuiDataGrid-virtualScroller::-webkit-scrollbar": {
              display: "none",
            },
            "& .MuiDataGrid-virtualScroller": {
              msOverflowStyle: "none",
              scrollbarWidth: "none",
            },
          }}
        />
      </Box>
    </Paper>
  );
};

export default DataGridComponent;
