import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useEnvironment } from '../../../data/contexts/enviromentContext';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import Header from '../../../ui/components/header';
import DashboardHeader from '../../../ui/components/dashboard-header';

const PagamentoContainer = styled.div`
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
    background-color: #f8f9fa;
    border: 1px solid #dee2e6;
    border-radius: 5px;
`;

const PagamentoInput = styled.input`
    width: 100%;
    padding: 10px;
    margin-bottom: 15px;
    border: 1px solid #ced4da;
    border-radius: 4px;
`;

const PagamentoSelect = styled.select`
    width: 100%;
    padding: 10px;
    margin-bottom: 15px;
    border: 1px solid #ced4da;
    border-radius: 4px;
`;

const PagamentoButton = styled.button`
    width: 100%;
    padding: 10px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
`;

const Pagamento: React.FC = () => {
  const { apiUrl } = useEnvironment();
  const { id } = useParams();

  const { valor } = useParams<{ valor: string }>(); // Use a tipagem para garantir que o tipo do valor seja string


  const [nomePagante, setNomePagante] = useState(sessionStorage.getItem('usuario') || '');

  const [tipoPagamento, setTipoPagamento] = useState('Entrada');

  const [locId, setLocId] = useState();
  
  const [linkVisualizacao, setLinkVisualizacao] = useState('');
  const getQrCode = async (locId: Number) => {
    try {
      const response = await axios.get(`${apiUrl}/transacao/qrcode/${locId}`, {
        headers: {
          'Authorization': 'Bearer ' + sessionStorage.getItem('authToken'),
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });

      console.log('QR Code:', response.data.linkVisualizacao)
      setLinkVisualizacao(response.data.linkVisualizacao);
    } catch (error) {
      console.error('Erro ao obter QR Code:', error);
    }
  };

  useEffect(() => {
    if (linkVisualizacao) {
      window.open(linkVisualizacao, '_blank');
    }
  }, [linkVisualizacao]);
  

  useEffect(() => {
    if (locId) {
      getQrCode(locId);
    }
  }, [locId]);

  const handleTipoPagamentoChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setTipoPagamento(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await axios.put(`${apiUrl}/transacao/${id}`, {
        nomePagante,
        valor,
        tipo: tipoPagamento
      }, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });

      console.log("locId", response.data.loc.id);

      setLocId(response.data.loc.id);
      console.log('Resposta do servidor:', response.data);

    } catch (error) {
      console.error('Erro ao enviar pagamento:', error);
    }
  };

  return (
    <>
      <Header />
      <DashboardHeader />
      <PagamentoContainer>
        <h2>Tela de Pagamento</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="nomePagante">Nome do Pagante:</label>
            <PagamentoInput
              type="text"
              id="nomePagante"
              value={nomePagante ? nomePagante : ''}
              disabled={true}
            />
          </div>
          <div>
            <label htmlFor="valor">Valor do serviço do editor:</label>
            <PagamentoInput
              type="text"
              id="valor"
              value={valor}
              disabled={true}
            />
          </div>
          <div>
            <label htmlFor="tipoPagamento">Tipo de Pagamento:</label>
            <PagamentoSelect id="tipoPagamento" value={tipoPagamento} onChange={handleTipoPagamentoChange}>
              <option value="Entrada">Pix</option>
            </PagamentoSelect>
          </div>
          <PagamentoButton type="submit">Enviar Pagamento</PagamentoButton>
        </form>
      </PagamentoContainer>
    </>
  );
};

export default Pagamento;
