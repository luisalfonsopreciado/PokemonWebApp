import React, { useMemo, useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import Layout from "./hoc/Layout/Layout";
import { UserContext } from "./context/userContext";
import { refresh } from "./context/userActions";

const App = () => {
  const [user, setUser] = useState(null);
  const providerValue = useMemo(() => ({ user, setUser }), [user, setUser]);

  useEffect(() => refresh(setUser), []);

  return (
    <UserContext.Provider value={providerValue}>
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    </UserContext.Provider>
  );
};

export default App;
