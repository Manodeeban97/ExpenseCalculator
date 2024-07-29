import { app } from "./realmConfig";
import Realm from "realm";

// Log in an anonymous user
export const loginAnonymous = async () => {
  const user = await app.logIn(Realm.Credentials.anonymous());
  return user;
};

// Log in with email and password
export const loginWithEmailPassword = async (email, password) => {
  const credentials = Realm.Credentials.emailPassword(email, password);
  const user = await app.logIn(credentials);
  return user;
};
