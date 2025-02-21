import { useEffect, useState } from "react";
import http from "../../../http";
import ITag from "../../../interfaces/ITag";
import IRestaurante from "../../../interfaces/IRestaurante";
import { useParams } from "react-router-dom";
import IPrato from "../../../interfaces/IPrato";

import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";

const FormularioPrato = () => {
  const [nomePrato, setNomePrato] = useState("");
  const [descricao, setDescricao] = useState("");

  const [tags, setTags] = useState<ITag[]>([]);
  const [tag, setTag] = useState("");

  const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([]);
  const [restaurante, setRestaurante] = useState<string>("");

  const [imagem, setImagem] = useState<File | null>(null);

  const parametros = useParams();

  useEffect(() => {
    http
      .get<{ tags: ITag[] }>("tags/")
      .then((resposta) => setTags(resposta.data.tags));
    http
      .get<IRestaurante[]>("restaurantes/")
      .then((resposta) => setRestaurantes(resposta.data));
  }, []);

  const selecionarArquivo = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files?.length) {
      setImagem(e.target.files[0]);
    } else {
      setImagem(null);
    }
  };

  useEffect(() => {
    if (parametros.id) {
      http.get<IPrato>(`pratos/${parametros.id}/`).then((resposta) => {
        setNomePrato(resposta.data.nome);
        setDescricao(resposta.data.descricao);
        setTag(resposta.data.tag);
        setRestaurante(String(resposta.data.restaurante));
      });
    }
  }, [parametros]);

  const aoSubmeterForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("nome", nomePrato);
    formData.append("descricao", descricao);
    formData.append("tag", tag);
    formData.append("restaurante", restaurante);

    if (imagem) {
      formData.append("imagem", imagem);
    }

    if (parametros.id) {
      http
        .request({
          url: `pratos/${parametros.id}/`,
          method: "PUT",
          headers: {
            "Content-Type": "multipart/form-data",
          },
          data: formData,
        })
        .then(() => {
          alert("prato atualizado com sucesso");
        });
    } else {
      http
        .request({
          url: "pratos/",
          method: "POST",
          headers: {
            "Content-Type": "multipart/form-data",
          },
          data: formData,
        })
        .then(() => {
          setNomePrato("");
          setDescricao("");
          setTag("");
          setRestaurante("");
          alert("prato cadastrado com sucesso!");
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
          Formulario de pratos
        </Typography>
        <Box component="form" sx={{ width: "70%" }} onSubmit={aoSubmeterForm}>
          <TextField
            label="Nome do Prato"
            variant="standard"
            value={nomePrato}
            onChange={(e) => setNomePrato(e.target.value)}
            fullWidth
            required
            margin="dense"
          />
          <TextField
            label="Descricao do Prato"
            variant="standard"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            fullWidth
            required
            margin="dense"
          />

          <FormControl margin="dense" fullWidth required>
            <InputLabel id="select-tag"> Tag </InputLabel>
            <Select
              labelId="select-tag"
              value={tag}
              onChange={(e) => setTag(e.target.value)}
            >
              {tags.map((tag) => (
                <MenuItem key={tag.id} value={tag.value}>
                  {tag.value}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl margin="dense" fullWidth required>
            <InputLabel id="select-restaurante"> Restaurante </InputLabel>
            <Select
              labelId="select-restaurante"
              value={restaurante}
              onChange={(e) => setRestaurante(e.target.value)}
            >
              {restaurantes.map((restaurante) => (
                <MenuItem key={restaurante.id} value={String(restaurante.id)}>
                  {restaurante.nome}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <input type="file" onChange={selecionarArquivo} />

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

export default FormularioPrato;
