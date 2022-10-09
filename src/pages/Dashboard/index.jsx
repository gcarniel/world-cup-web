import axios from 'axios';
import { format, formatISO } from 'date-fns';
import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAsyncFn, useLocalStorage } from 'react-use';
import Card from '../../components/Card';
import DateSelect from '../../components/DateSelect';
import Icon from '../../components/Icon';

const Dashboard = () => {
  const dateIso = formatISO(new Date(2022, 10, 20));
  const [selectedDate, setSelectedDate] = useState(dateIso);
  const [auth] = useLocalStorage('auth');
  const [state, doFetch] = useAsyncFn(async (params) => {
    const resp = await axios({
      method: 'GET',
      baseURL: 'http://localhost:3000',
      url: '/games',
      params,
    });

    return resp.data;
  });

  useEffect(() => {
    doFetch({ gameTime: selectedDate });
  }, [selectedDate]);

  if (!auth?.user?.id) {
    return <Navigate to="/" replace={true} />;
  }

  return (
    <>
      <header className="bg-red-500 text-white p-4">
        <div className="container max-w-5xl flex justify-between">
          <img
            className="w-28 md:w-40"
            src="/imgs/logo-fundo-vermelho.svg"
            alt="logo"
          />
          <a href="/profile">
            <Icon name="profile" className="w-10" />
          </a>
        </div>
      </header>

      <main className="space-y-4">
        <section id="header" className="bg-red-500 text-white">
          <div className="container max-w-3xl space-y-2 p-2">
            <span>Olá, Dunha</span>
            <h3 className="text-2xl font-bold">Qual é o seu palpite?</h3>
          </div>
        </section>

        <section id="content" className="container max-w-3xl p-4 space-y-4 ">
          <DateSelect date={selectedDate} onChange={setSelectedDate} />

          <div className="space-y-4">
            {state.loading && 'Carregando jogos...'}
            {state.error && 'Algo inesperado aconteceu.'}

            {!state.loading &&
              !state.error &&
              state.value?.map((game) => {
                console.log(game);
                return (
                  <Card
                    key={game.id}
                    gameId={game.id}
                    homeTeam={game.homeTeam}
                    awayTeam={game.awayTeam}
                    gameTime={format(new Date(game.gameTime), 'H:mm')}
                  />
                );
              })}
          </div>
        </section>
      </main>
    </>
  );
};

export default Dashboard;
