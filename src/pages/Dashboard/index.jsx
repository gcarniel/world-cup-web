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

  const [hunches, doFetchHunches] = useAsyncFn(async () => {
    const resp = await axios({
      method: 'GET',
      baseURL: import.meta.env.VITE_API_URL,
      url: `${auth.user.username}`,
    });

    const hunchesMap = resp?.data?.hunches?.reduce((acc, hunch) => {
      acc[hunch.gameId] = hunch;
      return acc;
    }, {});

    return hunchesMap;
  });

  const [games, doFetchGames] = useAsyncFn(async (params) => {
    const resp = await axios({
      method: 'GET',
      baseURL: import.meta.env.VITE_API_URL,
      url: '/games',
      params,
    });

    return resp.data;
  });

  const isLoading = hunches.loading || games.loading;
  const hasError = hunches.error || games.error;

  useEffect(() => {
    doFetchGames({ gameTime: selectedDate });
    doFetchHunches();
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
          <a href={`/${auth?.user?.username}`}>
            <Icon name="profile" className="w-10" />
          </a>
        </div>
      </header>

      <main className="space-y-4">
        <section id="header" className="bg-red-500 text-white">
          <div className="container max-w-3xl space-y-2 p-2">
            <span>Olá, {auth.user.name}</span>
            <h3 className="text-2xl font-bold">Qual é o seu palpite?</h3>
          </div>
        </section>

        <section id="content" className="container max-w-3xl p-4 space-y-4 ">
          <DateSelect date={selectedDate} onChange={setSelectedDate} />

          <div className="space-y-4">
            {isLoading && 'Carregando jogos...'}
            {hasError && 'Algo inesperado aconteceu.'}

            {!isLoading &&
              !hasError &&
              games.value?.map((game) => {
                return (
                  <Card
                    key={game.id}
                    gameId={game.id}
                    homeTeam={game.homeTeam}
                    awayTeam={game.awayTeam}
                    gameTime={format(new Date(game.gameTime), 'H:mm')}
                    homeTeamScore={hunches.value?.[game.id]?.homeTeamScore}
                    awayTeamScore={hunches.value?.[game.id]?.awayTeamScore}
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
