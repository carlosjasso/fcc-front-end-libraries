import AppendFCCScript from "@lib/appendFCCScript"
import React from "react";
import Styles from "@styles/quote.module.scss";
import Head from "next/head";
import Link from "next/link";

function Icon({ name }) {
    let icon;
    switch(name){
        case "air_quote_open": 
            icon = <svg focusable="false" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path fill="currentColor" d="M464 256h-80v-64a64.06 64.06 0 0 1 64-64h8a23.94 23.94 0 0 0 24-23.88V56a23.94 23.94 0 0 0-23.88-24H448a160 160 0 0 0-160 160v240a48 48 0 0 0 48 48h128a48 48 0 0 0 48-48V304a48 48 0 0 0-48-48z"></path><path fill="currentColor" className={Styles["less-opacity"]} d="M176 256H96v-64a64.06 64.06 0 0 1 64-64h8a23.94 23.94 0 0 0 24-23.88V56a23.94 23.94 0 0 0-23.88-24H160A160 160 0 0 0 0 192v240a48 48 0 0 0 48 48h128a48 48 0 0 0 48-48V304a48 48 0 0 0-48-48z"></path></g></svg>;
            break;
        case "air_quote_close":
            icon = <svg focusable="false" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path fill="currentColor" d="M176 32H48A48 48 0 0 0 0 80v128a48 48 0 0 0 48 48h80v64a64.06 64.06 0 0 1-64 64h-8a23.94 23.94 0 0 0-24 23.88V456a23.94 23.94 0 0 0 23.88 24H64a160 160 0 0 0 160-160V80a48 48 0 0 0-48-48z"></path><path fill="currentColor" className={Styles["less-opacity"]} d="M464 32H336a48 48 0 0 0-48 48v128a48 48 0 0 0 48 48h80v64a64.06 64.06 0 0 1-64 64h-8a23.94 23.94 0 0 0-24 23.88V456a23.94 23.94 0 0 0 23.88 24H352a160 160 0 0 0 160-160V80a48 48 0 0 0-48-48z"></path></g></svg>;
            break
        case "twitter":
            icon = <svg aria-hidden="true" focusable="false" data-prefix="fab" data-icon="twitter" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"></path></svg>
            break;
        case "github":
            icon = <svg aria-hidden="true" focusable="false" data-prefix="fab" data-icon="github" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512"><path fill="currentColor" d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"></path></svg>
            break;
    }

    return icon;
}

export default class Quote extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            quote: {
                text: "",
                author: ""
            },
            color: "#222222"
        }

        this.handleClick = this.handleClick.bind(this);
    }

    // Element lifecycle  functions
    componentDidMount() {
        this.initState();
        AppendFCCScript();
    }

    // Element events
    handleClick() {
        this.textFade(this.DIRECTION.OUT);
        setTimeout(() => {
            this.setState({
                quote: this.getRandomQuote(this.state.data),
                color: this.getRandomColor()
            });
            this.textFade(this.DIRECTION.IN);
        }, 250)
    }

    // Element util functions
    initState() {
        fetch("https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json")
            .then(response => {
                if (!response.ok) {
                    throw new Error(response.statusText);
                } 

                return response.json();
            })
            .then(json => {
                this.setState({
                    data: json.quotes,
                    quote: this.getRandomQuote(json.quotes),
                    color: this.getRandomColor()
                });
                this.quoteboxReveal();
            })
            .catch(error => console.erro(`@initState() - Could not fetch quotes: ${error}`));
    }
    
    getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min);
    }

    getRandomColor() {
        const colors = {
            "Android Green":"9bc53d",
            "Cyan Process":"5bc0eb",
            "Madder Lake":"c3423f",
            "Yellow Orange":"ffa630",
            "Old Mauve":"611c35",
            "Y In Mn Blue":"2e5077",
            "Cadet Blue":"4da1a9",
            "Space Cadet":"25283d",
            "Maximum Yellow Red":"f5b841",
            "Opal":"9db5b2"
        }

        const colorsKeys = Object.keys(colors);
        const randomIndex = this.getRandomInt(0, colorsKeys.length);
        const randomkey = colorsKeys[randomIndex];
        
        return `#${colors[randomkey]}`;
    }

    getRandomQuote(quotes) {
        const quotesLen = quotes.length;
        const randomIndex = this.getRandomInt(0, quotesLen);
        const quote = quotesLen > 0 ? quotes[randomIndex] : undefined;
        
        return {
            text: typeof(quote) !== "undefined" ? quote.quote : "",
            author: typeof(quote) !== "undefined" ? quote.author : ""
        }
    }

    // Animations
    DIRECTION = {
        IN: 0,
        OUT: 1
    }

    quoteboxReveal() {
        const options = {
            duration: 250,
            iterations: 1,
            fill: "forwards"
        }

        const keyframes = [
            { 
                opacity: 0,
                transform: "translateY(24px)"
            },
            { opacity: 1, 
                transform: "translateY(0px)"
            }
        ];

        const quoteBox = document.getElementById("quote-box");
        quoteBox.animate(keyframes, options);
        quoteBox.classList.remove(Styles["no-opacity"]);
    }

    textFade(direction) {
        const options = {
            duration: 250,
            iterations: 1, 
            fill: "forwards"
        }

        const fadeoutKeyframes = [
            {
                opacity: 1,
                transform: "translateY(0px)"
            },
            {
                opacity: 0,
                transform: "translateY(10px)"
            }
        ];

        const fadeinKeyframes = [
            {
                opacity: 0,
                transform: "translateY(10px)"
            },
            {
                opacity: 1,
                transform: "translateY(0px)"
            }
        ];

        const keyframes = () => {
            switch(direction) {
                case this.DIRECTION.IN:
                    return fadeinKeyframes;
                case this.DIRECTION.OUT:
                    return fadeoutKeyframes;
            }
        }

        const text = document.getElementById("text");
        text.animate(keyframes(), options);
    }

    render() {
        const quote = this.state.quote;
        const twitter = `https://twitter.com/intent/tweet?text="${quote.text}"%0D-${quote.author}%0D%23quotes`;

        return (
            <main id="background" className={Styles.container} style={{background: this.state.color}} >
                <Head>
                    <title>FCC: Random Quote Machine</title>
                </Head>
                <section id="quote-box" className={`${Styles["quote-box"]} ${Styles["no-opacity"]}`} style={{color: this.state.color}}>
                    <div style={{flexGrow: 1}} />
                    <div id="text" className={Styles["quote"]}>
                        <div className={Styles["text"]}>
                            <span>
                                <Icon name="air_quote_open" />
                            </span>
                            <span>
                                {quote.text}
                            </span>
                            <span>
                                <Icon name="air_quote_close" />
                            </span>
                        </div>
                        <p id="author" className={Styles.author}>
                            {quote.author !== "" ? `- ${quote.author}` : ""}
                        </p>
                    </div>
                    <div style={{flexGrow: 1}} />
                    <section className={Styles.buttons}>
                        <div className={Styles["left-buttons"]}>
                            <Link href={twitter}>
                                <a id="tweet-quote" className={Styles.button} target="_blank" title="Tweet quote" style={{background: this.state.color}} >
                                    <Icon name="twitter" />
                                </a>
                            </Link>
                            <Link href="https://github.com/carlosjasso/fcc-front-end-libraries">
                                <a className={Styles.button} target="_blank" title="View Source" style={{background: this.state.color}} >
                                    <Icon name="github" />
                                </a>
                            </Link>
                        </div>
                        <div id="new-quote" className={Styles.button} onClick={this.handleClick} style={{background: this.state.color}} >New Quote</div>
                    </section>
                </section>
            </main>
        );
    }
}