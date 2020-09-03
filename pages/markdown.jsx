import AppendFCCScript from "@lib/appendFCCScript";
import React from "react";
import Head from "next/head";
import Styles from "@styles/markdown.module.scss";
import Markdown from "react-markdown";

export default class MarkdownPPreviewer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            markup: ""
        }

        this.handleTextInput = this.handleTextInput.bind(this);
    }

    startingMarkdown = "# This is a header\n\n## And this is a sub-header\n\n[This is a link](https://google.com)";

    // Component lifecycle
    componentDidMount() {
        this.setState({markup: this.startingMarkdown});
        document.getElementById("editor").focus();
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
                    <textarea id="editor" className={Styles.editor} wrap="hard" onChange={this.handleTextInput} value={this.state.markup} />
                </section>
                <section className={Styles["previewer-section"]}>
                    <div className={Styles["section-title"]}>
                        <span>Previewer</span>
                    </div>
                    <div id="preview" className={Styles.preview}>
                        <Markdown source={this.state.markup} />
                    </div>
                </section>
            </main>
        );
    }
}