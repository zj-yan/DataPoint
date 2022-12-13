import "./App.css";
import Graph from "./components/Graph";
import Form from "./components/Form";
import Login from "./components/Login";
import Calculator from "./components/Calculator";
import { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router";

function App() {
  const [userEmail, setUserEmail] = useState(
    localStorage.getItem("userEmail") || ""
  );
  const Logout = () => {
    localStorage.setItem("userEmail", "");
    setUserEmail("");
  };

  const RequireAuth = ({ children }) => {
    if (userEmail === "") {
      return <Login passUserEmail={setUserEmail} />;
    }
    return children;
  };

  return (
    <BrowserRouter>
      <div className="App">
        <div className="container mx-auto max-w-10xl text-center drop-shadow-lg text-gray-800">
          <h1 className="text-4xl py-8 mb-10 bg-emerald-400 text-white rounded">
            Track Purse
          </h1>

          <Routes>
            <Route
              index
              element={
                <RequireAuth>
                  <p>Welcome, {userEmail}</p>
                  <button className="button" onClick={Logout}>
                    Logout
                  </button>
                  <div className="grid md:grid-cols-2 gap-4">
                    <Graph />
                    <Form />
                    <Calculator />
                  </div>
                </RequireAuth>
              }
            />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
