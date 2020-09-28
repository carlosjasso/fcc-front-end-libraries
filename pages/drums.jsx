import React from "react";
import AppendFCCScript from "@lib/appendFCCScript";
import Styles from "@styles/drums.module.scss";
import Head from "next/head";

//colors: https://coolors.co/36419a-b82b7a-981a25-f7bd01-2091b3-87b02c-cd8227-00635d-bdb4bf
//{"Dark Cornflower Blue":"36419a","Maximum Red Purple":"b82b7a","Ruby Red":"981a25","Golden Poppy":"f7bd01","Blue Green":"2091b3","Apple Green":"87b02c","Bronze":"cd8227","Skobeloff":"00635d","Black Shadows":"bdb4bf"}

const inactiveButton = {
    background: "white"
}

function playSound(key) {
    const sound = document.getElementById(key);
    sound.currentTime= 0;
    sound.play();
}

function updateDisplay(message) {
    const display = document.getElementById("display");
    display.innerText = message;
}

export default class Drums extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            buttons: {
                Q: {
                    id: "button1",
                    sound: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3",
                    activeColor:"36419a",
                    isActive: false
                },
                W: {
                    id: "button2",
                    sound: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3",
                    activeColor:"b82b7a",
                    isActive: false
                },
                E: {
                    id: "button3",
                    sound: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3",
                    activeColor:"981a25",
                    isActive: false
                },
                A: {
                    id: "button4",
                    sound: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3",
                    activeColor:"f7bd01",
                    isActive: false
                },
                S: {
                    id: "button5",
                    sound: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3",
                    activeColor:"2091b3",
                    isActive: false
                },
                D: {
                    id: "button6",
                    sound: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3",
                    activeColor:"87b02c",
                    isActive: false
                },
                Z: {
                    id: "button7",
                    sound: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3",
                    activeColor:"cd8227",
                    isActive: false
                },
                X: {
                    id: "button8",
                    sound: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3",
                    activeColor:"00635d",
                    isActive: false
                },
                C: {
                    id: "button9",
                    sound: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3",
                    activeColor:"bdb4bf",
                    isActive: false
                }
            }
        }

        this.handleKeydown = this.handleKeydown.bind(this);
    }

    componentDidMount() {
        AppendFCCScript();
        document.addEventListener("keydown", this.handleKeydown);
    }

    componentWillUnmount() {
        document.removeEventListener("keydown", this.handleKeydown);
    }

    handleKeydown(e) {
        const validKeys = Object.keys(this.state.buttons);
        const pressedKey = e.key.toUpperCase();

        if (validKeys.includes(pressedKey)) {
            let newState = this.state.buttons;
            newState[pressedKey].isActive = true;
            this.setState(newState);

            playSound(pressedKey);
            updateDisplay(this.state.buttons[pressedKey].id);

            setTimeout(() => {
                newState[pressedKey].isActive = false;
                this.setState(newState);
            }, 100);
        }
    }

    render() {
        const buttonKeys = Object.keys(this.state.buttons);
        let padButtons = [];
        for (let i = 0; i < buttonKeys.length; i++) {
            let button = this.state.buttons[buttonKeys[i]];
            padButtons.push(
                <PadButton
                    id={button.id}
                    text={buttonKeys[i]}
                    audio={button.sound}
                    color={button.isActive ? button.activeColor : "ffffff"}
                    activeColor={button.activeColor}
                    key={i} />
            );
        }

        return (
            <main className={Styles["page-container"]}>
                <Head>
                    <title>Drum Machine</title>
                </Head>
                <section id="drum-machine" className={Styles["drum-container"]} >
                    <section className={Styles["pad-section"]}>
                        {padButtons.map(button => button)}
                    </section>
                    <section className={Styles["controls-section"]}>
                        <div className={Styles["power-control"]}>
                            <span className={Styles["power-tag"]}>Power</span>
                            <SlideButton />
                        </div>
                        <div id="display" className={Styles["display"]}>Drum Machine</div>
                        <div className={Styles["volume-control"]}>
                            <span className={Styles["volume-tag"]}>Volume</span>
                            <input
                                id="volume-slider"
                                max={1}
                                min={0}
                                step={0.01}
                                type="range"
                                defaultValue={1}
                                className={Styles["volume-slider"]}/>
                        </div>
                    </section>
                </section>
            </main>
        )
    }
}

class PadButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isClicked: false
        }
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        let newState = this.state;
        newState.isClicked = true;
        this.setState(newState);

        playSound(this.props.text);
        updateDisplay(this.props.id);

        setTimeout(() => {
            newState.isClicked = false;
            this.setState(newState);
        }, 100);
    }

    render() {
        const background = {
            backgroundColor: this.state.isClicked ? `#${this.props.activeColor}` : `#${this.props.color}`
        };

        return (
            <div
                id={this.props.id}
                className={`drum-pad ${Styles["pad-button"]}`}
                onClick={this.handleClick}
                style={background} >
                    {this.props.text}
                    <audio id={this.props.text} src={this.props.audio} className={"clip"} />
            </div>
        )
    }
}

class SlideButton extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            // source: https://www.w3schools.com/howto/howto_css_switch.asp
            <label className={Styles["switch"]}>
                <input type="checkbox" id="power-switch" defaultChecked={true} />
                <span className={`${Styles["slider"]} ${Styles["round"]}`}></span>
            </label>
        );
    }
}