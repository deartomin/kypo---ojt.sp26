import React from "react";
import Layout from "@theme-original/Layout";
import Sticker from "@site/src/components/Sticker";

export default function LayoutWrapper(props) {
    return (
        <>
            <Layout {...props} />
            <Sticker />
        </>
    );
}