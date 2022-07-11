import "./styles/App.css";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import UserPage from "./components/UserPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./components/MainPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignIn />}></Route>
        <Route path="/signin" element={<SignIn />}></Route>
        <Route path="/signup" element={<SignUp />}></Route>
        <Route path="/userPage" element={<UserPage />}></Route>
        <Route path="/mainPage" element={<MainPage />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
