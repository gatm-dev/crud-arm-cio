import React, { useState, useEffect, useContext } from "react";
import { SesionContext } from "../Context/SesionContext";
import { useNavigate } from "react-router";
import { Grid, Button, Container, TextField } from "@mui/material";
import { MiniCrud, RenameProperty } from "../Components/MiniCrud";

const getData = async (url) => {
  const response = await fetch(url);
  const data = await response;
  if (data.ok) return data.json();
  else {
    return data.json().then((error) => {
      throw new Error(error?.ExceptionMessage);
    });
  }
};

const postData = async (url, payload) => {
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const data = await response;
  if (data.ok) return data.json();
  else {
    return data.json().then((error) => {
      throw new Error(error?.ExceptionMessage);
    });
  }
};

const AddNewFrame = ({}) => {
  const [postPayload, setPostPayload] = useState({
    Marca: "",
    Modelo: "",
  });

  return (
    <Grid container direction="row" justifyContent="center">
      <Grid item xs={12}>
        <h3>Agregar nuevo</h3>
      </Grid>
      <Grid item xs={3}>
        <TextField
          variant="standard"
          placeholder="Marca"
          value={postPayload?.Marca}
          onChange={(e) =>
            setPostPayload({ ...postPayload, Marca: e.target.value })
          }
          fullWidth
          size="small"
        />
      </Grid>
      <Grid item xs={3}>
        <TextField
          variant="standard"
          placeholder="Modelo"
          value={postPayload?.Modelo}
          onChange={(e) =>
            setPostPayload({ ...postPayload, Modelo: e.target.value })
          }
          fullWidth
          size="small"
        />
      </Grid>
    </Grid>
  );
};

const Home = () => {
  const { usuario, token, setToken } = useContext(SesionContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (token === null) navigate("/login");
  }, [token]);

  const dummyData = [
    { IdReg: 1, Nombre: "Juan", Apellido: "Perez" },
    { IdReg: 2, Nombre: "Pedro", Apellido: "Gomez" },
  ];

  return (
    <Container fluid>
      <Grid container>
        <Grid item xs={12}>
          <Grid container direction="row" justifyContent="center">
            <Grid item xs>
              <h2>Home</h2>
            </Grid>
            <Grid item xs>
              <span>Hola {usuario?.NombreUsuario} </span>
            </Grid>
            <Grid item xs="auto">
              <h5>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    setToken(null);
                    localStorage.removeItem("token");
                    navigate("/login");
                  }}
                >
                  Cerrar sesión
                </Button>
              </h5>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container>
            <Grid item xs={9}>
              <Grid container direction="row" justifyContent="center">
                <Grid item xs={12}>
                  <Grid item xs={12}>
                    <MiniCrud
                      data={RenameProperty(dummyData, "IdReg", "id")}
                      newFormComponent={<AddNewFrame />}
                    />
                  </Grid>
                  <Grid item xs={12}></Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={8}></Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home;
