import React, { useState } from 'react'
import styled from 'styled-components'
import logo from '../assets/logo.png'
import { Link, useNavigate } from 'react-router-dom'
import { FaSearch, FaPowerOff } from 'react-icons/fa'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { firebaseAuth } from '../utils/firebase-config'
import { FaBars } from 'react-icons/fa'

export default function Navbar({ isScrolled }) {

    const links = [
        { name: 'Home', link: '/' },
        { name: 'Tv Shows', link: '/tv' },
        { name: 'Movies', link: '/movies' },
        { name: 'My List', link: '/mylist' }
    ]

    const [showSearch, setShowSearch] = useState(false)
    const [inputHover, setInputHover] = useState()
    const [open, setOpen] = useState(false)
    const navigate = useNavigate()

    onAuthStateChanged(firebaseAuth, (user) => {
        if (!user) navigate('/login')
      })

    return (
        <Container open={open} >
            <nav className={`flex ${isScrolled ? 'scrolled' : ''}`}>
                <div className="left flex a-center" >
                    <div className="brand flex a-center j-center">
                        <img src={logo} alt="logo" />
                    </div>
                    <ul className="flex links">
                        {
                            links.map(({ name, link }) => {
                                return (
                                    <li key={name}>
                                        <Link to={link}>{name}</Link>
                                    </li>
                                )
                            }
                            )
                        }
                    </ul>
                </div>
                <div className="right flex a-center">
                    <div className={`search ${showSearch ? 'show-search' : ''}`}>
                        <button
                            onFocus={() => setShowSearch(true)}
                            onBlur={() => { if (!inputHover) setInputHover(false) }}
                        ><FaSearch />
                        </button>
                        <input type="text" placeholder='Search'
                            onMouseEnter={() => setInputHover(true)}
                            onMouseLeave={() => setInputHover(false)}
                            onBlur={() => { setShowSearch(false); setInputHover(false) }
                            }
                        />
                    </div>
                    <button onClick={()=>signOut(firebaseAuth)}>
                        <FaPowerOff />
                    </button>
                </div>
                <MContainer onClick={() => setOpen(!open)}>
                        <FaBars />
                    </MContainer>
            </nav>
        </Container>
    )
}

const Container = styled.div`
    .scrolled{
        background-color: black;
    }
    nav{
        @media screen and (max-width: 960px) {
            display: flex;
            justify-content: space-between;
            padding: 0 0.5rem;
            transition: 0.5 all ease;
            .links{
                position: absolute;
                background-color: black;
                border: 1px solid red;
                padding: 20px;
                display: flex;
                margin-top: 350px;
                left: ${({open}) => open ? '0' : '-100%'};
                width: 100%;
                justify-content: center;
                flex-direction: column;
                align-items: center;
            }
        }
        position: sticky;
        top :0;
        height: 6.5rem; 
        position: fixed;
        width: 100%;
        justify-content: space-between;
        z-index: 2;
        padding: 0 4rem;
        align-items: center;
        transition: 0.3s ease-in-out;
        .left{
            gap: 2rem;
            .brand{
                img{
                    height: 4rem;
                }
            }
            .links{
                list-style-type: none;
                gap: 2rem;
                li{
                    a{
                        color: white;
                        text-decoration: none;
                    }
                }
            }
        }
        .right{
            gap: 1rem;
            button{
                background-color: transparent;
                border: none;
                cursor: pointer;
                &:focus{
                    outline: none;
                }
                svg{
                    color: #f34242;
                    font-size: 1.2rem;
                }
            }
            .search{
                display: flex;
                gap: 0.4rem;
                align-items: center;
                justify-content: center;
                padding: 0.2rem;
                padding-left: 0.5rem;
                button{
                    background-color: transparent;
                    svg{
                        color: white;
                    }
                }
            input{
                width: 0;
                opacity: 0;
                visibility: hidden;
                transition: 0.3s ease-in-out;
                background-color: transparent;
                border: none;
                color: white;
                &:focus{
                    outline: none;
                }
            }
        }
        .show-search{
            border: 1px solid white; 
            background-color: rgba(0,0,0,0.6);
            input{
                width: 100%;
                opacity:1;
                visibility: visible;
                padding: 0.3rem
            }
        }
    }
}

`;

const MContainer = styled.div`
    display: none;
    @media screen and (max-width: 960px) {
        display: block;
        align-items: center;
    }
`;