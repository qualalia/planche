import React, { useState } from "react";
import { Modal, Header, Button, Form } from "semantic-ui-react";
import { LogIn, SignUp } from "../components";

export const LoginOrSignup = () => {
  const [isGuest, toggleIsGuest] = useState(false);
  const handleToggleGuest = () => {
    toggleIsGuest(!isGuest);
  };

  return !isGuest ? (
    <div id="sign-up-or-in">
      <LogIn />
      <div className="bottom-row-login">
        <div className="bottom-msg">
          <div id="sign-up-msg-hidden">
            {"To sign up, just enter email and password."}
          </div>
        </div>
        <div className="google-and-toggle-btn">
          {/* NavLink to `/auth/google` didn't work */}
          <a className="google-auth-msg" href="/auth/google">
            {"Or sign in with Google."}
          </a>
          <Button
            className="bottom-row-msg"
            onClick={handleToggleGuest}
            content="Need an account?"
          />
        </div>
      </div>
    </div>
  ) : (
    <div id="sign-up-or-in">
      <SignUp />
      <div className="bottom-row-login">
        <div className="bottom-msg">
          <div id="sign-up-msg">
            {"To sign up, all we need is an email and password."}
          </div>
        </div>
        <div className="google-and-toggle-btn">
          <a href="/auth/google">{"Or sign up with Google."}</a>
          <Button
            className="bottom-row-msg"
            onClick={handleToggleGuest}
            content="Already have an account?"
          />
        </div>
      </div>
    </div>
  );
};
