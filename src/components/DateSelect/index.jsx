import { addDays, subDays, format, formatISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import Icon from '../Icon';

const DateSelect = ({ date, onChange }) => {
  const dateFormated = new Date(date);

  const prevDay = () => {
    const newDate = subDays(dateFormated, 1);
    onChange(formatISO(newDate));
  };
  const nextDay = () => {
    const newDate = addDays(dateFormated, 1);
    onChange(formatISO(newDate));
  };

  return (
    <div className="p-4 flex items-center justify-center space-x-4 text-red-500">
      <Icon
        name="arrowLeft"
        className="w-6 cursor-pointer text-red-500"
        onClick={prevDay}
      />
      <span className="font-bold">
        {format(new Date(date), "d 'de' MMMM", { locale: ptBR })}
      </span>
      <Icon
        name="arrowRight"
        className="w-6 cursor-pointer text-red-500"
        onClick={nextDay}
      />
    </div>
  );
};

export default DateSelect;
