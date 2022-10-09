import axios from 'axios';
import { format, formatISO } from 'date-fns';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAsyncFn, useLocalStorage } from 'react-use';
import Card from '../../components/Card';
import DateSelect from '../../components/DateSelect';
import Icon from '../../components/Icon';

const Profile = () => {
  const dateIso = formatISO(new Date(2022, 10, 20));
  const [selectedDate, setSelectedDate] = useState(dateIso);
  const [auth, setAuth] = useLocalStorage('auth');

  const { username } = useParams();
  const navigate = useNavigate();

  const [user, doFetchUser] = useAsyncFn(async () => {
    const resp = await axios({
      method: 'GET',
      baseURL: import.meta.env.VITE_API_URL,
      url: `${username}`,
    });

    const hunches = resp?.data.hunches?.reduce((acc, hunch) => {
      acc[hunch.gameId] = hunch;
      return acc;
    }, {});

    return {
      ...resp.data,
      hunches,
    };
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

  const isLoading = user.loading || games.loading;
  const hasError = user.error || games.error;

  const logout = () => {
    setAuth({});
    navigate('/login');
  };

  useEffect(() => {
    doFetchGames({ gameTime: selectedDate });
    doFetchUser();
  }, [selectedDate]);

  return (
    <>
      <header className="bg-red-500 text-white p-4">
        <div className="container max-w-5xl flex justify-between ">
          <a href="/dashboard">
            <img
              className="w-28 md:w-40"
              src="/imgs/logo-fundo-vermelho.svg"
              alt="logo"
            />
          </a>
          {/* <Icon name="profile" className="w-10" /> */}
          {auth?.user?.id && (
            <div className="cursor-pointer" onClick={logout}>
              Sair
            </div>
          )}
        </div>
      </header>

      <main className="space-y-4">
        <section id="header" className="bg-red-500 text-white">
          <div className="container max-w-3xl space-y-2 p-2">
            {auth?.user?.id && (
              <a href="/dashboard">
                <Icon name="back" className="w-8" />
              </a>
            )}
            <h3 className="text-2xl font-bold">Olá, {user?.value?.name}</h3>
          </div>
        </section>

        <section id="content" className="container max-w-3xl p-4 space-y-4 ">
          <h2 className="text-xl font-bold text-red-500 ">Seus palpites</h2>

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
                    homeTeamScore={user.value.hunches?.[game.id]?.homeTeamScore}
                    awayTeamScore={user.value.hunches?.[game.id]?.awayTeamScore}
                    disabled={true}
                  />
                );
              })}
          </div>
        </section>
      </main>
    </>
  );
};

export default Profile;
