import { useState, useEffect} from "react"
import React  from 'react'
import { useNavigate } from "react-router"
import { useDispatch } from 'react-redux';
import {setNumbers} from '../redux/number';
import { useParams } from "react-router-dom";
import axios from 'axios'
import {Alert} from 'react-bootstrap'

function Ticket() {
    const BACKDROP_PATH = "https://image.tmdb.org/t/p/w1280"
    const MOVIE_API = "https://api.themoviedb.org/3/"
    const API_KEY = "2986a31e13ab4b485f680a65ec9eb4b2"
    const {id}= useParams();
const [movie, setMovie] = useState([])
const [ticket, setTicket] = useState('')
const [location, setLocation] = useState('')
const [date, setDate] = useState('')
const [time, setTime] = useState('')
const [show, setShow] = useState(false)

let navigate= useNavigate()
  let dispatch=useDispatch()
const current = new Date();
  
const tomorrow = `${current.getDate()+1} ${current.toLocaleString('default', { month: 'long' })}`;


useEffect(() => {
    const fetchMovie = async () => {
        const {data} = await axios.get(`${MOVIE_API}movie/${id}`, {
            params: {
                api_key: API_KEY,
                }
        })
    
    setMovie(data)
    console.log(data)
    }
    
  fetchMovie();
}, [])

 function handleClick(){
     if(!date || !ticket || !time){
         setShow(true);
     }else{
         setShow(false)
         dispatch(setNumbers(ticket))
         navigate('/Checkout')
        }
     }

    return (
    <>
     
        <div className="ticket">
          <div className="progress-container">
            <div className="progress-text">
              <div className="mini-title">Step 1 of 2</div>
              </div>
              <div className="progress-indicator"><span className="line"></span></div></div>
    <div className="griddd ">
    <div className="tleft"> 
    <div className="movie-details">
              <div className="ticket-background"> {movie.poster_path &&
                <img className="ticket-image" src={BACKDROP_PATH + movie.backdrop_path} alt={movie.title}/>
                }
                </div>
                <h4 className="px-2">{movie.title}</h4>
       <p className="text-light base">{movie.overview}</p>
       </div>
       </div> 
 <div className="selectors">
 <div className="align-tickets">
 <h3 className=" align-hr">₦3,000/TICKET</h3>
 <div className="d-flex flex-wrap justify-content-center">
 <div className="indi-selectors mx-2 my-2">
     
 <select onChange={(event)=>setTicket(event.target.value)} value = {ticket} className="form-select mx-2 my-2 form-select-sm" aria-label=".form-select-sm example">
  <option selected>Who's Going</option>
  <option value="1">1</option>
  <option value="2">2</option>
  <option value="3">3</option>
  <option value="4">4</option>
  <option value="5">5</option>
  <option value="6">6</option>
</select>
</div>
     <div className="indi-selectors mx-2 my-2">
     <select onChange={(event)=>setLocation(event.target.value)} value = {location} className="form-select mx-2 my-2 form-select-sm" aria-label=".form-select-sm example">
  <option selected>Lagos</option>
  <option value="1">Lagos</option>
  <option value="2">Abuja</option>
  </select>
  </div>
  <div className="indi-selectors mx-2 my-2">
  <select onChange={(event)=>setDate(event.target.value)} value = {date} className="form-select form-select-sm mx-2 my-2" aria-label=".form-select-sm example">
  <option selected>DATE</option>
  <option value="1">{tomorrow}</option>
</select>
</div>
<div className="indi-selectors mx-2 my-2">
<select onChange={(event)=>setTime(event.target.value)} value = {time} className="form-select mx-2 my-2 form-select-sm" aria-label=".form-select-sm example">
  <option selected>TIME</option>
  <option value="1">16:00</option>
  <option value="2">19:00</option>
</select>
</div>
</div>
<div className="align-button">
<button onClick={handleClick} className="btn-gradient py-2" data="BOOK NOW"></button>
{show && (
    <Alert color="#105f34" className="my-4" variant="info" onClick={() => setShow(false)} dismissible>
     Please select all options   
      </Alert>
)
}
</div>
</div>
  </div>
  
</div>
</div>
     
  </>
  )
}

export default Ticket