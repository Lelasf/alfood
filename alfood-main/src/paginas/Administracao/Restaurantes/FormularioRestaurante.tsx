import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import IRestaurante from "../../../interfaces/IRestaurante";
import http from "../../../http";

import { Box, Button, TextField, Typography } from "@mui/material";

const FormularioRestaurante = () => {
  const parametros = useParams();

  useEffect(() => {
    if (parametros.id) {
      http
        .get<IRestaurante>(`restaurantes/${parametros.id}/`)
        .then((resposta) => setNomeRestaurante(resposta.data.nome));
    }
  }, [parametros]);

  const [nomeRestaurante, setNomeRestaurante] = useState("");

  const aoSubmeterForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (parametros.id) {
      http
        .put(`restaurantes/${parametros.id}/`, {
          nome: nomeRestaurante,
        })
        .then(() => {
          alert("restaurante atualizado com sucesso");
        });
    } else {
      http
        .post("restaurantes/", {
          nome: nomeRestaurante,
        })
        .then(() => {
          alert("Restaurante cadastrado com sucesso");
        });
    }
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          flexGrow: 1,
        }}
      >
        <Typography component="h1" variant="h6">
          Formulario de restaurantes
        </Typography>
        <Box component="form" sx={{ width: "70%" }} onSubmit={aoSubmeterForm}>
          <TextField
            label="Nome do Restaurante"
            variant="standard"
            value={nomeRestaurante}
            onChange={(e) => setNomeRestaurante(e.target.value)}
            fullWidth
            required
          />
          <Button
            sx={{ marginTop: 1 }}
            variant="outlined"
            fullWidth
            type="submit"
          >
            Salvar
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default FormularioRestaurante;
