import { useEffect, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai"
import AddSongModal from "./AddSongModal/AddSongModal";
import { DetailsCard } from "../partials/DetailsCard/DetailsCard";
import { v4 as uuidv4 } from 'uuid';
import { useLanguage } from "../../context/LanguageContext";
import { BsClock } from "react-icons/bs";
import unknown from '../../assets/imgs/UnkownAlbum.jpg';
import { useUser } from "../../context/UserContext";
import UpdateSongModal from "./UpdateSongModal/UpdateSongModal";

const MySongs = () => {

  const [addIsOpen, setAddIsOpen] = useState(false);
  const [updateIsOpen, setUpdateIsOpen] = useState(false);
  const [id, setId] = useState("");
  const { text } = useLanguage();
  const { userState, getMyTracks } = useUser();

  return (
    <>
      <h3 className="text-left text-4xl py-6 m-auto">{text.categories.my_songs}</h3>
      <div className="flex w-full items-center justify-center pb-12">
        <div className="w-full h-full ">
          <UpdateSongModal id={id} setOpen={setUpdateIsOpen} open={updateIsOpen} getMyTracks={getMyTracks} />
          <AddSongModal setOpen={setAddIsOpen} open={addIsOpen} getMyTracks={getMyTracks}  />
            <div className=" h-40 w-40 flex flex-col gap-2 rounded-lg items-center justify-center bg-gradient-to-r from-red-200 via-orange-300 to-red-400 m-auto hover:cursor-pointer hover:from-red-400 hover:via-orange-300 hover:to-red-200 mb-12" onClick={setAddIsOpen}>
              <AiOutlinePlus size={40} color="black" className="hover:rounded-full hover:bg-opacity-10 hover:bg-slate-500 mt-8" />
              <span>Add</span>
            </div>
            <div className="z-5 flex flex-col h-25 text-center justify-center w-8/6 min-w-[100%] ">
              <div className='flex items-center justify-between border-b border-line-section'>
                <p className="w-1/12">#</p>
                <p className="w-2/12">{text.liked.track}</p>
                <p className="w-2/12"></p>
                <p className="w-3/12">Options</p>
                <p className="w-3/12">{text.liked.album_table}</p>
                <p className="w-2/12">{text.liked.gender}</p>
                <BsClock className='w-2/12' />
              </div>
            </div>
            {
              userState?.myTracks.length > 0 && userState?.myTracks.map((track, index) => {
                return (
                  <DetailsCard
                    key={uuidv4()}
                    track={track}
                    count={index}
                    ownerImage={unknown}
                    tracks={userState.myTracks}
                    playlistName="Owner"
                    setId={setId}
                    setUpdateIsOpen={setUpdateIsOpen}
                  />
                )
              })
            }
        </div>
      </div>
    </>
  )
}

export default MySongs