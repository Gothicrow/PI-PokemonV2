import React from 'react'
import style from './Card.module.css'
import imagen from '../Assets/pokeSvg.svg'

function Card({name,image,types}) {
  return (
    <div className={style.card}>
      <h3 className={style.name}>{name}</h3>
      <img className={style.image} src={image === null ? imagen : image} alt="" />
      {
        types.length>1 ?
        <div className={style.types}>
          <h4 className={style.type}>{types[0].name}</h4>
          <h4 className={style.type}>{types[1].name}</h4>
        </div>
        :
        <div className={style.types}>
          <h4 className={style.type}>{types[0].name}</h4>
        </div>
      }
    </div>
  )
}

export default Card