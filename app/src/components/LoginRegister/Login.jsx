import { useState } from 'react';
import { Div } from './styles';
import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from "react-hook-form"
import { formSchemaLogin } from '../../validations/loginUser';
import { Register } from './register';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { api } from '../../service/api';

export const LoginRegister = () => {

  const [ user, setUser] = useState();
  const [ativa, setAtiva] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const { register, handleSubmit, formState: { errors }} = useForm({
    resolver: yupResolver(formSchemaLogin),
  })

  const toggleClass = () => {
    setAtiva(!ativa);
  };

  async function loginUser(data) {
    try {
        const response = await api.post('/login', data);
        
        const { user: userResponse, token, id } = response.data;
        
        api.defaults.headers.authorization = `Token ${token}`;
        
        localStorage.setItem("@TOKEN", token);
        localStorage.setItem("@USERID", id)

        setUser(userResponse);
        
        const toNavigate = location.state?.from?.pathname || '/todo';
        
        navigate(toNavigate, { replace: true });

    } catch (error) {
        toast.error("Ops! Algo deu errado", {
                autoClose: 2000,
                style: {backgroundColor:"#343B41",
                        color:"white",
                        borderRadius:"5px", 
                        }
            })
        console.error(error);
    }
}

  return (
    <Div>
      <div className={`container ${ativa ? 'right-panel-active' : ''}`} id="container">
        <Register/>
        <div className="form-container sign-in-container">
          <form onSubmit={handleSubmit(loginUser)} noValidate>
            <h1>Login</h1>
            <input type="email" placeholder="Email" id='email' {...register("email")} />
            <span>{errors.message?.email}</span>
            <input type="password" placeholder="Password" id='password' {...register("password")} />
            <span>{errors.message?.password}</span>
            <button type='submit'>Login</button>
          </form>
        </div>
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1>Welcome Back!</h1>
              <p>Para ficar conectado conosco, por favor, faça login com suas informações pessoais</p>
              <button  className="ghost" onClick={() => toggleClass()} id="signIn">Logar</button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1>Hello, Friend!</h1>
              <p>Insira suas informações e comece sua jornada conosco</p>
              <button className="ghost" onClick={() => toggleClass()} id="signUp">Cadastre-se</button>
            </div>
          </div>
        </div>
      </div>
    </Div>
  );
}
