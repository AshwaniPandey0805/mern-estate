import api from "./axios";

export const updateUser = ( id, data) => {
    return  api.post(
        `user/update/${id}`,
        data
    );
}