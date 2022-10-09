import { useRouteError } from 'react-router-dom';

export const NotFound = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-red-700 text-red-300 font-bold text-xl">
      <h1>Oops!</h1>
      <div>
        <p>Parece que isso não existe mais.</p>
      </div>
    </div>
  );
};

export default NotFound;
