import back from '../../assets/back.svg';
import arrowLeft from '../../assets/arrow-left.svg';
import arrowRight from '../../assets/arrow-right.svg';
import profile from '../../assets/profile.svg';

const icons = {
  back,
  arrowLeft,
  arrowRight,
  profile
};

const Icon = ({ name, ...props }) => {
  return <img src={icons[name]} {...props} />;
};

export default Icon;
