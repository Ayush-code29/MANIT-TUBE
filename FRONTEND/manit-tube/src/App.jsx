import { Routes, Route } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";
import Home from "./pages/Home";

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

      <Route element={<MainLayout />}>

        <Route path="/" element={<Home />} />

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

      </Route>

      <Route
        path="*"
        element={<Placeholder title="404 - Page Not Found" />}
      />

    </Routes>
  );
}

export default App;