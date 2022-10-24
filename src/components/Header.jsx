import React, { useEffect,useState } from 'react';
import { useMediaQuery } from 'react-responsive'
 import axios from 'axios'
 import Movielist from "./Movielist"
 import Youtube from 'react-youtube'
 import Main from './Main';
import Checkout from './Checkout'
 import Ticket from './Ticket';
import {
Routes,
  Route, Link} from 'react-router-dom'





  function Header() {
  const MOVIE_API = "https://api.themoviedb.org/3/"
  const SEARCH_API = MOVIE_API + "search/movie"
  const DISCOVER_API = MOVIE_API + "discover/movie/"
  const API_KEY = "2986a31e13ab4b485f680a65ec9eb4b2"
  const BACKDROP_PATH = "https://image.tmdb.org/t/p/w1280"

  
  const [playing, setPlaying] = useState(false)
  const [trailer, setTrailer] = useState(null)
  const [movies, setMovies] = useState([])
  const [searchKey, setSearchKey] = useState("")
  const [movie, setMovie] = useState({title: "Loading Movies"})

  useEffect(() => {
      fetchMovies()
  }, [])
const handleChange = event =>{
  event.preventDefault()
  setSearchKey(event.target.value)
}
  const fetchMovies = async (event) => {
      if (event) {
          event.preventDefault()
      }

      const {data} = await axios.get(`${searchKey ? SEARCH_API : DISCOVER_API}`, {
          params: {
              api_key: API_KEY,
              query: searchKey
          }
      })


const filteredMovies = data.results.filter((result, I)=>I < 9)

      setMovies(filteredMovies)
      setMovie(data.results[0])
console.log(filteredMovies)
      if (data.results.length) {
          await fetchMovie(data.results[0].id)
      }
      setSearchKey('')
  }
//fetch movie plays videos
  const fetchMovie = async (id) => {
      const {data} = await axios.get(`${MOVIE_API}movie/${id}`, {
          params: {
              api_key: API_KEY,
              append_to_response: "videos"
          }
      })

      if (data.videos && data.videos.results) {
          const trailer = data.videos.results.find(vid => vid.name === "Official Trailer")
          setTrailer(trailer ? trailer : data.videos.results[0])
      }

      setMovie(data)
  }

//changes the id of the movie that was fetched in fetchmovie so it displays on the top when clicked
//it will make it enter the movie state which maes it display on top
  const selectMovie = (movie) => {
      fetchMovie(movie.id)//this will be the id of the selected movie
      setPlaying(false)
      setMovie(movie)//then this sets the data there from the movie from map and changes it to the movie state
      window.scrollTo(0, 0)
  }
//the movies here is from map and not fromm state
  const renderMovies = () => (
      movies.map(movie => (
          <Movielist
              selectMovie={selectMovie}
              key={movie.id}
              movie={movie}
          />
      ))
  )
 const ShowBody= ()=>{
        
  return (
        <div className="App">
            {movies.length ?
                <main>
                    {movie ?
                        <div className="poster"
                             style={{backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)), url(${BACKDROP_PATH}${movie.backdrop_path})`}}>
                            {playing ?
                                <>
                                    <Youtube
                                        videoId={trailer.key}
                                        className={"youtube "}
                                        containerClassName={"youtube-container"}
                                        opts={
                                            {
                                                width: '100%',
                                                height: '100%',
                                                playerVars: {
                                                    autoplay: 1,
                                                    controls: 0,
                                                    cc_load_policy: 0,
                                                    fs: 0,
                                                    iv_load_policy: 0,
                                                    modestbranding: 0,
                                                    rel: 0,
                                                    showinfo: 0,
                                                },
                                            }
                                        }
                                    />
                                    <div onClick={() => setPlaying(false)} className={" close-video"}>
                                    </div>
                                </> :
                                <div className="center-max-size">
                                    <div className="poster-content">
                                          <div className="text-white">
                                          <h1 className="title">{movie.title}</h1>
                                          <p className="fs-20 overview">{movie.overview.substring(0,300)}...</p>
                                        <div >{trailer ?
                                           <div className="d-flex text-center my-1"> <button className="btn play-btn play-video" onClick={() => setPlaying(true)}
                                                    type="button"></button>
                                                    <p className="pwt py-3 px-2">WATCH TRAILER</p>
                                            </div>
                                            : 'Sorry, no trailer available'}
                                    <Link to={`/Ticket/${movie.id}`}  className='btn button '>Buy Ticket</Link>
                                    </div>
                                    </div>
                                    </div>
                                </div>
                            }
                        </div>
                        : null}
                        <div>
                          <h3 className= "currently">CURRENTLY SHOWING</h3>
                        </div>

                    <div className="center-max-size grid">               
                          {renderMovies()}
                    </div>

                </main>
                : null}
        </div>
    );
}



  return (
    <>
    <Main fetchMovies={fetchMovies} handleChange={handleChange} searchKey={searchKey}/>
    <div>
    
      <Routes>
      <Route exact path='/' element={<ShowBody/>}></Route>
      <Route exact path='/Ticket/:id' element={<Ticket/>}></Route>
      <Route exact path='/Checkout' element={<Checkout/>}></Route>
    </Routes>
    
    </div>
   
    </>
  );
}


export default Header;