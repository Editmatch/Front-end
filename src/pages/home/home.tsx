import styled from 'styled-components';
import Header from '../../ui/components/header';
import Footer from '../../ui/components/footer';
import { Link } from 'react-router-dom';
import backgroundImage from '../../ui/images/wallpaper.jpg'
import logo from '../../../public/logo.png'
import { Helmet } from 'react-helmet';


const Fundo = styled.div`
  position: relative;
  min-height: 500px;
  background-repeat: no-repeat;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-size: cover;
    background-image: url(${backgroundImage});
    filter: blur(5px);
    z-index: -1;
  }`

const Fundo2 = styled.div`
  background-color: #F2F1F1;
  min-height: 100px;
  min-width: 100px;
`;

const Linha = styled.hr`
    border: 1px solid #ccc;
    width: 50%;
    margin: 0 auto; 
    margin-top: 20px;
    margin-bottom: 20px;
`;

const CenterDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const FundoContent = styled.div`
  position: relative;
  z-index: 1; /* Colocando o conteúdo acima do pseudo-elemento */
`;

function Home() {
  return (
    <div>
     
      <Header />

      <Fundo>
        <FundoContent>
          <div className="row mt-5">
            <div className="col-12 col-md-12 mt-5">
              <h2 className="text-center text-white mt-5">Encontre os melhores profissionais para edição de vídeos.</h2>
            </div>
            <Linha />
          </div>

          <CenterDiv className="mt-5">
            <Link to="/selecionar-perfil" className='bg-white btn me-5'>Publicar projeto</Link>
            <Link to="/selecionar-perfil" className='btn btn-outline-light'>Sou Freelancer</Link>
          </CenterDiv>
        </FundoContent>
      </Fundo>

      <div className="row">
        <Fundo2>
          <div className="col-12 col-md-12 mt-5">
            <h3 className="text-center mb-5">Ainda não possui cadastro? <b><Link to="/selecionar-perfil">Cadastre-se aqui!</Link></b></h3>
          </div>
        </Fundo2>
      </div>
      <div className="row text-center mt-5">
        <h3>Como funciona?</h3>
      </div>

      <div className="row text-center mt-3">
        <h5 className="mb-5">Anuncie seu trabalho facilmente, contrate freelancers e pague com segurança</h5>
        <CenterDiv className='mt-4'>

          <div className="col-4 col-md-3 m-4">
            <div>
              <img src="" alt="icone de projeto" />
            </div>
            <h4>Publique um projeto</h4>
            <p className='text-justify'>Publique a sua vaga para milhares de profissionais, você irá receber propostas de freelancers talentosos em poucos minutos.</p>
          </div>

          <div className="col-4 col-md-3 m-4 mt-5 ">
            <div>
              <img src="" alt="icone de projeto" />
            </div>
            <h4>Contrate um editor</h4>
            <p className='text-justify'>Reveja o historico de trabalho, feedback de clientes e portfolio para limitar os cadisdatos. Então faça uma entrevista pelo chat e escolha o melhor</p>
          </div>

          <div className="col-4 col-md-3 m-4">
            <div>
              <img src="" alt="icone de projeto" />
            </div>
            <h4>Pague com segurança</h4>
            <p className='text-justify'>Com o pagamento seguro do 99Freelas, o pagamento será repassado para o freelancer somente quando o projeto estiver concluido.</p>
          </div>

        </CenterDiv>
      </div>

      <Fundo2>
        <div className="row text-center">
          <div className="col-md-12 mt-5">
            <h3><b>Está pronto para encontrar o freelancer ideal para o seu projeto?</b></h3>
          </div>
        </div>
        <div className="row mt-2">
          <CenterDiv>
            <Link to="/selecionar-perfil" className="btn btn-dark mb-5 mt-5">Anuncie um projeto</Link>
          </CenterDiv>
        </div>
      </Fundo2>
      <Footer />
    </div>
  );
}

export default Home;