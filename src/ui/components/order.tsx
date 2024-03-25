import React, { useState, useRef, useEffect } from 'react';
import { Modal, Button, Form, Col, Row } from 'react-bootstrap';
import axios from 'axios';
import { useEnvironment } from '../../data/contexts/enviromentContext';

interface OrderProps {
    onClose?: () => void;
}


const Order: React.FC<OrderProps> = ({ onClose }) => {
    const [title, setTitle] = useState('');
    const [describle, setDescrible] = useState('');
    const [skills, setSkills] = useState('');
    const modalRef = useRef<HTMLDivElement>(null);

    const {apiUrl} = useEnvironment();

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

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const data = {
            title,
            describle,
            skills: skills.split(',').map(skill => skill.trim()),
            clientFinal: sessionStorage.getItem("userId")
        };

        axios.post(apiUrl + '/orders', data, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${sessionStorage.getItem('authToken')}`,
            },
        })
            .then((response) => {
                console.log(response.data);
                alert('Pedido criado com sucesso!');
                onClose?.();
            })
            .catch((error) => {
                console.error(error);
            });
    };



    return (
        <div className="" ref={modalRef}>
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label >Título:</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Título do pedido"
                        value={title}
                        onChange={(event) => setTitle(event.target.value)}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label className='mt-3 m-0'>Descrição:</Form.Label>
                    <Form.Control
                        as="textarea"
                        placeholder="Descrição detalhada do pedido"
                        rows={3}
                        value={describle}
                        onChange={(event) => setDescrible(event.target.value)}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label className='mt-3 m-0'>Habilidades:</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Separe as habilidades por vírgula"
                        value={skills}
                        onChange={(event) => setSkills(event.target.value)}
                    />
                </Form.Group>
                <Row>
                    <Col>
                        <Button type="submit" variant="primary mt-4" style={{ marginLeft: 'auto', display: 'block' }}>Enviar</Button>
                    </Col>
                </Row>
            </Form>
        </div>
    );
};

export default Order;
