import axios from "axios";
import { useEffect, useState } from "react"

export const useFetchAllArtists = () => {

  const [artists, setArtists] = useState([]);
  const [artistsLoaded, setArtistsLoaded] = useState(false)
  const getAllArtists = () => {
    axios.get(import.meta.env.VITE_BACKEND + "artists")
      .then(({ data }) => {
        
        setArtists(data);
        setArtistsLoaded(true);
      })
  }
  useEffect(() => {
    getAllArtists();
  }, [])

  return { artists, artistsLoaded };

}