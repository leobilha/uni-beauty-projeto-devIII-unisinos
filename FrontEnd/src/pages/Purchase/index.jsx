import React, { useState, useEffect } from "react";
import { createTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { Box, Button } from '@mui/material';
import axios from "axios";
import Card from "../../components/Card";
import "./styles.scss";
import Loader from "../../components/Loader";

const defaultTheme = createTheme();

export default function SignInSide() {
  const navigate = useNavigate();
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [busca, setBusca] = useState("");
  const [produtosFiltrados, setProdutosFiltrados] = useState([]);

  useEffect(() => {
    setLoading(true);
    axios
      .get("https://www.obrazul.com.br/api/recruitment/products/")
      .then((res) => {
        setProdutos(res.data.products);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userType');
    navigate('/login');
  };

  useEffect(() => {
    setProdutosFiltrados(
      produtos.filter((produto) =>
        produto.name.toLowerCase().includes(busca.toLowerCase())
      )
    );
  }, [busca, produtos]);

  if (loading) {
    return <Loader />
  }

  return (
    <>
      <div className="central">
        <div className="content">
          <Box sx={{ mt: 4, ml: 149 }}>
            <Button variant="contained" color="secondary" onClick={handleLogout}>
              Sair
            </Button>
          </Box>
          <div className="filter">
            <input
              className="inputPurchase"
              type="text"
              placeholder="Pesquisa..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
            />
          </div>
          <div className="container">
            {produtosFiltrados.map((item) => (
              <Card
                name={item.name}
                ean={item.ean}
                fullname={item.fullname}
                price={item.price}
                picture={item.picture}
              ></Card>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

