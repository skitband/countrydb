import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';

import Countries from './Countries';

const SideNav = ({ itemsPerPage, countries, setcountryName }) => {

    const [currentItems, setCurrentItems] = useState(countries);
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);

    useEffect(() => {
        const endOffset = itemOffset + itemsPerPage;
        setCurrentItems(countries.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(countries.length / itemsPerPage));
    }, [itemOffset, itemsPerPage, countries]);

    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % countries.length;
        setItemOffset(newOffset);
    };

    return (
        <div className="ms-5 mt-3">
            <div className="d-flex flex-column align-items-stretch flex-shrink-0 bg-white">
                <div className="list-group list-group-flush border-bottom scrollarea">
                    <Countries currentItems={currentItems} selectCountry={setcountryName} />
                </div>
                <div>
                    <ReactPaginate
                        previousLabel="<"
                        nextLabel=">"
                        pageClassName="page-item"
                        pageLinkClassName="page-link bg-light text-secondary"
                        previousClassName="page-item bg-light text-secondary"
                        previousLinkClassName="page-link"
                        nextClassName="page-item"
                        nextLinkClassName="page-link"
                        breakLabel="..."
                        breakClassName="page-item"
                        breakLinkClassName="page-link"
                        pageCount={pageCount}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={5}
                        onPageChange={handlePageClick}
                        containerClassName="pagination pagination-sm responsive"
                        activeClassName="active"
                    />
                </div>
                
            </div>
        </div>
    )
}

export default SideNav;
