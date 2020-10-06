import Styles from "@styles/home.module.scss";
import Head from "next/head";
import Link from "next/link";

export default function Home() {
    return (
        <div className={Styles.flexCol}>
            <Head>
                <title>FCC: Front End Libraries Certification Projects</title>
            </Head>
            <h1>Projects</h1>
            <ul className={Styles.list}>
                <li>
                    <Link href="/quote"><a>Random Quote Machine</a></Link>
                </li>
                <li>
                    <Link href="/markdown"><a>Markdown Previewer</a></Link>
                </li>
                <li>
                    <Link href="/drums"><a>Drum Machine</a></Link>
                </li>
                <li>
                    <Link href="/calc"><a>Calculator</a></Link>
                </li>
            </ul>
        </div>
    );
}