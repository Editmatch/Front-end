import styled from 'styled-components';
import Header from '../../ui/components/header';
import Footer from '../../ui/components/footer';
import { Link } from 'react-router-dom';

const Fundo = styled.div`
  background-color: #737375;
  min-height: 500px;
`;
const Fundo2 = styled.div`
  background-color: #F2F1F1;
  min-height: 100px;
  min-width: 100px;
`;

const Linha = styled.hr`
    border: 1px solid #ccc;
    width: 50%;
    margin: 0 auto; /* Adicionando margem automática para alinhar ao centro */
    margin-top: 20px;
    margin-bottom: 20px;
`;

const CenterDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

function Home() {
  return (
    <div>
      <Header />
      <Fundo>
        <div className="row mt-5">
          <div className="col-12 col-md-12 mt-5">
            <h2 className="text-center text-white mt-5">Encontre os melhores profissionais para edição de  vídeos.</h2>
          </div>
          <Linha />
        </div>

        <CenterDiv className="mt-5">
          <Link to="/profile-selection" className='bg-white btn me-5'>Publicar projeto</Link>
          <Link to="/profile-selection" className='btn btn-outline-light'>Sou Freelancer</Link>
        </CenterDiv>
      </Fundo >

      <div className="row">
        <Fundo2>
          <div className="col-12 col-md-12 mt-5">
            <h3 className="text-center mb-5">Ainda não possui cadastro? <b>Cadastre-se aqui!</b></h3>
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
            <button className="btn btn-dark mb-5 mt-5">Anuncie um projeto</button>
          </CenterDiv>
        </div>
      </Fundo2>
      <Footer />
    </div>
  );
}

export default Home;