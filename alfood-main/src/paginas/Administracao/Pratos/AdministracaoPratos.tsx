import { useEffect, useState } from "react";
import IPrato from "../../../interfaces/IPrato";
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

const AdministracaoPratos = () => {
  const [pratos, setPratos] = useState<IPrato[]>([]);

  const excluir = (pratoASerExcluido: IPrato) => {
    http.delete(`pratos/${pratoASerExcluido.id}/`).then(() => {
      const listaPratos = pratos.filter(
        (pratos) => pratos.id !== pratoASerExcluido.id
      );
      setPratos([...listaPratos]);
    });
  };

  const carregarDados = (url: string, opcoes: AxiosRequestConfig = {}) => {
    http.get<IPrato[]>("pratos/").then((resposta) => setPratos(resposta.data));
  };

  useEffect(() => {
    // obter pratos
    carregarDados("http://localhost:8000/api/v1/pratos/");
  }, []);

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nome do Prato</TableCell>
              <TableCell>TAG</TableCell>
              <TableCell>Imagem</TableCell>
              <TableCell>Editar</TableCell>
              <TableCell>Excluir</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pratos.map((prato) => (
              <TableRow key={prato.id}>
                <TableCell>{prato.nome}</TableCell>
                <TableCell>{prato.tag}</TableCell>
                <TableCell>
                  <a href={prato.imagem} target="_blank" rel="noreferrer">
                    Ver imagem
                  </a>
                </TableCell>
                <TableCell>
                  [{" "}
                  <RouterLink to={`/admin/pratos/${prato.id}`}>
                    Editar
                  </RouterLink>{" "}
                  ]
                </TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => excluir(prato)}
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

export default AdministracaoPratos;
