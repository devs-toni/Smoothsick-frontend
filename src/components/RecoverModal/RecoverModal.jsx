import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { useLanguage } from '../../context/LanguageContext';
import { Button, TextInput } from 'flowbite-react';
import { useForm } from 'react-hook-form';
import { Bars } from "react-loader-spinner";
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useRecovery } from '../../context/RecoveryContext';

const RecoverModal = ({ open, setOpen }) => {

  const { text } = useLanguage();
  const [isLoading, setIsLoading] = useState(false)
  const { register, handleSubmit, reset } = useForm()
  const { dataState } = useRecovery();


  const onSubmit = async ({ email }) => {
    setIsLoading(true)
    await axios.post(import.meta.env.VITE_BACKEND + "users/forgotPassword", { email })
      .then((res) => {
        const { status, data } = res
        const { token, id } = data
        if (status === 200) {
          dataState.userId = id
          dataState.token = token
          setIsLoading(false)
          toast.success(text.recover.check , {
            style: {
              borderRadius: "10px",
              background: "#333",
              color: "#fff",
            },
            error: {
              duration: 10000,
            },
          })
          reset()
          setOpen(false)
        }
        if (status === 403) {
          setIsLoading(false)
          toast.success(text.recover.notfound , {
            style: {
              borderRadius: "10px",
              background: "#333",
              color: "#fff",
            },
            error: {
              duration: 10000,
            },
          })
          reset()
        }
      }).catch(err => {
        setIsLoading(false)
        toast.error(text.recover.bad_email , {
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
          error: {
            duration: 10000,
          },
        })
      })
  }

  const style = {
    backgroundColor: "#18181800",
    border: "1px solid #61616100",
    borderBottom: "1px solid gray",
    color: 'white'
  }
  return (
    <>
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-20" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-20 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-md text-left text-white shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg bg-zinc-900 z-auto">
                  {
                    !isLoading
                      ?
                      <>
                        <div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                          <div className="sm:flex sm:items-start">
                            <div className="mt-3 text-center sm:mt-0 sm:mx-4 sm:text-left w-full">
                              <Dialog.Title as="h3" className="font-semibold leading-6 mt-2 mb-10 text-center text-2xl">
                                {text.register.recover}
                              </Dialog.Title>

                              <div className="mt-2">
                                <TextInput
                                  type="text"
                                  className='border-solid rounded border-black w-full'
                                  placeholder={text.register.email}
                                  style={style}
                                  {...register('email')}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="px-10 py-6 sm:flex sm:flex-row-reverse sm:px-10 w-full justify-center">
                          <Button
                            type="button"
                            className="inline-flex w-full justify-center rounded-md bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 px-3 py-2 text-sm font-semibold text-white shadow-sm sm:ml-3 sm:w-auto"
                            onClick={handleSubmit(onSubmit)}
                          >
                            {text.register.send}
                          </Button>
                        </div>
                      </>
                      :
                      <div className="flex justify-center items-center p-20">
                        <Bars color='#ef5567' />
                      </div>
                  }
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  )
}

export default RecoverModal