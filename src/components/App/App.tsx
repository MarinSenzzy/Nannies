import { Route, Routes } from 'react-router';
import Home from '../pages/Home/Home';
import Nannies from '../pages/Nannies/Nannies';
import Layout from '../Layout/Layout';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from '../../context/AuthProvider';
function App() {
  return (
    <>
      <AuthProvider>
        <Toaster position="top-right" reverseOrder={false} />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />

            <Route path="nannies" element={<Nannies />} />
          </Route>
        </Routes>
      </AuthProvider>
    </>
  );
}

export default App;
