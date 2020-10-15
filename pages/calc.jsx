import React from "react";
import Head from "next/head";
import Styles from "@styles/calc.module.scss";
import AppendFCCScript from "@lib/appendFCCScript";

const buttonType = {
    numeric: "numeric",
    clear: "clear",
    operator: "operator",
    equals: "equals",
    interface: "interface",
    extra: "extra"
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
            <div id="display" className={Styles["input"]}>
                {positive ? input : `-${input}`}
            </div>
        </section>
    );
}

function Icon({ name }) {
    let icon;
    switch (name) {
        case "github":
            icon = <svg aria-hidden="true" focusable="false" data-prefix="fab" data-icon="github" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512"><path fill="currentColor" d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"></path></svg>;
            break;
    }
    return icon;
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
        let title = (name == "github") ? "View source" : name;
        
        return (
            <button id={name} title={title} className={Styles[type]} onClick={this.handleClick} >
                {(name == "github") ? <i><Icon name={name}/></i> : value}
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
            const padButton = buttons.filter(e => e.value == value)[0];
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
            result: 0,
            history: "0",
            input: "0",
            lastOperator: null,
            positive: true,
            cleared: true
        };
    }

    // Element lifecycle
    componentDidMount() {
        AppendFCCScript();
        document.addEventListener("keydown", this.handleKeydown);
    }

    componentWillUnmount() {
        document.removeEventListener("keydown", this.handleKeydown);
    }

    // Event handlers
    handleClick(button) {
        switch(button.type) {
            case buttonType.numeric: this.handleNumericButton(button); break;
            case buttonType.operator: this.handleOperatorButton(button); break;
            case buttonType.clear: this.handleClearButton(); break;
            case buttonType.equals: this.handleOperatorButton(button); break;
            case buttonType.interface: this.HandleInterfaceButton(button); break;
        }
    }

    handleKeydown(event) {
        let keyValue = event.key;
        switch (keyValue) {
            case "Enter": keyValue = "="; break;
            case "Escape": keyValue = "AC"; break;
            case "Backspace": keyValue = "C"; break;
            case "Delete": keyValue = "Del"; break;
            case "g": keyValue = "GH"; break;
            case "G": keyValue = "GH"; break;
        }

        const name = buttons.filter(e => e.value === keyValue)[0]?.name;
        if (typeof(name) === "undefined") return;
        
        const button = document.getElementById(name);
        button.click();
    }

    // Util Functions
    handleNumericButton(button) {
        const input = this.state.input;
        let state = this.state;

        if (this.state.lastOperator == null && this.state.cleared) state.history = "0";

        switch(button.value) {
            case ".":
                if (input.includes(".")) return;
                state.input = this.state.cleared ? "0." : `${input}${button.value}`;
                state.cleared = false;
                break;
            case "0":
                if (this.state.cleared || input == "0") return;
                state.input = `${input}${button.value}`;
                state.cleared = false;
                break;
            default:
                state.input = this.state.cleared ? button.value : `${input}${button.value}`
                state.cleared = false;
                break;
        };

        this.setState(state);
    }

    handleClearButton() {
        this.setState({
            result: 0,
            history: "0",
            input: "0",
            lastOperator: null,
            positive: true,
            cleared: true
        });
    }

    handleOperatorButton(button) {
        const input = this.state.input;
        let state = this.state;

        if (this.state.lastOperator == null) {
            if (button.value == "=") return;
            
            state.result = this.getNumericValue(input);
            state.history = `${input}${button.value}`;
            state.input = "0";
            state.lastOperator = button;
            state.positive = true;
            state.cleared = true;
        } else if (this.state.cleared && button.value == "-") {
            state.positive = !this.state.positive;
        } else if (this.state.cleared) {
            state.history = `${this.state.history.slice(0, -1)}${button.value}`;
            state.lastOperator = button;
            state.positive = true;
            if (button.value == "=") state.input = this.state.result;
        } else {
            const isButtonEquals = button.value == "=";

            state.result = eval(`${this.state.result} ${this.state.lastOperator.value} ${this.getNumericValue(input)}`);
            state.history = `${this.state.history}${this.state.positive ? input : `(-${input})`}${button.value}`;
            state.input = isButtonEquals ? `${state.result}` : "0";
            state.lastOperator = isButtonEquals ? null : button;
            state.positive = true;
            state.cleared = true;
        }

        this.setState(state);
    }

    getNumericValue(value) {
        const parsed = value.includes(".") ? parseFloat(value) : parseInt(value);
        return this.state.positive ? parsed : (parsed * -1);
    }

    HandleInterfaceButton(button) {
        let state = this.state;

        switch (button.value) {
            case "C":
                state.input = "0";
                state.positive = true;
                state.cleared = true;
                break;
            case "Del":
                if (this.state.lastOperator == null && this.state.cleared) {
                    this.handleClearButton();
                    return;
                } else if (this.state.input == "0" && !this.state.positive) {
                    state.positive = true;
                } else if (this.state.input.length == 1) {
                    state.input = "0";
                    state.cleared = true;
                } else {
                    state.input = this.state.input.slice(0, -1);
                }
                break;
        }

        this.setState(state);
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