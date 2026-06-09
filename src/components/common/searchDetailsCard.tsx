import { useState } from "react";
import type { VideoProps } from "../../types/type";
import VideoCard from "./videoCard";
import { useFavorites } from "../../hooks/useFavorites";
import { useNavigate } from "react-router-dom";
export default function SearchDetailsCard({queryTerm, queryData}: {queryTerm:string, queryData:VideoProps[]}) {
  const [filterby, setFilterby] = useState("");
  const navigate = useNavigate();
  const {isFavorite, toggleFavorite} = useFavorites();
  const sortedByRate = queryData?.sort((a, b) => b.vote_average - a.vote_average);
  
  const filteredData = sortedByRate?.filter((data: VideoProps) => {
    if (filterby === "tv") {
      return data.name !== undefined;
    } else if (filterby === "movie") {
      return data.title !== undefined;
    } else if (filterby === "person") {
        return 
    }else {
      return true;
    }
  });

  const filterArray=[{name:"All",value:""},{name:"Movies",value:"movie"},{name:"TV Shows",value:"tv"},{name:'Persons', value:"person"}]
  return  (
    <div className="p-2 md:p-4 space-y-2">
        <p className="uppercase text-red-200 text-lg">Search result for</p>
        <h1 className="font-bold text-3xl md:text-6xl pb-3">{queryTerm}</h1>
        <div className="flex flex-wrap items-center gap-3 pb-4">
         {filterArray.map((item: {name:string,value:string})=>(
          <button onClick={(e)=>{
            e.preventDefault();
            setFilterby(item.value)
          }} className={`px-2 md:px-4 py-1 text-[15px] flex items-center rounded-full uppercase  cursor-pointer text-red-200 bg-gray-800/60 ${filterby===item.value && "bg-red-500 text-white"}`}>{item.name}</button>
         ))}
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-8 gap-5">
          {filteredData?.map((movie: VideoProps) => (
            <VideoCard
              key={movie.id}
              video={movie}
              isFavorite={isFavorite(movie.id)}
              onToggleFavorite={toggleFavorite}
            />
          ))}
        </div>
        <div className="flex justify-center flex-col items-center">
            <p className="text-red-200 py-3">Showing {filteredData?.length} results</p>
            <button className="px-4 py-3 cursor-pointer rounded-sm text-white bg-gray-800/70"
            onClick={()=>navigate('/movie')}
            >Explore More Results</button>
        </div>
    </div>
  )
}
