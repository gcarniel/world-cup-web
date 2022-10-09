import axios from 'axios';
import { useFormik } from 'formik';
import { SpinnerGap } from 'phosphor-react';
import { Navigate } from 'react-router-dom';
import { useLocalStorage } from 'react-use';
import * as yup from 'yup';

import Icon from '../../components/Icon';
import Input from '../../components/Input';

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .email('Informe um e-mail válido')
    .required('Informe seu e-mail'),
  password: yup.string().required('Informe sua senha'),
});

const Login = () => {
  const [auth, setAuth] = useLocalStorage('auth', {});
  const createUser = async (values) => {
    try {
      const response = await axios({
        method: 'GET',
        baseURL: import.meta.env.VITE_API_URL,
        url: '/login',
        auth: {
          username: values.email,
          password: values.password,
        },
      });
      setAuth(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const formik = useFormik({
    onSubmit: createUser,
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
  });

  if (auth?.user?.id) {
    return <Navigate to="/dashboard" replace={true} />;
  }

  return (
    <div className="">
      <header className="p-4 border-b border-red-700">
        <div className="container max-w-xl flex justify-center">
          <img className="w-40" src="/imgs/logo-fundo-branco.svg" alt="logo" />
        </div>
      </header>

      <main className="container max-w-xl p-4">
        <div className="flex items-center space-x-4 p-4">
          <a href="/">
            <Icon name="back" />
          </a>
          <h2 className="text-xl font-bold">Entre na sua conta</h2>
        </div>

        <form className="space-y-6 p-4" onSubmit={formik.handleSubmit}>
          <Input
            type="text"
            name="email"
            label="Seu e-mail"
            placeholder="Digite seu e-mail"
            error={formik.touched.email && formik.errors.email}
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />

          <Input
            type="password"
            name="password"
            label="Sua senha"
            placeholder="Digite sua senha"
            error={formik.touched.password && formik.errors.password}
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />

          <button
            type="submit"
            disabled={!formik.isValid || formik.isSubmitting}
            className={`w-full flex justify-center text-white text-center bg-red-500 
                  border border-white text-xl px-6 py-4 rounded-xl disabled:opacity-50`}
          >
            {formik.isSubmitting ? (
              <SpinnerGap className="animate-spin" size={32} />
            ) : (
              'Entrar'
            )}
          </button>

          <a
            href="/signup"
            className="block text-red-500 text-center text-xl px-8 py-4 rounded-xl border border-red-500"
          >
            Criar minha conta
          </a>
        </form>
      </main>
    </div>
  );
};

export default Login;
