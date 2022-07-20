import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getDetails } from '../../redux/actions/actions'
import style from './Details.module.css'
import {GiBroadsword} from 'react-icons/gi'
import { AiFillHeart } from 'react-icons/ai'
import { BiShieldQuarter } from 'react-icons/bi'

function Details(pokeId) {

  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(getDetails(pokeId))
  },[dispatch,pokeId])
  const detalles = useSelector((state)=>state.details) 

  return (
    <div className={style.details}>
      <div className={style.divDetails}>
        <div className={style.left}>
          <img className={style.image} src={detalles.image} alt="" />
        </div>
        <div className={style.right}>
          <div className={style.arriba}>
            <h2 className={style.name}>{detalles.name}</h2>
          </div>
          <div className={style.abajo}>
            <div className={style.stats}>
              <div className={style.stat}>
                <AiFillHeart className={style.item}/>
                <h4 className={style.item}>{detalles.hp}</h4>
              </div>
              <div className={style.stat}>
                <GiBroadsword className={style.item}/>
                <h4 className={style.item}>{detalles.attack}</h4>
              </div>
              <div className={style.stat}>
                <BiShieldQuarter className={style.item}/>
                <h4 className={style.item}>{detalles.defense}</h4>
              </div>
            </div>
            <div className={style.stats2}>
              <h4 className={style.item1}>- Velocidad: {detalles.speed}</h4>
              <h4 className={style.item1}>- Altura: {detalles.height/10} m</h4>
              <h4 className={style.item1}>- Peso: {detalles.weight/10} kg</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Details