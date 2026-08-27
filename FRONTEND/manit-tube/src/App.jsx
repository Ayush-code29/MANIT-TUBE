import { Routes, Route } from "react-router-dom";

import MainLayout from "./components/layout/MainLayout";

import Home from "./pages/Home";
import Watch from "./pages/Watch";
import Upload from "./pages/Upload";
import Saved from "./pages/Saved";

import Login from "./pages/Login";
import Register from "./pages/Register";

function Placeholder({ title }) {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <h1 className="text-3xl font-bold">
        {title}
      </h1>
    </div>
  );
}

function App() {
  return (
    <Routes>
      {/* ================================
          AUTH ROUTES
          These routes are outside
          MainLayout
      ================================= */}

      <Route
        path="/login"
        element={<Login />}
      />

      <Route
        path="/register"
        element={<Register />}
      />

      {/* ================================
          MAIN APPLICATION
      ================================= */}

      <Route element={<MainLayout />}>
        {/* Home */}
        <Route
          path="/"
          element={<Home />}
        />

        {/* Watch Video */}
        <Route
          path="/watch/:videoId"
          element={<Watch />}
        />

        {/* Upload */}
        <Route
          path="/upload"
          element={<Upload />}
        />

        {/* Saved Videos */}
        <Route
          path="/saved"
          element={<Saved />}
        />

        {/* Search / Explore */}
        <Route
          path="/search"
          element={
            <Placeholder title="Explore" />
          }
        />

        {/* History */}
        <Route
          path="/history"
          element={
            <Placeholder title="History" />
          }
        />

        {/* Playlists */}
        <Route
          path="/playlists"
          element={
            <Placeholder title="Playlists" />
          }
        />
      </Route>

      {/* ================================
          404
      ================================= */}

      <Route
        path="*"
        element={
          <Placeholder title="404 - Page Not Found" />
        }
      />
    </Routes>
  );
}

export default App;