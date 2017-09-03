import Header from './header';
import Body from './inputsRouter';

const Inputs = () =>
  <div
    style={{
      width: `${100}%`,
      height: `${100}%`,
      marginLeft: `${15}px`,
      marginRight: `${15}px`,
      paddingBottom: `${25}px`,
    }}
  >
    <Header />
    <Body />
  </div>;

export default Inputs;
