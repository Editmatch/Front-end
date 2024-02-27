import { Link } from "react-router-dom";
import styled from "styled-components";

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

const LinkStyled = styled(Link)`
    text-decoration: none;
    color: black;
    }`;

function ProfileSelection() {

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

                    <div className="row  mt-5">
                        <div className="col-md-6">
                            <Card>
                                <LinkStyled to="/produtor">
                                    <img src="" alt="" />
                                    <h5>Sou Produtor de Videos</h5>
                                    <p>Encontrar um editor!</p>
                                </LinkStyled>
                            </Card>
                        </div>

                        <div className="col-md-6">
                            <Card>
                                <LinkStyled to='/editor'>
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