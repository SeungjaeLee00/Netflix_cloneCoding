import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "../../layout/Header";

const Home = () => {
  return (
    <div id="app">
      <Header />
      <div id="container">
        {/* 라우터 설정 */}
        <Router>
          <Switch>
            <Route path="/" exact>
              {/* 기본 라우트 설정 */}
              <h1>Welcome to Home Page</h1>
            </Route>
            {/* 다른 경로들 추가 */}
          </Switch>
        </Router>
      </div>
    </div>
  );
};

export default Home;
