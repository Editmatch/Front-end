import React, { useState, useEffect } from "react";
import axios from "axios";
import { useEnvironment } from "../../../data/contexts/enviromentContext";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import styled from "styled-components";
import DashboardHeader from "../../../ui/components/dashboard-header";

const OrderDetail = styled.div`
  margin-bottom: 10px;
  font-size: 1.2em;
`;

const StyledCard = styled.div`
  border: 1px solid #ccc;
  border-radius: 12px;
  padding: 25px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: 0.3s;
  &:hover {
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }
`;

function PedidoCliente() {
  const { apiUrl } = useEnvironment();
  const { id } = useParams();
  const editorId = sessionStorage.getItem("userId");
  const token = sessionStorage.getItem("authToken");
  const [orderData, setOrderData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editedOrderData, setEditedOrderData] = useState<any>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        if (token) {
          const config = {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          };
          const response = await axios.get(`${apiUrl}/orders/${id}`, config);
          console.log(response.data);
          setOrderData(response.data);
          setEditedOrderData(response.data);
        } else {
          throw new Error(
            "Token não encontrado na sessionStorage. Faça o login para obter um token válido."
          );
        }
      } catch (error) {
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [apiUrl, id, token]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedOrderData({
      ...editedOrderData,
      [name]: value,
    });
  };

  const handleUpdateOrder = async () => {
    try {
      if (!token) {
        alert("Token de autenticação não encontrado. Por favor, faça o login.");
        return;
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.put(`${apiUrl}/orders/${id}`, editedOrderData, config);

      if (response.status >= 200 && response.status < 300) {
        alert("Pedido atualizado com sucesso!");
      } else {
        alert("Erro ao atualizar pedido. Por favor, tente novamente mais tarde.");
      }
    } catch (error) {
      alert("Erro ao atualizar pedido. Por favor, tente novamente mais tarde.");
    }
  };

  const handleDeleteOrder = async () => {
    try {
      if (!token) {
        alert("Token de autenticação não encontrado. Por favor, faça o login.");
        return;
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.delete(`${apiUrl}/orders/${id}`, config);

      if (response.status >= 200 && response.status < 300) {
        alert("Pedido excluído com sucesso!");
        navigate("/projetos"); // Redirecionar para a página inicial ou outra página apropriada
      } else {
        alert("Erro ao excluir pedido. Por favor, tente novamente mais tarde.");
      }
    } catch (error) {
      alert("Erro ao excluir pedido. Por favor, tente novamente mais tarde.");
    }
  };

  return (
    <>
      <DashboardHeader />
      <Container>
        <div className="row">
          <div className="text-center col-md-12 mt-2">
            <h1>Pedido</h1>
          </div>
        </div>
        <div className="row">
          <StyledCard className="card">
            {editedOrderData && (
              <>
                <div className="row">
                  <div className="col-md-6">
                    <OrderDetail>
                      <b>Nome do cliente:</b>{" "}
                      <input
                        type="text"
                        name="nome"
                        className="form-control"
                        value={editedOrderData.nome}
                        onChange={handleInputChange}
                      />
                    </OrderDetail>
                    <OrderDetail className="mt-3">
                      <b>Título:</b>{" "}
                      <input
                        type="text"
                        name="title"
                        className="form-control"
                        value={editedOrderData.title}
                        onChange={handleInputChange}
                      />
                    </OrderDetail>
                    <OrderDetail className="mt-3">
                      <b>Descrição:</b>{" "}
                      <input
                        type="text"
                        name="desc"
                        className="form-control"
                        value={editedOrderData.desc}
                        onChange={handleInputChange}
                      />
                    </OrderDetail>
                    <OrderDetail className="mt-3">
                      <b>Skills:</b>{" "}
                      <input
                        type="text"
                        name="skills"
                        className="form-control"
                        value={editedOrderData.skills}
                        onChange={handleInputChange}
                      />
                    </OrderDetail>
                    <OrderDetail className="mt-3">
                      <b>Download:</b>{" "}
                      <a
                        href={editedOrderData.link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Clique aqui
                      </a>
                    </OrderDetail>
                  </div>
                  <div className="col-md-6 ">
                    <video controls width="640" height="360">
                      <source src={editedOrderData.link} type="video/mp4" />
                      Seu navegador não suporta o elemento de vídeo.
                    </video>
                  </div>
                </div>
            <div className="row">
              <div className="col-md-12 mt-3">
                <button
                  className="btn btn-primary mr-3"
                  onClick={handleUpdateOrder}
                >
                  Salvar
                </button>
                <button
                  className="btn btn-danger ml-2"
                  onClick={handleDeleteOrder}
                >
                  Deletar
                </button>
              </div>
            </div>
              </>
            )}
          </StyledCard>
        </div>
      </Container>
    </>
  );
}

export default PedidoCliente;