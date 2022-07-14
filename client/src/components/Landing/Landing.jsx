import React from 'react'
import { Link } from 'react-router-dom'
import fondo from '../Assets/14759-pokemon.jpg'
import style from './Landing.module.css'

function Landing() {
  return (
    <div className={style.landing}>
        <img className={style.fondo} src={fondo} alt="" />
        <Link to='/home' className={style.boton}>
            <div className={style.rojo}></div>
            <div className={style.negro}></div>
            <div className={style.blanco}></div>
            <div className={style.centro}>
                <div className={style.centro2}>
                    <div className={style.centro3}>
                        <div className={style.centro4}></div>
                    </div>
                </div>
            </div>
        </Link>
    </div>
  )
}

export default Landing