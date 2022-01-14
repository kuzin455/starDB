import React, {Component} from 'react';

import './item-list.css';
import SwapiService from "../../services/swapi-service";
import Spinner from "../spiner";

export default class ItemList extends Component {

    state = {
        peopleList: null
    };

    componentDidMount() {
        const {getData} = this.props;
        getData()
            .then((peopleList) => {
                this.setState({peopleList})
            })
    }

    renderItem(arr) {
        return arr.map((item) => {
            const {id} = item
            const label = this.props.children(item)
            return (
                <li className="list-group-item"
                    key={id}
                    onClick={() => this.props.onItemSelected(id)}>
                    {label}
                </li>
            )
        })
    }

    render() {

        const {peopleList} = this.state;
        if (!peopleList) {
            return <Spinner/>
        }
        const item = this.renderItem(peopleList)
        return (
            <ul className="item-list list-group">
                {item}
            </ul>
        );
    }
}
