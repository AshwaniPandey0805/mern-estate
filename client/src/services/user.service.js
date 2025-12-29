import api from "./axios";

export const updateUser = ( id, data) => {
    return  api.post(
        `user/update/${id}`,
        data
    );
}

export const deleteUser = (id) => {
    return api.delete(
        `user/delete/${id}`
    )
}

export const signOutUser = (id) => {
    return api.post(
        `user/sign-out/${id}`
    );
}