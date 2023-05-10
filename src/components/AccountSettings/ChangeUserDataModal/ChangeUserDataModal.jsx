import { Button, Modal } from "flowbite-react"
import { useForm } from "react-hook-form"
import { useAuth } from "../../../context/AuthContext"
import axios from "axios"
import { toast } from "react-hot-toast"


export const ChangeUserNameModal = ({ setOpen, open }) => {

  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const { authState } = useAuth()
  const { user } = authState
  const { id } = user


  const onSubmitUserName = (data) => {
    const { userName } = data
    try {
      axios.patch(import.meta.env.VITE_DB_URI_CHANGE_USERNAME, { userName, id })
        .then(({ status }) => {
          if (status === 201) {
            toast.success("New user name saved!", {
              style: {
                borderRadius: "10px",
                background: "#333",
                color: "#fff",
              },
              error: {
                duration: 5000,
              },
            });
            user.userName = userName
            reset()
            setOpen(false)
          }
        })
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <Modal show={open} onClose={() => setOpen(false)} dismissible>
        <Modal.Body className='bg-zinc-900'>
          <div className='flex justify-center flex-col items-center gap-5'>
            <span className='text-white'>Change user name</span>
            <div className={`flex flex-col gap-5 items-center`}>
              <form onSubmit={handleSubmit(onSubmitUserName)} className={'mb-5'}>
                <input type="text" placeholder="Enter a new user name" className={'bg-zinc-600 rounded mb-5'}
                  {...register("userName", {
                    required: true,
                    maxLength: 10,
                    pattern: /^[a-zA-Z]+$/
                  })}
                />
                {errors?.userName?.type === "required" && <p className="text-red-500">First name is required</p>}
                {errors?.userName?.type === "pattern" && <p className="text-red-500">Alphabetical characters only</p>}
                <div className="mt-5 flex justify-center">
                  <Button
                    className='bg-deezer'
                    onClick={handleSubmit(onSubmitUserName)}
                  >
                    Update
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </Modal.Body>
      </Modal >
    </>
  )
}
