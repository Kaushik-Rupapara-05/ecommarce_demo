import { useRouter } from "next/router"
import { useEffect, useState } from "react"

const Register = () => {


    const router = useRouter()
    const [passwordShow, setPasswordShow] = useState(false)
    const [runValidation, setRunValidation] = useState(false)
    const [registerData, setRegisterData] = useState({
        name: "",
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

        const localStorageRegisterData = JSON.parse(localStorage.getItem("RegisterData"))
        if (localStorageRegisterData) {
            let alreadyUser = localStorageRegisterData.filter((item) => item.email == registerData.email)
            if (alreadyUser.length > 0) {
                alert("Email Allready Register")
            } else {
                localStorage.setItem("RegisterData", JSON.stringify([...localStorageRegisterData, registerData]))
                alert("Register Successfull")
            }
        } else {
            localStorage.setItem("RegisterData", JSON.stringify([registerData]))
            alert("Register Successfull")
        }
        router.push("/login")

    }
    const emailRegex = new RegExp(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)
    const PasswordRegex = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)

    function Validation() {
        let errors = {}
        let isError = false

        if (!registerData.name.trim() || registerData.name.length < 1) {
            errors.name = "Name Require"
            isError = true
        } else {
            delete error.email
        }

        if (!registerData.email.trim()) {
            errors.email = "Email Require"
            isError = true
        } else if (!emailRegex.test(registerData.email)) {
            errors.email = "Invalild Email"
            isError = true
        } else {
            delete error.email
        }

        if (!registerData.password.trim()) {
            errors.password = "password Require"
            isError = true
        } else if (!PasswordRegex.test(registerData.password)) {
            errors.password = "password More Then 8 Character including Lowercash, uppercash,number and special character"
            isError = true
        } else {
            delete error.password
        }


        setError(errors)
        return isError
    }

    function registerDataHandler(e) {
        const { name, value } = e.target
        setRegisterData((prev) => ({ ...prev, [name]: value }))
    }

    useEffect(() => {
        if (runValidation) {
            Validation()
        }
    }, [registerData])

    return (<>
        <p className="text-center mt-[20px]"> Register New user</p>
        <form className=" w-[500px] m-[auto] border mt-[20px] p-[20px] flex flex-col" onSubmit={(e) => { onSubmitHandler(e) }}>
            <label form="name">Name<span className="text-[red]">*</span></label>
            <input value={registerData.name} name="name" type="text" className="border outline-none p-[5px]" onChange={(e) => { registerDataHandler(e) }} />
            {error.name && <p className="text-[red]">{error.name}</p>}
            <label form="emial" className="mt-[5px]">Email<span className="text-[red]">*</span></label>
            <input value={registerData.email} name="email" type="email" className="border outline-none p-[5px]" onChange={(e) => { registerDataHandler(e) }} />
            {error.email && <p className="text-[red]">{error.email}</p>}
            <label form="password" className="mt-[5px]">Password<span className="text-[red]">*</span></label>
            <div className="flex items-center">
                <input value={registerData.password} name="password" type={`${passwordShow ? "text" : "password"}`} className="w-[100%] border outline-none p-[5px]" onChange={(e) => { registerDataHandler(e) }} />
                <p className="border p-[5px] w-[60px] text-center cursor-pointer" onClick={() => { setPasswordShow(!passwordShow) }}>{passwordShow ? "Hide" : "Show"}</p>
            </div>
            {error.password && <p className="text-[red]">{error.password}</p>}
            <button type="submit" className="border w-fit m-[auto] mt-[10px] p-[10px] bg-blue-500 hover:bg-blue-400 text-white">Submit</button>
        </form>
    </>)
}

export default Register