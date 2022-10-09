import axios from 'axios';
import { useFormik } from 'formik';
import { useLocalStorage } from 'react-use';
import * as yup from 'yup';

const validationSchema = yup.object().shape({
  homeTeamScore: yup.string().required(),
  awayTeamScore: yup.string().required(),
});

const Card = ({
  homeTeam,
  awayTeam,
  gameTime,
  gameId,
  homeTeamScore = '',
  awayTeamScore = '',
  disabled,
}) => {
  const [auth] = useLocalStorage('auth');
  const formik = useFormik({
    onSubmit: (values) => {
      axios({
        method: 'POST',
        baseURL: import.meta.env.VITE_API_URL,
        url: '/hunches',
        headers: {
          authorization: `Bearer ${auth.accessToken}`,
        },
        data: {
          ...values,
          gameId,
        },
      });
    },
    initialValues: {
      homeTeamScore,
      awayTeamScore,
    },
    validationSchema,
  });

  return (
    <div className="rounded-xl border border-gray-300 p-4 text-center space-y-2">
      <span className="text-sm md:text-base text-gray-700 font-bold">
        {gameTime}
      </span>
      <form className="flex space-x-6 justify-center items-center">
        <span className="uppercase">{homeTeam}</span>
        <img src={`/imgs/flags/${homeTeam}.png`} />
        <input
          type={disabled ? 'text' : 'number'}
          className="disabled:rounded-full bg-red-100 w-[55px] h-[55px] text-red-700 text-xl rounded-md text-center"
          min={0}
          name="homeTeamScore"
          disabled={disabled}
          value={formik.values.homeTeamScore}
          onChange={formik.handleChange}
          onBlur={formik.handleSubmit}
        />

        <span className="text-red-500 font-bold">X</span>

        <input
          type={disabled ? 'text' : 'number'}
          className="disabled:rounded-full bg-red-100 w-[55px] h-[55px] text-red-700 text-xl rounded-md text-center"
          min={0}
          name="awayTeamScore"
          disabled={disabled}
          value={formik.values.awayTeamScore}
          onChange={formik.handleChange}
          onBlur={formik.handleSubmit}
        />
        <img src={`/imgs/flags/${awayTeam}.png`} />
        <span className="uppercase">{awayTeam}</span>
      </form>
    </div>
  );
};

export default Card;
