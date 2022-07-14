import React from 'react'
import style from './NavBar.module.css'
import { useAuth0 } from '@auth0/auth0-react'
import { useState } from 'react'

function NavBar() {
    const {isLoading,logout,isAuthenticated,loginWithRedirect,user} = useAuth0()

    const [boton, setBoton] = useState(false)

    return (
        <div className={style.navBar}>
            <div className={style.logo}>
                <h2 className={style.logoh2}>Pokedex</h2><h4 className={style.logoh4}>v2.0</h4>
            </div>
            <div className={style.login}>
                {
                isLoading ?
                <></>
                :
                isAuthenticated ?
                    <button className={style.botonOut} onClick={()=>logout()} onMouseEnter={()=>setBoton(true)} onMouseLeave={()=>(setBoton(false))}>
                        <div className={boton ? style.centroTrueOut : style.centroFalseOut}>
                            <div className={boton ? style.centroTrue2Out : style.centroFalse2Out}>
                                <div className={boton ? style.centroTrue3Out : style.centroFalse3Out}>
                                    <div className={boton ? style.centroTrue4Out : style.centroFalse4Out}></div>
                                </div>
                            </div>
                        </div>
                        <img className={boton ? style.fotoTrue : style.fotoFalse} src={user.picture} alt=''/>
                    </button>
                :
                    <button className={style.boton} onClick={()=>loginWithRedirect()} onMouseEnter={()=>setBoton(true)} onMouseLeave={()=>(setBoton(false))}>
                        <div className={boton ? style.centroTrue : style.centroFalse}>
                            <div className={boton ? style.centroTrue2 : style.centroFalse2}>
                                <div className={boton ? style.centroTrue3 : style.centroFalse3}>
                                    <div className={boton ? style.centroTrue4 : style.centroFalse4}></div>
                                </div>
                            </div>
                        </div>
                        <h3 className={boton ? style.botonh3true : style.botonh3false}>Log in</h3>
                    </button>
                }
            </div>
        </div>
    )
}

export default NavBar