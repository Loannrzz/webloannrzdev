import "./style/PortFolioWebSite.scss"
import {animate, useMotionValue, useTransform} from "framer-motion"
import {useEffect, useState} from "react";
import LinearProgress from '@mui/joy/LinearProgress';
import Typography from '@mui/joy/Typography';
import { useCountUp } from 'use-count-up';

export default function PorteFolioWebSite(props) {
    const count = useMotionValue(12);
    const rounded = useTransform(count, Math.round);
    const [opacity, setOpacity] = useState(1);
    const [progress, setProgress] = useState(0);
    const [circle_value, setCircleValue] = useState(0);

    useEffect(() => {setTimeout(() => setOpacity(0.99) , 3500)}, []);

    useEffect(() => {
        const animation = animate(count, 100, {duration: 7.5});
        rounded.on("change", () => {
            setCircleValue(rounded.get());
        });
        return animation.stop;
    }, []);

    if (opacity !== 1 && opacity >= 0) setTimeout(() => {
        setOpacity(opacity - 0.1);
    }, 25)

    if (Math.round(opacity) === 0) props.set_page("home_page");

    const { value } = useCountUp({
        isCounting: true,
        duration: 3.5,
        easing: 'easeOutCubic',
        start: 0,
        end: 100,
        onComplete: () => ({
            shouldRepeat: false,
            delay: 0,
        }),
    });

    if (Math.round(opacity) === 0.99) {
        props.set_page("home_page");
    }

    return (
        <LinearProgress
            determinate
            variant="plain"
            color={value < 100 ? 'neutral' : 'success'}
            size="md"
            thickness={25}
            value={Number(value)}
            sx={{
                '--LinearProgress-radius': '0px',
                '--LinearProgress-thickness': '45px',
            }}
        >
            <Typography
                level="h4"
                fontWeight="-moz-initial"
                textColor="white"
                sx={{ mixBlendMode: 'difference' }}
            >
                {`${Math.round(Number(value))}%`}
            </Typography>
        </LinearProgress>
    );
}