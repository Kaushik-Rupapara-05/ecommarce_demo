import Header from "@/components/header"

const Layout = (props) => {
    return (
        <div className={``}>
            <Header />
            {props.children}
            <footer>

                {/* gtm script */}

                {/* <noscript
                    dangerouslySetInnerHTML={{
                        __html: `<iframe src="https://www.googletagmanager.com/ns.html?id={{ID}}"
            height="0" width="0" style="display:none;visibility:hidden"></iframe>`,
                    }}
                /> */}
            </footer>
        </div >
    )
}

export default Layout