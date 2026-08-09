import { Routes, Route } from "react-router-dom";

import MainLayout from "./components/layout/MainLayout";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Watch from "./pages/Watch";
import Search from "./pages/Search";
import Channel from "./pages/Channel";
import History from "./pages/History";
import Subscriptions from "./pages/Subscriptions";
import Playlists from "./pages/Playlists";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <Routes>

      {/* Main Application */}
      <Route element={<MainLayout />}>

        <Route path="/" element={<Home />} />

        <Route path="/watch/:id" element={<Watch />} />

        <Route path="/search" element={<Search />} />

        <Route
          path="/channel/:username"
          element={<Channel />}
        />

        <Route path="/history" element={<History />} />

        <Route
          path="/subscriptions"
          element={<Subscriptions />}
        />

        <Route
          path="/playlists"
          element={<Playlists />}
        />

      </Route>

      {/* Authentication */}
      <Route path="/login" element={<Login />} />

      <Route
        path="/register"
        element={<Register />}
      />

      {/* 404 */}
      <Route path="*" element={<NotFound />} />

    </Routes>
  );
}

export default App;