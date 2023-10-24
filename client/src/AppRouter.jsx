import React from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';
// import PDFs from './components/Pdfs';
// import Hero from './components/Hero';
import PaymentComponent from './components/Payment';

import App from './App';

const AppRouter = () => {
  return (
    <Router>
      <Route>
        <Route path="/" exact component={App} />
        <Route path="/payment" component={PaymentComponent} />
      </Route>
    </Router>
  );
};

export default AppRouter;
