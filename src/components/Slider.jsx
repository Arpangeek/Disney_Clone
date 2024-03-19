import React, { useEffect, useState } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original";
const screenWidth = window.innerWidth;

function Slider() {
  const [movieList, setMovieList] = useState([]);
  const elementRef = React.createRef();
  useEffect(() => {
    getTrendingMovies();
  }, []);

  const getTrendingMovies = () => {
    fetch(
      "https://api.themoviedb.org/3/trending/movie/day?api_key=947bb48f328d435eadce1527fac870ec"
    )
      .then((res) => res.json())
      .then((json) => setMovieList(json.results));
  };

  console.log(movieList);
  const sliderRight = (element) => {
    element.scrollLeft += screenWidth - 110;
  };
  const sliderLeft = (element) => {
    element.scrollLeft -= screenWidth - 110;
  };

  return (
    <div>
      <FaAngleLeft
        className="hidden md:block text-[30px absolute mx-8 mt-[160px] cursor-pointer"
        onClick={() => sliderLeft(elementRef.current)}
      />
      <FaAngleRight
        className="hidden md:block text-[30px absolute mx-8 mt-[160px] cursor-pointer right-0"
        onClick={() => sliderRight(elementRef.current)}
      />
      <div
        className="flex overflow-x-auto w-full px-16 py-4 scrollbar-hide scroll-smooth "
        ref={elementRef}
      >
        {movieList.map((item, index) => (
          <img
            src={IMAGE_BASE_URL + item.backdrop_path}
            className="min-w-full md:h-[320px] object-cover object-top-middle mr-5 rounded-md hover:border-[4px] border-grey-400 transition-all duration-100 ease-in-out "
          />
        ))}
      </div>
    </div>
  );
}

export default Slider;
