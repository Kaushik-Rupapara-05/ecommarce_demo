import { singleProduct } from "@/redux/services/productServices"
import { useRouter } from "next/router"
import { useEffect, useRef, useState } from "react"
import { FreeMode, Navigation, Thumbs, Controller } from 'swiper/modules'
import { useDispatch, useSelector } from "react-redux"
import { Swiper, SwiperSlide } from "swiper/react"
import Image from "next/image"
import StarRatings from "react-star-ratings"

const Product = () => {
    const dispatch = useDispatch()
    const router = useRouter()

    const swiperRef = useRef();
    const containerRef = useRef();

    const [loader, setloader] = useState(true)
    const [count, setCount] = useState(1)
    const [viewZoomSlider, setViewZoomSlider] = useState(false)
    const [innerThumbSwiper, setInnerThumbSwiper] = useState(null);

    useEffect(() => {
        if (router.query.product) {
            dispatch(singleProduct({ ID: router.query.product, loader: setloader }))
        }
    }, [router.query])

    const data = useSelector(state => state?.listofProducts?.singleProductData)
    const productImages = data?.images || [];

    console.log(data)

    function AddTOcart() {
        if (JSON.parse(localStorage.getItem("cartData")).length > 0) {
            const cartData = JSON.parse(localStorage.getItem("cartData"))
            let newCartData = [...cartData, { product: data, qunty: count }]
            localStorage.setItem("cartData", JSON.stringify(newCartData))

        } else {
            alert("please Login First")
            router.push("/login")
        }
    }

    return (<>
        {loader &&
            <div className="w-[100%] h-[100vh] z-[100] bg-[white] absolute top-0 left-0 flex flex-col justify-center items-center ">
                <div className="redirectLoader">

                </div>
            </div>
        }
        <div className="w-[100%] px-[20px] mt-[10px]">
            {/* <p>{`Home > ${data.productSingle.name}`}</p> */}
            <div id='main-product-page-div' className='w-[100%]  md:py-[30px] '>
                <div className='w-[100%] h-[auto] '>
                    <div className='container m-auto grid grid-cols-12 gap-2 relative'>
                        <div className={`${viewZoomSlider == true ? "fixed top-0 left-0 w-[100%] h-[100%] z-[500] bg-white flex flex-col " : "col-span-12 lg:col-span-5 lg:flex flex-col  p-[10px] w-[100%] h-[100%]  lg:sticky lg:top-0 z-[10]"} disableSelection`}>
                            {viewZoomSlider == true &&
                                <div onClick={() => { setViewZoomSlider(false); }} className="cursor-pointer w-[45px] h-[45px] flex justify-center items-center absolute rounded-full bg-[#00000036] top-[15px] right-[15px] z-[40]">
                                    close
                                </div>
                            }
                            <div className={`lg:sticky relative lg:top-[18%] ${viewZoomSlider == true ? "h-[100%]" : ""}`}>
                                <div className={` w-[100%] ${viewZoomSlider == true ? "h-[100%] flex justify-center items-center flex-col" : "h-auto"}`}>
                                    {productImages.length > 0 &&
                                        <Swiper
                                            spaceBetween={10}
                                            loop={true}
                                            navigation={viewZoomSlider ? true : false}
                                            slidesPerView={1}
                                            observer={true}
                                            breakpoints={{
                                                640: {
                                                    slidesPerView: viewZoomSlider == true ? 1 : 2,
                                                },
                                                1024: {
                                                    slidesPerView: 1,
                                                },
                                            }}
                                            zoom={true}
                                            freemode={"true"}
                                            thumbs={innerThumbSwiper ? { swiper: innerThumbSwiper } : undefined}
                                            modules={[FreeMode, Navigation, Thumbs, Controller]}
                                            className={`relative mySwiper2 w-[100%] lg:w-[80%] h-[270px] border-[1px] border-[#d2d2d2] rounded-[10px] sm:h-[auto] xl:w-[75%] ${viewZoomSlider == true ? "flex justify-center h-[85%] items-center" : ""}`}
                                        >
                                            {productImages.map((item, i) =>
                                                <>
                                                    <SwiperSlide key={i} onClick={() => { setViewZoomSlider(true) }} className='flex justify-center w-[auto]'>
                                                        <div className='cursor-pointer w-[100%] h-[100%] flex justify-center items-center swiper-zoom-container  rounded-[10px] relative'>
                                                            <Image key={i} width={1000} height={1000} loading="lazy" className='w-[100%] h-[auto] rounded-[10px]' alt={""} src={item} />
                                                        </div>
                                                    </SwiperSlide>
                                                </>
                                            )}
                                        </Swiper>
                                    }
                                    <div ref={containerRef} className={` mt-[10px] centerAline ${viewZoomSlider == true ? "h-[0px] w-0 overflow-hidden" : " hidden lg:flex justify-center items-center"}`}>
                                        <Swiper
                                            onSwiper={swiper => setInnerThumbSwiper(swiper)}
                                            spaceBetween={8}
                                            slidesPerView={4}
                                            ref={swiperRef}
                                            initialized={"true"}
                                            freemode={"true"}
                                            watchSlidesProgress={true}
                                            watchslidesvisibility={"true"}
                                            loop={true}
                                            infinite={"true"}
                                            scrollbar={{ draggable: true }}
                                            allowSlidePrev={true}
                                            allowSlideNext={true}
                                            rewind={true}
                                            modules={[FreeMode, Navigation, Thumbs, Controller]}
                                            className={`productPageSwiper productPage4ImagesBlock xl:w-[70%] sm:w-[70%] 2xl:w-[60%] lg:w-[90%] h-[100%] px-[50px] `}
                                        >
                                            {productImages.map((item, i) => {
                                                return (
                                                    <SwiperSlide className='' key={i}>
                                                        <Image loading="lazy" className='max-w-[80px] rounded-[10px] border cursor-pointer border-[#CAC2C2]' alt={""} width={80} height={80} src={item} />
                                                    </SwiperSlide>
                                                )
                                            })}
                                        </Swiper>
                                    </div>
                                </div>
                            </div >
                        </div >

                        <div className='lg:col-span-7 col-span-12 px-[10px]'>
                            <div id='price-on-product-page' className='w-[100%] flex flex-wrap '>
                                <div className="flex flex-col w-[100%] xl:w-[55%] lg:pr-[30px]">
                                    <div className=''>
                                        <h1 className=' text-mainColor text-[19px] sm:text-[23px] ml-[2px] md:text-[25px] font-semibold leading-normal w-[100%] xl:w-[100%]'>{data?.title}</h1>
                                        <p>{data?.warrantyInformation}</p>
                                    </div>
                                    <p className="text-[22px]">${data?.price}</p>
                                    <div className='flex items-center gap-[5px]'>
                                        <div className='flex items-center text-center max-lg:mb-[10px] mt-[10px] md:mt-[5px]'>
                                            <StarRatings
                                                rating={5}
                                                starEmptyColor="#D7AAFA"
                                                starRatedColor="#2D89D2"
                                                numberOfStars={5}
                                                name='rating'
                                                starDimension="20px"
                                                starSpacing="3px"
                                            />
                                        </div>
                                        <p>{data?.rating} / 5</p>
                                    </div>

                                    <div className='mt-[16px]'>
                                        <div className='flex items-center'>
                                            {data.description &&
                                                <p className="font-light">{data.description}</p>
                                            }
                                        </div>
                                        <div className='flex items-center justify-between mt-[10px]'>
                                            <div className="flex items-center select-none gap-[5px] bottom border-[1px]">
                                                <p className="p-[5px] cursor-pointer" onClick={() => { count > 1 ? setCount(count - 1) : "" }}>-</p>
                                                {count}
                                                <p className="p-[5px] cursor-pointer" onClick={() => { setCount(count + 1) }} >+</p></div>
                                        </div>
                                        <button className="p-[10px] border bg-blue-500 text-white mt-[10px] hover:bg-blue-400" onClick={() => { AddTOcart() }}>Add To cart</button>
                                    </div>
                                </div>
                            </div>
                        </div >
                    </div >

                </div >
            </div >
        </div >
    </>)
}

export default Product