import AppendFCCScript from "@lib/appendFCCScript";
import React from "react";
import Head from "next/head";
import Styles from "@styles/markdown.module.scss";
import Markdown from "react-markdown";

const SECTION = {
    EDITOR: "editor-section",
    PREVIEWER: "previewer-section"
};

function Icon({ name }) {
    let icon = null;

    switch (name) {
        case "compress":
            icon = <svg aria-hidden="true" focusable="false" data-icon="compress" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><title>restore</title><path fill="currentColor" d="M436 192H312c-13.3 0-24-10.7-24-24V44c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v84h84c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12zm-276-24V44c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v84H12c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h124c13.3 0 24-10.7 24-24zm0 300V344c0-13.3-10.7-24-24-24H12c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h84v84c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12zm192 0v-84h84c6.6 0 12-5.4 12-12v-40c0-6.6-5.4-12-12-12H312c-13.3 0-24 10.7-24 24v124c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12z"></path></svg>;
            break;
        case "expand":
            icon = <svg aria-hidden="true" focusable="false" data-icon="expand" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><title>expand</title><path fill="currentColor" d="M0 180V56c0-13.3 10.7-24 24-24h124c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12H64v84c0 6.6-5.4 12-12 12H12c-6.6 0-12-5.4-12-12zM288 44v40c0 6.6 5.4 12 12 12h84v84c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12V56c0-13.3-10.7-24-24-24H300c-6.6 0-12 5.4-12 12zm148 276h-40c-6.6 0-12 5.4-12 12v84h-84c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h124c13.3 0 24-10.7 24-24V332c0-6.6-5.4-12-12-12zM160 468v-40c0-6.6-5.4-12-12-12H64v-84c0-6.6-5.4-12-12-12H12c-6.6 0-12 5.4-12 12v124c0 13.3 10.7 24 24 24h124c6.6 0 12-5.4 12-12z"></path></svg>;
            break;
    }
    
    return icon;
}

function codeRenderer(props) {
    return (
        <pre>
            <code>
                {props.value}
            </code>
        </pre>
    );
}

class AppSection extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            expanded: false
        }

        this.handleButtonClick = this.handleButtonClick.bind(this);
    }

    // Component lifecycle
    componentDidMount() {
        this.sectionReveal();
    }

    // Event Handlers
    handleButtonClick() {
        this.setState({expanded: !this.state.expanded});
        this.sectionResize();
    }

    // Animations
    sectionReveal() {
        const id = this.props.id;
        const translateX = (id === SECTION.EDITOR) ? "-24px" : "24px";
        const section = document.getElementById(id);
        
        const keyframes = [
            {
                opacity: 0,
                transform: `translateX(${translateX})`
            },
            {
                opacity: 1,
                transform: "translateX(0px)"
            }
        ];

        const options = {
            duration: 250,
            iterations: 1,
            fill: "forwards"
        };

        section.animate(keyframes, options);
        section.classList.remove(Styles["no-opacity"]);
    }

    sectionResize() {
        const sectionId = this.props.id;
        const section = document.getElementById(sectionId);
        const altId = this.props.id === SECTION.EDITOR ? SECTION.PREVIEWER : SECTION.EDITOR;
        const alt = document.getElementById(altId);
        
        const changingSide = window.innerWidth > 900 ? "width" : "height";
        const staticSide = window.innerWidth > 900 ? "height" : "width";
        const millis = 150;

        const options = {
            duration: millis,
            iterations: 1,
            fill: "forwards"
        }

        const expandKeyframes = [
            { 
                [changingSide]: "47%",
                [staticSide]: "94%"
            },
            { 
                [changingSide]: "94%",
                [staticSide]: "94%"
            }
        ];

        const contractKeyframes = [
            { 
                [changingSide]: "47%",
                [staticSide]: "94%"
            },
            { 
                [changingSide]: "0%",
                [staticSide]: "94%"
            }
        ];

        if (this.state.expanded) {
            section.animate(expandKeyframes.reverse(), options);
            alt.animate(contractKeyframes.reverse(), options);
            alt.style.display = "flex";
        } else {
            section.animate(expandKeyframes, options);
            alt.animate(contractKeyframes, options);
            setTimeout(() => {
                alt.style.display = "none";
            }, millis);
        }
    }

    render() {
        const { id, className, titleBar, expanded } = this.props;
        
        return(
            <section id={id} className={`${className} ${Styles["no-opacity"]}`}>
                <div className={Styles["section-title"]}>
                    <span>{titleBar}</span>
                    <div className={Styles["titlebar-button"]} onClick={this.handleButtonClick}>
                        <Icon name={expanded ? "compress" : "expand"} />
                    </div>
                </div>
                {this.props.children}
            </section>
        );
    }
}

class Editor extends React.Component {
    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        const value = event.target.value;
        this.props.inputHandler(value);
    }

    render() {
        return(
            <textarea 
                id="editor" 
                className={Styles.editor}
                onChange={this.handleChange}
                value={this.props.value} />
        );
    }
}

export default class MarkdownPreviewer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            markup: props.sample
        }

        this.handleTextInput = this.handleTextInput.bind(this);
    }

    // Component lifecycle
    componentDidMount() {
        document.getElementById("editor").focus();
        AppendFCCScript();
    }

    // Component events
    handleTextInput(value) {
        this.setState({ markup: value });
    }

    render() {
        return (
            <main id="container" className={Styles.container}>
                <Head>
                    <title>Markdown Previewer</title>
                </Head>
                <AppSection 
                    id={SECTION.EDITOR} 
                    className={Styles["editor-section"]}
                    titleBar="Editor"
                >
                    <div className={Styles["section-content"]}>
                        <Editor value={this.state.markup} inputHandler={this.handleTextInput} />
                    </div>
                </AppSection>
                <AppSection
                    id={SECTION.PREVIEWER} 
                    className={Styles["previewer-section"]}
                    titleBar="Previewer"
                >
                    <div id="preview" className={`${Styles["section-content"]} ${Styles["preview"]}`}>
                        <Markdown source={this.state.markup} renderers={{code: codeRenderer}} allowDangerousHtml />
                    </div>
                </AppSection>
            </main>
        );
    }
}

export async function getStaticProps() {
    const fs = require("fs");
    const path = require("path");

    const file = path.join(process.cwd(), "public", "sample-markdown.md");
    const sample = fs.readFileSync(file).toString();

    return {
        props: {
            sample
        }
    }
}