import React from 'react';
import DashboardHeader from "../../ui/components/dashboard-header";
import Header from "../../ui/components/header";
import styled from 'styled-components';
import 'bootstrap/dist/css/bootstrap.min.css';
import VideoCard from '../../ui/components/video-card';

const CarouselContainer = styled.div`
    display: flex;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
`;

const VideoWrapper = styled.div`
    flex: 0 0 auto;
    margin-right: 10px;
`;

function Projetos() {
    const mockVideos = [
        {
            id: 1,
            title: "Video 1",
            price: "R$ 1.00",
            imageUrl: "https://via.placeholder.com/10"
        },
        {
            id: 2,
            title: "Video 2",
            price: "R$ 2.00",
            imageUrl: "https://via.placeholder.com/10"
        },
        {
            id: 3,
            title: "Video 3",
            price: "R$ 3.00",
            imageUrl: "https://via.placeholder.com/10"
        },
        {
            id: 4,
            title: "Video 4",
            price: "R$ 4.00",
            imageUrl: "https://via.placeholder.com/10"
        },
        {
            id: 5,
            title: "Video 5",
            price: "R$ 5.00",
            imageUrl: "https://via.placeholder.com/10"
        },
        {
            id: 6,
            title: "Video 6",
            price: "R$ 6.00",
            imageUrl: "https://via.placeholder.com/10"
        },
        {
            id: 7,
            title: "Video 7",
            price: "R$ 7.00",
            imageUrl: "https://via.placeholder.com/10"
        },
        {
            id: 7,
            title: "Video 7",
            price: "R$ 7.00",
            imageUrl: "https://via.placeholder.com/10"
        },
        {
            id: 7,
            title: "Video 7",
            price: "R$ 7.00",
            imageUrl: "https://via.placeholder.com/10"
        },
        {
            id: 7,
            title: "Video 7",
            price: "R$ 7.00",
            imageUrl: "https://via.placeholder.com/10"
        },
        {
            id: 7,
            title: "Video 7",
            price: "R$ 7.00",
            imageUrl: "https://via.placeholder.com/10"
        }
    ];

    return (
        <div>
            <Header />
            <DashboardHeader />
            <div className="container">
                <div className="row mt-4 m-5 text-center">
                    <div className="col-md-3">

                        <p>Projetos publicados</p>
                        <div className="card text-center justify-center p-4">
                            <p className="mt-3">10</p>
                        </div>
                    </div>

                    <div className="col-12 col-md-3">
                        <p>Em andamento</p>
                        <div className="card text-center justify-center p-4">
                            <p className="mt-3">10</p>
                        </div>
                    </div>

                    <div className="col-12 col-md-3">
                        <p>Concluidos</p>
                        <div className="card text-center bg-dark justify-center p-4">
                            <p className="mt-3 text-white">10</p>
                        </div>
                    </div>

                    <div className="col-12 col-md-3">
                        <p>Cancelados</p>
                        <div className="card text-center bg-dark justify-center p-4">
                            <p className="mt-3 text-white">10</p>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <p>Projetos de Vídeos</p>
                    <div className="col-md-12">
                        <CarouselContainer>
                            {mockVideos.map((video) => (
                                <VideoWrapper key={video.id}>
                                    <VideoCard title={video.title} price={video.price} imageUrl={video.imageUrl} />
                                </VideoWrapper>
                            ))}
                        </CarouselContainer>
                    </div>
                </div>

                <div className="row">
                    <p>Em andamento</p>
                    <CarouselContainer>
                        {mockVideos.map((video) => (
                            <VideoWrapper key={video.id}>
                                <VideoCard title={video.title} price={video.price} imageUrl={video.imageUrl} />
                            </VideoWrapper>
                        ))}
                    </CarouselContainer>
                </div>

                <div className="row">
                    <p>Concluidos</p>
                    <CarouselContainer>
                        {mockVideos.map((video) => (
                            <VideoWrapper key={video.id}>
                                <VideoCard title={video.title} price={video.price} imageUrl={video.imageUrl} />
                            </VideoWrapper>
                        ))}
                    </CarouselContainer>
                </div>
            </div>
        </div >

    );
}

export default Projetos;
