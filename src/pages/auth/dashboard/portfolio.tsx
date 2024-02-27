import styled from "styled-components";
import DashboardHeader from "../../../ui/components/dashboard-header";
import Header from "../../../ui/components/header";

export default function Portfolio() {

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
                            <span><img src="/" alt="avaliacao" /> + de 400 projetos concluidos</span>
                        </div>
                        <div className="row mt-5">
                            <span>Melhor editor do Brasil</span>
                            <span>Melhor editor do Brasil</span>
                            <span>Melhor editor do Brasil</span>
                        </div>

                    </div>
                    <div className="col-md-3 mt-4 align-end">
                        <Button><b>Enviar mensagem</b></Button>
                    </div>
                </div>
            </div>
        </div >
    )
}