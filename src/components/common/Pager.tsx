import React from "react";
import { range } from "../../utils";
import './styles/Pager.css'

type PagerProps = {
    currentPage: number,
    setPage: (pageSelected: any) => void,
    lastPage: number
}

const MAX_ITEMS_ASIDE = 3;
const MAX_FULL_ITEMS = 7;
const HIDE_POSITION = '...'


/**
 * Custom Pagination component that works similar to Material UI pagination component.
 */
export const Pager: React.FC<PagerProps> = ({ currentPage, setPage, lastPage }) => {

    if (!lastPage) {
        return <></>
    }

    const position = currentPage + 1;
    const needToHide = lastPage > MAX_FULL_ITEMS;
    const hideRigth = needToHide ? lastPage - position > MAX_ITEMS_ASIDE : false;
    const hideLeft = needToHide ? position - 0 > MAX_ITEMS_ASIDE : false;
    const centerNumbers = [position - 1, position, position + 1];

    let numbers: Array<any> = []

    // Numbers available to show in the pager
    if (hideRigth && hideLeft) {
        numbers = [1, HIDE_POSITION, ...centerNumbers, HIDE_POSITION, lastPage]
    } else if (hideLeft) {
        numbers = [1, HIDE_POSITION, ...range(lastPage - (MAX_ITEMS_ASIDE + 1), lastPage)]
    } else if (hideRigth) {
        numbers = [...range(1, 5), HIDE_POSITION, lastPage]
    } else {
        numbers = Array.from(Array(lastPage), (e, i) => i + 1)
    }

    const handleClickOnPosition = (event: any) => {
        const key = event.currentTarget.id;
        setPage(parseInt(key) - 1)
    }

    const pastPage = (event: any) => {
        setPage((page: number) => page > 0 ? page - 1 : page);
    }
    const nextPage = (event: any) => {
        setPage((page: number) => page === lastPage ? page : page + 1);
    }



    return (
        <div className="Pager-Container">
            <div className="Pager-Button-Container">
                <button className="Pager-Button" onClick={pastPage} disabled={position === 1}> &#60; </button>
                {numbers.map((value, ix) => {
                    const selected = position === value;
                    return (<button className={`Pager-Button ${selected ? 'Pager-Button-Selected' : ''}`} key={ix} id={value} disabled={value === '...'} onClick={handleClickOnPosition}>{value}</button>)
                })}
                <button className="Pager-Button" onClick={nextPage} disabled={position === lastPage}> &#62; </button>
            </div>
        </div>
    )
}