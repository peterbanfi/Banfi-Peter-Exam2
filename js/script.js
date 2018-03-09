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