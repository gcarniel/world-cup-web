import axios from 'axios';
import { useFormik } from 'formik';
import { useLocalStorage } from 'react-use';
import * as yup from 'yup';

const validationSchema = yup.object().shape({
  homeTeamScore: yup.string().required(),
  awayTeamScore: yup.string().required(),
});

const Card = ({ homeTeam, awayTeam, gameTime, gameId }) => {
  const [auth] = useLocalStorage('auth');
  const formik = useFormik({
    onSubmit: (values) => {
      axios({
        method: 'POST',
        baseURL: 'http://localhost:3000',
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
      homeTeamScore: '',
      awayTeamScore: '',
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
          type="number"
          className="bg-red-50 w-[55px] h-[55px] text-red-700 text-xl rounded-md text-center"
          min={0}
          name="homeTeamScore"
          value={formik.values.homeTeamScore}
          onChange={formik.handleChange}
          onBlur={formik.handleSubmit}
        />

        <span className="text-red-500 font-bold">X</span>

        <input
          type="number"
          className="bg-red-50 w-[55px] h-[55px] text-red-700 text-xl rounded-md text-center"
          min={0}
          name="awayTeamScore"
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
