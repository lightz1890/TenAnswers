import "./App.css";
import { Screen } from "./components/Components";
import { HomePage } from "./pages/HomePage";
import { HashRouter, Routes, Route } from "react-router-dom";
import StartGame from "./pages/StartGame";

function App() {
  return (
    <div className="backgroundStyle">
      <Screen>
        <HashRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/easy" element={<StartGame gameMode='easy' />} />
            <Route path="/normal" element={<StartGame gameMode='normal' />} />
          </Routes>
        </HashRouter>
      </Screen>
    </div>
  );
}

export default App;
