
import Icon from '../../components/Icon';

const Dashboard = () => {

  return (
    <div className="">
    
    <header className="p-4 border-b border-red-700">
        <div className="container max-w-5xl flex justify-between">
          <img className="w-28 md:w-40" src="/imgs/logo-fundo-vermelho.svg" alt="logo" />
          <Icon name='profile' className="w-10"/>
        </div>
      </header>

      <main>

        <div className="space-y-6 bg-red-500 text-white">

          <div className="container max-w-3xl text-white">

          <Icon name='back' className="text-red-100"/>
          <h3>Dunha</h3>
          </div>
        </div>
      </main>

    </div>
  )
}

export default Dashboard