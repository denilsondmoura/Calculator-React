import React, {Component} from 'react'
import './Calculadora.css'
import Button from './components/Button'
import Display from './components/Display'

const initalState = {
    displayValue: 0,
    clearDisplay: false,
    operation: null,
    values: [0, 0],
    current: 0
}

export default class Calculadora extends Component {
    state = {...initalState}

    clearMemory () {
        this.setState({...initalState})
    }

    setOperation (operation) {
        if (this.state.displayValue === 0) {
            return
        }

        if (this.state.operation) {
            return
        }

        const currentState = {
            displayValue: 0,
            clearDisplay: false,
            operation: operation,
            values: [this.state.displayValue, 0],
            current: 1
        }

        this.setState({...currentState})

        console.log("State: ", this.state)
    }

    resolve () {
        if (this.state.operation) {
            const op = this.state.operation
            let result = 0

            if (op ==='/') {
                result = parseFloat(this.state.values[0]) / parseFloat(this.state.displayValue)
            } else if (op ==='*') {
                result = parseFloat(this.state.values[0]) * parseFloat(this.state.displayValue)
            } else if (op ==='-') {
                result = parseFloat(this.state.values[0]) - parseFloat(this.state.displayValue)
            } else {
                result = parseFloat(this.state.values[0]) + parseFloat(this.state.displayValue)
            }

            const currentState = {
                displayValue: result,
                clearDisplay: false,
                operation: null,
                values: [result, 0],
                current: 1
            }

            this.setState({...currentState})
        }
    }

    addDigit (digit) {
        if (digit === '.' && this.state.displayValue === 0) {
            return
        }

        if (digit === '.' && this.state.displayValue.includes('.')) {
            return
        }

        if (digit === '0' && this.state.displayValue === 0) {
            return
        }

        const clearDisplay = this.state.displayValue === 0 || this.state.clearDisplay
        const currentValue = clearDisplay ? '' : this.state.displayValue
        const displayValue = currentValue + digit

        this.setState({displayValue: displayValue})
    }

    render() {
        const addDigit = (digit) => this.addDigit(digit)
        const setOperation = (op) => this.setOperation(op)
        const resolve = () => this.resolve()

        return (
            <div className="calculator">
                <Display value={this.state.displayValue}/>
                <Button value='AC' triple={true} click={() => this.clearMemory()}/>
                <Button value='/' operation={true} click={setOperation}/>
                <Button value='7' click={addDigit}/>
                <Button value='8' click={addDigit}/>
                <Button value='9' click={addDigit}/>
                <Button value='*' operation={true} click={setOperation}/>
                <Button value='4' click={addDigit}/>
                <Button value='5' click={addDigit}/>
                <Button value='6' click={addDigit}/>
                <Button value='-' operation={true} click={setOperation}/>
                <Button value='1' click={addDigit}/>
                <Button value='2' click={addDigit}/>
                <Button value='3' click={addDigit}/>
                <Button value='+' operation={true} click={setOperation}/>
                <Button value='0' double={true} click={addDigit}/>
                <Button value='.' click={addDigit}/>
                <Button value='=' operation={true} click={resolve}/>
            </div>
        )
    }
}