import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import TopPage from "./pages/TopPage";
import HaikuCreationPage from "./pages/HaikuCreationPage";
import HaikuAddCharacterPage from "./pages/HaikuAddCharacterPage";
import CompletedHaikuPage from "./pages/CompletedHaikuPage";
import MasterpieceHaikuPage from "./pages/MasterpieceHaikuPage";
import Navbar from "./components/Navbar";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <Router>
      <div className='App'>
        <Navbar />
        <Routes>
          <Route path='/login' element={<LoginPage />} />
          <Route
            path='/create'
            element={
              <PrivateRoute>
                <HaikuCreationPage />
              </PrivateRoute>
            }
          />
          <Route
            path='/add/:haikuId'
            element={
              <PrivateRoute>
                <HaikuAddCharacterPage />
              </PrivateRoute>
            }
          />
          <Route
            path='/completed'
            element={
              <PrivateRoute>
                <CompletedHaikuPage />
              </PrivateRoute>
            }
          />
          <Route
            path='/masterpieces'
            element={
              <PrivateRoute>
                <MasterpieceHaikuPage />
              </PrivateRoute>
            }
          />
          <Route
            path='/'
            element={
              <PrivateRoute>
                <TopPage />
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
