const adviceURL = "https://api.adviceslip.com/advice";

/* 
    xhr method to get data 
*/
function sendRequestXHR(method, url) {
    return new Promise( (resolve, reject) => {
        const xhr = new XMLHttpRequest();
        
        xhr.open(method, url);
        xhr.responseType = 'json';
        xhr.onload = () => {
            if (xhr.status >= 400) reject(xhr.response)
            else resolve(xhr.response);
        }
            
        xhr.onerror = () => {
            reject(xhr.response);
        }
        xhr.send();
    })  
}

/*
sendRequestXHR('GET', adviceURL)
    .then(data => console.log(data))
    .catch(error => console.log(error));
*/

/* 
    fetch method to get data 
*/
async function sendRequestFetch(url) { 
    const response = await fetch(url);
    if (response.ok) {
        return response.json();
    }
    const error = await response.json();
    const e = new Error('Что-то пошло не так');
    e.data = error;
    throw e;
}
   
/*
sendRequestFetch(adviceURL)
    .then(data => console.log(data))
    .catch(error => console.log(error));
*/   

const getAdviceButton = document.querySelector('.advice');
const adviceHeader = document.querySelector('.header');
const adviceText = document.querySelector('.text');

getAdviceButton.addEventListener('click', async () => {
    const response = await fetch(adviceURL);
    if (response.ok) {
        const slip = (await response.json()).slip;
        adviceHeader.textContent = `ADVICE #${slip.id}`;
        adviceText.textContent = `"${slip.advice}"`;
    }
});

getAdviceButton.click(); //first advice 