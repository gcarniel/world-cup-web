import Card from '../../components/Card';
import Icon from '../../components/Icon';

const Profile = () => {
  return (
    <>
      <header className="bg-red-500 text-white p-4">
        <div className="container max-w-5xl flex justify-between ">
          <img
            className="w-28 md:w-40"
            src="/imgs/logo-fundo-vermelho.svg"
            alt="logo"
          />
          <Icon name="profile" className="w-10" />
        </div>
      </header>

      <main className="space-y-4">
        <section id="header" className="bg-red-500 text-white">
          <div className="container max-w-3xl space-y-2 p-2">
            <a href="/dashboard">
              <Icon name="back" className="w-8" />
            </a>
            <h3 className="text-2xl font-bold">Olá, Dunha</h3>
          </div>
        </section>

        <section id="content" className="container max-w-3xl p-4 space-y-4 ">
          <h2 className="text-xl font-bold text-red-500 ">Seus palpites</h2>

          <div className="p-4 flex items-center justify-center space-x-4 text-red-500">
            <Icon name="arrowLeft" className="w-6 text-red-500" />
            <span className="font-bold">{new Date().toDateString()}</span>
            <Icon name="arrowRight" className="w-6 text-red-500" />
          </div>

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

export default Profile;
