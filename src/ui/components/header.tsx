
import styled from 'styled-components';
import logo from '../images/logo.png';
import { Link } from 'react-router-dom';
function Header() {

    const Header = styled.header`
        background-color: #fffff;
        min-height: 60px;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-start;
        color: white;
        padding: 0 20px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    `;

    const Buttons = styled.button`
        color: white;
        border: none;
        padding: 10px 20px;
        border-radius: 3px;
        margin-left: 10px;
        cursor: pointer;
    `;

    return (
        <Header>
            <div className="container">
                <div className="row mt-3">

                    <div className="col-2 col-md-2 ">
                        <img src={logo} alt="Logo" />
                    </div>

                    <div className="col-12 col-md-3">
                        <div className="input-group mb-3 mt-1">
                            <div className="input-group-prepend">
                                <span className="input-group-text bg-dark text-white" id="basic-addon1">Freelancer</span>
                            </div>
                            <input type="text" className="form-control " placeholder="Buscar freelancer" aria-label="Buscar freelancer" aria-describedby="basic-addon1" />
                        </div>
                    </div>

                    <div className="col-6 col-md-6 text-end">
                        <div className="">
                            <Link to="/login" className="btn text-gray">Login</Link>
                            <Link to="/profile-selection" className="btn text-gray">Cadastrar</Link>
                            <Link to="/profile-selection" className="btn btn-dark">Publicar projeto</Link>
                        </div>
                    </div>
                </div>
            </div>
        </Header >
    )
}

export default Header;