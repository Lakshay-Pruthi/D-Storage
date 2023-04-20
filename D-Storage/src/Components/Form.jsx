import img from '../assets/uploadButton.png'
import img1 from '../assets/ShareButton.png'
import img2 from '../assets/Lock.webp'
import axios from 'axios';
import { useState, useEffect } from 'react';

function Form(props) {
    require('dotenv').config();
    const { Contract, userAccount, setSelectedAccount } = props;
    const [file, setFile] = useState(null);

    async function something(e) {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append("file", file);

            const resFile = await axios({
                method: "post",
                url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
                data: formData,
                headers: {
                    pinata_api_key: process.env.PINATA_API_KEY,
                    pinata_secret_api_key: process.env.PINATA_SECRET_API_KEY,
                    "Content-Type": "multipart/form-data",
                },
            });
            const ImgHash = `https://gateway.pinata.cloud/ipfs/${resFile.data.IpfsHash}`;
            console.log(ImgHash);
            const res = await Contract.methods.uploadData(userAccount, ImgHash).send({ from: userAccount, gas: 2000000 });
            ImgHash && res && alert('Image successfully uploaded')
        } catch (error) {
            console.log(error);
        }
    }

    const retrieveFile = (e) => {
        const data = e.target.files[0]; //files array of files object
        const reader = new window.FileReader();
        reader.readAsArrayBuffer(data);
        reader.onloadend = () => {
            setFile(e.target.files[0]);
        };
        e.preventDefault();
    };

    const [sharedAccounts, setSharedAccounts] = useState();
    const [options, setOptions] = useState();
    useEffect(() => {
        async function getSharedAccount() {
            const length = await Contract.methods.getSharedAccountsLength(userAccount).call();
            let accounts = [];
            for (let i = 0; i < length; i++) {
                const account = await Contract.methods.hasSharedImages(userAccount, i).call();
                accounts.push(account);
            }
            setSharedAccounts(accounts);
        }
        Contract && userAccount && getSharedAccount();
    }, [Contract, userAccount])

    useEffect(() => {
        function loadSharedAccounts() {
            setOptions(sharedAccounts.map((e) => {
                return <option key='' value={e}>{e}</option>
            }))
        }
        sharedAccounts && loadSharedAccounts();
    }, [sharedAccounts])

    function changeselectedAccount() {
        const selectElement = document.getElementById("sharedAccounts");
        const index = selectElement.options.selectedIndex;
        const selectedOption = selectElement.options[index].value;
        setSelectedAccount(selectedOption)
        alert('Images Loaded')
    }



    return (
        <>
            <form id='main-form' autoComplete="off" onSubmit={something}>
                <h1><img src={img2} alt="" />D-Storage</h1>

                <select id="sharedAccounts" name="Accounts">
                    <option value={userAccount}>Your Account</option>
                    {options}

                </select>
                <div className='buttonBox'>
                    <button className='btn' type='button' id='changeAccount' onClick={changeselectedAccount}>Get Images</button>
                </div>
                <div className='buttonBox'>
                    <input
                        type="file"
                        id="file-upload"
                        name="data"
                        onChange={retrieveFile}
                    />
                    <label htmlFor='file-upload' id='uploadButton' className='btn'><img src={img} alt="" /> Upload</label>
                    <button type='submit' className='btn'>Submit</button>
                </div>

            </form >

        </>
    )
}

export default Form;