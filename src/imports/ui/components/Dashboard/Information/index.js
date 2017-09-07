import Header from './Header';
import Body from './InformationRouter';

const Information = () =>
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

export default Information;
