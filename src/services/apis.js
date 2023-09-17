const BASE_URL = process.env.REACT_APP_BASE_URL;

export const authEndpoints = {
    LOGIN_API: BASE_URL + "/auth/login",
    SIGNUP_API: BASE_URL + "/auth/signup",
    SENDOTP_API: BASE_URL + "/auth/sendotp",
    RESETPASSTOKEN_API: BASE_URL + "/auth/reset-password-token",
    RESETPASS_API: BASE_URL + "/auth//reset-password",
}

export const categories = {
    CATEGORIES_API: BASE_URL + "/course/showAllCategories",
}