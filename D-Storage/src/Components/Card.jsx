import { Link } from "react-router-dom";

function Card(props) {
    const { URL, index } = props;
    return (
        <><Link target="_blank" to={`/File/${index}`}>
            <div className="cardContainer">
                <img src={URL} alt="" />
            </div>
        </Link>
        </>
    )
}

export default Card;