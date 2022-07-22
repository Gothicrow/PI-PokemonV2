import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import style from './NavBar.module.css'
import { useAuth0 } from '@auth0/auth0-react'
import { useState } from 'react'
import { getTypes } from '../../redux/actions/actions'
import { ORDER1, ORDER2, SEARCH, TIPO } from '../../redux/actions/actionTypes'

function NavBar() {
    const {isLoading,logout,isAuthenticated,loginWithRedirect,user} = useAuth0()

    const dispatch = useDispatch()
    const [boton, setBoton] = useState(false)

    useEffect(()=>{
        dispatch(getTypes())
    },[dispatch])
    const types = useSelector((state)=>state.types)

    return (
        <div className={style.navBar}>
            <Link to='/' className={style.logo}>
                <h2 className={style.logoh2}>Pokedex</h2><h4 className={style.logoh4}>v2.0</h4>
            </Link>
            {
                window.location.pathname === '/home' ?
                <div className={style.inputs}>
                    <div className={style.div1}>
                        <input type="search" placeholder='Buscar pokemon..' onChange={(e)=>dispatch({type: SEARCH, payload: e.target.value})} />
                    </div>
                    <div className={style.div2}>
                        <select onChange={(o)=>dispatch({type: ORDER1, payload: o.target.value})}>
                            <option value="id">Id</option>
                            <option value="name">Name</option>
                            <option value="attack">Attack</option>
                            <option value="hp">Hp</option>
                            <option value="defense">Defense</option>
                            <option value="speed">Speed</option>
                            <option value="height">Height</option>
                            <option value="weight">Weight</option>
                        </select>
                        <select onChange={(o)=>dispatch({type: ORDER2, payload: o.target.value})}>
                            <option value="asc">Asc</option>
                            <option value="desc">Desc</option>
                        </select>
                    </div>
                    <div className={style.div3}>
                        <select className={style.types} onChange={t=>dispatch({type: TIPO, payload: t.target.value})}>
                            <option value="" className={style.type}>Filtrar por tipo</option>
                            {
                                types.map(t=><option key={t.id} className={style.type}>{t.name}</option>)
                            }
                        </select>
                    </div>
                </div> : <></>
            }
            
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