import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { FaCheck } from "react-icons/fa"

const Filter = () => {
    const data = useSelector(state => state?.listofProducts?.categorysPeoductDataList)
    const [filterData, setFilterData] = useState({
        brand: [],
        price: []
    })
    const [dataForFilter, setDataForFilter] = useState({
        brand: [],
        price: []
    })

    useEffect(() => {
        if (data.products) {
            const tempbrand = []
            const tempprice = []
            data.products.map((item) => {
                tempbrand.push(item.brand)
                tempprice.push(item.price)
            })
            setFilterData({
                brand: [...new Set(tempbrand)],
                price: [...new Set(tempprice)]
            })
        }
    }, [data])

    function filterHandler(params) {

    }

    return (
        <div className="max-w-[320px] max-h-[736px] h-[100%] hidden lg:block sticky top-[15%] col-span-3">
            <p className="w-[100%] text-center py-[10px] border-b">Filter</p>
            <p>Brand</p>
            <div>
                {filterData.brand.map((item, i) =>
                    <div key={i} id="item" className="w-[100%]  overflow-y-auto user-scroll-hide">
                        <div className='flex items-center cursor-pointer my-[3px]' onClick={() => { filterHandler("brand", item) }}>
                            <div className={`w-[15px] h-[15px] bg-[white] flex justify-center items-center `}><span className={`w-[17px] flex justify-center items-center rounded-[4px] ${false ? "bg-mainColor" : "border border-[#CAC2C2]"} h-[17px] `}><FaCheck className={`${true ? "text-[white]" : "text-transparent "} text-[10px] fontBold`} /></span></div>
                            <p className='text-mainColor ml-[12px] tracking-[0.42px] capitalize text-[14px] fontNormal '>{item}</p>
                        </div>
                    </div>
                )}
            </div>
            <div className="my-[10px]">
                <p>Ratings</p>
                <div id="item" className="w-[100%]  overflow-y-auto user-scroll-hide">
                    <div className='flex items-center cursor-pointer my-[3px]' onClick={() => { filterHandler("brand", "<1") }}>
                        <div className={`w-[15px] h-[15px] bg-[white] flex justify-center items-center `}><span className={`w-[17px] flex justify-center items-center rounded-[4px] ${false ? "bg-mainColor" : "border border-[#CAC2C2]"} h-[17px] `}><FaCheck className={`${true ? "text-[white]" : "text-transparent "} text-[10px] fontBold`} /></span></div>
                        <p className='text-mainColor ml-[12px] tracking-[0.42px] capitalize text-[14px] fontNormal '>{`<1`}</p>
                    </div>
                </div>
                <div id="item" className="w-[100%]  overflow-y-auto user-scroll-hide">
                    <div className='flex items-center cursor-pointer my-[3px]' onClick={() => { filterHandler("brand", '1-2') }}>
                        <div className={`w-[15px] h-[15px] bg-[white] flex justify-center items-center `}><span className={`w-[17px] flex justify-center items-center rounded-[4px] ${false ? "bg-mainColor" : "border border-[#CAC2C2]"} h-[17px] `}><FaCheck className={`${true ? "text-[white]" : "text-transparent "} text-[10px] fontBold`} /></span></div>
                        <p className='text-mainColor ml-[12px] tracking-[0.42px] capitalize text-[14px] fontNormal '>{"1-2"}</p>
                    </div>
                </div>
                <div id="item" className="w-[100%]  overflow-y-auto user-scroll-hide">
                    <div className='flex items-center cursor-pointer my-[3px]' onClick={() => { filterHandler("brand", "2-3") }}>
                        <div className={`w-[15px] h-[15px] bg-[white] flex justify-center items-center `}><span className={`w-[17px] flex justify-center items-center rounded-[4px] ${false ? "bg-mainColor" : "border border-[#CAC2C2]"} h-[17px] `}><FaCheck className={`${true ? "text-[white]" : "text-transparent "} text-[10px] fontBold`} /></span></div>
                        <p className='text-mainColor ml-[12px] tracking-[0.42px] capitalize text-[14px] fontNormal '>{"2-3"}</p>
                    </div>
                </div>
                <div id="item" className="w-[100%]  overflow-y-auto user-scroll-hide">
                    <div className='flex items-center cursor-pointer my-[3px]' onClick={() => { filterHandler("brand", "3-4") }}>
                        <div className={`w-[15px] h-[15px] bg-[white] flex justify-center items-center `}><span className={`w-[17px] flex justify-center items-center rounded-[4px] ${false ? "bg-mainColor" : "border border-[#CAC2C2]"} h-[17px] `}><FaCheck className={`${true ? "text-[white]" : "text-transparent "} text-[10px] fontBold`} /></span></div>
                        <p className='text-mainColor ml-[12px] tracking-[0.42px] capitalize text-[14px] fontNormal '>{"3-4"}</p>
                    </div>
                </div>
                <div id="item" className="w-[100%]  overflow-y-auto user-scroll-hide">
                    <div className='flex items-center cursor-pointer my-[3px]' onClick={() => { filterHandler("brand", "4-5") }}>
                        <div className={`w-[15px] h-[15px] bg-[white] flex justify-center items-center `}><span className={`w-[17px] flex justify-center items-center rounded-[4px] ${false ? "bg-mainColor" : "border border-[#CAC2C2]"} h-[17px] `}><FaCheck className={`${true ? "text-[white]" : "text-transparent "} text-[10px] fontBold`} /></span></div>
                        <p className='text-mainColor ml-[12px] tracking-[0.42px] capitalize text-[14px] fontNormal '>{"4-5"}</p>
                    </div>
                </div>
            </div>
            <p>Price</p>
            <div>
                <div>min-price : <input value={""} className="border w-[50px] outline-none p-[5px]" /></div>
                <div className="mt-[2px]">max-price : <input value={""} className="border w-[50px] outline-none p-[5px]" /></div>
            </div>
        </div>
    )
}

export default Filter