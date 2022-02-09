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
import LandingPage from "./pages/Landing/Landing.page";
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
import UploadPhotosPage from "./pages/Registration/10UploadPhotos.page";
import WhatTypeOfServiceAreYouProvidingPage from "./pages/Registration/11ProviderServiceSettings/11WhatTypeOfServiceAreYouProviding.page";
import WhatAreYouLookingForPage from "./pages/Registration/11WhatAreYouLookingFor.page";
import WhoWillYouProvideToPage from "./pages/Registration/11ProviderServiceSettings/12WhoWillYouProvideTo.page";
import SelectTypeOfServicePage from "./pages/Registration/11ProviderServiceSettings/13SelectTypeOfService.page";
import CustomerPreferencesPage from "./pages/Registration/12CustomerPreferences.page";
import ProviderPreferencesPage from "./pages/Registration/12ProviderPreferences.page";
import NotFound from "./pages/NotFound";
import LoggedAreaRoute from "./Layout/LoggedAreaRoute";
import ProviderHomePage from "./pages/Home/ProviderHome.page";
import CustomerHomePage from "./pages/Home/CustomerHome.page";
import WalletPage from "./pages/Wallet.page";
import ProfilePage from "./pages/Profile/Profile.page";
import EditProfilePage from "./pages/Profile/EditProfile.page";
import AboutPage from "./pages/OtherLinks/About.page";
import ContactPage from "./pages/OtherLinks/Contact.page";
import TermsPage from "./pages/OtherLinks/Terms.page";
import PrivacyPage from "./pages/OtherLinks/Privacy.page";
import FaqPage from "./pages/OtherLinks/Faq.page";
import ChatPage from "./pages/Messaging/Chat.page";

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
            <Route exact component={AboutPage} path={routes.ABOUT} />
            <Route exact component={ContactPage} path={routes.CONTACT} />
            <Route exact component={TermsPage} path={routes.TERMS} />
            <Route exact component={PrivacyPage} path={routes.PRIVACY} />
            <Route exact component={FaqPage} path={routes.FAQ} />
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
            <Route
              exact
              component={UploadPhotosPage}
              path={routes.uploadYourPhotos}
            />
            <Route
              exact
              component={WhatTypeOfServiceAreYouProvidingPage}
              path={routes.serviceYouWantToRender}
            />
            <Route
              exact
              component={WhatAreYouLookingForPage}
              path={routes.whatYouAreLookingFor}
            />
            <Route
              exact
              component={WhatAreYouLookingForPage}
              path={routes.whatYouAreLookingFor}
            />
            <Route
              exact
              component={WhoWillYouProvideToPage}
              path={routes.whoWillYouProvideTo}
            />
            <Route
              exact
              component={SelectTypeOfServicePage}
              path={routes.selectTypeOfServiceToProvide}
            />
            <Route
              exact
              component={CustomerPreferencesPage}
              path={routes.customerPreferences}
            />
            <Route
              exact
              component={ProviderPreferencesPage}
              path={routes.providerPreferences}
            />
            <LoggedAreaRoute
              exact
              component={CustomerHomePage}
              path={routes.CUSTOMER_HOME}
            />
            <LoggedAreaRoute
              exact
              component={ProviderHomePage}
              path={routes.PROVIDER_HOME}
            />
            <LoggedAreaRoute
              exact
              component={WalletPage}
              path={routes.WALLET}
            />
            <LoggedAreaRoute
              exact
              component={ProfilePage}
              path={routes.PROFILE}
            />
            <LoggedAreaRoute
              exact
              component={EditProfilePage}
              path={routes.EDIT_PROFILE}
            />
            <LoggedAreaRoute exact component={ChatPage} path={routes.CHAT} />
            <Route component={NotFound} path="*" />
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
