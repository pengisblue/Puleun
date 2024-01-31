import "./App.css";
import PotList from "./components/Pots/PotList";
import CreatePot from "./components/Pots/CreatePot";
// import Example from "./components/Example";

function App() {
  return (
    <div className="min-h-screen bg-amber-overlay px-6 pt-16">
      <CreatePot />
      <PotList />
    </div>
  );
}

export default App;
