import Head from "next/head";
import { Navbar } from "./Navbar";

export const Layout = ({ children}) =>(
    <>
        <Head>
            <title>
                Video Manager
            </title>
        </Head>
        <Navbar />
        {children}
    </>
)