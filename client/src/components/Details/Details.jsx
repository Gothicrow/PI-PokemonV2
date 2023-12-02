import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getDetails } from '../../redux/actions/actions'
import style from './Details.module.css'
import {GiBroadsword} from 'react-icons/gi'
import { AiFillHeart } from 'react-icons/ai'
import { BiShieldQuarter } from 'react-icons/bi'
import pokeSvg from '../Assets/pokeSvg.svg'
import { useAuth0 } from '@auth0/auth0-react'
import {MdFavorite, MdFavoriteBorder} from 'react-icons/md'

function Details(pokeId) {

  const dispatch = useDispatch()
  const {isAuthenticated} = useAuth0()

  useEffect(()=>{
    dispatch(getDetails(pokeId))
  },[dispatch,pokeId])
  const detalles = useSelector((state)=>state.details) 

  return (
    <div className={style.details}>
      <div className={style.divDetails}>
        <div className={style.left}>
          {
            detalles.image === null ?
            <img className={style.image} src={pokeSvg} alt="" />
            :
            <img className={style.image} src={detalles.image} alt="" />
          }
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
            <div className={style.statsTypes}>
              <div className={style.stats2}>
                <h4 className={style.item1}>- Velocidad: {detalles.speed}</h4>
                <h4 className={style.item1}>- Altura: {detalles.height/10} m</h4>
                <h4 className={style.item1}>- Peso: {detalles.weight/10} kg</h4>
              </div>
              {
                detalles?.types?.length > 1 ?
                <div className={style.types}>
                  <h4 className={style.item2}>Tipos</h4>
                  <h4 className={style.item3}>{detalles.types[0].name} - {detalles.types[1].name}</h4>
                </div>
                :
                <div className={style.types}>
                  <h4 className={style.item2}>Tipo</h4>
                  <h4 className={style.item3}>{detalles?.types?detalles.types[0].name:''}</h4>
                </div>
              }
            </div>
          </div>
          {
            isAuthenticated ?
            <div className={style.favorites}>
              <div className={style.favsCount}>
                <MdFavorite className={style.favText}/>
                <h3 className={style.favText}>{'5'}</h3>
              </div>
              <div className={style.favsButton} onClick={()=>console.log('fav')}>
                {/* <MdFavorite className={style.favText}/> */}
                <MdFavoriteBorder className={style.favText}/>
              </div>
            </div>
            :
            <div className={style.favoriteslo}>
              <MdFavorite className={style.favText}/>
              <h3 className={style.favText}>5</h3>
            </div>
          }
        </div>
      </div>
    </div>
  )
}

export default Details