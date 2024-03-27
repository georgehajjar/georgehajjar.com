import { Footer, Header } from './components';
import { Landing, About, Work } from './views';
import './styles.scss';

export default function App() {
  return (
    <>
      <Header />
      <Landing />
      <About />
      <Work />
      <Footer />
    </>
  );
}
