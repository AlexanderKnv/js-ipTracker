import {validatIp} from './helpers';

const ipInput = document.querySelector('.search-bar__input');
const btn = document.querySelector('button');

const ipInfo = document.querySelector('#ip');
const locationInfo = document.querySelector('#location');
const timezoneInfo = document.querySelector('#timezone');
const ispInfo = document.querySelector('#isp');

btn.addEventListener('click', getData);
ipInput.addEventListener('keydown', handleKey);

function getData() {
    if(validatIp(ipInput.value)) {
        fetch(`https://geo.ipify.org/api/v1?apiKey=at_1dqFV88UBSqsVUUIqC8LRtfGN0Z3Q&ipAddress=${ipInput.value}`).then(response => response.json()).then(setInfo)
    }
}

function handleKey(e) {
    if(e.key === 'Enter') {
        getData();
    }
}

function setInfo(mapData) {
    const {ip, location, isp} = mapData;

    ipInfo.innerText = ip;
    locationInfo.innerText = location.country + ' ' + location.region;
    timezoneInfo.innerText = location.timezone;
    ispInfo.innerText = isp;
}
