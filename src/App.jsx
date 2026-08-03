import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Matches from "./pages/Matches";       // ✅ Import
import Requests from "./pages/Requests";
import Dashboard from "./pages/Dashboard";
import ProfileEdit from './pages/ProfileEdit';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Landing />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="profile" element={<Profile />} />
          <Route path="matches" element={<Matches />} />     {/* ✅ Route */}
          <Route path="requests" element={<Requests />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="profile/edit" element={<ProfileEdit />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;