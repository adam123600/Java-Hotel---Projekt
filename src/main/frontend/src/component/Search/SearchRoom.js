import React, { Component } from "react";
import SearchRoomService from "../../SearchEngine/SearchRoomService";
import { Redirect } from 'react-router-dom'

export default class SearchRoom extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            input: "",
        }

        this.handleChange = this.handleChange.bind(this);
        //this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        console.log(event.target.value)
        this.setState({
            input: event.target.value,
            renderRoom: false,
        })
    }

    handleSubmit = event =>  {
        event.preventDefault();
        SearchRoomService.searchByRoomName(this.state.input).then(response =>{
            if(response.roomName == this.state.input)
                this.setState({renderRoom: true});
        });
    }

    render() {
        return(
            <div>
                <div>
                <form onSubmit={this.handleSubmit}>
                    <label>Podaj numer pokoju:</label>
                    <input type="text" name="input" value={this.state.input} onChange={event => {event.preventDefault(); this.setState({input: event.target.value})}}/>
                    <input type="submit" value={'Szukaj'}/>
                </form>
                </div>
                {this.state.renderRoom && <Redirect to={'/rooms/'+this.state.input} />}
            </div>
        )
    }
}