import React, { useState, useContext } from "react";
import { SesionContext, endpoint } from "../Context/SesionContext";
import { TextField, Button, Grid } from "@mui/material";
import { useNavigate } from "react-router";

const Login = () => {
  const navigate = useNavigate();
  const { token, setToken } = useContext(SesionContext);
  const [credentials, setCredentials] = useState({
    Usr: "",
    Pwd: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`${endpoint}/crud-login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    })
      .then((res) => (res.status === 200 ? res.json() : null))
      .then((res) => {
        if (res !== null) {
          setToken(res);
          localStorage.setItem("token", res);
          navigate("/");
        } else {
          setToken(null);
          localStorage.removeItem("token");
        }
      })
      .catch((err) => {
        setToken(null);
        localStorage.removeItem("token");
        alert(err);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container justifyContent="center">
        <Grid item xs={12}>
          <h1>Inicio de sesión</h1>
        </Grid>
        <Grid item xs={12}>
          <TextField
            variant="outlined"
            type="text"
            placeholder="Usuario"
            required
            value={credentials?.Usr}
            inputProps={{
              maxLength: 50,
              style: { textAlign: "center" },
            }}
            onChange={(e) =>
              setCredentials({ ...credentials, Usr: e.target.value })
            }
            size="small"
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            variant="outlined"
            type="password"
            placeholder="Contraseña"
            value={credentials?.Pwd}
            inputProps={{
              maxLength: 50,
              style: { textAlign: "center" },
            }}
            onChange={(e) =>
              setCredentials({ ...credentials, Pwd: e.target.value })
            }
            size="small"
            autoComplete="current-password"
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Iniciar sesión
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default Login;
