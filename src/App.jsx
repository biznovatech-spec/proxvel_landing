import useScrollReveal from './hooks/useScrollReveal';
import GlobalAmbient from './components/GlobalAmbient';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Manifesto from './components/Manifesto';
import Engine from './components/Engine';
import Factors from './components/Factors';
import CinematicDestinations from './components/CinematicDestinations';
import HowItWorks from './components/HowItWorks';
import Faq from './components/Faq';
import BetaAccess from './components/BetaAccess';
import Footer from './components/Footer';

export default function App() {
  useScrollReveal();

  return (
    <>
      <GlobalAmbient />
      <Navbar />
      <main>
        <Hero />
        <Manifesto />
        <Engine />
        <Factors />
        <CinematicDestinations />
        <HowItWorks />
        <Faq />
        <BetaAccess />
      </main>
      <Footer />
    </>
  );
}
