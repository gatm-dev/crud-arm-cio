import React, { useState, useEffect, useContext } from "react";
import { SesionContext, endpoint } from "../Context/SesionContext";
import { useNavigate } from "react-router";
import { Grid, Button, Container } from "@mui/material";
import { MiniCrud, RenameProperty } from "../Components/MiniCrud";
import FormAddNewElement from "../Components/FormAddNewElement";

const getData = async (url, token) => {
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response;
  if (data.ok) return data.json();
  else
    return data.json().then((error) => {
      throw new Error(error?.ExceptionMessage);
    });
};

const postData = async (url, token, payload) => {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  const data = await response;
  if (data.ok) return data.json();
  else
    return data.json().then((error) => {
      throw new Error(error?.ExceptionMessage);
    });
};

const Home = () => {
  const { usuario, token, setToken } = useContext(SesionContext);
  const navigate = useNavigate();
  const [dataArmazones, setDataArmazones] = useState([]);
  const [dataPreciosArmazones, setDataPreciosArmazones] = useState([]);
  const [dataStock, setDataStock] = useState([]);

  const handleSetDataArmazones = () =>
    getData(`${endpoint}/get-catarmcio`, token)
      .then((data) => setDataArmazones(RenameProperty(data, "IdReg", "id")))
      .catch((error) => console.log(error));

  const handleSetDataPreciosArmazones = () =>
    getData(`${endpoint}/get-catpreciosarmcio`, token)
      .then((data) =>
        setDataPreciosArmazones(RenameProperty(data, "IdReg", "id"))
      )
      .catch((error) => console.log(error));

  const handleSetDataStock = () =>
    getData(`${endpoint}/get-stockarmcio`, token)
      .then((data) => setDataStock(RenameProperty(data, "IdReg", "id")))
      .catch((error) => console.log(error));

  useEffect(() => {
    handleSetDataArmazones();
    handleSetDataPreciosArmazones();
    handleSetDataStock();
  }, []);

  useEffect(() => {
    if (token === null) navigate("/login");
  }, [token]);

  return (
    <Container fluid="true">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Grid container direction="row" justifyContent="center">
            <Grid item xs>
              <h2>Pagina principal</h2>
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
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <h3>Armazones</h3>
              {dataArmazones.length > 0 ? (
                <MiniCrud
                  data={dataArmazones}
                  newFormComponent={
                    <FormAddNewElement
                      formTitle={"Agregar nuevo armazón"}
                      postEndpoint={`${endpoint}/post-catarmcio`}
                      handleReloadData={handleSetDataArmazones}
                      model={{
                        Sku: "",
                        SkuPriority: "",
                        DesProducto: "",
                        Ean: "",
                        Marca: "",
                        Modelo: "",
                        Genero: "",
                        Material: "",
                        Color: "",
                        TipoArm: "",
                        EsClip: false,
                        Forma: "",
                        Puente: 0,
                        Varilla: 0,
                        Vertice: 0,
                        Med_A: 0,
                        Med_B: 0,
                        Med_ED: 0,
                        Med_DBL: 0,
                      }}
                    />
                  }
                />
              ) : (
                <h3>Cargando...</h3>
              )}
            </Grid>
            <Grid item xs={12}>
              <h3>Precios de armazones</h3>
              {dataPreciosArmazones.length > 0 ? (
                <MiniCrud
                  data={dataPreciosArmazones}
                  newFormComponent={
                    <FormAddNewElement
                      formTitle={"Agregar nuevo precio de armazón"}
                      postEndpoint={`${endpoint}/post-catpreciosarmcio`}
                      handleReloadData={handleSetDataPreciosArmazones}
                      model={{
                        Marca: "",
                        AcronimoSku1: "",
                        EsClip: false,
                        PrecioSinIva: 0,
                        Iva: 0,
                        Division: "",
                        Ordsuc: "",
                      }}
                    />
                  }
                />
              ) : (
                <h3>Cargando...</h3>
              )}
            </Grid>
            <Grid item xs={12}>
              <h3>Stock de armazones</h3>
              {dataStock.length > 0 ? (
                <MiniCrud
                  data={dataStock}
                  newFormComponent={
                    <FormAddNewElement
                      formTitle={"Agregar armazón a alguna cuenta"}
                      postEndpoint={`${endpoint}/post-stockarmcio`}
                      handleReloadData={handleSetDataStock}
                      model={{
                        IdArmCio: 0,
                        Sku: "",
                        Piezas: 0,
                        Division: "",
                        Ordsuc: "",
                      }}
                    />
                  }
                />
              ) : (
                <h3>Cargando...</h3>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home;
