import AppendFCCScript from "@lib/appendFCCScript";
import React from "react";
import Head from "next/head";
import Styles from "@styles/markdown.module.scss";
import Markdown from "react-markdown";

export default class MarkdownPPreviewer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            markup: props.sample
        }

        this.handleTextInput = this.handleTextInput.bind(this);
    }

    // Component lifecycle
    componentDidMount() {
        //document.getElementById("editor").focus();
        AppendFCCScript();
    }

    // Component events
    handleTextInput(e) {
        this.setState({ markup: e.target.value });
    }

    render() {
        return (
            <main className={Styles.container}>
                <Head>
                    <title>FCC: Markdown Previewer</title>
                </Head>
                <section className={Styles["editor-section"]}>
                    <div className={Styles["section-title"]}>
                        <span>Editor</span>
                    </div>
                    <div className={Styles["section-content"]}>
                        <textarea 
                            id="editor" 
                            className={Styles.editor} 
                            wrap="hard" 
                            onChange={this.handleTextInput} 
                            value={this.state.markup} />
                    </div>
                </section>
                <section className={Styles["previewer-section"]}>
                    <div className={Styles["section-title"]}>
                        <span>Previewer</span>
                    </div>
                    <div id="preview" className={`${Styles["section-content"]} ${Styles["preview"]}`}>
                        <Markdown source={this.state.markup} />
                    </div>
                </section>
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