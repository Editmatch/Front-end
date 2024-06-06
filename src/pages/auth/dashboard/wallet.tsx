import React, { useState, useEffect } from 'react';
import DashboardHeader from "../../../ui/components/dashboard-header";
import Header from "../../../ui/components/header";
import styled from 'styled-components';
import axios from 'axios';
import { useEnvironment } from '../../../data/contexts/enviromentContext';
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";

const Card = styled.div`
    margin: 10px;
    box-shadow: 0 4px 8px 1px rgba(0, 0, 0, 0.2);
    overflow: auto;
    max-height: 400px;
`;

export function Wallet() {

    const { apiUrl } = useEnvironment();

    const [saldoAtual, setSaldoAtual] = useState('R$ 0');
    const [saldoTotal, setSaldoTotal] = useState('R$ 0');
    const [extrato, setExtrato] = useState([]);
    const [modalOpen, setModalOpen] = useState(false); 
    const [valorSaque, setValorSaque] = useState('');

    const userID = sessionStorage.getItem('userId');

    const sacar = async (tipo: String, valor: Number) => {
        try {
          const response = await axios.post(`${apiUrl}/transacao/sacar/${userID}`, {
            tipo,
            valor
          }, {
            headers: {
              'Authorization': 'Bearer ' + sessionStorage.getItem('authToken'),
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            }
          });
          
          if (response.status === 200) {
            Toastify({
                text: "Saque realizado com sucesso!",
                duration: 3000,
                close: true,
                gravity: "top",
                position: "right",
                stopOnFocus: true,
                style: {
                  background: "green",
                  color: "#fff",
                },
              }).showToast();
            fetchData();
          }

        } catch (error) {
          console.error('Erro ao realizar saque:', error);
          Toastify({
            text: "Ocorreu um erro ao realizar o saque. Tente novamente.",
            duration: 3000,
            close: true,
            gravity: "top",
            position: "right",
            stopOnFocus: true,
            style: {
              background: "red",
              color: "#fff",
            },
          }).showToast();
        }
    };

    const handleSaque = () => {
        if (!valorSaque || isNaN(parseFloat(valorSaque))) {
            Toastify({
                text: "Insira um valor valido para o saque",
                duration: 3000,
                close: true,
                gravity: "top",
                position: "right",
                stopOnFocus: true,
                style: {
                  background: "yellow",
                  color: "#fff",
                },
              }).showToast();
            return;
        }

        if (parseFloat(valorSaque) < 0) {
            Toastify({
                text: "O valor do saque não pode ser negativo",
                duration: 3000,
                close: true,
                gravity: "top",
                position: "right",
                stopOnFocus: true,
                style: {
                  background: "yellow",
                  color: "#fff",
                },
              }).showToast();
            return;
        }

        sacar('Saida', parseFloat(valorSaque));
        setModalOpen(false);
    };

    useEffect(() => {
        fetchData();
    }, []);

    async function fetchData() {
        try {
            const response = await axios.get(`${apiUrl}/carteira/${sessionStorage.getItem('userId')}`, {
                headers: {
                    'Authorization': 'Bearer ' + sessionStorage.getItem('authToken'),
                    'Content-Type': 'application/json',
                },
                timeout: 15000,
            });
            setSaldoAtual(response.data.saldoAtual);
            setSaldoTotal(response.data.saldoTotal);
            setExtrato(response.data.transacoes);
        } catch (error) {
            if (axios.isCancel(error)) {
                console.log('A solicitação foi cancelada devido ao timeout.');
            } else {
                console.error('Erro ao obter dados da carteira:', error);
            }
        }
    }

    return (
        <>
            <DashboardHeader />
            <div className="container">
                <div className="row mt-3 text-center p-4">
                    <div className="col-md-6">
                        <Card className="card p-3">
                            <div className="card-body">
                                <h5 className="card-title">Ganhos totais</h5>
                                <p className="card-text">{saldoTotal}</p>
                            </div>
                        </Card>
                    </div>
                    <div className="col-md-6">
                        <Card className="card p-3">
                            <div className="card-body">
                                <h5 className="card-title">Saldo disponível</h5>
                                <p className="card-text">{saldoAtual}</p>
                            </div>
                        </Card>
                    </div>
                </div>
                <div className="row p-4">
                    <div className="col-md-12">
                        <Card className="card">
                            <div className="card-body">
                                <h5 className="card-title">Extrato</h5>
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th scope="col">Data</th>
                                            <th scope="col">Valor</th>
                                            <th scope="col">Origem</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {extrato.length > 0 ? extrato.map((item: any) => (
                                            <ExtratoItem key={item.id} item={item} />
                                        )) : (
                                            <tr>
                                                <td colSpan={3}>Nenhum registro encontrado</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </Card>
                    </div>
                </div>

                {/* Botão para abrir o modal */}
                <div className="row m-0">
                    <div className="col-md-12 d-flex justify-content-end">
                        <button className="btn btn-dark" onClick={() => setModalOpen(true)}>Realizar saque</button>
                    </div>
                </div>

                {/* Modal para inserir o valor do saque */}
                {modalOpen && (
                    <div className="modal" style={{ display: 'block' }}>
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">Digite o valor do saque</h5>
                                    <button type="button" className="btn-close" onClick={() => setModalOpen(false)}></button>
                                </div>
                                <div className="modal-body">
                                    <input type="number" className="form-control" value={valorSaque} onChange={(e) => setValorSaque(e.target.value)} />
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" onClick={() => setModalOpen(false)}>Cancelar</button>
                                    <button type="button" className="btn btn-primary" onClick={handleSaque}>Confirmar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

            </div>
        </>
    )
}

const ExtratoItem = ({ item }: { item: any }) => {
    return (
        <tr>
            <td>{item.dataHora || '-'}</td>
            <td>{item.valor}</td>
            <td>{item.tipo || '-'}</td>
        </tr>
    );
};
