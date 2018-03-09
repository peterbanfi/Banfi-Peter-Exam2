"use strict";

function done(data) {
    let obj = JSON.parse(data.responseText);
    let movies = obj.movies;
    sortingNames(movies);
    console.log(movies);
    firstLetters(movies);


}

function xhr(method, url, done) {
    let xmlHTTP = new XMLHttpRequest();
    xmlHTTP.onreadystatechange = function () {
        if (xmlHTTP.readyState == 4 && xmlHTTP.status == 200) {
            done(xmlHTTP);
        }
    }
    xmlHTTP.open(method, url);
    xmlHTTP.send();
}

xhr('GET', '/json/movies.json', done);

function sortingNames(data) {
    let temp;
    let first;
    let second;
    //removeShits(players)
    for (let i = 0; i < data.length - 1; i++) {
        for (let j = i + 1; j < data.length; j++) {
            first = data[i].title;
            second = data[j].title;
            if (first > second) {
                temp = data[i];
                data[i] = data[j];
                data[j] = temp;
            }
        }
    }
    createTable(data);
}

function firstLetters(data) {
    let str = '';
    for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < data[i].categories.length; j++) {
            str = data[i].categories[j];
            data[i].categories[j] = str[0].toUpperCase() + str.substr(1);
        }
    }
    return data;
}

function createTable(data) {
    let tmp = '';
    let tmpDir = '';
    for (let i = 0; i < data.length; i++) {
        let charCast = [];
        let charDir = [];
        let div = document.createElement('div');
        div.className = 'movies';
        let img = document.createElement('img');
        img.src = '/img/covers/' + formatTitle(data[i].title) + '.jpg';
        img.alt = data[i].name;
        let pTitle = document.createElement('p');
        pTitle.textContent = 'Cím: ' + data[i].title;
        let pTime = document.createElement('p');
        pTime.textContent = 'Hossz: ' + data[i].timeInMinutes + ' perc';
        let pPrem = document.createElement('p');
        pPrem.textContent = 'Premier: ' + data[i].premierYear;
        let pCat = document.createElement('p');
        pCat.textContent = 'Kategória: ' + data[i].categories.join(', ');
        let pDir = document.createElement('p');
        for (var j in data[i].directors) {
            tmpDir = data[i].directors[j];
            charDir.push(tmpDir);
        }
        pDir.textContent = 'Rendező: ' + charDir.join(', ');
        let pCast = document.createElement('p');
        for (var j in data[i].cast) {
            tmp = data[i].cast[j];
            charCast.push(tmp.name + ` (${tmp.characterName}), ${tmp.birthYear}, ${tmp.birthCountry} ${tmp.birthCity}`);
        }
        pCast.textContent = 'Szereplők: ' + charCast.join(', ');
        div.appendChild(img);
        div.appendChild(pTitle);
        div.appendChild(pTime);
        div.appendChild(pPrem);
        div.appendChild(pCat);
        div.appendChild(pDir);
        div.appendChild(pCast);
        document.getElementsByClassName('main')[0].appendChild(div);
    }
}

function formatTitle(datas) {
    const HUNGARIAN_CHARACTERS = {
        Á: 'A',
        ő: 'o',
        ú: 'u',
        á: 'a',
        ű: 'u',
        ö: 'o',
        ü: 'u',
        ó: 'o',
        é: 'e',
        í: 'i'
    };

    return datas.toLocaleLowerCase().replace(/[éáűőúóüöí]/g, c => HUNGARIAN_CHARACTERS[c]).replace(/[&#@]+/g, '').replace(/[ -]+/g, '-').replace(/[^a-z0-9 -]/g, '');

}