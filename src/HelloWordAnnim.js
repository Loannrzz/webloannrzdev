import {TypeAnimation} from 'react-type-animation';
import "./style/app.scss"
import {useEffect, useState} from "react";

export default function HelloWordAnnim(props) {

    const [opacity, setOpacity] = useState(1);
    useEffect(() => {setTimeout(() => setOpacity(0.99) , 3250)}, []);

    if (opacity !== 1 && opacity >= 0) setTimeout(() => {
        setOpacity(opacity - 0.1);
    }, 25)

    if (Math.round(opacity) === 0)
        props.set_page("portfolio_website");

    return (
        <div className="helloword" style={{opacity: opacity}}>
            <TypeAnimation
                sequence={[
                    // Same substring at the start will only be typed out once, initially
                    ' > Hello world',
                    2000, // wait 1s before replacing "Mice" with "Hamsters"
                ]}
                wrapper="span"
                speed={5}
                style={{fontSize: '2em', display: 'inline-block', color: 'white'}}
                repeat={Infinity}
            />
        </div>
    );
}