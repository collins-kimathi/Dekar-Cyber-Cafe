import { NavLink, Route, Routes } from "react-router-dom";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import BulkOrderPage from "./pages/BulkOrderPage";
import MyOrdersPage from "./pages/MyOrdersPage";
import AdminDashboardPage from "./pages/AdminDashboardPage";

function App() {
  return (
    <div className="app-shell">
      <Header />
      <main className="container">
        <nav className="tabs">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/login">Login</NavLink>
          <NavLink to="/register">Register</NavLink>
          <NavLink to="/bulk-order">Bulk Order</NavLink>
          <NavLink to="/my-orders">My Orders</NavLink>
          <NavLink to="/admin">Admin</NavLink>
        </nav>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/bulk-order" element={<BulkOrderPage />} />
          <Route path="/my-orders" element={<MyOrdersPage />} />
          <Route path="/admin" element={<AdminDashboardPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
