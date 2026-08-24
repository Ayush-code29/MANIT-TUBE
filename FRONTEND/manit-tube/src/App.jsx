import { Routes, Route } from "react-router-dom";

import MainLayout from "./components/layout/MainLayout";

import Home from "./pages/Home";
import Watch from "./pages/Watch";
import Upload from "./pages/Upload";

import Login from "./pages/Login";
import Register from "./pages/Register";

import ProtectedRoute from "./routes/ProtectedRoute";

function Placeholder({ title }) {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <h1 className="text-3xl font-bold">{title}</h1>
    </div>
  );
}

export default function App() {
  return (
    <Routes>

      {/* Public pages */}
      <Route element={<MainLayout />}>

        <Route path="/" element={<Home />} />

        <Route
          path="/watch/:videoId"
          element={<Watch />}
        />

        <Route
          path="/search"
          element={<Placeholder title="Explore" />}
        />

        <Route
          path="/history"
          element={<Placeholder title="History" />}
        />

        <Route
          path="/playlists"
          element={<Placeholder title="Playlists" />}
        />

        {/* Protected pages */}
        <Route element={<ProtectedRoute />}>
          <Route
            path="/upload"
            element={<Upload />}
          />
        </Route>

      </Route>

      {/* Auth pages */}
      <Route
        path="/login"
        element={<Login />}
      />

      <Route
        path="/register"
        element={<Register />}
      />

      <Route
        path="*"
        element={<Placeholder title="404 - Page Not Found" />}
      />

    </Routes>
  );
}