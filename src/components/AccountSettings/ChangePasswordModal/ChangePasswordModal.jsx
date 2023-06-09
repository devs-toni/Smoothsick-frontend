import { Modal, Button } from "flowbite-react"
import { useEffect, useState } from 'react'
import { useForm } from "react-hook-form"
import { useAuth } from "../../../context/AuthContext"
import axios from "axios"
import { toast } from "react-hot-toast"
import { useLanguage } from "../../../context/LanguageContext"

export const ChangePasswordModal = ({ setOpen, open }) => {
    const { text } = useLanguage()
    const { register, handleSubmit, reset, formState: { errors } } = useForm()
    const [hiddenCurrentPassword, setHiddenCurrentPassword] = useState("")
    const [hiddenNewPassword, setHiddenNewPassword] = useState("hidden")
    const { authState } = useAuth()
    const { user } = authState
    const { id } = user





    const onSubmitCurrentPass = (data) => {
        const { currentPass } = data

        try {
            axios.post(import.meta.env.VITE_BACKEND + "users/validatePassword", { currentPass, id })
                .then(({ status }) => {
                    if (status === 201) {
                        setHiddenCurrentPassword("hidden")
                        setHiddenNewPassword("")
                        reset()
                    } else {
                        toast.error(text.changepass.bad_pass , {
                            style: {
                                borderRadius: "10px",
                                background: "#333",
                                color: "#fff",
                            },
                            error: {
                                duration: 5000,
                            },
                        });
                    }
                })
        } catch (error) {
            console.error(error);
        }

    }

    const onSubmitNewPass = (data) => {
        const { pass, repeatPass } = data
        if (pass !== repeatPass) {
            toast.error(text.toast.toast7 , {
                style: {
                    borderRadius: "10px",
                    background: "#333",
                    color: "#fff",
                },
                error: {
                    duration: 5000,
                },
            });
        } else {
            try {
                axios.patch(import.meta.env.VITE_BACKEND + "users/changePassword", { pass, id })
                    .then(({ status }) => {
                        if (status === 201) {
                            reset()
                            toast.success(text.recover.pass_notmacht, {
                                style: {
                                    borderRadius: "10px",
                                    background: "#333",
                                    color: "#fff",
                                },
                                error: {
                                    duration: 5000,
                                },
                            });
                            setHiddenCurrentPassword("")
                            setHiddenNewPassword("hidden")
                            setOpen(false)

                        }

                    })
            } catch (error) {
                console.error(error);
            }
        }


    }




    return (
        <>
            <Modal show={open} onClose={() => setOpen(false)} size="xl" dismissible>
                <Modal.Body className='bg-zinc-900'>
                    <div className='flex justify-center flex-col items-center gap-5'>
                        <span className='text-white'>{text.recover.submit}</span>
                        <div className=" flex flex-col gap-5 items-center">
                            <form onSubmit={handleSubmit(onSubmitCurrentPass)} className={`mb-5  ${hiddenCurrentPassword}`}>
                                <div className="flex gap-5">
                                    <input type="password" placeholder={text.recover.ok} required={true} className="bg-zinc-600 rounded mb-5}"
                                        {...register("currentPass")}
                                    />
                                </div>
                                <div className="mt-5 flex justify-center">
                                    <Button
                                        className='bg-deezer'
                                        type="submit"
                                    >
                                        {text.recover.btn_ok}
                                    </Button>
                                </div>
                            </form>
                            <form onSubmit={handleSubmit(onSubmitNewPass)} className={`mb-5  ${hiddenNewPassword}`}>
                                <div className="flex md:flex-row flex-col gap-5">
                                    <input type="password" placeholder={text.register.n_pass} required={true} className="bg-zinc-600 rounded mb-5}"
                                        {...register("pass", {
                                            pattern: /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/
                                        })}
                                    />
                                    <input type="password" placeholder={text.register.ok_n_pass} required={true} className="bg-zinc-600 rounded mb-5}"
                                        {...register("repeatPass")}
                                    />
                                </div>
                                {
                                    errors?.pass?.type === "pattern" &&
                                    <p className="text-red-500 text-xs text-center pt-4">
                                        {text.changepass.request}
                                    </p>
                                }
                                <div className="mt-5 flex justify-center">
                                    <Button
                                        className='bg-deezer'
                                        type="submit"
                                    >
                                        {text.register.btn_create}
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}

