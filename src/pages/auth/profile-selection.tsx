import { Link } from "react-router-dom";
import styled from "styled-components";


const LinkStyled = styled(Link)`
    text-decoration: none;
    color: #000;
    &:hover {
        transform: scale(1.5);
    }
`;


function ProfileSelection() {
    return (
        <>
            <div className="container">

                <div className="row mb-5">
                    <div className="col-md-12 text-center">
                        <h4 className="mt-5">Vamos te ajudar a encontrar a melhor opção para a sua necessidade</h4>
                    </div>

                    <div className="row">

                        <div className="col-md-6">
                            <LinkStyled to="/">
                                <div className='card mt-5 p-5 text-center m-5' id="produtor">
                                    <h5 className="card-title">Sou produtor de videos</h5>
                                    <p className="card-text">Encontrar um editor!</p>
                                </div>
                            </LinkStyled>
                        </div>

                        <div className="col-md-6">
                            <div className='card mt-5 p-5 text-center m-5'id="editor">
                                <h5 className="card-title">Sou Editor de Videos</h5>
                                <p className="card-text">Encontrar um projeto!</p>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </>
    )
}

export default ProfileSelection;