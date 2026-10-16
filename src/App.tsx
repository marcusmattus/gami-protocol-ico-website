import { IS_LIVE } from "./config";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { TokenStats } from "./components/TokenStats";
import { HowToBuy } from "./components/HowToBuy";
import { BuySection } from "./components/BuySection";
import { RiskDisclosure } from "./components/RiskDisclosure";
import { Faq } from "./components/Faq";
import { Footer } from "./components/Footer";

export default function App({ privyReady }: { privyReady: boolean }) {
  return (
    <>
      <Header live={IS_LIVE} />
      <main>
        <Hero live={IS_LIVE} />
        <TokenStats />
        <HowToBuy />
        <BuySection privyReady={privyReady} />
        <RiskDisclosure />
        <Faq />
      </main>
      <Footer />
    </>
  );
}
