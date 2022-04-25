//Object.freeze ensures the object we pass here cannot be modified anywhere in our app
export default Object.freeze({
  LANDING: "/",
  ABOUT: "/about",
  CONTACT: "/contact",
  TERMS: "/terms",
  PRIVACY: "/privacy",
  FAQ: "/faq",
  CUSTOMER_HOME: "/home/customer",
  PROVIDER_HOME: "/home/provider",
  WALLET: "/wallet",
  SERVICE_REQUESTS: "/requests",
  PROFILE: "/profile",
  EDIT_PROFILE: "/edit_profile",
  CHAT: "/messaging",
  signup_createAccount: "/reg/create-account",
  login: "/reg/login",
  forgotPassword: "/reg/forgot-password",
  resetPassword: "/reg/reset-password",
  usertype: "/reg/user-type",
  providerServiceType: "/reg/provider-services",
  createyourprofile: "/reg/profile",
  verifyphonenumber: "/reg/phone-verification",
  yourAttributes: "/reg/attributes",
  aboutYourself: "/reg/about-you",
  uploadYourPhotos: "/reg/photo",
  whatYouAreLookingFor: "/reg/looking-for",
  serviceYouWantToRender: "/reg/service-to-render",
  whoWillYouProvideTo: "/reg/providing-to",
  selectTypeOfServiceToProvide: "/reg/select-services",
  providerPreferences: "/reg/provider-preferences",
  customerPreferences: "/reg/customer-preferences",
  STRIPE_CHECKOUT: "/checkout",
});
