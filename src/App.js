import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { auth, db } from "./firebase";
import Home from "./Home";
import Navbar from "./Navbar";
import Login from "./Login";
import { useEffect } from "react";
import { useStateValue } from "./StateProvider";
import { Drawer } from "@material-ui/core";
import Write from "./Write";
import Blog from "./Blog";

function App() {
  const [{ user }, dispatch] = useStateValue();

  useEffect(() => {
    auth.onAuthStateChanged((auth) => {
      // check auth and update state in context api
      if (auth) {
        dispatch({
          type: "SET_USER",
          user: auth,
        });
        let query = db.collection("users").where("uid", "==", auth.uid);
        query.onSnapshot((user) => {
          const data = user.docs[0].data();
          dispatch({
            type: "SET_ROLE",
            role: data.role,
          });
        });
      } else {
        dispatch({
          type: "SET_USER",
          user: null,
        });
        dispatch({
          type: "SET_ROLE",
          role: null,
        });
      }
    });
  }, []);

  return (
    <div className="app">
      <Write />
      <Router>
        {/* Navbar component comes here */}
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/blog/:id" component={Blog} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
