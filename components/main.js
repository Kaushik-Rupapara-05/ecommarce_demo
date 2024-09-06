import { listOfcategory, listOfProduct } from "@/redux/services/productServices"
import Head from "next/head"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

const Main = () => {
  const dispatch = useDispatch()
  const [loader, setloader] = useState(true)

  useEffect(() => {
    dispatch(listOfcategory({ loader: setloader }))
  }, [])

  const data = useSelector(state => state?.listofProducts?.categoryList)

  function addBreadCrumbsSchema() {
    return {
      __html: `{
            "@context": "http://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
                {
                    "@type": "ListItem",
                    "position": 1,
                    "item": {
                        "@id": "{{URL Home Page}}",
                        "name": "home"
                    }
                },
                {
                    "@type": "ListItem",
                    "position": 2,
                    "item": {
                        "@id": "{{Domain URL}}/{{category}}",
                        "name": "Product"
                    }
                }
            ]
        }
        `
    }
  }

  return (<>
    {loader &&
      <div className="w-[100%] h-[100vh] z-[100] bg-[white] absolute top-0 left-0 flex flex-col justify-center items-center ">
        <div className="redirectLoader">

        </div>
      </div>
    }
    <Head>
      {/* Meta Data */}
      <title>title</title>
      <meta name="slug" content={"seo_meta_slug"} />
      <meta name="description" content={"seo_meta_description"} />
      <meta name="keywords" content={"seo_meta_keyword"} />
      <meta name="robots" content={"seo_meta_robot"} />  {/* (noindex,follow) ,(noindex,nofollow), (index,follow) etc. */}
      <link rel="canonical" href={"seo_meta_canonical URL"} />
      <meta name="og:title" content={"open_graph_title"} />
      <meta name="og:description" content={"open_graph_description"} />
      <meta name="og:site_name" content={"open_graph_site_name"} />
      <meta name="og:url" content={"open_graph_url"} />
      <meta name="og:image" content={"open_graph_image"} />
      <meta name="twitter:title" content={"twitter_card_title"} />
      <meta name="twitter:description" content={"twitter_card_description"} />
      <meta name="twitter:site" content={"twitter_card_site_name"} />
      <meta name="twitter:url" content={"twitter_card_url"} />
      <meta name="twitter:image" content={"twitter_card_image"} />
      {/* BreadCrumbsSchema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={addBreadCrumbsSchema()}
      />
    </Head>
    <h1 className="w-[100] flex justify-center items-center bg-[#FFEAC3] h-[50px] my-[30px]">Categories</h1>
    <div className='grid grid-cols-12 gap-[10px] sm:px-[50px] px-[20px] '>
      {/* Categories */}
      {
        data && data.length > 0 && data.map((m, i) => {
          return (
            <div key={i} className={`col-span-6 md:col-span-4 lg:col-span-3 ${i % 2 == 0 ? "backgroundGray" : "backgroundYellow"} rounded-[10px]`} >
              <div className='hover:shadow-[0_8px_20px_#dedede] w-[100%] h-[100%] mb-[10px] overflow-hidden rounded-[10px]'>
                <Link href={`/${m}`} className={` capitalize w-[100%] h-[150px]  duration-1000 flex justify-center items-center`}>
                  {m}
                </Link>
              </div >
            </div>
          )
        })
      }
    </div>
  </>)
}

export default Main