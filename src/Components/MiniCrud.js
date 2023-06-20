import React, { useState, useEffect, useContext } from "react";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import {
  Grid,
  Button,
  Tooltip,
  Box,
  TextField,
  Typography,
  Modal,
} from "@mui/material";
import {
  Delete as DeleteIcon,
  Edit as EditIcon,
  Circle as CircleIcon,
} from "@mui/icons-material";

export const filterByValue = (array = [], string) =>
  array?.filter((o) =>
    Object.keys(o).some((k) =>
      String(o[k]).toLowerCase().includes(string.toLowerCase())
    )
  );

export const RenameProperty = (objArray, originalIdName, newName) =>
  objArray.map((object) => {
    const newObject = {};
    Object.keys(object).forEach((key) => {
      if (key.includes(originalIdName)) newObject[newName] = object[key];
      else newObject[key] = object[key];
    });

    return newObject;
  });

const DataGridColumnsDef = (objArray = []) => {
  const def = Object.keys(objArray[0]).map((key, i) => ({
    field: key,
    headerName: key,
    minWidth: Math.max(
      ...Object.keys(objArray).map((o) => String(o[key]).length * 20)
    ),
    headerAlign: "center",
    editable: false,
    align: typeof key === "number" ? "right" : "left",
    renderCell: (params) => (
      <Tooltip title={params.value}>
        <span className="table-cell-trucate">{params.value}</span>
      </Tooltip>
    ),
  }));

  const editAndDelete = {
    field: "actions",
    type: "actions",
    headerName: "Opciónes",
    width: 100,
    getActions: ({ id }) => [
      <GridActionsCellItem
        label="Borrar"
        icon={<DeleteIcon />}
        /*onClick={() => setOpenModal(true)}*/
      />,
    ],
  };

  return [editAndDelete, ...def];
};

export const MiniCrud = ({
  data = [],
  handleEdit,
  handleDelete,
  newFormComponent = <>Sin formulario</>,
}) => {
  const [filteredData, setFilteredData] = useState(data);
  const [toFind, setToFind] = useState("");
  const [openNew, setOpenNew] = useState(false);

  useEffect(() => {
    setFilteredData(filterByValue(data, toFind));
  }, [toFind]);

  return (
    <>
      <Grid
        container
        direction="row"
        justifyContent="flex-end"
        justifyItems={"center"}
        spacing={2}
      >
        <Grid item xs>
          <TextField
            variant="standard"
            placeholder="Buscar"
            value={toFind}
            onChange={(e) => setToFind(e.target.value)}
            fullWidth
            size="small"
          />
        </Grid>
        <Grid item xs="auto">
          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={() => setOpenNew(!openNew)}
          >
            {openNew ? "Cerrar" : "Nuevo"}
          </Button>
        </Grid>
        {openNew ? (
          <Grid item xs={12}>
            {newFormComponent}
          </Grid>
        ) : (
          <></>
        )}
        <Grid item xs={12}>
          {filteredData.length > 0 ? (
            <Box sx={{ minHeight: 400, height: "100%", width: "100%" }}>
              <DataGrid
                sx={{ height: "100%" }}
                rows={filteredData}
                columns={DataGridColumnsDef(data)}
                initialState={{
                  pagination: {
                    paginationModel: {
                      pageSize: 5,
                    },
                  },
                }}
                pageSizeOptions={[5]}
              />
            </Box>
          ) : (
            <h3>No hay datos</h3>
          )}
        </Grid>
      </Grid>
    </>
  );
};
