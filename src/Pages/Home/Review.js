import React, { useState } from 'react';
import Rating from 'react-rating';
import { FaStar } from 'react-icons/fa';

const Review = (props) => {


    return (
        <div className="card w-full bg-base-100  text-black shadow-xl" >
            <div className="card-body" >
                <h2 className="card-title" > {props.review?.name}</h2 >
                <p>{props.review?.Messege}</p>


                <Rating
                    initialRating={props.review?.ratings}
                    emptySymbol={<FaStar style={{ color: "gray" }} />}
                    fullSymbol={<FaStar style={{ color: "goldenrod" }} />}

                    readonly
                />




            </div >

        </div >
    );
};

export default Review;