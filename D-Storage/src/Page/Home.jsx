import img from '../assets/Main.webp'
import Form from '../Components/Form'
import Navbar from '../Components/Navbar';



function Home(props) {

    const { Contract, userAccount, selectedAccount, setSelectedAccount } = props;

    return (
        <>
            <Navbar userAccount={userAccount} selectedAccount={selectedAccount} />
            <div className="container">
                <img src={img} alt="" />
                <Form Contract={Contract} userAccount={userAccount} setSelectedAccount={setSelectedAccount} />
            </div>

        </>
    )
}

export default Home;