import axios from 'axios';
import { useFormik } from 'formik';
import { SpinnerGap } from 'phosphor-react';
import { Navigate } from 'react-router-dom';
import { useLocalStorage } from 'react-use';
import * as yup from 'yup';

import Icon from '../../components/Icon';
import Input from '../../components/Input';

const validationSchema = yup.object().shape({
  name: yup.string().required('Informe seu nome'),
  username: yup.string().required('Informe seu nome de usuário'),
  email: yup
    .string()
    .email('Informe um e-mail válido')
    .required('Informe seu e-mail'),
  password: yup.string().required('Informe sua senha'),
});

const Signup = () => {
  const [auth, setAuth] = useLocalStorage('auth', {});

  const createUser = async (values) => {
    try {
      const response = await axios({
        method: 'POST',
        baseURL: import.meta.env.VITE_API_URL,
        url: '/users',
        data: values,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const formik = useFormik({
    onSubmit: createUser,
    initialValues: {
      name: '',
      username: '',
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
          <h2 className="text-xl font-bold">Crie sua conta</h2>
        </div>

        <form className="space-y-6 p-4" onSubmit={formik.handleSubmit}>
          <Input
            type="text"
            name="name"
            label="Seu nome"
            placeholder="Digite seu nome"
            error={formik.touched.name && formik.errors.name}
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />

          <Input
            type="text"
            name="username"
            label="Seu nome de usuário"
            placeholder="Digite seu nome de usuário"
            error={formik.touched.username && formik.errors.username}
            value={formik.values.username}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
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
            disabled={!formik.isValid || formik.isSubmitting}
            type="submit"
            className={`w-full text-white text-center bg-red-500 
                    border border-white text-xl px-6 py-4 rounded-xl
                    disabled:opacity-50 flex justify-center`}
          >
            {formik.isSubmitting ? (
              <SpinnerGap className="animate-spin" size={32} />
            ) : (
              'Criar minha conta'
            )}
          </button>
        </form>
      </main>
    </div>
  );
};

export default Signup;
