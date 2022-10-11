import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';

export default function DataGridTable({ columns, rows, pageSize, rowsPerPageOptions, handleChange, handleDelete, checkboxSelection }) {
    return (
        <Box sx={{ height: "70vh", width: '100%' }}>
            <DataGrid
                rows={rows}
                columns={columns}
                pageSize={pageSize}
                rowsPerPageOptions={[rowsPerPageOptions]}
                checkboxSelection
                disableSelectionOnClick
                onCellEditCommit={handleChange}
                onSelectionModelChange={checkboxSelection}
            />
        </Box>
    );
}
