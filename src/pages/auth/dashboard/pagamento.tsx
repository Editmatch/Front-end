import React, {
  useEffect,
  useState,
  useCallback,
  ChangeEvent,
  FormEvent,
} from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useEnvironment } from "../../../data/contexts/enviromentContext";
import styled, { css, keyframes } from "styled-components";
import DashboardHeader from "../../../ui/components/dashboard-header";
import Toastify from "toastify-js";
import { CSSTransition } from "react-transition-group";
import "toastify-js/src/toastify.css";

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

const showToast = (message: string, backgroundColor: string) => {
  Toastify({
    text: message,
    duration: 3000,
    close: true,
    gravity: "top",
    position: "right",
    stopOnFocus: true,
    style: {
      background: backgroundColor,
      color: "#fff",
    },
  }).showToast();
};

const getSessionItem = (key: string, defaultValue: string = ""): string => {
  return sessionStorage.getItem(key) || defaultValue;
};

const slideIn = keyframes`
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

const slideOut = keyframes`
  from {
    transform: translateX(0);
    opacity: 1;
  }
  to {
    transform: translateX(-100%);
    opacity: 0;
  }
`;

const CardContainer = styled.div<{ showQrCode: boolean }>`
  ${(props) =>
    props.showQrCode &&
    css`
      animation: ${slideOut} 0.5s forwards;
    `}
`;

const QrCodeContainer = styled.div`
  animation: ${slideIn} 0.5s forwards;
`;

const Pagamento: React.FC = () => {
  const { apiUrl } = useEnvironment();
  const { id, valor } = useParams<{ id: string; valor: string }>();
  const navigate = useNavigate();
  const [videoFile, setVideoFile] = useState<File | undefined>();
  const [title, setTitle] = useState<string>("");
  const [describle, setDescrible] = useState<string>("");
  const [skills, setSkills] = useState<string>("");
  const [url, setUrl] = useState<string>("");
  const [paymentStatus, setPaymentStatus] = useState<string>("Não definido");
  const [nomePagante, setNomePagante] = useState<string>(
    getSessionItem("usuario")
  );
  const [tipoPagamento, setTipoPagamento] = useState<string>("Entrada");
  const [locId, setLocId] = useState<number | undefined>();
  const [txId, setTxId] = useState<string | undefined>();
  const [linkVisualizacao, setLinkVisualizacao] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const idCliente = getSessionItem("userId");

  const fetchQrCode = useCallback(
    async (locId: number) => {
      try {
        const response = await axios.get(
          `${apiUrl}/transacao/qrcode/${locId}`,
          {
            headers: {
              Authorization: `Bearer ${getSessionItem("authToken")}`,
              Accept: "application/json",
            },
          }
        );
        setLinkVisualizacao(response.data.imagemQrcode);
      } catch (error) {
        console.error("Erro ao obter QR Code:", error);
        showToast("Erro ao obter QR Code", "red");
      }
    },
    [apiUrl]
  );

  const checkPaymentStatus = useCallback(
    async (txId: string) => {
      try {
        const response = await axios.get(`${apiUrl}/transacao/status/${txId}`, {
          headers: {
            Authorization: `Bearer ${getSessionItem("authToken")}`,
            Accept: "application/json",
          },
        });
        const status = response.data.status;
        if (status === "ATIVA") {
          showToast("Pagamento pendente", "yellow");
          setPaymentStatus("PENDENTE");
        }
        if (status === "CONCLUIDA") {
          showToast("Pagamento realizado com sucesso!", "green");
          setPaymentStatus("CONCLUIDA");
        }
        if (status === "CANCELADA") showToast("Pagamento cancelado", "red");
      } catch (error) {
        console.error("Erro ao verificar status do pagamento:", error);
        showToast("Erro ao verificar status do pagamento", "red");
      }
    },
    [apiUrl]
  );

  const addNewOrder = useCallback(() => {
    const data = {
      title,
      Describle: describle,
      skills: skills.split(",").map((skill) => skill.trim()),
      clientFinal: sessionStorage.getItem("userId"),
      link: url,
    };

    axios
      .post(`${apiUrl}/transacao/order/${id}`, data, {
        headers: {
          Authorization: `Bearer ${getSessionItem("authToken")}`,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log(res.data);
        showToast("Pedido enviado com sucesso", "green");
      })
      .catch((err) => {
        console.log(err);
        showToast("Erro ao enviar pedido", "red");
      });
  }, [apiUrl, describle, skills, title, url]);

  useEffect(() => {
    if (locId) fetchQrCode(locId);
  }, [locId, fetchQrCode]);

  useEffect(() => {
    if (txId) {
      const interval = setInterval(() => checkPaymentStatus(txId), 5000);
      return () => clearInterval(interval);
    }
  }, [txId, checkPaymentStatus]);

  useEffect(() => {
    if (paymentStatus === "CONCLUIDA") {
      addNewOrder();
      showToast("Pedido enviado com sucesso! Redirecionando...", "green");
      setTimeout(() => navigate("/projetos"), 5000);
    }
  }, [paymentStatus, addNewOrder, navigate]);

  const handleTipoPagamentoChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setTipoPagamento(event.target.value);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    const payload = {
      nomePagante,
      valor: valor ?? "",
      tipo: tipoPagamento,
    };

    try {
      const response = await axios.put(`${apiUrl}/transacao/${id}`, payload, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${getSessionItem("authToken")}`,
          "Content-Type": "application/json",
        },
      });
      setLocId(response.data.loc.id);
      setTxId(response.data.txid);
    } catch (error) {
      console.error("Erro ao enviar pagamento:", error);
      showToast("Erro ao enviar pagamento", "red");
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileUpload = async (selectedFile: File) => {
    try {
      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("title", title);
      const response = await axios.post(`${apiUrl}/s3/storage`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${getSessionItem("authToken")}`,
        },
      });
      setUrl(response.data);
      showToast("Vídeo carregado!", "green");
    } catch (error) {
      console.error("Erro ao carregar vídeo:", error);
      showToast("Erro ao carregar vídeo", "red");
    }
  };

  return (
    <>
      <DashboardHeader />
      <div className="container">
        <h1 className="text-center mt-5 mb-4">Contratar Editor</h1>
        <div className="row justify-content-center">
          <CSSTransition
            in={!linkVisualizacao}
            timeout={500}
            classNames="slide"
            unmountOnExit
          >
            <CardContainer showQrCode={!!linkVisualizacao} className="col-md-6">
              <form onSubmit={handleSubmit}>
                <div className="card">
                  <div className="card-body">
                    <div className="row">
                      <div className="col-md-12">
                        <label htmlFor="nomePagante">Nome do Pagante:</label>
                        <PagamentoInput
                          type="text"
                          id="nomePagante"
                          value={nomePagante}
                          disabled
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <label htmlFor="title">Título do vídeo:</label>
                        <PagamentoInput
                          type="text"
                          id="title"
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                        />
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="describle">Descrição:</label>
                        <PagamentoInput
                          type="text"
                          id="describle"
                          value={describle}
                          onChange={(e) => setDescrible(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <label htmlFor="skills">Habilidades:</label>
                        <PagamentoInput
                          type="text"
                          id="skills"
                          value={skills}
                          onChange={(e) => setSkills(e.target.value)}
                        />
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="valor">Vídeo a ser editado:</label>
                        <PagamentoInput
                          type="file"
                          onChange={(e) => {
                            const files = e.target.files;
                            if (files && files.length > 0) {
                              setVideoFile(files[0]);
                              handleFileUpload(files[0]);
                            }
                          }}
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-12">
                        <label htmlFor="tipoPagamento">
                          Tipo de Pagamento:
                        </label>
                        <PagamentoSelect
                          id="tipoPagamento"
                          value={tipoPagamento}
                          onChange={handleTipoPagamentoChange}
                        >
                          <option value="">
                            Selecione uma forma de pagamento
                          </option>
                          <option value="Entrada">Pix</option>
                          <option value="" disabled>
                            Cartão de crédito
                          </option>
                          <option value="" disabled>
                            Boleto
                          </option>
                        </PagamentoSelect>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-12">
                        <PagamentoButton type="submit" disabled={isLoading}>
                          {isLoading ? "Processando..." : "Enviar Pagamento"}
                        </PagamentoButton>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </CardContainer>
          </CSSTransition>

          <CSSTransition
            in={!!linkVisualizacao}
            timeout={500}
            classNames="slide"
            unmountOnExit
          >
            <QrCodeContainer className="col-md-6">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title text-center">QR Code</h5>
                  <img
                    src={linkVisualizacao}
                    alt="QR Code"
                    style={{ width: "100%" }}
                  />
                </div>
              </div>
            </QrCodeContainer>
          </CSSTransition>
        </div>
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card text-center">
              <div className="card-body">
                <div className="row">
                  <div className="col-md-6">
                    <h5 className="card-title">Valor do serviço</h5>
                    <p className="card-text">R$ {valor}</p>
                  </div>
                  <div className="col-md-6">
                    <h5 className="card-title">Status do pagamento </h5>
                    <p className="card-text">{paymentStatus}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Pagamento;
