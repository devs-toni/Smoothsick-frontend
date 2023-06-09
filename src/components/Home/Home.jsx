import { useLanguage } from '../../context/LanguageContext';
import { useState } from 'react';
import './Home.css';
import Slider from '../Slider/Slider';
import Cover from '../Cover/Cover';
import { useFetchAllHomeArtists, useFetchAllHomeAlbums, useFetchAllHomePlaylists, useFetchAllHomeTracks, useFetchLessHomePlaylists, useFetchMoreHomeArtists, useFetchLessHomeAlbums, useFetchLessHomeTracks } from '../../hooks';
import { FILTER_TYPES } from '../Search/filterTypes';



const Home = () => {

  const { text } = useLanguage();
  const [loaded, setLoaded] = useState(false);
  const { artists, artistsLoaded } = useFetchAllHomeArtists();
  const { moreArtists, moreArtistsLoaded } = useFetchMoreHomeArtists();
  const { albums, albumsLoaded } = useFetchAllHomeAlbums();
  const { playlists, playlistsLoaded } = useFetchAllHomePlaylists();
  const { lessPlaylists, lessPlaylistsLoaded } = useFetchLessHomePlaylists();
  const { lessAlbums, lessAlbumsLoaded } = useFetchLessHomeAlbums();
  const { lessTracks, lessTracksLoaded } = useFetchLessHomeTracks();
  const { tracks, tracksLoaded } = useFetchAllHomeTracks();

  return (
    <div className='pb-20 main-home truncate'>
      <div className="home">
        <div className="first-row">
          <Slider
            name="The best!"
            list={artistsLoaded && artists}
            type={FILTER_TYPES.ARTISTS}
            isFirstRowSection={true}
          />
        </div>
        <div className="w-full">
          <div className="home__carousel">
            <Cover
              loaded={loaded}
              setLoaded={setLoaded}
            />
          </div>
          {/*           <div className='home__sections'>
            <Section
              tracks={selectedTracks}
              loaded={loaded}
            />
            <Section
              tracks={selectedTracks}
              loaded={loaded}
            />
          </div> */}
        </div>
        <div className="rows">
          <Slider
            name={text.home.top_playlists}
            list={playlistsLoaded && playlists}
            type={FILTER_TYPES.PLAYLISTS}
          />
          <Slider
            name={text.home.top_artists}
            list={artistsLoaded && artists}
            type={FILTER_TYPES.ARTISTS}
          />
          <Slider
            name={text.home.top_tracks}
            list={tracksLoaded && tracks}
            type={FILTER_TYPES.TRACKS}
            top_tracks={tracks}
          />
          <Slider
            name={text.home.top_albums}
            list={albumsLoaded && albums}
            type={FILTER_TYPES.ALBUMS}
          />
          <Slider
            name={text.home.less_playlists}
            list={lessPlaylistsLoaded && lessPlaylists}
            type={FILTER_TYPES.PLAYLISTS}
          />
          <Slider
            name={text.home.less_artists}
            list={moreArtistsLoaded && moreArtists}
            type={FILTER_TYPES.ARTISTS}
          />
          <Slider
            name={text.home.less_albums}
            list={lessAlbumsLoaded && lessAlbums}
            type={FILTER_TYPES.ALBUMS}
          />
          <Slider
            name={text.home.less_tracks}
            list={lessTracksLoaded && lessTracks}
            type={FILTER_TYPES.TRACKS}
            less_tracks={lessTracks}
          />

        </div>
      </div>
      <div className={`transition-img ${loaded ? 'loaded' : ''}`} style={{
        backgroundImage: `url(https://www.mondosonoro.com/wp-content/uploads/2016/02/zoo.jpg)`
      }}></div>
    </div>
  )
}

export default Home;