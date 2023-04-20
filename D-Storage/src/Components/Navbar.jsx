import computer from '../assets/File.webp'
import fileArrow from '../assets/newFiles.png'
import about from '../assets/about.png'
import backArrow from '../assets/BackArrow.png'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'

function Navbar(props) {
    const { userAccount } = props;





    return (
        <>
            <nav>
                <div id='navButton'>
                    {location == 'http://localhost:5173/' ?

                        <Link id='fileLink' to="Files"><img src={computer} alt="" />Files <img src={fileArrow} alt="" /> </Link>
                        :

                        <Link id='fileLink' to='/'><img src={backArrow} alt="" />Back </Link>
                    }


                    <Link id='aboutFileLink' to="/About"><img src={about} alt="" /></Link>
                </div>
                <h3 id='accountHeading'>Account : {userAccount}</h3>

            </nav>
        </>
    )
}

export default Navbar;