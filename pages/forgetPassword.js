import { useRouter } from "next/router"
import { useEffect, useState } from "react"

const ForgetPassword = () => {

    const router = useRouter()
    const [passwordShow, setPasswordShow] = useState(false)
    const [runValidation, setRunValidation] = useState(false)
    const [forgetPasswordData, setForgetPasswordData] = useState({
        email: "",
        password: ""
    })
    const [error, setError] = useState({})

    function onSubmitHandler(e) {
        e.preventDefault()
        setRunValidation(true)
        const isError = Validation()
        if (isError) return
        setRunValidation(false)

        const RegisterData = JSON.parse(localStorage.getItem("RegisterData"))
        if (RegisterData) {
            let IsRegister = false
            let tempRegisterData = []
            RegisterData.map((item) => {
                if (item.email === forgetPasswordData.email) {
                    IsRegister = true
                    item.password = forgetPasswordData.password
                    tempRegisterData.push(item)
                } else {
                    tempRegisterData.push(item)
                }
            })

            if (!IsRegister) {
                alert("EmailID Not Register")
            } else {
                alert("password Update Successfull")
                router.push('/login')
                localStorage.setItem("RegisterData", JSON.stringify(tempRegisterData))
            }

        } else {
            alert("EmailID Not Register")
            setForgetPasswordData({
                email: "",
                password: ""
            })
        }

    }
    const emailRegex = new RegExp(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)
    const PasswordRegex = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)

    function Validation() {
        let errors = {}
        let isError = false

        if (!forgetPasswordData.email.trim()) {
            errors.email = "Email Require"
            isError = true
        } else if (!emailRegex.test(forgetPasswordData.email)) {
            errors.email = "Invalild Email"
            isError = true
        } else {
            delete error.email
        }

        if (!forgetPasswordData.password.trim()) {
            errors.password = "password Require"
            isError = true
        } else if (!PasswordRegex.test(forgetPasswordData.password)) {
            errors.password = "password More Then 8 Character including Lowercash, uppercash,number and special character"
            isError = true
        } else {
            delete error.password
        }


        setError(errors)
        return isError
    }

    function forgetPasswordDataHandler(e) {
        const { name, value } = e.target
        setForgetPasswordData((prev) => ({ ...prev, [name]: value }))
    }

    useEffect(() => {
        if (runValidation) {
            Validation()
        }
    }, [forgetPasswordData])

    return (<>
        <p className="text-center mt-[20px]"> ForgetPassword</p>
        <form className=" max-w-[500px] m-[5px] sm:m-[auto] border mt-[20px] p-[20px] flex flex-col" onSubmit={(e) => { onSubmitHandler(e) }}>
            <label form="emial">Email<span className="text-[red]">*</span></label>
            <input value={forgetPasswordData.email} name="email" type="email" className="border outline-none p-[5px]" onChange={(e) => { forgetPasswordDataHandler(e) }} />
            {error.email && <p className="text-[red]">{error.email}</p>}
            <label form="password" className="mt-[5px]">New Password<span className="text-[red]">*</span></label>
            <div className="flex items-center">
                <input value={forgetPasswordData.password} name="password" type={`${passwordShow ? "text" : "password"}`} className="w-[100%] border outline-none p-[5px]" onChange={(e) => { forgetPasswordDataHandler(e) }} />
                <p className="border p-[5px] w-[60px] text-center cursor-pointer" onClick={() => { setPasswordShow(!passwordShow) }}>{passwordShow ? "Hide" : "Show"}</p>
            </div>
            {error.password && <p className="text-[red]">{error.password}</p>}
            <div className="flex justify-center gap-[10px]">
                <button type="reset" className="border outline-none w-fit mt-[10px] p-[10px]" onClick={() => { router.push('/login') }}>Cancel</button>
                <button type="submit" className="border outline-none w-fit mt-[10px] p-[10px] bg-blue-500 hover:bg-blue-400 text-white">Submit</button>
            </div>
        </form>
    </>)
}

export default ForgetPassword