import React, { useState, useEffect } from "react";
import axios from "axios";
import { useEnvironment } from "../../../data/contexts/enviromentContext";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { Container, Button, Modal, Form, Spinner } from "react-bootstrap";
import styled from "styled-components";
import Header from "../../../ui/components/header";
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

function PedidoEditor() {
  const { apiUrl } = useEnvironment();
  const { id } = useParams();
  const editorId = sessionStorage.getItem("userId");
  const token = sessionStorage.getItem("authToken");
  const [orderData, setOrderData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [videoFile, setVideoFile] = useState<File | null>(null); // Estado para armazenar o arquivo de vídeo selecionado
  const [videoIds, setVideosIds] = useState<string[]>([]);
  const [videoTitle, setVideoTitle] = useState("");
  const [videoEditado, setVideoEditado] = useState("");
  const [loading, setLoading] = useState(false);

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
          setOrderData(response.data);
          console.log(response.data);
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

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleFileUpload = async (selectedFile: File) => {
    try {
      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("title", orderData.title);

      setLoading(true); // Ativando o loading antes de iniciar o upload

      const response = await axios.post(apiUrl + "/s3/storage", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${sessionStorage.getItem("authToken")}`,
        },
      });
      console.log("Link:", response.data);
      setVideoEditado(response.data);
    } catch (error) {
      console.error(error);
      setError("Erro ao realizar upload do arquivo.");
      throw error;
    } finally {
      setLoading(false); // Desativando o loading após a conclusão do upload
    }
  };

  const handleSaveEditedVideo = async () => {
    try {
      await axios.patch(`${apiUrl}/orders/${id}/finish?videoEditado=${videoEditado}`, null, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("authToken")}`,
        },
      });
  
      setShowModal(false);
  
      alert("Vídeo finalizado com sucesso!");
      navigate("/videos");
    } catch (error) {
      console.error("Erro ao salvar novo link:", error);
      alert(
        "Ocorreu um erro ao salvar o novo link. Por favor, tente novamente mais tarde."
      );
    }
  };
  

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  if (error) {
    return <div>Ocorreu um erro: {error}</div>;
  }

  return (
    <>
      {/* <Header /> */}
      <DashboardHeader />
      <Container>
        <div className="row">
          <div className="text-center col-md-12 mt-5">
            <h1>Pedido</h1>
          </div>
        </div>
        <div className="row">
          <StyledCard className="card mt-5">
            {orderData && (
              <>
                <div className="row">
                  <div className="col-md-6">
                    <OrderDetail>
                      <b>Nome do cliente:</b> {orderData.nome}
                    </OrderDetail>
                    <OrderDetail>
                      <b>Título:</b> {orderData.title}
                    </OrderDetail>
                    <OrderDetail>
                      <b>Descrição:</b> {orderData.desc}
                    </OrderDetail>
                    <OrderDetail>
                      <b>Skills:</b> {orderData.skills}
                    </OrderDetail>
                    <OrderDetail>
                      <b>ID do Pedido:</b> {orderData.orderId}
                    </OrderDetail>
                    <OrderDetail>
                      <b>Download:</b>{" "}
                      <a
                        href={orderData.link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Clique aqui
                      </a>
                    </OrderDetail>
                  </div>
                  <div className="col-md-6 ">
                    <video controls width="640" height="360">
                      <source src={orderData.link} type="video/mp4" />
                      Seu navegador não suporta o elemento de vídeo.
                    </video>
                  </div>
                </div>
              </>
            )}
            <div className="col-md-12 d-flex justify-content-end mt-3">
              <div className="col-md-12 d-flex justify-content-end mb-2">
                <Button variant="primary" onClick={handleOpenModal}>
                  Marcar como finalizdo
                </Button>
              </div>
            </div>
          </StyledCard>
        </div>
      </Container>
      {/* Modal */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Atualizar Link do Vídeo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSaveEditedVideo}>
            {" "}
            {/* Envolve o botão em um formulário */}
            <Form.Group controlId="formVideoLink">
              <Form.Label>Insira o arquivo do vídeo Editado</Form.Label>
              <Form.Control
                type="file"
                onChange={(event) => {
                  const files = (event.target as HTMLInputElement).files;
                  if (files && files.length > 0) {
                    setVideoFile(files[0]);
                    handleFileUpload(files[0]);
                  } else {
                    setVideoFile(null);
                  }
                }}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancelar
          </Button>
          {loading ? (
            <Button variant="primary" disabled>
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              />
              Salvando...
            </Button>
          ) : (
            <Button variant="primary" onClick={handleSaveEditedVideo} type="submit">
              Concluir
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default PedidoEditor;
