import React, { useState, useEffect, useContext } from "react";
import { SesionContext } from "../Context/SesionContext";
import {
  Grid,
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
  Alert,
  AlertTitle,
  IconButton,
} from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";

const FormAddNewElement = ({
  formTitle,
  postEndpoint,
  model,
  handleReloadData,
}) => {
  const { token, setToken } = useContext(SesionContext);
  const [payload, setPayload] = useState(model || {});
  const [alert, setAlert] = useState({
    show: false,
    message: "",
  });

  useEffect(() => {
    setPayload(model);
  }, []);

  const postData = async () => {
    fetch(postEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    })
      .then((res) => {
        if (res?.status === 401) setToken(null);
        else return res.json();
      })
      .then((res) => {
        setAlert({
          show: true,
          message: res,
        });
        handleClean();
      })
      .catch((err) => {
        setAlert({
          show: true,
          message: err,
        });
      });

      handleReloadData();
  };

  const handleClean = () => setPayload(model);
  const handleSubmmit = (e) => {
    e.preventDefault();
    postData();
  };

  return (
    <form onSubmit={handleSubmmit}>
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        spacing={2}
      >
        <Grid item xs={12}>
          <h3>{formTitle}</h3>
        </Grid>
        {Object.keys(payload).map((key) => (
          <Grid item xs={2} key={key}>
            {typeof payload[key] === "boolean" ? (
              <FormControlLabel
                label={key}
                labelPlacement="end"
                control={
                  <Checkbox
                    checked={payload[key]}
                    onChange={(e) =>
                      setPayload({
                        ...payload,
                        [key]: e.target.checked,
                      })
                    }
                  />
                }
              />
            ) : (
              <TextField
                variant={"outlined"}
                placeholder={key}
                value={payload[key]}
                label={key}
                InputLabelProps={{
                  shrink: true,
                }}
                type={typeof payload[key] === "number" ? "number" : "text"}
                onChange={(e) =>
                  setPayload({
                    ...payload,
                    [key]:
                      typeof payload[key] === "number"
                        ? e.target.value.replace(/\D+/g, "")
                        : e.target.value,
                  })
                }
                fullWidth
                size="small"
              />
            )}
          </Grid>
        ))}
        <Grid item xs={12}>
          <Grid container direction="row" justifyContent="flex-end" spacing={2}>
            {alert.show ? (
              <Grid item xs>
                <Alert
                  action={
                    <IconButton
                      aria-label="close"
                      color="inherit"
                      size="small"
                      onClick={() =>
                        setAlert({
                          show: false,
                          message: "",
                        })
                      }
                    >
                      <CloseIcon fontSize="inherit" />
                    </IconButton>
                  }
                >
                  <AlertTitle>{alert.message}</AlertTitle>
                </Alert>
              </Grid>
            ) : (
              <></>
            )}
            <Grid item xs="auto">
              <Button variant="contained" color="error" onClick={handleClean}>
                Cancelar
              </Button>
            </Grid>
            <Grid item xs="auto">
              <Button variant="contained" color="primary" type="submit">
                Guardar
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
};

export default FormAddNewElement;
