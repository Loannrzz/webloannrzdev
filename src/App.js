
import "./style/app.scss"
import HelloWordAnnim from "./HelloWordAnnim";
import PorteFolioWebSite from "./PorteFolioWebSite";
import {useState} from "react";
import HomePage from "./HomePage";

function App() {

    const [page, setPage] = useState("hello_world");

    const pages_link = {
        hello_world: <HelloWordAnnim set_page={setPage}/>,
        portfolio_website: <PorteFolioWebSite set_page={setPage}/>,
        home_page: <HomePage set_page={setPage}/>,
    }

    return (
        <div className="App">
            {pages_link[page]}
        </div>
    );
}

export default App;
