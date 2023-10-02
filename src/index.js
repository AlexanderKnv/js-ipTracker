import {validatIp} from './helpers';

const ipInput = document.querySelector('.search-bar__input');
const btn = document.querySelector('button');

btn.addEventListener('click', getData);
ipInput.addEventListener('keydown', handleKey);

function getData() {
    if(validatIp(ipInput.value)) {
        fetch(`https://geo.ipify.org/api/v1?apiKey=at_1dqFV88UBSqsVUUIqC8LRtfGN0Z3Q&ipAddress=${ipInput.value}`).then(response => response.json()).then(console.log)
    }
}

function handleKey(e) {
    if(e.key === 'Enter') {
        getData();
    }
}
