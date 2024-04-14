import {Routes, Route} from "react-router";

import './App.css';

import HotelsPage from "./components/Pages/HotelsPage";
import HotelsNetworksPage from './components/Pages/HotelsNetworksPage';
import LocationsPage from './components/Pages/LocationsPage';
import UsersPage from './components/Pages/UsersPage';
import ReviewsPage from './components/Pages/ReviewsPage';

function App() {
  const routes = [
    {
      path: "/hotels",
      element: <HotelsPage />
    },
    {
      path: "/hotelsNetworks",
      element: <HotelsNetworksPage />
    },
    {
      path: "/locations",
      element: <LocationsPage />
    },
    {
      path: "/users",
      element: <UsersPage />
    },
    {
      path: "/reviews",
      element: <ReviewsPage />
    }
  ]
  return (
    <div className="App">
     <Routes>
        {routes.map((route, index) => <Route key={index} path={route.path} element={route.element} />)}
     </Routes>
    </div>
  );
}

export default App;
