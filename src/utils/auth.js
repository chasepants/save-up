
function checkAuthToken() {
    return localStorage.getItem('auth');
}

export default checkAuthToken;