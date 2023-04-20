import Navbar from "../Components/Navbar";

function About(props) {
    const { userAccount } = props;
    return (
        <>
            <Navbar userAccount={userAccount} />
        </>
    )
}
export default About;