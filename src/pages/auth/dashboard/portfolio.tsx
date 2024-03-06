import styled from "styled-components";
import DashboardHeader from "../../../ui/components/dashboard-header";
import Header from "../../../ui/components/header";
import Avaliacao from "../../../ui/components/stars";
import { useEffect, useState } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import axios from "axios";

export default function Portfolio() {

    const navigate = useNavigate();

    const [perfil, setPerfil] = useState();

    const [videos, setVideos] = useState([])

    const { id } = useParams();

    // useEffect(() => {
    //     axios
    //         .get(`http://localhost:8080/portfolios/${id}`, {
    //             headers: {
    //                 'Authorization': 'Bearer ' + sessionStorage.getItem('authToken'),
    //                 'Content-Type': 'application/json',
    //             },
    //         })
    //         .then((response:any) => {
    //             console.log(response.data);
    //             setPerfil(response.data);
    //             setVideos(response.data.videos);
    //         })
    //         .catch((error) => {
    //             console.error('Erro ao carregar o portfolio:', error);
    //             navigate('/editores');
    //         });
    // }, [id, Navigate]); 



    const Imagem = styled.img`
        border-radius: 50%;
        width: 250px;
        height: 250px;
        margin: 10px;
        `;

    const Button = styled.button`
        background-color: #000;
        color: #fff;
        border: none;
        padding: 12px 5px;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        font-size: 12px;
        margin: 4px 2px;
        cursor: pointer;
        border-radius: 8px;
        transition-duration: 0.4s;
        `;

    const Centralizar = styled.div`
        display: flex;
        justify-content: center;
        align-items: center;
        `;



    return (
        <div>
            <Header />
            <DashboardHeader />
            <div className="container">
                <div className="row mt-3 p-4">
                    <div className="col-md-3">
                        <Imagem src="https://via.placeholder.com/250" alt="" />
                    </div>
                    <div className="col-md-4 mt-5  m-3 ">
                        <h5 className="">Fulano de tal</h5>
                        <text>Editor</text>
                        <div className="row mt-5">
                            <Avaliacao />
                        </div>
                        <div className="row mt-5">
                            <span>Melhor editor do Brasil</span>
                            <span>Melhor editor do Brasil</span>
                            <span>Melhor editor do Brasil</span>
                        </div>

                    </div>
                    <div className="col-md-3 mt-4 align-end">
                        <Link to="/chat"><b>Enviar mensagem</b></Link>
                        <Link to="/pagamento"><b>Contratar</b></Link>
                    </div>
                </div>

                <div className="row mt-5">
                    <div className="h3">
                        <h3>Videos editados</h3>
                    </div>

                    {sessionStorage.getItem('isEditor') === 'true' &&
                        <div className="col-md-12 text-end">
                            <button className="btn btn-dark">Adicionar videos</button>
                        </div>
                    }


                    <div className="row">
                        <div className="col-md-3">
                            <div className="card">
                                {/* TODO logica para exibir todos os videos utilizando o "const [videos,setVideos]" */}
                                <Card style={{ width: '18rem' }}>
                                    <Card.Img variant="top" src="holder.js/100px180?text=Image cap" />
                                    <Card.Body>
                                        <Card.Title>Video 1</Card.Title>
                                        <Card.Text>
                                            Video editado com sony vegas pro 18
                                        </Card.Text>
                                    </Card.Body>
                                    <ListGroup className="list-group-flush">
                                        <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
                                    </ListGroup>
                                    <Card.Body className="text-center">
                                        <Card.Link href="#">Fazer download</Card.Link>
                                    </Card.Body>
                                </Card>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}