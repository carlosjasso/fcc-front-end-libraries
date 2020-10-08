import React from "react";
import Head from "next/head";
import Styles from "@styles/calc.module.scss";
import AppendFCCScript from "@lib/appendFCCScript";

const buttonType = {
    numeric: 0,
    operator: 1,
    result: 2,
    clear: 3,
    interface: 4,
    extra: 5
}

const buttons = {
    0: {
        name: "zero",
        value: "0",
        type: buttonType.numeric
    },
    1: {
        name: "one",
        value: "1",
        type: buttonType.numeric
    },
    2: {
        name: "two",
        value: "2",
        type: buttonType.numeric
    },
    3: {
        name: "three",
        value: "3",
        type: buttonType.numeric
    },
    4: {
        name: "four",
        value: "4",
        type: buttonType.numeric
    },
    5: {
        name: "five",
        value: "5",
        type: buttonType.numeric
    },
    6: {
        name: "six",
        value: "6",
        type: buttonType.numeric
    },
    7: {
        name: "seven",
        value: "7",
        type: buttonType.numeric
    },
    8: {
        name: "eight",
        value: "8",
        type: buttonType.numeric
    },
    9: {
        name: "nine",
        value: "9",
        type: buttonType.numeric
    },
    10: {
        name: "decimal",
        value: ".",
        type: buttonType.numeric
    },
    11: {
        name: "add",
        value: "+",
        type: buttonType.operator
    },
    12: {
        name: "subtract",
        value: "-",
        type: buttonType.operator
    },
    13: {
        name: "multiply",
        value: "*",
        type: buttonType.operator
    },
    14: {
        name: "divide",
        value: "/",
        type: buttonType.operator
    },
    15: {
        name: "equals",
        value: "=",
        type: buttonType.result
    },
    16: {
        name: "clear",
        value: "AC",
        type: buttonType.clear
    },
    17: {
        name: "cancel",
        value: "C",
        type: buttonType.interface
    },
    18: {
        name: "delete",
        value: "Del",
        type: buttonType.interface
    },
    19: {
        name: "github",
        value: "GH",
        type: buttonType.extra
    }
}

function Screen({ top, bottom }) {
    return (
        <section className={Styles["display"]}>
            <div className={Styles["top"]}>
                {top}
            </div>
            <div id="display" className={Styles["bottom"]}>
                {bottom}
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
            case buttonType.result: style = "result"; break;
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
        const order = [
            16, 17, 18, 19,
            7,  8,  9,  14,
            4,  5,  6,  13,
            1,  2,  3,  12,
            10, 0,  15, 11
        ];
        const pad = order.map(id => {
            return (
                <Button 
                button={buttons[id]} 
                clickHandler={this.handleClick}
                key={id} />
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
            displayTop: "0",
            displayBottom: "0",
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
        }
    }

    // Util Functions
    handleNumericButton(button) {
        const formula = this.state.displayTop;
        const isFormulaEmpty = formula == "0";
        const newFormula = isFormulaEmpty ? button.value : `${formula}${button.value}`;

        const input = this.getNumericValue(this.state.displayBottom);
        const isFirstInput = input == 0;
        const newInput = isFirstInput ? button.value : `${input}${button.value}`;

        this.setState({
            displayTop: newFormula,
            displayBottom: newInput
        });
    }

    handleOperatorButton(button) {
        const formula = this.state.displayTop;
        const input = this.getNumericValue(this.state.displayBottom);
        let result = this.state.result;
        const isFirstInput = result == 0;

        switch(button) {
            case buttons[11]: 
                result = result + input;
            break;
            case buttons[12]: 
                result = result - input;
            break;
            case buttons[13]: 
                result = result * input;
            break;
            case buttons[14]: 
                result = result / input;
            break;
        }

        if (isFirstInput) {
            this.setState({
                displayTop: `${formula}${button.value}`,
                displayBottom: `0`,
                result: result
            });
        } else {
            this.setState({
                displayTop: `${formula}${button.value}${input}`,
                displayBottom: `${result}`,
                result: result
            });
        }
    }

    handleClearButton() {
        this.setState({
            displayTop: "0",
            displayBottom: "0",
            result: 0
        });
    }

    getNumericValue(value) {
        if (value.endsWith(".")) {
            value = input.slice(0, -1);
        }

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
                    <Screen top={this.state.displayTop} bottom={this.state.displayBottom} />
                    <Pad clickHandler={this.handleClick} />
                </section>
            </main>
        );
    }
}