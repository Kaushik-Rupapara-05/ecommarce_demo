import Filter from "@/components/filter"
import MobileFilter from "@/components/mobilefilter"
import Pagination from "@/components/paginatedItems"
import { CategorysProducts, sortedData } from "@/redux/services/productServices"
import { fireSelectItemGtm } from "@/utils/ga4"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
const currencyFormatter = require("currency-formatter")
const Category = () => {
    const router = useRouter()
    const dispatch = useDispatch()
    const [loader, setloader] = useState(true)
    const [search, setSearch] = useState()

    useEffect(() => {
        if (router.query.category) {
            dispatch(CategorysProducts({ category: router.query.category, loader: setloader }))
        }
    }, [router])

    const data = useSelector(state => state?.listofProducts?.categorysPeoductDataList)
    console.log(data)
    function gtmDetailsMakerForSelectItem(details, i, from) {
        const dataForSend = {
            value: "",
            item_id: "",
            item_name: "",
            discount: "",
            index: "",
            item_category: "",
            item_category2: "",
            item_category3: "",
            item_list_id: "",
            item_list_name: "",
            item_variant: "",
            price: ""
        }

        fireSelectItemGtm(dataForSend)

    }

    return (<>
        {/* Loader when Data Load */}
        {loader &&
            <div className="w-[100%] h-[100vh] z-[100] bg-[white] absolute top-0 left-0 flex flex-col justify-center items-center ">
                <div className="redirectLoader">

                </div>
            </div>
        }

        <div className="px-[0px] sm:px-[50px] mt-[30px]">
            <div className="flex justify-between items-center px-[10px]">
                <p className="capitalize"><span className="font-bold"> category : </span>{router.query.category}</p>
                <input value={search == undefined ? router.query.search : search} className="p-[5px]  sm:hidden outline-none border " placeholder="search here" onChange={(e) => { setSearch(e.target.value.trim()) }} />

            </div>

            <div className='w-[100%] container m-auto select-none grid grid-cols-12 lg:gap-12 px-[20px] mt-[15px]'>


                <div className='col-span-12'>

                    {/* here main Product as per category from api */}
                    <div className='grid grid-cols-12 gap-[10px] sm:gap-[30px] px-[0px] lg:mt-[30px] mt-[15px]'>
                        {data.products && data.products.map((item, i) =>
                            <div key={i} className="xl:col-span-3 md:col-span-4 col-span-6 ">
                                <Link onClick={() => { gtmDetailsMakerForSelectItem(item, i,) }} id={i} target={'_blank'} href={`/product/${item.id}`}>
                                    <div className='cursor-pointer w-[100%] flex justify-center items-center group'>
                                        <div className='hover:shadow-[0_8px_20px_#dedede] w-[100%] h-[100%] mb-[10px] relative overflow-hidden rounded-[10px] group '>
                                            <div className={`${i % 2 == 0 ? "backgroundGray" : "backgroundYellow"} overflow-hidden relative sm:w-[100%] rounded-[10px]  min-w-[100%] transition-all duration-1000 bg-[white] lg:flex justify-center items-center`}>
                                                <div className={`group-hover:rounded-[0px] productImage overflow-hidden rounded-[10px]  ${i % 2 == 0 ? "backgroundGray" : "backgroundYellow"}`}>
                                                    <Image id={item.id} className='rounded-[10px] mix-blend-multiply max-w-[100%] ' width={300} height={300} src={item.images[0]} alt={item.title} />
                                                </div>
                                            </div>
                                            <p className='text-mainColor mt-[16px] lg:pb-[12px] md:pb-[8px] sm:pb-[12px] pb-[8px] px-[10px] fontNormal text-[12px] sm:text-[16px] md:text-[12px] lg:text-[16px] text-ellipsis whitespace-nowrap overflow-hidden leading-[14px]  lg:tracking-[0.48px] md:tracking-[0.36px] sm:tracking-[0.48px] tracking-[0.36px] '>{item.title}</p>
                                            <div className='flex justify-between items-center w-[100%] mb-[10px] px-[10px]'>
                                                <p className='  text-[12px] sm:text-[16px] md:text-[12px] lg:text-[16px] fontNormal lg:tracking-[0.48px] tracking-[0.36px] text-hightLightColor leading-[14px]'>{currencyFormatter.format(item.price, { symbol: '$', thousand: ',' })}</p>
                                                {(item.rating !== null || item.rating > 0) &&
                                                    <p className=' flex justify-center items-center '> <span className='text-[16px] tracking-[0.48px] leading-[14px] text-mainColor'> {item.rating.toFixed(1)}</span><Image src={"https://cdn.perrian.com/static/website/star.svg"} width={100} height={100} alt='star' className='w-[16px] h-[16px] ml-[5px]' /></p>
                                                }
                                            </div>
                                        </div>
                                    </div >
                                </Link>
                            </div>
                        )}
                    </div>
                </div >
            </div>
        </div>
    </>)
}

export default Category