const Home = () => {
  return (
    <div className="h-screen p-4 bg-red-700 text-white flex flex-col items-center space-y-6">
      <header className="container max-w-5xl p-4 flex justify-center">
        <img className="w-40" src="/imgs/logo-fundo-vinho.svg" alt="logo" />
      </header>

      <div
        className={`container max-w-5xl md:flex-row md:space-y-0 md:space-x-6 
          flex flex-col flex-1 items-center space-y-6 p-4`}
      >
        <div className="md:flex-1 flex justify-center">
          <img className="w-full max-w-md" src="/imgs/img.png" alt="" />
        </div>

        <div className="md:flex-1 flex flex-col space-y-6 ">
          <h1 className="md:text-left text-3xl text-center font-bold">
            Dê o seu palpite na Copa do Mundo do Catar 2022!
          </h1>

          <a
            href="/signup"
            className="text-red-700 text-center bg-white text-xl px-8 py-4 rounded-xl"
          >
            Criar minha conta
          </a>

          <a
            href="/login"
            className="text-white text-center border border-white text-xl px-8 py-4 rounded-xl"
          >
            Fazer login
          </a>
        </div>
      </div>
    </div>
  );
};

export default Home;
