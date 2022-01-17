import "./App.less";
import AOS from "aos";
import "aos/dist/aos.css";
import { BrowserRouter as Router, Switch, useHistory } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useState } from "react";
import { AuthContext } from "./Utils/context";

AOS.init();

function App() {
  const history = useHistory();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <div className="App">
        <Router history={history}>
          <Switch>

          </Switch>
        </Router>
        <ToastContainer
          closeButton={false}
          position="top-right"
          pauseOnFocusLoss={false}
          hideProgressBar
          pauseOnHover
        />
      </div>
    </AuthContext.Provider>
  );
}

export default App;
