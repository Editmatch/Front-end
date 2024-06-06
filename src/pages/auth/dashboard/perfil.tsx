import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../../../ui/components/header';
import DashboardHeader from '../../../ui/components/dashboard-header';
import styled from 'styled-components';
import { useEnvironment } from '../../../data/contexts/enviromentContext';
import Toastify from 'toastify-js';
import "toastify-js/src/toastify.css";  

function EditInfo() {

    const { apiUrl } = useEnvironment();

    const [cep, setCep] = useState('');
    const [logradouro, setLogradouro] = useState('');
    const [bairro, setBairro] = useState('');
    const [localidade, setLocalidade] = useState('');
    const [uf, setUf] = useState('');
    const [numero, setNumero] = useState('');
    const [complemento, setComplemento] = useState('');
    const [image, setImage] = useState(null);
    const [imagen, setImagen] = useState('');

    const handleCepChange = (event: any) => {
        setCep(event.target.value);
    };

    const Imagem = styled.img`
        width: 100px;
        height: 100px;
        border-radius: 50%;
        object-fit: cover;
    `;

    const defaultImage = 'https://static.vecteezy.com/system/resources/previews/007/409/979/original/people-icon-design-avatar-icon-person-icons-people-icons-are-set-in-trendy-flat-style-user-icon-set-vector.jpg'

    const handleSubmit = async (event: any) => {
        event.preventDefault();

        try {
            const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
            setLogradouro(response.data.logradouro);
            setBairro(response.data.bairro);
            setLocalidade(response.data.localidade);
            setUf(response.data.uf);
            setNumero(response.data.numero);
            setCep(response.data.cep);
            setComplemento(response.data.complemento);
            console.log(response.data)
        } catch (error) {
            console.error(error);
            setLogradouro('Endereço não encontrado');
            setBairro('Bairro nao encontrado');

        }
    };

    const fetchProfileImage = async () => {
        try {

            const response = await axios.get(`${apiUrl}/usuarios/${sessionStorage.getItem('userId')}/photo`, {
                responseType: 'arraybuffer',
                headers: {
                    'Authorization': 'Bearer ' + sessionStorage.getItem('authToken'),
                }
            });

            const base64 = btoa(
                new Uint8Array(response.data).reduce(
                    (data, byte) => data + String.fromCharCode(byte),
                    '',
                ),
            );

            setImagen(`data:image/png;base64,${base64}`);
        } catch (error) {
            console.error(error);
        }
    };


    const trocarImagemOnChange = async (event: any) => {
        try {
            const selectedImage = event.target.files[0];

            if (!selectedImage) {
                console.error('Nenhuma imagem selecionada.');
                return;
            }

            const formData = new FormData();
            formData.append('file', selectedImage);

            const response = await axios.post(
                `${apiUrl}/usuarios/${sessionStorage.getItem('userId')}/upload-photo`,
                formData,
                {
                    headers: {
                        'Authorization': `Bearer ${sessionStorage.getItem('authToken')}`,
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );

            console.log(response.data);

            // Após o envio bem-sucedido, busca a nova imagem
            await fetchProfileImage();
        } catch (error) {
            console.error('Erro ao enviar a imagem:', error);
        }
    };

    const saveInfo = async () => {
        axios.post(`${apiUrl}/enderecos/${sessionStorage.getItem('userId')}`, {
            cidade: localidade,
            cep: cep,
            logradouro: logradouro,
            complemento: complemento,
            estado: uf,
            bairro: bairro,
            numero: numero,
        },
            {
                headers: {
                    'Authorization': 'Bearer ' + sessionStorage.getItem('authToken'),
                    'Content-Type': 'application/json',
                }
            }).then((res) => {
                console.log(res.data)
                Toastify({
                    text: "Dados atualizados com sucesso!",
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
            }).catch((err) => {
                console.log(err);
            })
    }


    useEffect(() => {
        fetchProfileImage();
    }, []);


    return (
        <>
            {/* <Header /> */}
            <DashboardHeader />
            <div className="container">
                <div className="card">
                    <div className="row mt-5">
                        <div className="row">
                            <div className="col-1 col-md-2 text-center">
                                <Imagem className="mb-4" src={imagen ? imagen : defaultImage} alt="Foto da pessoa" />
                                <input type="file" className='form-control' onChange={trocarImagemOnChange} />
                            </div>
                            <div className="col-11 col-md-10">
                                <div className="content">
                                    <h5 className='mt-5'>Dados pessoais</h5>
                                    <div className="row">
                                        <div className="col-6 col-md-6">
                                            <label className='form-label'>Nome</label>
                                            <input type="text" className='form-control' defaultValue={sessionStorage.getItem('usuario') ?? ''} />
                                        </div>
                                        <div className="col-6 col-md-6">
                                            <label className='form-label'>Email</label>
                                            <input type="text" className='form-control' defaultValue={sessionStorage.getItem('userEmail') ?? ''} />
                                        </div>
                                    </div>
                                    <div className="row mt-5">
                                        <div className="col-md-6">
                                            <div className="col-md-12">
                                                <label className='form-label'>Codigo postal</label>
                                                <input
                                                    type="text"
                                                    id="cep"
                                                    onBlur={handleSubmit}
                                                    onChange={(event) => setCep(event.target.value)}
                                                    className='form-control'
                                                />
                                            </div>
                                            <label className='form-label'>Cidade</label>
                                            <input type="text" className='form-control' defaultValue={localidade} readOnly />
                                            <label className='form-label'>Logradouro</label>
                                            <input type="text" className='form-control' defaultValue={logradouro} readOnly />
                                            <label className='form-label'>Complemento</label>
                                            <input type="text" className='form-control' />
                                        </div>
                                        <div className="col-md-6">
                                            <label className='form-label'>Estado</label>
                                            <input type="text" className='form-control' defaultValue={uf} readOnly />
                                            <label className='form-label'>Bairro</label>
                                            <input type="text" className='form-control' defaultValue={bairro} readOnly />
                                            <label className='form-label'>Numero</label>
                                            <input type="text" className='form-control' />
                                        </div>
                                    </div>
                                    <div className="row mt-4">
                                        <div className=" col-md-6">
                                            <label className='form-label'>Senha atual</label>
                                            <input type="text" className='form-control' />
                                        </div>
                                        <div className=" col-md-6">
                                            <label className='form-label'>Confirmar senha</label>
                                            <input type="text" className='form-control' />
                                        </div>
                                    </div>
                                    <div className="row mt-4">
                                        <div className="col-md-12 text-end mb-2">
                                            <button onClick={saveInfo} className={`btn btn-success`}>Atualizar dados</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default EditInfo;
