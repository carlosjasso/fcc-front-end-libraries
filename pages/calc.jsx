import React from "react";
import Head from "next/head";
import Styles from "@styles/calc.module.scss";
import AppendFCCScript from "@lib/appendFCCScript";

const buttonType = {
    numeric: 0,
    clear: 1,
    operator: 2,
    equals: 3,
    interface: 4,
    extra: 5
};

const buttons = [
    {
        name: "zero",
        value: "0",
        type: buttonType.numeric
    },
    {
        name: "one",
        value: "1",
        type: buttonType.numeric
    },
    {
        name: "two",
        value: "2",
        type: buttonType.numeric
    },
    {
        name: "three",
        value: "3",
        type: buttonType.numeric
    },
    {
        name: "four",
        value: "4",
        type: buttonType.numeric
    },
    {
        name: "five",
        value: "5",
        type: buttonType.numeric
    },
    {
        name: "six",
        value: "6",
        type: buttonType.numeric
    },
    {
        name: "seven",
        value: "7",
        type: buttonType.numeric
    },
    {
        name: "eight",
        value: "8",
        type: buttonType.numeric
    },
    {
        name: "nine",
        value: "9",
        type: buttonType.numeric
    },
    {
        name: "decimal",
        value: ".",
        type: buttonType.numeric
    },
    {
        name: "add",
        value: "+",
        type: buttonType.operator
    },
    {
        name: "subtract",
        value: "-",
        type: buttonType.operator
    },
    {
        name: "multiply",
        value: "*",
        type: buttonType.operator
    },
    {
        name: "divide",
        value: "/",
        type: buttonType.operator
    },
    {
        name: "equals",
        value: "=",
        type: buttonType.equals
    },
    {
        name: "clear",
        value: "AC",
        type: buttonType.clear
    },
    {
        name: "cancel",
        value: "C",
        type: buttonType.interface
    },
    {
        name: "delete",
        value: "Del",
        type: buttonType.interface
    },
    {
        name: "github",
        value: "GH",
        type: buttonType.extra
    }
];

function Screen({ history, input, positive }) {
    return (
        <section className={Styles["display"]}>
            <div className={Styles["history"]}>
                {history}
            </div>
            <div className={Styles["bottom"]}>
                {!positive && <div className={Styles["negative"]}>
                    -
                </div>}
                <div id="display" className={Styles["input"]}>
                    {input}
                </div>
            </div>
        </section>
    );
}

class Button extends React.Component {
    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }
    
    // Event handlers
    handleClick() {
        this.props.clickHandler(this.props.button);
    }
    
    render() {
        const { name, value, type } = this.props.button;
        let style = "";
        switch (type) {
            case buttonType.numeric: style = "numeric"; break;
            case buttonType.operator: style = "operator"; break;
            case buttonType.equals: style = "result"; break;
            case buttonType.clear: style = "clear"; break;
            case buttonType.interface: style = "interface"; break;
            case buttonType.extra: style = "extra"; break;
        }
        
        return (
            <button id={name} className={Styles[style]} onClick={this.handleClick} >
                {value}
            </button>
        );
    }
}

class Pad extends React.Component {
    constructor (props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }

    // Event handlers
    handleClick(button) {
        this.props.clickHandler(button);
    }

    render() {
        const padOrder = [
            "AC", "C", "Del", "GH",
            "7",  "8",  "9",  "/",
            "4",  "5",  "6",  "*",
            "1",  "2",  "3",  "-",
            ".",  "0",  "=",  "+"
        ];
        const pad = padOrder.map(value => {
            const padButton = buttons.filter(button => button.value == value)[0];
            return (
                <Button 
                button={padButton} 
                clickHandler={this.handleClick}
                key={padButton.value} />
            );
        });
    
        return (
            <section className={Styles["pad"]}>
                {pad.map(button => button)}
            </section>
        );
    }
}

export default class Calculator extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);

        this.state = {
            history: "0",
            input: "0",
            cleared: true,
            lastOperator: null,
            positive: true,
            result: 0
        }
    }

    // Element lifecycle
    componentDidMount() {
        AppendFCCScript();
    }

    // Event handlers
    handleClick(button) {
        switch(button.type) {
            case buttonType.numeric: this.handleNumericButton(button); break;
            case buttonType.operator: this.handleOperatorButton(button); break;
            case buttonType.clear: this.handleClearButton(); break;
            case buttonType.equals: this.handleEqualsButton(button); break;
        }
    }

    // Util Functions
    handleNumericButton(button) {
        const input = this.state.input;
        let stateUpdate = this.state;
        if (this.state.cleared) {
            switch(button.value) {
                case ".":
                    stateUpdate.input = "0.";
                    stateUpdate.cleared = false;
                    break;
                case "0":
                    stateUpdate.input = button.value;
                    stateUpdate.cleared = true;
                    break;
                default:
                    stateUpdate.input = button.value;
                    stateUpdate.cleared = false;
                    break;
            };
        } else {
            switch(button.value) {
                case ".":
                    stateUpdate.input = input.includes(".") ? input : `${input}${button.value}`;
                    break;
                case "0":
                    if (input == 0) {
                        stateUpdate.input = button.value;
                        stateUpdate.cleared = true;
                    } else {
                        stateUpdate.input = `${input}${button.value}`;
                    }
                    break;
                default: 
                    stateUpdate.input = `${input}${button.value}`;
                    break;
            };
        }

        this.setState(stateUpdate);
    }

    handleClearButton() {
        this.setState({
            history: "0",
            input: "0",
            cleared: true,
            lastOperator: null,
            result: 0
        });
    }

    handleOperatorButton(button) {
        const history = this.state.history;
        const input = this.state.input;
        const numericInput = this.getNumericValue(input);
        const operators = buttons.filter(button => button.type == buttonType.operator);
        const substractButton = buttons.filter(button => button.value == "-")[0];
        let stateUpdate = this.state;

        if (this.state.lastOperator == null) {
            stateUpdate.lastOperator = button;
            stateUpdate.history = `${input}${button.value}`;
            stateUpdate.input = "0";
            stateUpdate.cleared = true;
            stateUpdate.result = numericInput;
        } else if(button == substractButton) {
            stateUpdate.positive = !this.state.positive;
        } else {
            const lastChar = history.slice(-1);
            const isLastCharOperator = operators.filter(button => button.value == lastChar).length > 0;
            const isNotEquals = button.type != buttonType.equals;
            if (this.state.cleared && isLastCharOperator && isNotEquals) {
                stateUpdate.lastOperator = button;
                stateUpdate.history = isNotEquals ? `${history.slice(0, -1)}${button.value}` : `${history.slice(0, -1)}${button.value}${this.state.result}`;
            } else {
                switch(this.state.lastOperator.value) {
                    case "+":
                        stateUpdate.result = this.state.result + numericInput;
                        break;
                    case "-":
                        stateUpdate.result = this.state.result - numericInput;
                        break;
                    case "*":
                        stateUpdate.result = this.state.result * numericInput;
                        break;
                    case "/":
                        stateUpdate.result = this.state.result / numericInput;
                        break;
                }
                if (isNotEquals) {
                    stateUpdate.history = `${history}${input}${button.value}`;
                    stateUpdate.input = `${stateUpdate.result}`;
                    stateUpdate.cleared = true;
                    stateUpdate.lastOperator = button;
                } else {
                    stateUpdate.history = `${history}${input}${button.value}${this.state.result}`;
                    stateUpdate.input = `${stateUpdate.result}`;
                    stateUpdate.cleared = true;
                    stateUpdate.lastOperator = null;
                }
            }
        }

        this.setState(stateUpdate);
    }

    handleEqualsButton(button) {
        if (this.state.lastOperator == null) {
            return;
        } else {
            this.handleOperatorButton(button);
        }
    }

    getNumericValue(value) {
        const isDecimal = value.includes(".");

        if (isDecimal) {
            return parseFloat(value);
        } else {
            return parseInt(value);
        }
    }

    render() {
        return (
            <main className={Styles["page-container"]}>
                <Head>
                    <title>FCC: Javascript Calculator</title>
                </Head>
                <img className={Styles["wallpaper"]} />
                <section className={Styles["calculator"]}>
                    <Screen 
                    history={this.state.history} 
                    input={this.state.input} 
                    positive={this.state.positive} />
                    <Pad clickHandler={this.handleClick} />
                </section>
            </main>
        );
    }
}