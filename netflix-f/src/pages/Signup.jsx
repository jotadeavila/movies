import { React, useState } from 'react'
import styled from 'styled-components'
import BackgrounImage from '../components/BackgrounImage';
import Header from '../components/Header';
import { firebaseAuth } from '../utils/firebase-config';
import { createUserWithEmailAndPassword, onAuthStateChanged  } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

export default function Signup() {

    const [showPassword, setShowPassword] = useState(false)
    const navigate = useNavigate()
    const [formValues, setFormValues] = useState({
        email: '',
        password: ''
    })

    const handleSignup = async () => {
       try {
         const { email, password } = formValues;
         await createUserWithEmailAndPassword(firebaseAuth, email, password)
        
       } catch (error) {
            console.log(error)
       }
    }

    onAuthStateChanged(firebaseAuth, (user)=>{
        if(user) navigate('/')
    })

    return (
        <Container showPassword={showPassword}>
            <BackgrounImage />
            <div className="content">
                <Header />
                <div className='body flex column a-center j-center'>
                    <div className='text flex column'>
                        <h1>Ilimitado, programas de TV y más</h1>
                        <h4>Mire en cualquier lugar, cancele en cualquier momento</h4>
                        <h6>¿Listo para mirar? Ingrese su correo electrónico para crear o reiniciar la membresía</h6>
                    </div>
                    <div className="form">
                        <input type="email" placeholder='Email Address' name='email' value={formValues.email} 
                        onChange={(e)=>setFormValues({...formValues, [e.target.name]: e.target.value})}/>
                        {
                            showPassword && <input type="password" placeholder='Password' name='password' value={formValues.password} 
                            onChange={(e)=>setFormValues({...formValues, [e.target.name]: e.target.value})}/>
                        }
                        
                        {
                            !showPassword && <button onClick={()=>setShowPassword(true)}>Get started</button>
                        }
                        
                    </div>
                    <button onClick={handleSignup}>Sign Up</button>
                </div>
            </div>
        </Container>
    )
}

const Container = styled.div`
    position: relative;
    .content {
        position: absolute;
        top: 0;
        left: 0;
        background-color: rgba(0, 0, 0, 0.5);
        height: 100vh;
        width: 100vw;
        display: grid;
        grid-template-rows: 15vh;
        .body{
            gap: 1rem;
            .text{
                gap: 1rem;
                text-align: center;
                font-size: 2rem;
                h1{
                    padding: 0 25rem;
                }
            }
            .form{
                display:grid;
                grid-template-columns: ${({showPassword}) => showPassword ? '1fr 1fr' : '2fr 1fr'};
                width: 60%;
                input{
                    color: black;
                    border: none;
                    padding: 1.5rem;
                    font-size: 1.2rem;
                    border: 1px solid black;
                    &:focus {
                        outline: none; 
                    }
                }
                button{
                    padding: 0.5rem 1rem;
                    background-color: #e50914;
                    border: none;
                    cursor: pointer;
                    color: white;
                    border-radius: 0.2rem;
                    font-weight: bolder;
                    font-size: 1.05rem;
                    
                }
            }
            button{
                padding: 0.5rem 1rem;
                background-color: #e50914;
                border: none;
                cursor: pointer;
                color: white;
                border-radius: 0.2rem;
                font-weight: bolder;
                font-size: 1.05rem;
                
            }
        }
    }
`;
