import { Routes, Route } from 'react-router-dom';

import {
  Home,
  Signin,
  NotFound,
  SignUpAsRider,
  SignUpToRide,
  Payment,
} from './pages';

function App() {
  return (
    <div className="font-text">
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path="/" element={<Home />} />
        <Route path="signin" element={<Signin />} />
        <Route path="signup-as-rider" element={<SignUpAsRider />} />
        <Route path="signup-to-ride" element={<SignUpToRide />} />
        <Route path="payment/:id" element={<Payment />} />
      </Routes>
    </div>
  );
}
export default App;
