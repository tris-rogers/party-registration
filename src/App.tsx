import Header from "./features/header/header";
import PartiesContainer from "./features/parties/containers/parties-container";
import Footer from "./features/footer/footer";

export default function App() {
  return (
    <main className="app">

      <Header />

      <PartiesContainer />

      <Footer />
    </main>
  );
}
