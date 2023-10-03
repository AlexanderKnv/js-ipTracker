import {validatIp} from './helpers';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import icon from '../images/icon-location.svg';

const ipInput = document.querySelector('.search-bar__input');
const btn = document.querySelector('button');

const ipInfo = document.querySelector('#ip');
const locationInfo = document.querySelector('#location');
const timezoneInfo = document.querySelector('#timezone');
const ispInfo = document.querySelector('#isp');

const mapArea = document.querySelector('.map');

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

    map.setView([location.lat, location.lng]);
    L.marker([location.lat, location.lng], {icon: markerIcon}).addTo(map);
}

const map = L.map(mapArea, {
    center: [51.505, -0.09],
    zoom: 13,
    zoomControl: false,
});

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

const markerIcon = L.icon({
    iconUrl: icon,
    iconSize: [30, 40],
});

L.marker([51.505, -0.09], {icon: markerIcon}).addTo(map);
