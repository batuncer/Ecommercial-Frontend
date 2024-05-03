import React, { useEffect } from "react";
import { getDetails } from "../redux/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const Profile = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { loading, user } = useSelector(state => state.user);

    useEffect(() => {
        if (id) {
            dispatch(getDetails(id));
        }
    }, [dispatch, id]);

    console.log(user);
    return (
        <>
            {loading ? (
                "Loading..."
            ) : (
                <div className="min-h-screen">
                    <div className="flex mt-4 justify-center gap-5">

                        <div className="w-[600px] pt-24 space-y-3 ml-4">
                            <div >{user.email}</div>
                            <div> {user.username}</div>

                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default Profile;