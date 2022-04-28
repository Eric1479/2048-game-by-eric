import { headerProps } from "../types/types";

const Header = (props:headerProps) => {

    return(
        <div className="header">
            <div style={{ display:"flex",alignItems:"center"}}>
            <span style={{ fontSize:"56px" }}>2048</span>
            <div className="header-name">
                <span>By</span>
                <span className="header-author">Eric</span>
            </div>
            </div>
            <div className="score">
            <div>
                <div>Score</div>
                <span>{props.score}</span>
            </div>
            </div>
        </div>
    );
}

export default Header;