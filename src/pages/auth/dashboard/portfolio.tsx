import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEnvironment } from "../../../data/contexts/enviromentContext";
import { Button, Modal } from "react-bootstrap";
import DashboardHeader from "../../../ui/components/dashboard-header";
import Header from "../../../ui/components/header";
import Avaliacao from "../../../ui/components/stars";

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
    const [perfil, setPerfil] = useState<Perfil>({
        editorId: 0,
        nomeEditor: "",
        photoProfileData: null,
        title: null,
        valor: 0,
        linkYtVideoId: [],
    });
    const [loadingVideos, setLoadingVideos] = useState(true);

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
        setLoadingVideos(true);
        axios
            .get<Perfil>(`${apiUrl}/portfolios/${id}`, {
                headers: {
                    Authorization: "Bearer " + sessionStorage.getItem("authToken"),
                    "Content-Type": "application/json",
                },
            })
            .then((response) => {
                console.log(response.data);
                setPerfil(response.data);
                if (response.data.linkYtVideoId) {
                    const videoIds = response.data.linkYtVideoId
                        .filter((link: string | null): link is string => link !== null)
                        .map((link: string) => {
                            const match = link.match(
                                /(?:\?v=|\/embed\/|\.be\/)([\w-]{11})/
                            );
                            return match ? match[1] : null;
                        })
                        .filter((videoId: string | null): videoId is string => videoId !== null);

                    setVideos(videoIds);
                }
                setLoadingVideos(false);
            })
            .catch((error) => {
                console.error("Erro ao carregar o portfolio:", error);
                setLoadingVideos(false);
                navigate("/editores");
            });
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
`

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
        }`;

    const Overflow = styled.div`
            height: 400px;
            overflow-y: scroll;
    `;

    return (
        <div>
            {/* <Header /> */}
            <DashboardHeader />
            <div className="container">
                <CardStyled className="card mt-3">
                    <div className="row mt-3 p-4">

                        <div className="col-md-3">
                            <Imagem src="https://simg.nicepng.com/png/small/202-2022264_usuario-annimo-usuario-annimo-user-icon-png-transparent.png" alt="" />
                        </div>

                        <div className="col-md-4 mt-5 m-3 ">
                            <h5 className="">{perfil?.nomeEditor}</h5>
                            <span>Editor</span>
                            <div className="row mt-5">
                                <Avaliacao />
                            </div>
                            <div className="row mt-5">
                                <span>
                                    Sou o melhor editor do Brasil, com mais de 10 anos de experiência. Trabalhei com grandes empresas e tenho um portfólio incrível. Contrate-me e veja a diferença!
                                </span>
                            </div>
                        </div>

                        <div className="col-md-4 mt-4 align-end d-flex justify-content-end h-25">
                            {/* <LinkStyled to="/chat"><b>Enviar mensagem</b></LinkStyled> */}
                            {sessionStorage.getItem('isEditor') === 'false'
                                ?
                                <LinkStyled to={`/pagamento/${id}/${perfil?.valor ?? ''}`}><b>Contratar</b></LinkStyled>
                                :
                                <LinkStyled to="/perfil" className="btn btn-dark text-white ">Editar</LinkStyled>
                            }
                        </div>

                    </div>

                    <div className="row mt-5">
                        <div className="h3">
                            <h3>Videos editados</h3>
                        </div>
                        {sessionStorage.getItem("isEditor") === "true" && (
                            <div className="col-md-12 text-end">
                                <button onClick={() => setShowModal(true)} className="btn btn-primary mb-5 me-2">
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
                                            <h5 className="card-title text-white">Nenhum projeto encontrado</h5>
                                            <p className="card-text text-white">Não há projetos disponíveis</p>
                                        </div>
                                    </div>
                                </div>
                            )
                        )}
                        <Overflow>
                            <div className="row">
                                {videos.map((videoId) => (
                                    <div className="col-md-3 mt-4" key={videoId}>
                                        <AnimatedCard className="card">
                                            <img src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`} width={300} />
                                            <div className="card-body text-center">
                                                <a href={`https://www.youtube.com/watch?v=${videoId}`} className="nav-link" >Assistir</a>
                                            </div>
                                        </AnimatedCard>
                                    </div>
                                ))}
                            </div>
                        </Overflow>
                    </div>
                </CardStyled>
                <Modal show={showModal} onHide={() => setShowModal(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Adicionar Vídeo</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="mb-3">
                            <label htmlFor="videoUrl" className="form-label">URL do Vídeo:</label>
                            <input type="text" className="form-control" id="videoUrl" value={newVideoUrl} onChange={(e) => setNewVideoUrl(e.target.value)} />
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowModal(false)}>Cancelar</Button>
                        <Button variant="primary" onClick={handleAddVideo}>Adicionar</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </div >
    )
}
