import React, { useState, useRef, useEffect } from 'react';
import { Modal, Button, Form, Col, Row, Alert, Spinner } from 'react-bootstrap';
import axios from 'axios';
import { useEnvironment } from '../../data/contexts/enviromentContext';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

interface OrderProps {
    onClose?: () => void;
}

const Order: React.FC<OrderProps> = ({ onClose }) => {
    const [title, setTitle] = useState('');
    const [describle, setDescrible] = useState('');
    const [skills, setSkills] = useState('');
    const [link, setLink] = useState('');
    const [file, setFile] = useState<File | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [step, setStep] = useState<number>(1);
    const [loading, setLoading] = useState(false);
    const modalRef = useRef<HTMLDivElement>(null);

    const { apiUrl } = useEnvironment();

    useEffect(() => {
        const handleOutsideClick = (event: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
                onClose?.();
            }
        };

        document.addEventListener('mousedown', handleOutsideClick);

        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, [onClose]);

    const handleFileUpload = async (selectedFile: File, selectedTitle: string) => {
        try {
            setLoading(true);

            const formData = new FormData();
            formData.append('file', selectedFile);
            formData.append('title', selectedTitle);

            const response = await axios.post(apiUrl + '/s3/storage', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${sessionStorage.getItem('authToken')}`,
                },
            });

            setLink(response.data);
            setStep(2);
        } catch (error) {
            console.error(error);
            setError('Erro ao realizar upload do arquivo.');
            throw error;
        } finally {
            setLoading(false);
        }
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            const data = {
                title,
                describle,
                skills: skills.split(',').map(skill => skill.trim()),
                clientFinal: sessionStorage.getItem("userId"),
                link,
            };

            await axios.post(apiUrl + '/orders', data, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${sessionStorage.getItem('authToken')}`,
                },
            });

            alert('video postado com sucesso!');
            onClose?.();
        } catch (error) {
            console.error(error);
            setError('Erro ao enviar video.');
        }
    };

    return (
        <div className="" ref={modalRef}>
            <Form onSubmit={handleSubmit}>
                {error && <Alert variant="danger">{error}</Alert>}
                {step === 1 && (
                    <>
                        <Form.Group>
                            <Form.Label>Título:</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Título do video"
                                value={title}
                                onChange={(event) => setTitle(event.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mt-3">
                            <Form.Control type="file" onChange={(event) => {
                                const files = (event.target as HTMLInputElement).files;
                                if (files && files.length > 0) {
                                    setFile(files[0]);
                                    handleFileUpload(files[0], title);
                                } else {
                                    setFile(null);
                                }
                            }}
                            />
                        </Form.Group>
                        <div className="row mt-2">
                            <Button variant="primary" onClick={() => setStep(2)} disabled={loading}>
                                {loading ? <Spinner animation="border" size="sm" /> : 'Próximo'}
                            </Button>
                        </div>
                    </>
                )}
                {step === 2 && (
                    <>
                        <Form.Group>
                            <Form.Label>Descrição:</Form.Label>
                            <Form.Control
                                as="textarea"
                                placeholder="Descrição detalhada do video"
                                rows={3}
                                value={describle}
                                onChange={(event) => setDescrible(event.target.value)}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Habilidades:</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Separe as habilidades por vírgula"
                                value={skills}
                                onChange={(event) => setSkills(event.target.value)}
                            />
                        </Form.Group>
                        <div className="row mt-2"><Button variant="primary" type="submit">Enviar</Button></div>
                    </>
                )}
            </Form>
        </div>
    );
};

export default Order;
