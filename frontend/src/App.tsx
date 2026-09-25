import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CheeseList } from "./components/CheeseList";
import { CheeseDetail } from "./pages/CheeseDetail";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CheeseList />} />
        <Route path="/cheese/:id" element={<CheeseDetail />} />
      </Routes>
    </BrowserRouter>
  );
}