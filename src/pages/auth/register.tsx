import { Link, useLocation, useNavigate } from 'react-router-dom';
import logo from '../../ui/images/logo.png';
import { FormEvent, useState } from 'react';
import axios from 'axios';
import { useEnvironment } from '../../data/contexts/enviromentContext';

function Registro() {
  const { apiUrl } = useEnvironment();

  const [formData, setFormData] = useState({
    email: '',
    name: '',
    lastName: '',
    password: '',
    confirmPassword: '',
    hourValue: 'n/a',
    pixKey: '',
    skills: [],
  });

  const [step, setStep] = useState(1); // Estado para controlar a etapa do cadastro

  const { email, name, lastName, password, confirmPassword, hourValue, pixKey, skills } = formData;

  const navigate = useNavigate();
  const { rota } = useLocation().state;
  const endpoint = rota;

  console.log(endpoint)
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert('As senhas não coincidem');
      setFormData({ ...formData, password: '', confirmPassword: '' });
      return;
    }

    try {

      const skillsArray = Array.isArray(skills) ? skills : [skills];
      const trimmedSkills = skillsArray.length >= 1 ? skillsArray.map((skill: string) => skill.trim()) : null;

      const response = await axios.post(endpoint, {
        name,
        last_name: lastName,
        email,
        password,
        chavePix: formData.pixKey.length >= 1 ? pixKey : "",
        skills: formData.skills.length >= 1 ? trimmedSkills : null,
        valorHora: formData.hourValue.length >= 1 ? hourValue : null,
        isEditor: endpoint === apiUrl + '/editores',
      });

      console.log(response.status);

      if (response.status === 201) {
        alert('Cadastro realizado com sucesso!');
        navigate('/login');
      } else {
        alert('Ops! Ocorreu um erro durante o cadastro.');
      }
    } catch (error) {
      console.error('Erro durante o cadastro:', error);
      alert('Ops! Ocorreu um erro durante o cadastro.');
    }
  };

  return (
    <>
      <section className="vh-50 gradient-custom">
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-8 col-lg-6 col-xl-5">
              <div className="card bg-white text-dark">
                <div className="card-body p-5 text-center">
                  <div className="mb-md-5 mt-md-4 pb-5">
                    <h2 className="fw-bold mb-5 text-uppercase">
                      <img src={logo} alt="" />
                    </h2>
                    <p>Insira suas informações para realizar o cadastro.</p>

                    {step === 1 && ( // Renderiza os campos da primeira etapa
                      <form onSubmit={(event: FormEvent<HTMLFormElement>) => handleSubmit(event)}>
                        <div className="form form-dark mb-4">
                          <input
                            type="text"
                            name="name"
                            value={name}
                            onChange={handleChange}
                            className="form-control form-control-md"
                            placeholder="Nome*"
                          />
                        </div>

                        <div className="form form-dark mb-4">
                          <input
                            type="text"
                            name="lastName"
                            value={lastName}
                            onChange={handleChange}
                            className="form-control form-control-md"
                            placeholder="Sobrenome*"
                          />
                        </div>

                        <div className="form form-dark mb-4">
                          <input
                            type="email"
                            name="email"
                            value={email}
                            onChange={handleChange}
                            className="form-control form-control-md"
                            placeholder="Email*"
                          />
                        </div>

                        <div className="form-outline form-dark mb-4">
                          <input
                            type="password"
                            name="password"
                            value={password}
                            onChange={handleChange}
                            className="form-control form-control-md"
                            placeholder="Senha*"
                          />
                        </div>

                        <div className="form-outline form-dark mb-4">
                          <input
                            type="password"
                            name="confirmPassword"
                            value={confirmPassword}
                            onChange={handleChange}
                            className="form-control form-control-md"
                            placeholder="Confirme a senha*"
                          />
                        </div>
                        {rota === apiUrl + '/clientes' && (

                          <div className="form-outline form-dark mb-4">
                            <input
                              type="text"
                              name="pixKey"
                              value={pixKey}
                              onChange={handleChange}
                              className="form-control form-control-md"
                              placeholder="Chave Pix*"
                            />
                          </div>
                        )}

                        {rota !== apiUrl + '/clientes' && (
                          <button className="btn btn-dark btn-lg px-5" onClick={() => setStep(2)}>
                            Continuar
                          </button>
                        )}

                        {rota === apiUrl + '/clientes' && (
                          <button className="btn btn-dark btn-lg px-5" type="submit">
                            Concluir Cadastro
                          </button>
                        )}

                      </form>
                    )}

                    {step === 2 && ( // Renderiza os campos da segunda etapa
                      <form onSubmit={(event: FormEvent<HTMLFormElement>) => handleSubmit(event)}>
                        <div className="form-outline form-dark mb-4">
                          <input
                            type="text"
                            name="skills"
                            value={skills}
                            onChange={handleChange}
                            className="form-control form-control-md"
                            placeholder="Habilidades*"
                          />
                        </div>

                        <div className="form-outline form-dark mb-4">
                          <input
                            type="text"
                            name="pixKey"
                            value={pixKey}
                            onChange={handleChange}
                            className="form-control form-control-md"
                            placeholder="Chave Pix*"
                          />
                        </div>

                        <div className="form-outline form-dark mb-4">
                          <input
                            type="text"
                            name="hourValue"
                            value={hourValue}
                            onChange={handleChange}
                            className="form-control form-control-md"
                            placeholder="Valor Hora*"
                          />
                        </div>

                        <button className="btn btn-dark btn-lg px-5" type="submit">
                          Concluir Cadastro
                        </button>
                      </form>
                    )}
                  </div>

                  <div>
                    <p className="small mb-5 pb-lg-2">
                      <a className="text-dark-50" href="#!">
                        Esqueceu sua senha?
                      </a>
                    </p>
                    <p className="mb-0">
                      Já tem uma conta? <Link to="#!" className="text-dark-50 fw-bold">Logar</Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Registro;
