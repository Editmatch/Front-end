import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEnvironment } from "../../../data/contexts/enviromentContext";
import { Button, Card, Modal, Spinner } from "react-bootstrap";
import DashboardHeader from "../../../ui/components/dashboard-header";
import Header from "../../../ui/components/header";
import { findAncestor } from "typescript";

interface Perfil {
  editorId: number;
  nomeEditor: string;
  photoProfileData: string | null;
  title: string | null;
  valor: number;
  linkYtVideoId: string[];
}

export default function Portfolio() {
  const { apiUrl } = useEnvironment();
  const navigate = useNavigate();
  const { id } = useParams();
  const [videos, setVideos] = useState<string[]>([]); 
  const [showModal, setShowModal] = useState(false);
  const [newVideoUrl, setNewVideoUrl] = useState("");
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [perfil, setPerfil] = useState<Perfil>({
    editorId: 0,
    nomeEditor: "",
    photoProfileData: null,
    title: null,
    valor: 0,
    linkYtVideoId: [],
  });
  const [loadingVideos, setLoadingVideos] = useState(true);
  const [loadingPerfil, setLoadingPerfil] = useState(true);

  const handleFileUpload = async (selectedFile: File) => {
    try {
      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("title", title);

      setLoading(true); // Ativando o loading antes de iniciar o upload

      const response = await axios.post(apiUrl + "/s3/storage", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${sessionStorage.getItem("authToken")}`,
        },
      });
      console.log("Link:", response.data);
      setNewVideoUrl(response.data);
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      setLoading(false); // Desativando o loading após a conclusão do upload
    }
  };

  const handleAddVideo = () => {
    const payload = {
      link: newVideoUrl,
    };

    axios
      .post(`${apiUrl}/usuarios/adicionar-video/${id}`, payload)
      .then((response) => {
        console.log("Vídeo adicionado com sucesso:", response.data);
        setNewVideoUrl("");
        setShowModal(false);
        loadVideos();
      })
      .catch((error) => {
        console.error("Erro ao adicionar vídeo:", error);
      });
  };

  const loadVideos = () => {
    setLoadingPerfil(true); // Indica que o perfil está sendo carregado
    setLoadingVideos(true);
    axios
      .get<Perfil>(`${apiUrl}/portfolios/${id}`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("authToken"),
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setPerfil(response.data);
        console.log("Response", response.data);
        if (response.data.linkYtVideoId) {
          // Extrair os links sem o prefixo "link:" e formatá-los como objetos JSON
          const extractedVideos = response.data.linkYtVideoId.map((video) => {
            const videoObj = JSON.parse(video); // Converter a string JSON em objeto JavaScript
            return videoObj.link; // Extrair o link do objeto
          });
          setVideos(extractedVideos);
          console.log("Videos", extractedVideos);
        }
        setLoadingVideos(false);
      })
      .catch((error) => {
        console.error("Erro ao carregar o portfolio:", error);
        setLoadingVideos(false);
        navigate("/editores");
      });
  };
  
  

  const handleCloseModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    loadVideos();
  }, [id, navigate]);

  const Imagem = styled.img`
    border-radius: 50%;
    width: 250px;
    height: 250px;
    margin: 10px;
  `;

  const LinkStyled = styled(Link)`
    color: #000;
    text-decoration: none;
    margin: 10px;
    border-radius: 5px;
    transition: 0.3s;
    &:hover {
      color: blue;
    }
  `;

  const CardStyled = styled.div`
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    transition: 0.3s;
    border-radius: 5px;
    margin: 10px;
    padding: 10px;
  `;

  const AnimatedCard = styled.div`
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    transition: 0.3s;
    &:hover {
      transform: 1.2;
    }
  `;

  const Overflow = styled.div`
    height: 400px;
    overflow-y: scroll;
  `;

  const StyledCard = styled(Card)`
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    transition: 0.3s;
    border-radius: 5px;
  `;

  return (
    <div>
      {/* <Header /> */}
      <DashboardHeader />
      <div className="container">
        <CardStyled className="card mt-3">
          <div className="row mt-3 p-4">
            <div className="col-md-3">
              <Imagem
                src="https://simg.nicepng.com/png/small/202-2022264_usuario-annimo-usuario-annimo-user-icon-png-transparent.png"
                alt=""
              />
            </div>

            <div className="col-md-4 mt-5 m-3 ">
              <h5 className="">{perfil?.nomeEditor}</h5>
              <span>Editor</span>
              <div className="row mt-5">
                <span>
                  Sou o melhor editor do Brasil, com mais de 10 anos de
                  experiência. Trabalhei com grandes empresas e tenho um
                  portfólio incrível. Contrate-me e veja a diferença!
                </span>
              </div>
            </div>

            <div className="col-md-4 mt-4 align-end d-flex justify-content-end h-25">
              {/* <LinkStyled to="/chat"><b>Enviar mensagem</b></LinkStyled> */}
              {sessionStorage.getItem("isEditor") === "false" ? (
                <LinkStyled to={`/pagamento/${id}/${perfil?.valor ?? ""}`}>
                  <b>Contratar</b>
                </LinkStyled>
              ) : (
                <LinkStyled to="/perfil" className="btn btn-dark text-white ">
                  Editar
                </LinkStyled>
              )}
            </div>
          </div>

          <div className="row">
            <div className="col-md-6">
              <div className="h5 mt-5">
                <h5>Videos editados</h5>
              </div>
            </div>
            {sessionStorage.getItem("isEditor") === "true" && (
              <div className="col-md-12 text-end">
                <button
                  onClick={() => setShowModal(true)}
                  className="btn btn-primary mb-5 me-2"
                >
                  Adicionar vídeo
                </button>
              </div>
            )}
            {loadingVideos ? (
              <div className="text-center">Carregando vídeos...</div>
            ) : (
              videos.length === 0 && (
                <div className="col-md-12 text-center">
                  <div className="card">
                    <div className="card-body bg-danger text-center">
                      <h5 className="card-title text-white">
                        Nenhum projeto encontrado
                      </h5>
                      <p className="card-text text-white">
                        Não há projetos disponíveis
                      </p>
                    </div>
                  </div>
                </div>
              )
            )}
            <Overflow>
              <div className="row">
                {videos.map((videoUrl, index) => (
                  <div className="col-md-3 mt-4" key={index}>
                    <StyledCard>
                      <Card.Body>
                        <video controls width="100%" height="95%">
                          <source src={videoUrl} type="video/mp4" />
                          Seu navegador não suporta o elemento de vídeo.
                        </video>
                      </Card.Body>
                    </StyledCard>
                  </div>
                ))}
              </div>
            </Overflow>
          </div>
        </CardStyled>
        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Adicionar Vídeo</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="mb-3">
              <label htmlFor="">Título do video</label>
              <input
                type="text" 
                className="form-control"
                onChange={(event) => setTitle(event.target.value)}
                required
              />
              <label htmlFor="" className="mt-4">
                Arquivo
              </label>
              <input
                type="file"
                className="form-control"
                onChange={(event) => {
                  const files = (event.target as HTMLInputElement).files;
                  if (files && files.length > 0) {
                    setVideoFile(files[0]);
                    handleFileUpload(files[0]);
                  } else {
                    setVideoFile(null);
                  }
                }}
                required
              />
            </div>
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
              <Button variant="primary" onClick={handleAddVideo} type="submit">
                Concluir
              </Button>
            )}
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}
