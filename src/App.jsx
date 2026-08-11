import Book from "./components/Book";
import MobilePortfolio from "./components/MobilePortfolio";
import "./index.css";

function App() {
  return (
    <>
      <div className="desktop-only">
        <Book />
      </div>

      <div className="mobile-only">
        <MobilePortfolio />
      </div>
    </>
  );
}

export default App;