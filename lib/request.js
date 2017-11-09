const request = (method, url, data) => {
    return new Promise((resolve, reject) => {
        const req = new XMLHttpRequest();
        req.open(method, url);
        req.onload = () => req.status === 200 ? resolve(req.response) : reject(Error(req.statusText));
        req.onError = (err) => reject(Error('An error occurred: ' + err));
        req.send();
    })
};
module.exports = request;
