import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { PrivateRoute } from "./auth/PrivateRoute";
import store from './store';
import './App.css';
import 'antd/dist/antd.css';
import DashboardContainer from "./containers/Dashboard";
import ReportContainer from "./containers/Report";
import PictureRecognizeContainer from "./containers/PictureRecognize";
import WebcamRecognizeContainer from "./containers/WebcamRecognize";
import LinearRegressionContainer from "./containers/LinearRegression";
import WebcamClassifierContainer from "./containers/WebcamClassifier";
import ImageClassifierContainer from "./containers/ImageClassifier";
import MultiRegressionContainer from "./containers/MultiRegression";
import PredictingDiabetesContainer from "./containers/PredictingDiabetes";
class App extends Component {

  state = {
    collapsed: false,
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }

  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
            <Switch>      
              <PrivateRoute exact path="/" component={DashboardContainer} breadcrumb="Painel de Controle"/>
              <PrivateRoute exact path="/relatorios" component={ReportContainer} breadcrumb="Relatórios"/>
              <PrivateRoute exact path="/pictureRecognize" component={PictureRecognizeContainer} breadcrumb="Image Recognize"/>
              <PrivateRoute exact path="/webcamRecognize" component={WebcamRecognizeContainer} breadcrumb="Webcam Recognize"/>
              <PrivateRoute exact path="/linearRegression" component={LinearRegressionContainer} breadcrumb="Linear Regression"/>
              <PrivateRoute exact path="/webcamClassifier" component={WebcamClassifierContainer} breadcrumb="Webcam Classifier"/>
              <PrivateRoute exact path="/imageClassifier" component={ImageClassifierContainer} breadcrumb="Image Classifier"/>
              <PrivateRoute exact path="/multiRegression" component={MultiRegressionContainer} breadcrumb="Multi Regression"/>
              <PrivateRoute exact path="/predictingDiabetes" component={PredictingDiabetesContainer} breadcrumb="Predicting Diabetes"/>
              <Redirect to="/"/>
            </Switch>
          </BrowserRouter>
      </Provider>
    );  
  }
}

export default App;
