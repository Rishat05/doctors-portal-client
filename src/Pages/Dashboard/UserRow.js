import React from 'react';
import { toast } from 'react-toastify';
import Swal from "sweetalert2";

const UserRow = ({ user, refetch, sl }) => {
    const { email, role } = user;
    const makeAdmin = () => {
        fetch(`https://doctors-portal-743m.onrender.com/user/admin/${email}`, {
            method: 'PUT',
            headers: {
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => {
                if (res.status === 403) {
                    toast.error('Failed to Make an admin');
                }
                return res.json()
            })
            .then(data => {
                if (data.modifiedCount > 0) {
                    refetch();
                    toast.success(`Successfully made an admin`);
                }

            })
    }

    const handleDlt = async (email) => {
        const url1 = `https://doctors-portal-743m.onrender.com/allusers/dlt/${email}`;
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this user!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then(async (result) => {
            if (result.isConfirmed) {
                await fetch(url1, {
                    method: "DELETE",
                    headers: {
                        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                    },
                })
                    .then((res) => res.json())
                    .then((data) => {
                        Swal.fire("Deleted!", "User has been deleted.", "success");
                        refetch();
                    });
            }
        });
    };
    return (
        <tr>
            <th>{sl + 1}</th>
            <td>{email}</td>
            <td className='flex gap-3'>{role !== 'admin' && <button onClick={makeAdmin} className="btn btn-xs">Make Admin</button>}
                <button className="btn btn-xs" onClick={() => handleDlt(email)}>Remove User</button></td>
        </tr>
    );
};

export default UserRow;