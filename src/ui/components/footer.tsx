import styled from 'styled-components';


const Fundo2 = styled.div`
  background-color: #F2F1F1;
  min-height: 100px;
  min-width: 100px;
`;

function Footer() {
    return (
        <Fundo2>
                <footer className="row row-cols-1 row-cols-sm-2 row-cols-md-5 py-5 my-5 border-top">
                    <div className="col"></div>
                    <div className="col mb-3 mt-1">
                        <h5>EditMatch</h5>
                        <ul className="nav flex-column">
                            <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-muted">Como funciona</a></li>
                            <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-muted">Central de ajuda</a></li>
                            <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-muted">Politica de privacidade</a></li>
                        </ul>
                    </div>

                    <div className="col mb-3">
                        <h5>Para produtores</h5>
                        <ul className="nav flex-column">
                            <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-muted">Publique seu projeto</a></li>
                            <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-muted">Lista de freelancers</a></li>
                            <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-muted">Como funciona</a></li>
                        </ul>
                    </div>

                    <div className="col mb-3">
                        <h5>Para Freelancers</h5>
                        <ul className="nav flex-column">
                            <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-muted">Cadastro de freelancers</a></li>
                            <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-muted">Lista de projetos</a></li>
                            <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-muted">Como funciona</a></li>

                        </ul>
                    </div>

                    <div className="col">
                        <h5>Siga-nos</h5>
                        <ul className="nav flex-column">
                            <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-muted">Facebook</a></li>
                            <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-muted">Instagram</a></li>
                            <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-muted">Linkedin</a></li>
                        </ul>
                    </div>

                </footer>
        </Fundo2>
    );
}
export default Footer;
