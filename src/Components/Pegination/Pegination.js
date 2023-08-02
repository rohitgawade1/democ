
import React ,{useState, useEffect} from "react";
import ReactPaginate from "react-paginate";
import './Pegination.css'

export const Pegination = ({PerPageCount,TotalCount,setTo, setFrom,setrowNo,setCurrentPage, CurrentPage}) => {


    // We start with an empty list of items.
    const [pageCount, setPageCount] = useState(0);
    // Here we use item offsets; we could also use page offsets
    // following the API or data you're working with.
    // const [itemOffset, setItemOffset] = useState(CurrentPage);
    
    // useEffect(()=>{
    //     setItemOffset(CurrentPage)
    // },[CurrentPage])

    useEffect(() => {
        // Fetch items from another resources.
        const endOffset = CurrentPage + PerPageCount;
        // console.log(`Loading items from ${CurrentPage} to ${endOffset}`);
        setPageCount(Math.ceil(TotalCount / PerPageCount));
        setTo(endOffset)
        setFrom(CurrentPage+1)
        // setrowNo(itemOffset + 1)
    }, [CurrentPage,TotalCount]);

    // Invoke when user click to request another page.
    const handlePageClick = (event) => {
        var newOffset = event.selected * PerPageCount % TotalCount;
        // console.log(`User requested page number ${event.selected}, which is offset ${newOffset}`);
        setCurrentPage(newOffset)
        // setItemOffset(newOffset);
        // setFrom(newOffset+1)
        setrowNo(event.selected+1)
    };

    return (
        <div className="mt-3 d-flex justify-content-end pb-2">
            <ReactPaginate
                nextLabel="next >"
                onPageChange={handlePageClick}
                // forcePage={CurrentPage}
                pageRangeDisplayed={5}
                marginPagesDisplayed={4}
                // pageRangeDisplayed={3}
                // marginPagesDisplayed={1}
                pageCount={pageCount}
                previousLabel="< previous"
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                breakLabel="..."
                breakClassName="page-item"
                breakLinkClassName="page-link"
                containerClassName="pagination"
                activeClassName="active"
                // renderOnZeroPageCount={null}
            />
        </div>
    )
}