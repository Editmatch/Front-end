import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useEnvironment } from "../../data/contexts/enviromentContext";
import { Helmet } from "react-helmet";


const Card = styled.div`
    display: flex;
    text-align: center;
    justify-content: center;
    align-items: center;
    padding: 100px;
    transition: transform 0.2s;
    cursor: pointer;
    margin: 10px;
    border-radius: 10px;
    box-shadow: 0 4px 8px 1px rgba(0, 0, 0, 0.2);
    &:hover {
        transform: scale(1.02);
        box-shadow: 0 4px 8px 1px rgba(0,0,255, 0.25);
    }`;

const LinkStyled = styled(Link)`
    text-decoration: none;
    color: black;
    &:hover {
        color: blue;
    }`;

const DivStyled = styled.div`
    text-decoration: none;
    color: black;
    }`;

function ProfileSelection() {
    const navigate = useNavigate();
    const { apiUrl } = useEnvironment();


    const handleClick = (type: any) => {
        if (type === 'editor') {
            navigate('/registro', { state: { rota: apiUrl + '/editores' } });
        } else {
            navigate('/registro', { state: { rota: apiUrl + '/clientes' } });
        }
    };

    return (
        <>

            <div className="row">
                <LinkStyled to="/" className="m-2">Voltar</LinkStyled>
            </div>
            <div className="container">
                <div className="row mb-5">
                    <div className="col-md-12 text-center">
                        <h4 className="mt-5">Vamos te ajudar a encontrar a melhor opção para a sua necessidade</h4>
                    </div>

                    <div className="row mt-5">
                        <div className="col-md-6">
                            <Card onClick={() => handleClick('produtor')}>
                                <DivStyled >
                                    <img src="" alt="" />
                                    <h5>Sou Produtor de Videos</h5>
                                    <p>Encontrar um editor!</p>
                                </DivStyled>
                            </Card>
                        </div>

                        <div className="col-md-6">
                            <Card onClick={() => handleClick('editor')}>
                                <DivStyled >
                                    <img src="" alt="" />
                                    <h5>Sou Editor de Videos</h5>
                                    <p >Encontrar um projeto!</p>
                                </DivStyled>
                            </Card>
                        </div>

                    </div>
                </div>

            </div>

        </>
    )
}

export default ProfileSelection;