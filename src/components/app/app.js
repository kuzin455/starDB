import React, {Component} from 'react';
import Header from '../header';
import RandomPlanet from '../random-planet';
import ErrorBoundry from '../error-boundry';
import SwapiService from '../../services/swapi-service';
import DummySwapiService from '../../services/dummy-swapi-service';
import {PeoplePage, PlanetsPage, StarshipsPage} from '../pages';
import {SwapiServiceProvider} from '../swapi-service-context';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import './app.css';


export default class App extends Component {

    state = {
        swapiService: new SwapiService()
    };

    onServiceChange = () => {
        this.setState(({swapiService}) => {
            const Service = swapiService instanceof SwapiService ?
                DummySwapiService : SwapiService;
            return {
                swapiService: new Service()
            };
        });
    };

    render() {

        return (
            <ErrorBoundry>
                <SwapiServiceProvider value={this.state.swapiService}>
                    <Router>

                        <div className="stardb-app">
                            <Header onServiceChange={this.onServiceChange}/>
                            <RandomPlanet/>
                            <Routes>
                                <Route path='/' element={<h1>Hello to StarDB</h1>}
                                       exact={true}/>
                                <Route path='/people/' element={<PeoplePage/>}/>
                                <Route path='/planets/' element={<PlanetsPage/>}/>
                                <Route path='starships/' element={<StarshipsPage/>}/>

                            </Routes>
                        </div>

                    </Router>
                </SwapiServiceProvider>
            </ErrorBoundry>
        );
    }
}
