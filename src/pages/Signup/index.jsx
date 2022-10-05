import Icon from '~/components/Icon';
import Input from '~/components/Input';

const Signup = () => {
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

        <form className="space-y-6 p-4">
          <Input
            type="text"
            name="name"
            label="Seu nome"
            placeholder="Digite seu nome"
          />

          <Input
            type="text"
            name="username"
            label="Seu nome de usuário"
            placeholder="Digite seu nome de usuário"
          />
          <Input
            type="text"
            name="email"
            label="Seu e-mail"
            placeholder="Digite seu e-mail"
          />

          <Input
            type="password"
            name="password"
            label="Sua senha"
            placeholder="Digite sua senha"
          />

          <a href='/dashboard' className="block w-full text-white text-center bg-red-500 border border-white text-xl px-6 py-4 rounded-xl">
            Criar minha conta
          </a>
        </form>
      </main>
    </div>
  );
};

export default Signup;
