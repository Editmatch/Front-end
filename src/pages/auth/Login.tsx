import { Link, useNavigate } from "react-router-dom";
import logo from "../../ui/images/logo.png";
import { useState } from "react";
import styled from "styled-components";
import Backbutton from "../../ui/components/back-button";
import axios from "axios";
import { Button, Modal } from "react-bootstrap";
import { useEnvironment } from "../../data/contexts/enviromentContext";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";

function Login() {
  const { apiUrl } = useEnvironment();

  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => setShowModal(true);

  const handleCloseModal = () => setShowModal(false);

  interface Usuario {
    email: string;
    password: string;
  }

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const [loginError, setLoginError] = useState(false);

  const logar = (user: Usuario) => {
    const url = `${apiUrl}/usuarios/login`;

    console.log("email", user.email, "senha", user.password);
    axios
      .post(
        url,
        {
          email: user.email,
          senha: user.password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        if (response.status === 200 && response.data?.token) {
          sessionStorage.setItem("authToken", response.data.token);
          sessionStorage.setItem("usuario", response.data.nome);
          sessionStorage.setItem("userId", response.data.userId);
          sessionStorage.setItem("userEmail", response.data.email);
          sessionStorage.setItem("isEditor", response.data.editor);

          let route =
            sessionStorage.getItem("isEditor") === "true"
              ? "/carteira"
              : "/projetos";

          // Rest of the code...

          Toastify({
            text: "Login efetuado com sucesso!",
            duration: 3000,
            close: true,
            gravity: "top",
            position: "right",
            stopOnFocus: true,
            style: {
              background: "#4caf50",
              color: "#fff",
            },
          }).showToast();

          setTimeout(() => {
            navigate(route);
          }, 2000);
        } else {
          Toastify({
            text: "Preencha os campos e tente novamente!",
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
          throw new Error("Ops! Ocorreu um erro interno.");
        }
      })
      .catch((error) => {
        Toastify({
          text: "Preencha os campos e tente novamente!",
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
        console.log(error);
      });
  };
  const LinkStyled = styled(Link)`
     text-decoration: none;
     color: black;
     }`;

  return (
    <>
      <div className="row">
        <LinkStyled to="/" className="m-2">
          Voltar
        </LinkStyled>
      </div>
      <section className="vh-50 gradient-custom">
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-8 col-lg-6 col-xl-5">
              <div className="card bg-white text-dark">
                <div className="card-body p-5 text-center">
                  <div className="mb-md-5 mt-md-4 pb-5">
                    <h2 className="fw-bold mb-2 text-uppercase">
                      <img src={logo} alt="" />
                    </h2>
                    <p>Insira seu email e senha para acessar</p>
                    <div className="form form-dark mb-4">
                      <input
                        type="email"
                        id="typeEmailX"
                        className="form-control form-control-md"
                        placeholder="Email*"
                        onChange={(event) => setEmail(event.target.value)}
                      />
                    </div>
                    <div className="form-outline form-dark mb-4">
                      <input
                        type="password"
                        id="typePasswordX"
                        className="form-control form-control-md"
                        placeholder="Senha*"
                        onChange={(event) => setPassword(event.target.value)}
                      />
                    </div>
                    <div className="row">
                      {loginError && (
                        <p className="text-danger">
                          Usuario ou senha incorretos, por favor tente novamente
                        </p>
                      )}
                    </div>
                    <button
                      className="btn btn-dark btn-lg px-5"
                      onClick={(event) => logar({ email, password })}
                    >
                      Continuar
                    </button>
                  </div>

                  <div>
                    <p className="small mb-5 pb-lg-2">
                      <a className="text-dark-50" href="#!">
                        Esqueceu sua senha?
                      </a>
                    </p>
                    <p className="mb-0">
                      Não tem uma conta?{" "}
                      <Link
                        to="/selecionar-perfil"
                        className="text-dark-50 fw-bold"
                      >
                        Cadastre-se
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title className="text-success">
            Login realizado com sucesso!
          </Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Fechar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Login;
