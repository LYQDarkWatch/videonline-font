export const fakeAuth = {
    authenticate() {
        const token = localStorage.getItem("token");
        return !!token ? true : false;
    },
    setToken(token) {
        localStorage.setItem("token", token);
        return true;
    },
    signout() {
        localStorage.removeItem("token");

    }
};