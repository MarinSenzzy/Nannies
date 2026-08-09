import { Route, Routes } from "react-router";
import Home from "../pages/Home/Home";
import Nannies from "../pages/Nannies/Nannies";
import Layout from "../Layout/Layout";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />

          <Route path="nannies" element={<Nannies />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
