import Image from "next/image"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

const Header = () => {
    const router = useRouter()
    const [isLogin, setIsLogin] = useState(false)
    const [cartDataCount, setCartDataCount] = useState(0)

    useEffect(() => {
        let login = JSON.parse(localStorage.getItem("loginData"))
        if (login) {
            setIsLogin(true)
        } else {
            setIsLogin(false)
        }
        let cartData = JSON.parse(localStorage.getItem("cartData"))
        let count = 0
        if (cartData) {
            cartData.map((item) => {
                count += item.qunty
            })
        }
        setCartDataCount(count)
    }, [router.query])

    return (
        <div className='sticky top-0 z-[10] drop-shadow-lg py-[5px] w-[100%] px-[10px] bg-[#f2f2f2] sm:py-[10px] sm:px-[10px]'>
            <div className="flex justify-end bg-slate-400 p-[5px]">
                {isLogin ?
                    <button className="p-[5px] border rounded" onClick={() => { localStorage.removeItem("loginData"); localStorage.removeItem("cartData"); router.push("/login") }}>
                        Log Out
                    </button>
                    :
                    <button className="p-[5px] border rounded" onClick={() => { router.push("/login") }}>Login</button>
                }

            </div>
            <div className='flex justify-between items-center w-[100%] max-lg:flex-wrap lg:px-[55px]'>
                <div className='max-lg:order-1	flex w-[50%] lg:w-[auto] gap-2'>

                    <div className="text-[50px]">
                        Logo
                    </div>
                </div>

                <div className='flex justify-between items-center max-lg:order-2'>

                    <div onClick={() => { router.push('/cart') }} className='relative flex flex-col justify-center items-center w-[30px] lg:w-[50px] cursor-pointer'>
                        <Image loading="eager" priority={true} src={"https://cdn.perrian.com/static/website/cart.svg"} width={100} height={100} alt='cart' className="w-[27px] h-[27px] lg:w-[26px] lg:h-[26px]"></Image>
                        <p className="text-[12px] hidden lg:block text-mainColor">Cart</p>
                        <span className='w-[10px] h-[10px] max-lg:top-[-24%] max-lg:right-[-14%] sm:w-[21px] sm:h-[21px] leading-[18px] text-center absolute top-[-10%] border border-mainColor right-[0%] shadow-2xl bg-white text-[15px] max-lg:text-[12px] sm:text-[13px] rounded-full flex justify-center items-center p-[8px] text-[#2c2c2c]'>{cartDataCount}</span>
                    </div>
                </div>
            </div >
        </div >
    )
}
export default Header