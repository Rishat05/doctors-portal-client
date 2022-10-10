import React, { useEffect, useState } from 'react';
import Review from './Review';

const ShowReview = () => {

    const [reviews, setreviews] = useState([]);
    const [limit, setLimit] = useState(5);
    const [pageNumber, setPageNumber] = useState(0);
    const [totalPage, setTotalPage] = useState(0);

    useEffect(() => {
        fetch(` https://doctors-portal-743m.onrender.com/reviews?limit=${limit}&pageNumber=${pageNumber}`)
            .then(res => res.json())
            .then(data => {
                setreviews(data.services);
                if (data.count < limit) {
                    setTotalPage(1)
                }
                else
                    setTotalPage(Math.ceil(data.count / limit));
            })
    }, [limit, pageNumber]);



    return (
        <div>
            <h3 className='text-5xl text-center font-bold my-4 '>Our <span className='text-amber-600'>Reviews</span> </h3>
            <div className='grid grid-cols-1 lg:grid-cols-3 gap-5 my-10 text-white'>
                {
                    reviews?.map(review => <Review
                        key={review._id}
                        review={review}
                    ></Review>)
                }
                {/* {
                    reviews.map(review => <Review
                        key={review._id}
                        review={review}
                    ></Review>)
                } */}
            </div>

            <div className='lg:flex lg:flex-wrap grid grid-cols-4 gap-2 justify-center my-2'>
                {
                    [...Array(totalPage).keys()].map(number => <div key={number} onClick={() => setPageNumber(number)} className={`mx-3 cursor-pointer border border-black px-3 py-1 ${pageNumber === number ? "bg-black text-white" : ""}`}> {number + 1} </div>)
                }
                <select defaultValue={limit} onChange={(e) => {
                    setLimit(e.target.value)
                    setPageNumber(0)
                }}>
                    <option value="2">2</option>
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="15">15</option>
                    <option value="20">20</option>
                </select>

            </div>
        </div>
    );
};

export default ShowReview;