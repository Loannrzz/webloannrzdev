import {TypeAnimation} from 'react-type-animation';
import "./style/PortFolioWebSite.scss"
import {animate, motion, useMotionValue, useTransform} from "framer-motion"
import HelloWordAnnim from "./HelloWordAnnim";
import {useEffect, useState} from "react";

export default function PorteFolioWebSite(props) {
    const count = useMotionValue(12);
    const rounded = useTransform(count, Math.round);
    const [opacity, setOpacity] = useState(1);

    useEffect(() => {
        setTimeout(() => setOpacity(0.99), 7250)
    }, []);

    if (opacity !== 1 && opacity >= 0) setTimeout(() => {
        setOpacity(opacity - 0.1);
    }, 15)

    useEffect(() => {
        const animation = animate(count, 100, {duration: 7.5});

        return animation.stop;
    }, []);

    if (Math.round(opacity) === 0) props.set_page("home_page");

    return (
        <div className={"PorteFolioWebSiteDiv"} style={{opacity: opacity}}>
            <motion.p1>{rounded}</motion.p1>%
        </div>
    );
}