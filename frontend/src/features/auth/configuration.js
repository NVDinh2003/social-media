export const OAuthConfig = {
  clientId: process.env.REACT_APP_GOOGLE_CLIENT_ID,
  redirectUri: "http://localhost:3000/authenticate",
  authUri: "https://accounts.google.com/o/oauth2/auth",
};
