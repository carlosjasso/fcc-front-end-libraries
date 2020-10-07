import React from "react";
import Head from "next/head";
import Styles from "@styles/calc.module.scss";
import AppendFCCScript from "@lib/appendFCCScript";
import { types } from "react-markdown";

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
        symbol: "0",
        type: buttonType.numeric
    },
    1: {
        name: "one",
        symbol: "1",
        type: buttonType.numeric
    },
    2: {
        name: "two",
        symbol: "2",
        type: buttonType.numeric
    },
    3: {
        name: "three",
        symbol: "3",
        type: buttonType.numeric
    },
    4: {
        name: "four",
        symbol: "4",
        type: buttonType.numeric
    },
    5: {
        name: "five",
        symbol: "5",
        type: buttonType.numeric
    },
    6: {
        name: "six",
        symbol: "6",
        type: buttonType.numeric
    },
    7: {
        name: "seven",
        symbol: "7",
        type: buttonType.numeric
    },
    8: {
        name: "eight",
        symbol: "8",
        type: buttonType.numeric
    },
    9: {
        name: "nine",
        symbol: "9",
        type: buttonType.numeric
    },
    10: {
        name: "decimal",
        symbol: ".",
        type: buttonType.numeric
    },
    11: {
        name: "add",
        symbol: "+",
        type: buttonType.operator
    },
    12: {
        name: "subtract",
        symbol: "-",
        type: buttonType.operator
    },
    13: {
        name: "multiply",
        symbol: "*",
        type: buttonType.operator
    },
    14: {
        name: "divide",
        symbol: "/",
        type: buttonType.operator
    },
    15: {
        name: "equals",
        symbol: "=",
        type: buttonType.result
    },
    16: {
        name: "clear",
        symbol: "AC",
        type: buttonType.clear
    },
    17: {
        name: "cancel",
        symbol: "C",
        type: buttonType.interface
    },
    18: {
        name: "delete",
        symbol: "Del",
        type: buttonType.interface
    },
    19: {
        name: "github",
        symbol: "GH",
        type: buttonType.extra
    }
}

function Screen() {
    return (
        <section id="display" className={Styles["display"]}>
            <div className={Styles["top"]}>
                0
            </div>
            <div className={Styles["bottom"]}>
                0
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
        const { name, symbol, type } = this.props.button;
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
                {symbol}
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
    }

    // Element lifecycle
    componentDidMount() {
        AppendFCCScript();
    }

    // Event handlers
    handleClick(button) {
        console.log(button);
    }

    render() {
        return (
            <main className={Styles["page-container"]}>
                <Head>
                    <title>FCC: Javascript Calculator</title>
                </Head>
                <img className={Styles["wallpaper"]} />
                <section className={Styles["calculator"]}>
                    <Screen />
                    <Pad clickHandler={this.handleClick} />
                </section>
            </main>
        );
    }
}