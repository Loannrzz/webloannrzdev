import { TypeAnimation } from 'react-type-animation';
import "./style/app.scss"

function App() {

  return (
    <div className="App">
        <TypeAnimation
            sequence={[
                // Same substring at the start will only be typed out once, initially
                'Hello word ! ',
                2000, // wait 1s before replacing "Mice" with "Hamsters"
            ]}
            wrapper="span"
            speed={9}
            style={{ fontSize: '2em', display: 'inline-block', color: 'white'}}
            repeat={Infinity}
        />
    </div>
  );
}

export default App;
