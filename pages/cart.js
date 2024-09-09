import Image from "next/image"
import { useEffect, useState } from "react"

const Cart = () => {

    const [cartData, setCartData] = useState([])
    const [totalAmount, setTotalAmount] = useState(0)

    useEffect(() => {
        const cart = JSON.parse(localStorage.getItem("cartData"))
        if (cart) {
            setCartData([...cart])
        }
    }, [])

    useEffect(() => {
        if (cartData.length > 0) {
            let temp = 0
            cartData.map((item) => {
                temp += item.qunty * item.product.price
            })
            setTotalAmount(temp)
        }
    }, [cartData])

    function onInputeChange(id, value) {
        let newCartData = []
        cartData.map(item => {
            if (item.product.id == id) {
                let temp = {
                    product: item.product,
                    qunty: value
                }
                newCartData.push(temp)
            } else {
                newCartData.push(item)
            }
        })
        setCartData(newCartData)
        localStorage.setItem("cartData", JSON.stringify(newCartData))
    }

    function DeleteHandler(id) {
        let newCartData = []
        cartData.map(item => {
            if (item.product.id != id) {
                newCartData.push(item)
            }
        })
        setCartData(newCartData)
        localStorage.setItem("cartData", JSON.stringify(newCartData))

    }

    return (<>

        <div className="px-[20px]">
            <p className="mt-[10px] text-[25px] ml-[20px] underline">Your Cart :</p>

            <div className="">
                {cartData.length > 0 ?
                    <div className="grid grid-cols-12 gap-[10px]">
                        <div className="col-span-12 md:col-span-8">
                            {cartData.map((item, i) =>
                                <div className="gap-[5px] bg-[#F5FBFF] rounded-[16px] flex justify-between p-[10px] mt-[5px] border">
                                    <div className="flex justify-between items-start">
                                        <Image width={100} height={100} className='w-[100px] h-[auto] rounded-[10px]' alt={item.product.id} src={item.product.images[0]} />
                                        <div className="">
                                            <p className="text-[18px] font-semibold">{item.product.title}</p>
                                            <p className="text-[#666] text-[14px] font-semibold">{item.product.warrantyInformation}</p>
                                            <p className="text-[#666] text-[14px] font-semibold">${item.product.price}</p>
                                        </div>
                                    </div>
                                    <div className="items-start">
                                        <p>Quantity</p>
                                        <div className="flex gap-[5px] border p-[5px] bg-white items-center select-none">
                                            <div className="cursor-pointer p-[5px]" onClick={() => { item.qunty > 1 ? onInputeChange(item.product.id, item.qunty - 1) : "" }}>-</div>
                                            <div className="w-[15px]">{item.qunty}</div>
                                            <div className="cursor-pointer p-[5px]" onClick={() => { onInputeChange(item.product.id, item.qunty + 1) }}>+</div>
                                        </div>
                                    </div>
                                    <div>
                                        <p>Total</p>
                                        <p>${(item.qunty * item.product.price).toFixed(2)}</p>

                                        <div className="mt-[10px] cursor-pointer flex justify-center items-center hover:text-[red]" onClick={() => { DeleteHandler(item.product.id) }}>
                                            <svg className="" stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" class="PolarCarts_carts_delete__Ea8P5" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M7 4V2H17V4H22V6H20V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V6H2V4H7ZM6 6V20H18V6H6ZM9 9H11V17H9V9ZM13 9H15V17H13V9Z"></path></svg>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="col-span-12 md:col-span-4">
                            <div className="border w-[100%] rounded-[21px] bg-[#2B84CA] text-white">
                                <p className="p-[26px] text-center text-[24px] font-bold border-b border-white">Summary</p>
                                <div className="px-[10px]">
                                    <p className="flex justify-between"><span>Total:</span><span className="w-[80px]">${(totalAmount).toFixed(2)}</span></p>
                                </div>
                                <button className="w-[calc(100%-10px-11px)] rounded-[5px] p-[11px] hover:bg-[#0000004a] transition-all duration-[5000] text-center text-[20px] font-semibold leading-[32px] m-[10px] bg-black">
                                    Secure Checkout
                                </button>
                            </div>
                        </div>
                    </div>
                    :
                    <div className="w-[100%] text-center">
                        Cart Is Empty
                    </div>
                }

            </div>
        </div>
    </>)
}

export default Cart