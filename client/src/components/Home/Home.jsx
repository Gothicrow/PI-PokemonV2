import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getPokemons } from '../../redux/actions/actions'
import { CLEAR_DETAILS } from '../../redux/actions/actionTypes'
import Card from '../Cards/Card'
import Details from '../Details/Details'
import style from './Home.module.css'
import {ImCross} from 'react-icons/im'

function Home() {

  const dispatch = useDispatch()
  const [pagina, setPagina]=useState(0);
  const [render,setRender]= useState([]);
  const [details, setDetails] = useState(false)
  const [id, setId] = useState()

  useEffect(()=>{
    dispatch(getPokemons())
  },[dispatch])
  const pokes = useSelector((state)=>state.pokemons)

  

  useEffect(() => {
    let pokeRender = []
    if(render.length<1){
      if(pokes){
        if(pokes.length>0){
          if(pokes[pagina]){
            if(pokes[pagina].pokes){
              if(pokeRender.length<pagina+1){
                for(let i=0;i<pokes[pagina].pokes.length;i++){
                  pokeRender.push(pokes[pagina].pokes[i])
                }
                setRender(pokeRender)
              }
            }
          }
        }
      }
    }
    window.onscroll = function (){
      var scroll = window.scrollY + window.innerHeight > document.documentElement.offsetHeight/100*90
      if(scroll){
        if(pokes.length-1>pagina){
          setPagina(pagina+1)
        }
        if(pokes){
          if(pokes.length>0){
            if(pokes[pagina+1]){
              if(pokes[pagina+1].pokes){
                if(pokeRender.length<pagina+1){
                  for(let i=0;i<pokes[pagina+1].pokes.length;i++){
                    pokeRender.push(pokes[pagina+1].pokes[i])
                  }
                  let instancia = render.concat(pokeRender)
                  setRender(instancia)
                }
              }
            }
          }
        }
      }
    }
  },[pokes,pagina,render])

  return (
    <div className={style.home}>
      {
        details ? <><Details pokeId={id}/><button className={style.boton} onClick={()=>{setDetails(false);dispatch({type: CLEAR_DETAILS, payload: {}})}}><ImCross/></button></> : <></>
      }
        <div className={style.pokes}>
          {
            render.length>0 ?
            render.map(p=><div key={p.id} onClick={()=>{setDetails(true);setId(p.id)}}><Card name={p.name} image={p.image} types={p.types}/></div>)
            :
            <h2>Cargando...</h2>
          }
        </div>
    </div>
  )
}

export default Home