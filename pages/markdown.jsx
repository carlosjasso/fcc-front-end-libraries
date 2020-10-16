import AppendFCCScript from "@lib/appendFCCScript";
import React from "react";
import Head from "next/head";
import Styles from "@styles/markdown.module.scss";
import Markdown from "react-markdown";

export default class MarkdownPPreviewer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            markup: props.sample,
            editorExpanded: false,
            previewerExpanded: false
        }

        this.handleTextInput = this.handleTextInput.bind(this);
        this.handleButtonClick = this.handleButtonClick.bind(this);
    }

    SECTION = {
        EDITOR: "editor-section",
        PREVIEWER: "previewer-section"
    }

    // Component lifecycle
    componentDidMount() {
        this.sectionsReveal();
        document.getElementById("editor").focus();
        AppendFCCScript();
    }

    // Component events
    handleTextInput(e) {
        this.setState({ markup: e.target.value });
    }

    handleButtonClick(section) {
        const key = section === this.SECTION.EDITOR ? "editorExpanded" : "previewerExpanded";
        this.setState({[key]: !this.state[key]});

        this.sectionExpand(section);
    }

    // Animations
    sectionsReveal() {
        const sections = document.getElementById("container").childNodes;
        const options = {
            duration: 250,
            iterations: 1,
            fill: "forwards"
        }

        const keyframesEditor = [
            {
                opacity: 0,
                transform: "translateX(-24px)"
            },
            {
                opacity: 1,
                transform: "translateX(0px)"
            }
        ];

        const keyframesPreviewer = [
            {
                opacity: 0,
                transform: "translateX(24px)"
            },
            {
                opacity: 1,
                transform: "translateX(0px)"
            }
        ];

        for (const section of sections) {
            const keyframes = section.classList.contains(Styles["editor-section"]) ? 
                keyframesEditor : keyframesPreviewer;
            section.animate(keyframes, options);
            section.classList.remove(Styles["no-opacity"]);
        }
    }

    sectionExpand(section) {
        const side = window.innerWidth > 900 ? "width" : "height";
        const millis = 150;

        const options = {
            duration: millis,
            iterations: 1,
            fill: "forwards"
        }

        const expandKeyframes = [
            { [side]: "47%" },
            { [side]: "94%" }
        ];
        const fadeKeyframes = [
            { [side]: "47%", opacity: 1 },
            { [side]: "0%", opacity: 0 }
        ];

        const elements = {
            primary: document.getElementById(section),
            secondary: section === this.SECTION.EDITOR ? 
                document.getElementById(this.SECTION.PREVIEWER) :
                document.getElementById(this.SECTION.EDITOR),
            isPrimaryExpanded: section === this.SECTION.EDITOR ? 
                this.state.editorExpanded : 
                this.state.previewerExpanded
        }

        if (elements.isPrimaryExpanded) {
            elements.primary.animate(expandKeyframes.reverse(), options);
            elements.secondary.animate(fadeKeyframes.reverse(), options)
            elements.secondary.style.display = "flex";
        } else {
            elements.primary.animate(expandKeyframes, options);
            elements.secondary.animate(fadeKeyframes, options);
            setTimeout(() => elements.secondary.style.display = "none", millis);
        }
    }

    render() {
        const Button = ({expanded}) => {
            return expanded ? 
                <svg aria-hidden="true" focusable="false" data-icon="compress" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><title>restore</title><path fill="currentColor" d="M436 192H312c-13.3 0-24-10.7-24-24V44c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v84h84c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12zm-276-24V44c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v84H12c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h124c13.3 0 24-10.7 24-24zm0 300V344c0-13.3-10.7-24-24-24H12c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h84v84c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12zm192 0v-84h84c6.6 0 12-5.4 12-12v-40c0-6.6-5.4-12-12-12H312c-13.3 0-24 10.7-24 24v124c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12z"></path></svg> : 
                <svg aria-hidden="true" focusable="false" data-icon="expand" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><title>expand</title><path fill="currentColor" d="M0 180V56c0-13.3 10.7-24 24-24h124c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12H64v84c0 6.6-5.4 12-12 12H12c-6.6 0-12-5.4-12-12zM288 44v40c0 6.6 5.4 12 12 12h84v84c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12V56c0-13.3-10.7-24-24-24H300c-6.6 0-12 5.4-12 12zm148 276h-40c-6.6 0-12 5.4-12 12v84h-84c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h124c13.3 0 24-10.7 24-24V332c0-6.6-5.4-12-12-12zM160 468v-40c0-6.6-5.4-12-12-12H64v-84c0-6.6-5.4-12-12-12H12c-6.6 0-12 5.4-12 12v124c0 13.3 10.7 24 24 24h124c6.6 0 12-5.4 12-12z"></path></svg>;
        };

        return (
            <main id="container" className={Styles.container}>
                <Head>
                    <title>Markdown Previewer</title>
                </Head>
                <section id={this.SECTION.EDITOR} className={`${Styles["editor-section"]} ${Styles["no-opacity"]}`}>
                    <div className={Styles["section-title"]}>
                        <span>Editor</span>
                        <div className={Styles.button} onClick={() => this.handleButtonClick(this.SECTION.EDITOR)}>
                            <Button expanded={this.state.editorExpanded} />
                        </div>
                    </div>
                    <div className={Styles["section-content"]}>
                        <textarea 
                            id="editor" 
                            className={Styles.editor}
                            onChange={this.handleTextInput} 
                            value={this.state.markup} />
                    </div>
                </section>
                <section id={this.SECTION.PREVIEWER} className={`${Styles["previewer-section"]} ${Styles["no-opacity"]}`}>
                    <div className={Styles["section-title"]}>
                        <span>Previewer</span>
                        <div className={Styles.button} onClick={() => this.handleButtonClick(this.SECTION.PREVIEWER)}>
                            <Button expanded={this.state.previewerExpanded} />
                        </div>
                    </div>
                    <div id="preview" className={`${Styles["section-content"]} ${Styles["preview"]}`}>
                        <Markdown source={this.state.markup} renderers={{code: codeRenderer}} />
                    </div>
                </section>
            </main>
        );
    }
}

function codeRenderer(props) {
    return (<pre><code>{props.value}</code></pre>);
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