import back from '../../assets/back.svg';

const icons = {
  back,
};

const Icon = ({ name, ...props }) => {
  return <img src={icons[name]} {...props} />;
};

export default Icon;
