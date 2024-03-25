import { useNavigate } from "react-router-dom";
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
    box-shadow: 0 4px 8px 1px rgba(0, 0, 0, 0.2);
    &:hover {
        transform: scale(1.03);
    }`;

const LinkStyled = styled.div`
    text-decoration: none;
    color: black;
    }`;

function ProfileSelection() {
    const navigate = useNavigate();
    const {apiUrl} = useEnvironment();


    const handleClick = (type:any) => {
        if (type === 'editor') {
            navigate('/registro', { state: { rota: apiUrl + '/editores' } });
        } else {
            navigate('/registro', { state: { rota: apiUrl + '/clientes' } });
        }
    };

    return (
        <>
            <div className="row">
                <LinkStyled className="m-2">Voltar</LinkStyled>
            </div>
            <div className="container">
                <div className="row mb-5">
                    <div className="col-md-12 text-center">
                        <h4 className="mt-5">Vamos te ajudar a encontrar a melhor opção para a sua necessidade</h4>
                    </div>

                    <div className="row  mt-5">
                        <div className="col-md-6">
                            <Card>
                                <LinkStyled onClick={() => handleClick('produtor')}>
                                    <img src="" alt="" />
                                    <h5>Sou Produtor de Videos</h5>
                                    <p>Encontrar um editor!</p>
                                </LinkStyled>
                            </Card>
                        </div>

                        <div className="col-md-6">
                            <Card>
                                <LinkStyled onClick={() => handleClick('editor')}>
                                    <img src="" alt="" />
                                    <h5>Sou Editor de Videos</h5>
                                    <p >Encontrar um projeto!</p>
                                </LinkStyled>
                            </Card>
                        </div>

                    </div>
                </div>

            </div>
        </>
    )
}

export default ProfileSelection;