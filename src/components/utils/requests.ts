async function SendRequest(url: string, method: string, body: any, setResponse: Function) {
    let options: {
            method: string;
            headers: {
                'Content-Type': string;
            };
            body?: string;
        } = {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            }
        }
    if (method !== 'GET') {
            options = {
                    ...options,
                    body: JSON.stringify(body)
            };
    }
    fetch(`http://localhost:2700/${url}`, options)
    .then(response => response.json())
    .then(data => {
        setResponse(data);
    });
}

async function SendGetRequest(url: string, setResponse: Function) {
    SendRequest(url, 'GET', {}, setResponse);
}

async function SendPostRequest(url: string, body: any, setResponse: Function) {
    await SendRequest(url, 'POST', body, setResponse);
}

async function SendDeleteRequest(url: string, body: any, setResponse: Function) {
    await SendRequest(url, 'DELETE', body, setResponse);
}

async function SendPatchRequest(url: string, body: any, setResponse: Function) {
    await SendRequest(url, 'PATCH', body, setResponse);
}

export default SendRequest;
export { SendGetRequest, SendPostRequest, SendDeleteRequest, SendPatchRequest };
