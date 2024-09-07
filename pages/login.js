import { useRouter } from "next/router"
import { useEffect, useState } from "react"

const Login = () => {

    const router = useRouter()
    const [passwordShow, setPasswordShow] = useState(false)
    const [runLoginValidation, setRunLoginValidation] = useState(false)
    const [error, setError] = useState({})
    const [loginData, setLoginData] = useState({
        email: "",
        password: ""
    })

    function onSubmitHandler(e) {
        e.preventDefault()
        setRunLoginValidation(true)
        const isError = Validation()
        if (isError) return
        setRunLoginValidation(false)

        const RegisterData = JSON.parse(localStorage.getItem("RegisterData"))
        console.log(RegisterData)
        if (RegisterData) {
            let IsRegister = false
            let IsLoginSuccass = false
            RegisterData.map((item) => {
                if (item.email === loginData.email) {
                    IsRegister = true
                    if (item.password === loginData.password) {
                        IsLoginSuccass = true
                        localStorage.setItem("loginData", JSON.stringify(RegisterData))
                    }
                }
            })

            if (!IsRegister) {
                alert("EmailID Not Register")
            } else {
                if (!IsLoginSuccass) {
                    alert("password Incorrect")
                } else {
                    const FromWhere = JSON.parse(localStorage.getItem("fromWhere"))
                    alert("login Successfull")
                    if (FromWhere) {
                        router.push(FromWhere)
                    } else {
                        router.push('/')
                    }
                }
            }
        } else {
            alert("EmailID Not Register")
            setLoginData({
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

        if (!loginData.email.trim()) {
            errors.email = "Email Require"
            isError = true
        } else if (!emailRegex.test(loginData.email)) {
            errors.email = "Invalild Email"
            isError = true
        } else {
            delete error.email
        }

        if (!loginData.password.trim()) {
            errors.password = "password Require"
            isError = true
        } else if (!PasswordRegex.test(loginData.password)) {
            errors.password = "password More Then 8 Character including Lowercash, uppercash,number and special character"
            isError = true
        } else {
            delete error.password
        }


        setError(errors)
        return isError
    }

    function loginDataHandler(e) {
        const { name, value } = e.target
        console.log(name, value)
        setLoginData((prev) => ({ ...prev, [name]: value }))
    }

    useEffect(() => {
        if (runLoginValidation) {
            Validation()
        }
    }, [loginData])

    return (
        <div className="w-[100%]">
            <form className=" w-[500px] m-[auto] border mt-[20px] p-[20px] flex flex-col" onSubmit={(e) => { onSubmitHandler(e) }}>
                <label form="emial">Email<span className="text-[red]">*</span></label>
                <input value={loginData.email} name="email" type="email" className="border outline-none p-[5px]" onChange={(e) => { loginDataHandler(e) }} />
                {error.email && <p className="text-[red]">{error.email}</p>}
                <label form="password">Password<span className="text-[red]">*</span></label>
                <div className="flex items-center">
                    <input value={loginData.password} name="password" type={`${passwordShow ? "text" : "password"}`} className="w-[100%] border outline-none p-[5px]" onChange={(e) => { loginDataHandler(e) }} />
                    <p className="border p-[5px] w-[60px] text-center cursor-pointer" onClick={() => { setPasswordShow(!passwordShow) }}>{passwordShow ? "Hide" : "Show"}</p>
                </div>
                {error.password && <p className="text-[red]">{error.password}</p>}
                <button type="submit" className="border w-fit m-[auto] mt-[10px] p-[10px] bg-blue-500 hover:bg-blue-400 text-white">Submit</button>
            </form>
            <div className="w-[500px] flex justify-between m-[auto] mt-[10px]">
                <p className="text-blue-500 underline cursor-pointer" onClick={() => { router.push("/forgetPassword") }}>Forget Password ?</p>
                <p className="cursor-pointer" onClick={() => { router.push("/register") }}>Register New user</p>
            </div>
        </div>
    )
}

export default Login