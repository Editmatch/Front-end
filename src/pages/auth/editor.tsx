import { Link } from 'react-router-dom';
import logo from '../../ui/images/logo.png';
function Editor() {
  return (
    <>
      <section className="vh-50 gradient-custom">
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-8 col-lg-6 col-xl-5">
              <div className="card bg-white text-dark">
                <div className="card-body p-5 text-center">

                  <div className="mb-md-5 mt-md-4 pb-5">

                    <h2 className="fw-bold mb-5 text-uppercase"><img src={logo} alt="" /></h2>
                    <p>Insira suas informacões para realizar o cadastro.</p>

                    <div className="form form-dark mb-4">
                      <input type="name" id="typeNameX" className="form-control form-control-md" placeholder='Nome*' />
                    </div>

                    <div className="form form-dark mb-4">
                      <input type="email" id="typeEmailX" className="form-control form-control-md" placeholder='Email*' />
                    </div>

                    <div className="form-outline form-dark mb-4">
                      <input type="password" id="typePasswordX" className="form-control form-control-md" placeholder='Senha*' />
                    </div>

                    <div className="form-outline form-dark mb-4">
                      <input type="password" id="typePasswordX" className="form-control form-control-md" placeholder='Confirme a senha*' />
                    </div>

                    <button className="btn btn-dark btn-lg px-5" type="submit">Continuar</button>

                  </div>

                  <div>
                    <p className="small mb-5 pb-lg-2"><a className="text-dark-50" href="#!">Esqueceu sua senha?</a></p>
                    <p className="mb-0">Ja tem uma conta? <Link to="#!" className="text-dark-50 fw-bold">Logar</Link>
                    </p>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </section >
    </>
  )
}

export default Editor;