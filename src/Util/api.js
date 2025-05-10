import axios from "axios";
import { useStore } from "../useStore/useStore";

const API_URL = process.env.REACT_APP_API_URL

export const register = async (payload) => {
    try {
        const response = await axios.post(`${API_URL}/register`, payload, {
            withCredentials: true,
            // headers: {
            //     `Content-Type`: `application/json`
            // }
        });
        return response;
    } catch (error) {
        console.error("Register error:", error?.response?.data || error.message);
    }
}

export const login = async (payload) => {
    try {
        const response = await axios.post(`${API_URL}/login`, payload, {
            withCredentials: true,
        })


        console.log(response.data);
        const { setUser } = useStore.getState();
        setUser(response.data.user);
        return response
    } catch (error) {
        console.error("Register error:", error?.response?.data || error.message);
    }
}

export const shortenUrl = async (longUrl) => {
    try {
        const response = await axios.get(`https://tinyurl.com/api-create.php?url=${longUrl}`);
        console.log(`Shortened URL:`, response.data);
        return response.data;
    } catch (error) {
        console.error(`Error shortening the URL:`, error);
    }
};


export const createShortUrl = async (payload) => {
    try {
        const response = await axios.post(`${API_URL}/shorted`, payload, {
            withCredentials: true
        });
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error(`Error shortening the URL:`, error);
    }
}
export const incrementLinkcount = async (afterlink, userId) => {
    const payload = { afterlink: afterlink, userId: userId };

    try {
        const response = await axios.put(`${API_URL}/clicked`, payload, {
            withCredentials: true
        });
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error(`Error shortening the URL:`, error);
    }
}


export const getCountlinkClick = async (userId, afterlink) => {
    try {
        const response = await axios.get(`${API_URL}/clickthislinkcount`, {
            params: {
                userId,
                afterLink: afterlink, // <- ต้องเขียนตรงตาม backend ใช้
            },
            withCredentials: true,
        });
        console.log(`Click count response:`, response.data);
        return response.data;
    } catch (error) {
        console.error(`Error fetching click count:`, error);
    }
};


export const getAllCountThislinkclick = async (afterlink) => {

    try {
        const response = await axios.get(`${API_URL}/allclickthislinkcount`, {
            params: {
                afterLink: afterlink, // <- ต้องเขียนตรงตาม backend ใช้
            },
            withCredentials: true,
        });
        console.log(`Click count response:`, response.data);
        return response.data;
    } catch (error) {
        console.error(`Error fetching click count:`, error);
    }


}


export const getHistoty = async (userId) => {
    try {
        const response = await axios.get(`${API_URL}/myhistory/${userId}`, {
            withCredentials: true,
        });
        console.log(`Click count response:`, response.data);
        return response.data;
    } catch (error) {
        console.error(`Error fetching click count:`, error);
    }
};