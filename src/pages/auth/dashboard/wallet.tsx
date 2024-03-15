import React, { useState } from 'react';
import DashboardHeader from "../../../ui/components/dashboard-header";
import Header from "../../../ui/components/header";
import styled from 'styled-components';

const Card = styled.div`
    margin: 10px;
    box-shadow: 0 4px 8px 1px rgba(0, 0, 0, 0.2);
    overflow: auto;
    max-height: 400px;
`;

export function Wallet() {
    const [saldo, setSaldo] = useState({ total: 'R$ 100,00', atual: 'R$ 20,00' });

    const [extrato, setExtrato] = useState([
        {  data: '10/10/2023', valor: 'R$ -50,00', origem: 'Saque' },
        {  data: '10/10/2023', valor: 'R$ -30,00', origem: 'Saque' },
        {  data: '10/10/2024', valor: 'R$ 100,00', origem: 'Edição' },
        {}
    ]);

    

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
                                <p className="card-text">{saldo.total}</p>
                            </div>
                        </Card>
                    </div>
                    <div className="col-md-6">
                        <Card className="card p-3">
                            <div className="card-body">
                                <h5 className="card-title">Saldo disponível</h5>
                                <p className="card-text">{saldo.atual}</p>
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
                                        {extrato.map((item, index) => (
                                            <ExtratoItem key={index} item={item} />
                                        ))}
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
            <td>{item.data}</td>
            <td>{item.valor}</td>
            <td>{item.origem}</td>
        </tr>
    );
};
