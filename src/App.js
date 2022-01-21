import "./App.less";
import AOS from "aos";
import "aos/dist/aos.css";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useHistory,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useState } from "react";
import { AuthContext } from "./Utils/context";
import LandingPage from "./pages/Landing.page";
import PublicAreaRoute from "./Layout/PublicAreaRoute";
import routes from "./routes";
import OneCreateAccountPage from "./pages/Auth/OneCreateAccount.page";
import LoginPage from "./pages/Auth/Login.page";

AOS.init();

function App() {
  const history = useHistory();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <div className="App">
        <Router history={history}>
          <Switch>
            <PublicAreaRoute
              exact
              component={LandingPage}
              path={routes.LANDING}
            />
            <Route
              exact
              component={OneCreateAccountPage}
              path={routes.signup_createAccount}
            />
            <Route
                exact
                component={LoginPage}
                path={routes.login}
            />
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
