import React, { useState, useEffect } from 'react';
import DashboardHeader from "../../../ui/components/dashboard-header";
import Header from "../../../ui/components/header";
import styled from 'styled-components';
import axios from 'axios';
import { useEnvironment } from '../../../data/contexts/enviromentContext';

const Card = styled.div`
    margin: 10px;
    box-shadow: 0 4px 8px 1px rgba(0, 0, 0, 0.2);
    overflow: auto;
    max-height: 400px;
`;

export function Wallet() {

    const { apiUrl } = useEnvironment();

    const [saldoAtual, setSaldoAtual] = useState('R$ 0.00');
    const [saldoTotal, setSaldoTotal] = useState('R$ 0,00');
    const [extrato, setExtrato] = useState([]);

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
                timeout: 15000, // Timeout de 15 segundos (em milissegundos)
            });

            console.log(response.data);
            setSaldoAtual(response.data.saldoAtual);
            setSaldoTotal(response.data.saldoTotal);
            setExtrato(response.data.transacoes);
            console.log('Extrato:', response.data.transacoes)
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
            <Header />
            <DashboardHeader />
            <div className="container">
            <div className="row mt-3 text-center p-4">
                    <div className="col-md-6">
                        <Card className="card p-3">
                            <div className="card-body">
                                <h5 className="card-title">Ganhos totais</h5>
                                <p className="card-text">R$ {saldoTotal}</p>
                            </div>
                        </Card>
                    </div>
                    <div className="col-md-6">
                        <Card className="card p-3">
                            <div className="card-body">
                                <h5 className="card-title">Saldo disponível</h5>
                                <p className="card-text">R$ {saldoAtual}</p>
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

                <div className="row m-0">
                    <div className="col-md-12 d-flex justify-content-end">
                        <button className="btn btn-dark">Realizar saque</button>
                    </div>
                </div>

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

