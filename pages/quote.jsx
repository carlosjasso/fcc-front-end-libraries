import { getRandomInt } from "@lib/lib";
import React from "react";
import Styles from "@styles/quote.module.scss";
import Head from "next/head";

export default class Quote extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            primaryColor: `#${this.getRandomColor()}`,
            quotes: []
        }

        // This binding is necessary to make `this` work in the callback
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        this.getQuotes();
    }



    handleClick() {
        this.setState({
            primaryColor: `#${this.getRandomColor()}`
        });
    }

    getRandomColor() {
        const colors = {
            "Cyan Process":"5bc0eb",
            "Minion Yellow":"fde74c",
            "Android Green":"9bc53d",
            "Madder Lake":"c3423f",
            "Raisin Black":"211a1e",
            "Yellow Orange":"ffa630",
            "Tea Green":"d7e8ba",
            "Cadet Blue":"4da1a9",
            "Y In Mn Blue":"2e5077",
            "Old Mauve":"611c35"
        }
        const colorsKeys = Object.keys(colors);
        const randomkey = colorsKeys[getRandomInt(0, colorsKeys.length)];
        return colors[randomkey];
    }

    getQuotes() {
        fetch("https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json")
            .then(response => {
                if (!response.ok) {
                    throw new Error(response.statusText);
                } 
                return response.json();
            })
            .then(data => this.setState({quotes: data.quotes}))
            .catch(error => console.log(`Could not fetch quotes: ${error}`));
    }

    render() {
        const primaryColor = this.state.primaryColor;
        const maxQuotes = this.state.quotes.length;
        const quote = maxQuotes > 0 ? this.state.quotes[getRandomInt(0, maxQuotes)] : undefined;
        const quoteText = typeof(quote) !== "undefined" ? quote.quote : "";
        const author = typeof(quote) !== "undefined" ? quote.author : "";

        return (
            <main className={Styles.container} style={{background: primaryColor, color: primaryColor}}>
                <Head>
                    <title>FCC : Random Quote Machine</title>
                    <script src="https://cdn.freecodecamp.org/testable-projects-fcc/v1/bundle.js" async />
                </Head>
                <section id="quote-box" className={Styles["quote-box"]}>
                    <div style={{flexGrow: 1}} />
                    <p id="text" className={Styles["quote"]}>
                        <span className={Styles["text"]}>
                            <svg aria-hidden="  true" focusable="false" data-prefix="fad" data-icon="quote-left" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="svg-inline--fa fa-quote-left fa-w-16 fa-7x"><g class="fa-group"><path fill="currentColor" d="M464 256h-80v-64a64.06 64.06 0 0 1 64-64h8a23.94 23.94 0 0 0 24-23.88V56a23.94 23.94 0 0 0-23.88-24H448a160 160 0 0 0-160 160v240a48 48 0 0 0 48 48h128a48 48 0 0 0 48-48V304a48 48 0 0 0-48-48z" class="fa-secondary"></path><path fill="currentColor" d="M176 256H96v-64a64.06 64.06 0 0 1 64-64h8a23.94 23.94 0 0 0 24-23.88V56a23.94 23.94 0 0 0-23.88-24H160A160 160 0 0 0 0 192v240a48 48 0 0 0 48 48h128a48 48 0 0 0 48-48V304a48 48 0 0 0-48-48z" class="fa-primary"></path></g></svg>
                            {quoteText}
                            <svg aria-hidden="true" focusable="false" data-prefix="fad" data-icon="quote-right" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="svg-inline--fa fa-quote-right fa-w-16 fa-7x"><g class="fa-group"><path fill="currentColor" d="M176 32H48A48 48 0 0 0 0 80v128a48 48 0 0 0 48 48h80v64a64.06 64.06 0 0 1-64 64h-8a23.94 23.94 0 0 0-24 23.88V456a23.94 23.94 0 0 0 23.88 24H64a160 160 0 0 0 160-160V80a48 48 0 0 0-48-48z" class="fa-secondary"></path><path fill="currentColor" d="M464 32H336a48 48 0 0 0-48 48v128a48 48 0 0 0 48 48h80v64a64.06 64.06 0 0 1-64 64h-8a23.94 23.94 0 0 0-24 23.88V456a23.94 23.94 0 0 0 23.88 24H352a160 160 0 0 0 160-160V80a48 48 0 0 0-48-48z" class="fa-primary"></path></g></svg>
                        </span>

                    </p>
                    <p id="author" className={Styles.author}>
                        {`- ${author}`}
                    </p>
                    <div style={{flexGrow: 1}} />
                    <section className={Styles.buttons}>
                        <a style={{background: primaryColor}} id="tweet-quote" className={Styles.button}>
                            <svg aria-hidden="true" focusable="false" data-prefix="fab" data-icon="twitter" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="svg-inline--fa fa-twitter fa-w-16 fa-7x"><path fill="currentColor" d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z" class=""></path></svg>
                        </a>
                        <div style={{background: primaryColor}} id="new-quote" className={Styles.button} onClick={this.handleClick}>New Quote</div>
                    </section>
                </section>
            </main>
        );
    }
}