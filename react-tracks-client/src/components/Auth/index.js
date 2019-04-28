import React, { useState } from "react";
import withRoot from "../../withRoot";
import Register from './Register';
import Login from "./Login";

export default withRoot(() => {
  const [newUser, setNewUser] = useState(true);

  return newUser ? (<Register setNewUser={setNewUser} />) : (<Login setNewUser={setNewUser} />);

});
