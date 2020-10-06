import React from "react";
import Head from "next/head";
import Styles from "@styles/calc.module.scss";

export default class Calculator extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <main className={Styles["page-container"]}>
                <img className={Styles["wallpaper"]} />
                <h1>Hello World!</h1>
            </main>
        );
    }
}