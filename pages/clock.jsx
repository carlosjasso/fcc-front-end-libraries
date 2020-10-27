import React from "react";
import Head from "next/head";
import Styles from "@styles/clock.module.scss";
import AppendFCCScript from "@lib/appendFCCScript";

function Icon({name}) {
    let icon = null;
    switch (name) {
        case "play":
            icon = <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="play" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M424.4 214.7L72.4 6.6C43.8-10.3 0 6.1 0 47.9V464c0 37.5 40.7 60.1 72.4 41.3l352-208c31.4-18.5 31.5-64.1 0-82.6z"></path></svg>;
            break;
        case "pause":
            icon = <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="pause" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M144 479H48c-26.5 0-48-21.5-48-48V79c0-26.5 21.5-48 48-48h96c26.5 0 48 21.5 48 48v352c0 26.5-21.5 48-48 48zm304-48V79c0-26.5-21.5-48-48-48h-96c-26.5 0-48 21.5-48 48v352c0 26.5 21.5 48 48 48h96c26.5 0 48-21.5 48-48z"></path></svg>;
            break;
        case "reset":
            icon = <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="undo" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M212.333 224.333H12c-6.627 0-12-5.373-12-12V12C0 5.373 5.373 0 12 0h48c6.627 0 12 5.373 12 12v78.112C117.773 39.279 184.26 7.47 258.175 8.007c136.906.994 246.448 111.623 246.157 248.532C504.041 393.258 393.12 504 256.333 504c-64.089 0-122.496-24.313-166.51-64.215-5.099-4.622-5.334-12.554-.467-17.42l33.967-33.967c4.474-4.474 11.662-4.717 16.401-.525C170.76 415.336 211.58 432 256.333 432c97.268 0 176-78.716 176-176 0-97.267-78.716-176-176-176-58.496 0-110.28 28.476-142.274 72.333h98.274c6.627 0 12 5.373 12 12v48c0 6.627-5.373 12-12 12z"></path></svg>;
            break;
        case "github":
            icon = <svg aria-hidden="true" focusable="false" data-prefix="fab" data-icon="github" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512"><path fill="currentColor" d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"></path></svg>;
            break;
    }
    return icon;
}

export default class Clock extends React.Component {
    constructor(props) {
        super(props);

        const sessionLength = 25;
        const breakLength = 5;
        const timeLeft = this.timeLeftFormatter(sessionLength.toString());

        this.state = {
            sessionLength,
            breakLength,
            timerRunning: false,
            timerType: "Session",
            timerMins: 0,
            timerSecs: 0,
            timeLeft
        }

        this.sessionAndBreakChangeHandler = this.sessionAndBreakChangeHandler.bind(this);
        this.timerActionHandler = this.timerActionHandler.bind(this);
        this.tickDown = this.tickDown.bind(this);
        this.resetHandler = this.resetHandler.bind(this);
        this.gotoGithub = this.gotoGithub.bind(this);

        this.beep = React.createRef();
    }

    // element's lifecycle
    componentDidMount() {
        AppendFCCScript();
    }

    // event handlers
    sessionAndBreakChangeHandler(buttonId) {
        const propName = `${buttonId.split("-")[0]}Length`;
        const operator = (buttonId.split("-")[1] == "increment") ? "+" : "-";
        let prop = this.state[propName];
        prop = eval(`${prop}${operator}1`);
        if (prop < 1 || prop > 60) return;
        let state = {[propName]: prop}
        if (propName.includes("session")) {
            state.timeLeft = this.timeLeftFormatter(prop.toString());
        }
        this.setState(state);
    }

    timerActionHandler() {
        let state = {...this.state};
        if (this.timer == null) {
            state.timerMins = this.state.sessionLength;
            state.timerSecs = 0;
            state.timerRunning = true;
            this.timer = setInterval(this.tickDown, 1000);
        } else {
            if (this.state.timerRunning) {
                state.timerRunning = false;
                clearInterval(this.timer);
            } else {
                state.timerRunning = true;
                this.timer = setInterval(this.tickDown, 1000);
            }
        }
        this.setState(state);
    }

    resetHandler() {
        this.stopBeep();

        clearInterval(this.timer);
        this.timer = null;

        this.setState({
            sessionLength: 25,
            breakLength: 5,
            timerRunning: false,
            timerType: "Session",
            timerMins: 0,
            timerSecs: 0,
            timeLeft: "25:00"
        });
    }

    gotoGithub() {
        window.open("https://github.com/carlosjasso/fcc-front-end-libraries", "_blank");
    }

    // util functions
    timeLeftFormatter(mins = "0", secs = "0") {
        mins = (mins.length == 1) ? `0${mins}` : mins;
        secs = (secs.length == 1) ? `0${secs}` : secs;

        return `${mins}:${secs}`;
    }

    tickDown() {
        let state = {...this.state};

        if (this.state.timerMins > 0 || this.state.timerSecs > 0) {
            if (this.state.timerSecs == 0) {
                state.timerSecs = 50;
                state.timerMins--;
            } else {
                state.timerSecs --;
            } 
        }
        else {
            this.playBeep();
            if (this.state.timerType == "Session") {
                state.timerType = "Break";
                state.timerMins = this.state.breakLength;
                state.timerSecs = 0;
            } else {
                state.timerType = "Session";
                state.timerMins = this.state.sessionLength;
                state.timerSecs = 0;
            }
        }

        state.timeLeft = this.timeLeftFormatter(
            state.timerMins.toString(),
            state.timerSecs.toString()
        );

        this.setState(state);
    }

    playBeep() {
        let beep = this.beep.current;
        beep.currentTime = 0;
        beep.volume = 0.2;
        beep.play();
    }

    stopBeep() {
        let beep = this.beep.current;
        beep.pause();
        beep.currentTime = 0;
    }

    render() {
        const changeHandler = event => this.sessionAndBreakChangeHandler(event.target.id);
        const timerStyle = {
            color: (!this.state.timerRunning) ? "white" : 
                (this.state.timerType == "Session") ? "green" : "orange"
        };

        return (
            <main className={Styles["container"]}>
                <Head>
                    <title>FCC: 25 + 5 Clock</title>
                </Head>
                <div className={Styles["circle"]}>
                    <div className={Styles["display"]}>
                        <p id="timer-label" className={Styles["timer-type"]}>
                            {this.state.timerType}
                        </p>
                        <p id="time-left" className={Styles["timer"]} style={timerStyle}>
                            {this.state.timeLeft}
                        </p>
                    </div>
                    <div className={Styles["settings"]}>
                        <fieldset>
                            <legend id="session-label">Session Length</legend>
                            <button id="session-decrement" 
                                onClick={changeHandler} 
                                className={Styles["setting"]}
                                disabled={this.state.timerRunning}
                                title="decrement session"
                            > - </button>
                            <span id="session-length">{this.state.sessionLength}</span>
                            <button id="session-increment" 
                                onClick={changeHandler} 
                                className={Styles["setting"]}
                                disabled={this.state.timerRunning}
                                title="increment session"
                            > + </button>
                        </fieldset>
                        <fieldset>
                            <legend id="break-label">Break Length</legend>
                            <button id="break-decrement" 
                                onClick={changeHandler} 
                                className={Styles["setting"]}
                                disabled={this.state.timerRunning}
                                title="decrement break"
                            > - </button>
                            <span id="break-length">{this.state.breakLength}</span>
                            <button id="break-increment" 
                                onClick={changeHandler} 
                                className={Styles["setting"]}
                                disabled={this.state.timerRunning}
                                title="increment break"
                            > + </button>
                        </fieldset>
                    </div>
                    <div className={Styles["actions"]}>
                        <button id="start_stop" 
                            onClick={this.timerActionHandler}
                            className={Styles["action"]}
                            title={this.state.timerRunning ? "pause timer" : "start timer"}
                        >
                            <Icon name={this.state.timerRunning ? "pause" : "play" } />
                        </button>
                        <button id="reset" 
                            onClick={this.resetHandler}
                            className={Styles["action"]}
                            title="reset timer"
                        >
                            <Icon name="reset" />
                        </button>
                        <button id="source" 
                            onClick={this.gotoGithub}
                            className={Styles["action"]}
                            title="view source"
                        >
                            <Icon name="github" />
                        </button>
                    </div>
                </div>
                <audio id="beep" src="/sounds/beep.mp3" preload="auto" ref={this.beep} />
            </main>
        );
    }
}