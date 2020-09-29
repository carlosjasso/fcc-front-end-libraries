import React from "react";
import AppendFCCScript from "@lib/appendFCCScript";
import Styles from "@styles/drums.module.scss";
import Head from "next/head";
import Link from "next/link";

//colors: https://coolors.co/36419a-b82b7a-981a25-f7bd01-2091b3-87b02c-cd8227-00635d-bdb4bf

function playSound(key) {
    const sound = document.getElementById(key);
    sound.currentTime= 0;
    const volume = parseFloat(document.getElementById("volume-slider").value);
    sound.volume = volume;
    sound.play();
}

function stopSounds() {
    const sounds = document.getElementsByClassName("clip");
    for (let sound of sounds) {
        sound.pause();
    }
}

function updateDisplay(message) {
    const display = document.getElementById("display");
    const isOn = document.getElementById("power-switch").checked;
    if (isOn) {
        display.innerText = message;
    }
}

export default class Drums extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            buttons: {
                Q: {
                    id: "Air-Horn",
                    sound: "/sounds/Air-Horn.mp3",
                    duration: 1535,
                    activeColor:"36419a",
                    isActive: false
                },
                W: {
                    id: "Snap-Flow",
                    sound: "/sounds/Snap-Flow.mp3",
                    duration: 250,
                    activeColor:"b82b7a",
                    isActive: false
                },
                E: {
                    id: "Tin-Can-Bell",
                    sound: "/sounds/Tin-Can-Bell.mp3",
                    duration: 284,
                    activeColor:"981a25",
                    isActive: false
                },
                A: {
                    id: "Cymbal-Sold",
                    sound: "/sounds/Cymbal-Sold.mp3",
                    duration: 89,
                    activeColor:"f7bd01",
                    isActive: false
                },
                S: {
                    id: "Cymbal-AllMe",
                    sound: "/sounds/Cymbal-AllMe.mp3",
                    duration: 236,
                    activeColor:"2091b3",
                    isActive: false
                },
                D: {
                    id: "Clap-Apollo",
                    sound: "/sounds/Clap-Apollo.mp3",
                    duration: 502,
                    activeColor:"87b02c",
                    isActive: false
                },
                Z: {
                    id: "Kick-HouseThud",
                    sound: "/sounds/Kick-HouseThud.mp3",
                    duration: 361,
                    activeColor:"cd8227",
                    isActive: false
                },
                X: {
                    id: "Kick-Boost",
                    sound: "/sounds/Kick-Boost.mp3",
                    duration: 301,
                    activeColor:"00635d",
                    isActive: false
                },
                C: {
                    id: "Snare-Champion",
                    sound: "/sounds/Snare-Champion.mp3",
                    duration: 404,
                    activeColor:"bdb4bf",
                    isActive: false
                }
            }
        }

        this.handleKeydown = this.handleKeydown.bind(this);
        this.handleVolumeChange = this.handleVolumeChange.bind(this);
    }

    componentDidMount() {
        AppendFCCScript();
        document.addEventListener("keydown", this.handleKeydown);
    }

    componentWillUnmount() {
        document.removeEventListener("keydown", this.handleKeydown);
    }

    displayDebouncer;
    handleKeydown(e) {
        const isOn = document.getElementById("power-switch").checked;
        if (isOn) {
            const validKeys = Object.keys(this.state.buttons);
            const pressedKey = e.key.toUpperCase();
            const volume = parseFloat(document.getElementById("volume-slider").value);

            if (validKeys.includes(pressedKey)) {
                const button = this.state.buttons[pressedKey];

                let newState = this.state.buttons;
                newState[pressedKey].isActive = true;
                this.setState(newState);

                if (volume > 0) {
                    playSound(pressedKey);
                    updateDisplay(button.id);
                } else {
                    updateDisplay("Machine's muted");
                }

                setTimeout(() => {
                    newState[pressedKey].isActive = false;
                    this.setState(newState);
                }, button.duration);

                const displayTimeout = button.duration > 1000 ? button.duration : 1000;
                clearTimeout(this.displayDebouncer);
                this.displayDebouncer = setTimeout(() => updateDisplay("Ready!"), displayTimeout);
            }
        }
    }

    handleVolumeChange() {
        let volume = parseFloat(document.getElementById("volume-slider").value);
        volume = Math.floor(volume * 100);
        updateDisplay(`Volume: ${volume}`);
        setTimeout(() => updateDisplay("Ready!"), 1000);
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
                    duration={button.duration}
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
                        <div id="display" className={Styles["display"]}>Ready!</div>
                        <div className={Styles["volume-control"]}>
                            <span className={Styles["volume-tag"]}>Volume</span>
                            <input
                                id="volume-slider"
                                max={1}
                                min={0}
                                step={0.01}
                                type="range"
                                defaultValue={1}
                                className={Styles["volume-slider"]}
                                onChange={this.handleVolumeChange} />
                        </div>
                        <Link href="https://github.com/carlosjasso/fcc-front-end-libraries">
                            <a className={Styles["source-code"]} target="_blank" title="View Source">
                                <svg aria-hidden="true" focusable="false" data-prefix="fab" data-icon="github" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512"><path fill="currentColor" d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"></path></svg>
                            </a>
                        </Link>
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

    displayDebouncer;
    handleClick() {
        const isOn = document.getElementById("power-switch").checked;
        if (isOn) {
            const volume = parseFloat(document.getElementById("volume-slider").value);

            let newState = this.state;
            newState.isClicked = true;
            this.setState(newState);

            if (volume > 0) {
                playSound(this.props.text);
                updateDisplay(this.props.id);
            } else {
                updateDisplay("Machine's muted");
            }

            setTimeout(() => {
                newState.isClicked = false;
                this.setState(newState);
            }, this.props.duration);

            const displayTimeout = this.props.duration > 1000 ? this.props.duration : 1000;
            clearTimeout(this.displayDebouncer);
            this.displayDebouncer = setTimeout(() => updateDisplay("Ready!"), displayTimeout);
        }
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
        
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange() {
        const display = document.getElementById("display");
        const isOn = document.getElementById("power-switch").checked;
        if (isOn) {
            display.innerText = "Ready!";
        } else {
            display.innerText = "Machine is off";
            stopSounds();
        }
    }

    render() {
        return(
            // source: https://www.w3schools.com/howto/howto_css_switch.asp
            <label className={Styles["switch"]}>
                <input type="checkbox" id="power-switch" defaultChecked={true} onChange={this.handleChange} />
                <span className={`${Styles["slider"]} ${Styles["round"]}`}></span>
            </label>
        );
    }
}