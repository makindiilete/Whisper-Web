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
import OneCreateAccountPage from "./pages/Registration/1CreateAccount.page";
import TwoLoginPage from "./pages/Registration/2Login.page";
import ForgotPasswordPage from "./pages/Registration/3ForgotPassword.page";
import ResetPasswordPage from "./pages/Registration/4ResetPassword.page";
import TypeOfUserPage from "./pages/Registration/5UserType/5TypeOfUser.page";
import CreateYourProfilePage from "./pages/Registration/6Profile/6CreateYourProfile.page";
import VerifyYourPhoneNumberPage from "./pages/Registration/7VerifyYourPhoneNumber.page";
import YourAttributesPage from "./pages/Registration/8YourAttributes.page";
import AboutYourselfPage from "./pages/Registration/9AboutYourself.page";
import ProviderTypeOfServicePage from "./pages/Registration/5UserType/5ProviderTypeOfService.page";

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
            <Route exact component={TwoLoginPage} path={routes.login} />
            <Route
              exact
              component={ForgotPasswordPage}
              path={routes.forgotPassword}
            />{" "}
            <Route
              exact
              component={ResetPasswordPage}
              path={routes.resetPassword}
            />
            <Route exact component={TypeOfUserPage} path={routes.usertype} />
            <Route
              exact
              component={ProviderTypeOfServicePage}
              path={routes.providerServiceType}
            />
            <Route
              exact
              component={CreateYourProfilePage}
              path={routes.createyourprofile}
            />
            <Route
              exact
              component={VerifyYourPhoneNumberPage}
              path={routes.verifyphonenumber}
            />
            <Route
              exact
              component={YourAttributesPage}
              path={routes.yourAttributes}
            />
            <Route
              exact
              component={AboutYourselfPage}
              path={routes.aboutYourself}
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
