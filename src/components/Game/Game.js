import React, { Component } from 'react';
import './Game.css';
import List from './List.js';

class Game extends Component {
    constructor() {
        super()
        this.state = {
            number: "",
            message: "",
            random: generateRandomNumber(100),
            attempts: 0,
            attemptList: [{
                attemptNumber: ""
            }]
        }
    }

    handleOnChange = e => {
        const {target: {value}} = e;
        console.log(value);

        if(e.keyCode === 13){
            e.preventDefault();
        }

        if (value.trim() > 0)
        {
            this.setState({
                number: value,
            });
        }

        this.setState({
            message: "",
        })

    }

    handleOnClick = () => {
        const number = parseInt(this.state.number);
        const random = parseInt(this.state.random);
        const text = calculateText(number, random);
        let newAttempts= this.state.attempts + 1;
        console.log(random);

        this.setState({
            attempts: newAttempts,
            attemptList:[
                ...this.state.attemptList,
                {
                    attemptNumber: number
                }
            ]
        })

        if(number !== random){
            this.setState({
                number: "",
                message: text,
            })
        }
        else{
            this.setState({
                message: text,
            })
        }
    }

    render() {
        return (
            <div className="Game">
                <p>Adivina el número que estoy pensando entre el 1 - 100</p>
                <input
                    type="number"
                    value = {this.state.number}
                    onChange = {this.handleOnChange} 
                />

                <button onClick={this.handleOnClick}>Probar</button>
                <h1 className={(this.state.message)&& ('flickering')}>{this.state.message}</h1>
                <h2 className={this.state.attempts}>Intentos: {this.state.attempts}</h2>
                <List
                    attempts={this.state.attemptList}
                />
            </div>
        );
    }
}

export default Game;

function generateRandomNumber(max, min=1) {
    return Math.floor(Math.random() *(max - min) + min);
}

function calculateText(number, random){
    const soClose = 5;
    const dif = Math.abs(random - number);

    if(number === random) {
        return "Felicidades, has acertado!!"
    }

    if(dif < soClose){

        if(number < random){
            return "Estás muy cerca!! Tu número es un POCO BAJO"
        }
        else{
            return "Estás muy cerca!! Tu número es un POCO ALTO"
        }
    }

    else{
        if(number < random){
            return "Tu numero es MUY BAJO!"
        }
        else{
            return "Tu numero es MUY ALTO!"
        }
    }
}