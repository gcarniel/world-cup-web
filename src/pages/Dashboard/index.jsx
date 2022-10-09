import { Navigate } from 'react-router-dom';
import { useLocalStorage } from 'react-use';
import Card from '../../components/Card';
import DateSelect from '../../components/DateSelect';
import Icon from '../../components/Icon';

const Dashboard = () => {
  const [auth] = useLocalStorage('auth');

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
          <DateSelect />

          <div className="space-y-4">
            <Card
              teamA={{ slug: 'sui' }}
              teamB={{ slug: 'cam' }}
              match={{ time: '7:00' }}
            />
            <Card
              teamA={{ slug: 'uru' }}
              teamB={{ slug: 'cor' }}
              match={{ time: '9:00' }}
            />
            <Card
              teamA={{ slug: 'por' }}
              teamB={{ slug: 'gan' }}
              match={{ time: '11:00' }}
            />
          </div>
        </section>
      </main>
    </>
  );
};

export default Dashboard;
