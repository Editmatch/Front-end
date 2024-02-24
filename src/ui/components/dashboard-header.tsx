
import styled from 'styled-components';
import logo from '../images/logo.png';
import { Link } from 'react-router-dom';
function DashboardHeader() {
    return (
        <div className="row bg-dark p-3">
            <ul className="nav justify-content-center text-white">
                <li className="nav-item">
                    <a className="nav-link text-white" href="#">Página Inicial</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link text-white" href="#">Projetos</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link text-white" href="#">Freelancers</a>
                </li>   
                <li className="nav-item">
                    <a className="nav-link text-white" href="#">Perfil</a>
                </li>
            </ul>
        </div>

    )
}

export default DashboardHeader;