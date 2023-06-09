import axios from "axios";
import { useEffect, useState } from "react"

export const useFetchAllPlaylists = () => {

  const [playlists, setPlaylists] = useState([]);
  const [playlistsLoaded, setPlaylistsLoaded] = useState(false)

  const getAllPlaylists = () => {
    axios.get(import.meta.env.VITE_BACKEND + "playlists")
      .then(({ data }) => {
        setPlaylists(data);
        setPlaylistsLoaded(true);
      })
  }
  useEffect(() => {
    getAllPlaylists();
  }, [])

  return { playlists, playlistsLoaded };

}