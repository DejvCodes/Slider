import "./OneMovie.css"
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";
import { useState,useEffect } from "react";
import data from "../data"

const OneMovie = () => {
  const [index, setIndex] = useState(0)

  // Filmy se ve slideru točí stále dokola
  useEffect(() => {
    if (index < 0) {
      setIndex(data.length - 1)
    } else if (index > data.length - 1) {
      setIndex(0)
    }
  }, [index])

  // Automatické posouvání
  useEffect(() => {
    let setIntervalId = setInterval(() => {
      setIndex(index + 1)
    }, 3000)
    return () => clearInterval(setIntervalId)
  }, [index])

  return <section className="all-movies">
    <div className="all-movies-content">
      {data.map((oneMovie, oneMovieIndex) => {
        const {id, image, title, age, tags, description} = oneMovie

        let mainClass = "next-slide"

        if (oneMovieIndex === index) {
          mainClass = "active-slide"
        }

        if (oneMovieIndex === index - 1 || (index === 0 && oneMovieIndex === data.length - 1)) {
          mainClass = "last-slide"
        }

        return <article key={id} className={mainClass}>
          <img src={image} alt="movie-img" />
          <h2>{title}</h2>
          <p>{description}</p>
          <p>{tags}</p>
          <p>{age}</p>
        </article>
      })}
    </div>
      <button onClick={() => setIndex(index - 1)}><FaArrowAltCircleLeft /></button>
      <button onClick={() => setIndex(index + 1)}><FaArrowAltCircleRight /></button>
  </section>
}

export default OneMovie