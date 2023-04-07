import { NORMA_API, AUTH_TOKEN } from "./vars";

const checkResponse = (res) => {
    return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

// обычный запрос к API
export async function requestApi(url, options) {
    const res = await fetch(NORMA_API + url, options);
    return checkResponse(res);
}

// запросы с токеном
export const refreshToken = async () => {
    const res = await fetch(NORMA_API + AUTH_TOKEN, {
        method: "POST",
        headers: {
            "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({
            token: localStorage.getItem("refreshToken"),
        }),
    });
    return checkResponse(res);
};

export const fetchWithRefresh = async (url, options) => {
    try {
        const res = await fetch(NORMA_API + url, options);
        return await checkResponse(res);
    } catch (err) {
        if (err.message === "jwt expired") {
            const refreshData = await refreshToken(); //обновляем токен
            if (!refreshData.success) {
                return Promise.reject(refreshData);
            }
            localStorage.setItem("refreshToken", refreshData.refreshToken);
            localStorage.setItem("accessToken", refreshData.accessToken);
            options.headers.authorization = refreshData.accessToken;
            const res = await fetch(NORMA_API + url, options); //повторяем запрос
            return await checkResponse(res);
        } else {
            return Promise.reject(err);
        }
    }
};
