import { useEffect, useState } from "react";
import Card from "../Components/Card";
import Navbar from "../Components/Navbar";

function Files(props) {
    const { Contract, userAccount, selectedAccount } = props;

    const [images, setImages] = useState([]);

    useEffect(() => {
        async function loadPictures() {
            const address = selectedAccount;
            const images = [];
            let length;
            if (selectedAccount == userAccount) {
                console.log('hello1');
                length = await Contract.methods.getDataLength(address).call();
                for (let i = 0; i < length; i++) {
                    const URL = await Contract.methods.uploadedData(address, i).call();
                    images.push(<Card key='' index={i} URL={URL} />);
                }
            } else {
                console.log('hello2');
                length = await Contract.methods.getSharedDataLength(selectedAccount, userAccount).call();
                console.log(length);
                for (let i = 0; i < length; i++) {
                    const URL = await Contract.methods.getSharedImages(selectedAccount, userAccount, i).call();
                    images.push(<Card key='' index={i} URL={URL} />);
                }
            }
            setImages(images);
        }
        Contract && loadPictures();
    }, [selectedAccount])

    return (
        <>
            <Navbar userAccount={userAccount} />
            {userAccount == selectedAccount ?
                ""
                :
                <h2>Shared Images</h2>

            }
            <div className="productList">
                {images.length == 0 ?
                    <p>No file found</p>
                    :
                    images
                }
            </div>
        </>
    )
}

export default Files;