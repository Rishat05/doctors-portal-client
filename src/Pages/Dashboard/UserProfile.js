import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import { BiEdit } from "react-icons/bi";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { useQuery } from "react-query";
import Loading from "../Shared/Loading";


const UserProfile = () => {
    const [user] = useAuthState(auth);
    const [editAble, setEditAble] = useState(false);
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm();

    const userUrl = ` https://doctors-portal-743m.onrender.com/userprofile/${user.email}`;

    const {
        data: userProfile,
        isLoading,
        refetch,
    } = useQuery(["userProfile", user], () =>
        fetch(userUrl)
            .then((res) => res.json())
    );

    if (isLoading) {
        <Loading></Loading>;
    }

    const handleUpdate = (data) => {
        const profile = {
            email: user.email,
            name: user.displayName,
            education: data.education,
            social: data.social,
            phoneNumber: data.phoneNumber,
            address: data.address,
            signUpDate: user.metadata.creationTime,
        };
        fetch(` https://doctors-portal-743m.onrender.com/userupdate/${user.email}`, {
            method: "PUT",
            headers: {
                "content-type": "application/json",
                authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
            body: JSON.stringify(profile),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.acknowledged) {
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Your profile is updated",
                        showConfirmButton: false,
                        timer: 1500,
                    });
                }
                refetch();
            });

        setEditAble(false);
    };


    return (
        <div className="mx-auto w-3/4 flex justify-around mt-2">
            <div>
                <h1 className="text-accent text-3xl">
                    Hello <b>{user.displayName ? user.displayName : "empty name"}</b>
                </h1>
                <h1 className="text-accent text-xl">
                    <b>Email : </b>
                    {user.email}
                </h1>
                <div>
                    <p
                        onClick={() => setEditAble(true)}
                        className="text-accent text-l font-bold border-2 border-accent rounded-lg px-3 py-1 my-2 cursor-pointer w-1/2"
                    >
                        Edit profile{" "}
                        <button className="">
                            <BiEdit></BiEdit>
                        </button>
                    </p>
                </div>
                <div className="my-5">
                    <b className="text-blue-400 mt-10">User details:</b>
                    {editAble ? (
                        <form onSubmit={handleSubmit(handleUpdate)}>
                            <div className="form-control">
                                <label className="label text-accent font-semibold">
                                    Your University
                                </label>
                                <input
                                    type="text"
                                    placeholder="University/school/college"
                                    className="py-2 border border-accent rounded-lg w-full px-3 text-accent"
                                    {...register("education")}
                                />
                                <label className="label text-accent font-semibold">
                                    Your Socialmedia link
                                </label>
                                <input
                                    type="text"
                                    placeholder="Socialmedia link"
                                    className="py-2 border border-accent rounded-lg w-full px-3 text-accent"
                                    {...register("social")}
                                />
                                <label className="label text-accent font-semibold">
                                    Your phone number
                                </label>
                                <input
                                    type="number"
                                    placeholder="phone number"
                                    className="py-2 border border-accent rounded-lg w-full px-3 text-accent"
                                    {...register("phoneNumber")}
                                />
                                <label className="label text-accent font-semibold">
                                    Your Address
                                </label>
                                <textarea
                                    type="text"
                                    placeholder="Address"
                                    className="py-2 border border-accent rounded-lg w-full px-3 text-accent"
                                    {...register("address")}
                                />
                                <input
                                    type="submit"
                                    value="Update"
                                    className="btn btn-nutral mt-3"
                                />
                                <button className="btn btn-nutral mt-3" onClick={() => setEditAble(false)}>Cancel</button>
                            </div>
                        </form>
                    ) : (
                        <div className="mt-5 ml-5">
                            <h1 className="text-accent text-base">
                                <b>Education : </b>
                                {userProfile?.education}
                            </h1>
                            <h1 className="text-accent text-base">
                                <b>Phone no : </b>
                                {userProfile?.phoneNumber}
                            </h1>
                            <h1 className="text-accent text-base">
                                <b>Social link : </b>
                                {userProfile?.social}
                            </h1>
                            <h1 className="text-accent text-base">
                                <b>Address : </b>
                                {userProfile?.address}
                            </h1>
                        </div>
                    )}
                </div>
            </div>

            {/* ============================= photo user ===========================================*/}
            {user?.photoURL ? (
                <div className="avatar">
                    <div className="w-24 h-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                        <img src={user.photoURL} />
                    </div>
                </div>
            ) : (
                <div className="avatar placeholder">
                    <div className="bg-primary-focus text-accent-content rounded-full w-24 h-24">
                        <span className="text-3xl">{user?.displayName?.split("")[0].toUpperCase()}</span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserProfile;
