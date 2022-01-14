import React, {Component} from "react";

import './people-page.css';
import ItemList from "../item-list";
import ItemDetails from "../item-details";
import SwapiService from "../../services/swapi-service";
import ErrorBoundry from "../error-boundry";
import Row from "../row";


export default class PeoplePage extends Component {
    swapiService = new SwapiService();

    state = {
        selectedPerson: null,

    }
    onPersonSelected = (id) => {
        this.setState({
            selectedPerson: id
        });
    };


    render() {


        const itemList = (
            <ItemList onItemSelected={this.onPersonSelected}
                      getData={this.swapiService.getAllPeople}>

                {(item) => `${item.name}`}
            </ItemList>
        )

        const personDetailes = (
            <ItemDetails personId={this.state.selectedPerson}/>
        )


        return (
            <ErrorBoundry>
                <Row leftItem={itemList} rightItem={personDetailes}/>
            </ErrorBoundry>)

    }
}