import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../Components/Navbar";

function File(props) {

    const { index } = useParams();

    const { Contract, userAccount, selectedAccount } = props;

    const [URL, setURL] = useState('');

    useEffect(() => {
        async function loadURL() {
            if (selectedAccount == userAccount) {
                console.log('hello');
                const url = await Contract.methods.uploadedData(userAccount, index).call();
                console.log(url);
                setURL(url);
            } else {
                console.log('hello2');
                console.log(selectedAccount, userAccount);
                const url = await Contract.methods.getSharedImages(userAccount, selectedAccount, index).call();
                setURL(url);
            }
        }
        Contract && loadURL();
    }, [userAccount])

    async function sendShareImage(e) {
        e.preventDefault();
        const input = e.target[0].value;
        console.log(input);
        const process = await Contract.methods.shareImage(userAccount, input, URL).send({ from: userAccount });
        console.log(process);
    }


    return (
        <>
            <Navbar userAccount={userAccount} />

            <div className="individualImage">
                <img src={URL} alt="" />

            </div>
            {selectedAccount == userAccount ?
                <form className='fileShareInput' onSubmit={sendShareImage}>
                    <input type="text" placeholder="Share with 0x4ac45f........ Enter the address" />
                    <button className='btn' type="submit" id="shareButton"> Share</button>
                </form>
                :
                ""
            }
        </>
    )
}

export default File;