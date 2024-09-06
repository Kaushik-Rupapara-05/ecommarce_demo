import { useRouter } from 'next/router';
import { useEffect } from 'react';
import ReactPaginate from 'react-paginate';

const Pagination = (props) => {

    // this is for query params
    const router = useRouter()

    const totalItemCount = props.totalItems

    const items = totalItemCount


    const pageCount = Number(Math.ceil(items / props.itemsPerPage));

    const handlePageClick = (event) => {
        props.setpagenumber(event.selected + 1)
        const query = { ...router.query }
        delete query.category
        router.replace({
            pathname: props.pathName,
            query: { ...query, page: event.selected + 1, limit: props.itemsPerPage }
        })

    }

    return (
        <>
            <ReactPaginate
                className='pagination'
                breakLabel="..."
                nextLabel=">"
                onPageChange={handlePageClick}
                pageRangeDisplayed={2}
                pageCount={pageCount}
                previousLabel="<"
                renderOnZeroPageCount={null}
                forcePage={props.pagenumber - 1}
            />
        </>
    );
}

export default Pagination