import { useEffect, useState } from "react";
import IRestaurante from "../../../interfaces/IRestaurante";
import http from "../../../http";
import { AxiosRequestConfig } from "axios";
import { Link as RouterLink } from "react-router-dom";

import {
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Table,
  Button,
} from "@mui/material";

const AdministracaoRestaurantes = () => {
  const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([]);

  const excluir = (restauranteASerExcluido: IRestaurante) => {
    http.delete(`restaurantes/${restauranteASerExcluido.id}/`).then(() => {
      const listaRestaurantes = restaurantes.filter(
        (restaurante) => restaurante.id !== restauranteASerExcluido.id
      );
      setRestaurantes([...listaRestaurantes]);
    });
  };

  const carregarDados = (url: string, opcoes: AxiosRequestConfig = {}) => {
    http
      .get<IRestaurante[]>("restaurantes/")
      .then((resposta) => setRestaurantes(resposta.data));
  };

  useEffect(() => {
    // obter restaurantes
    carregarDados("http://localhost:8000/api/v1/restaurantes/");
  }, []);

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nome do Restaurante</TableCell>
              <TableCell>Editar</TableCell>
              <TableCell>Excluir</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {restaurantes.map((restaurante) => (
              <TableRow key={restaurante.id}>
                <TableCell>{restaurante.nome}</TableCell>
                <TableCell>
                  [{" "}
                  <RouterLink to={`/admin/restaurantes/${restaurante.id}`}>
                    Editar
                  </RouterLink>{" "}
                  ]
                </TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => excluir(restaurante)}
                  >
                    Excluir
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default AdministracaoRestaurantes;
