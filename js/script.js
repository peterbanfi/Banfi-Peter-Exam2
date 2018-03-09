"use strict";

function done(data) {
    let obj = JSON.parse(data.responseText);
    let movies = obj.movies;
    sortingNames(movies);
    console.log(movies);
    firstLetters(movies);
    document.getElementById('searchButton').addEventListener("click", function () {
        search(movies);
    });
    statDetails(movies);

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

function search(data) {
    clearTable()
    let input = document.getElementById('searchInputField').value;

    document.getElementById("options").selectedIndex == "0" ? resultTitle(data) : false;
    document.getElementById("options").selectedIndex == "1" ? resultDirector(data) : false;
    document.getElementById("options").selectedIndex == "2" ? resultCast(data) : false;


    function resultTitle(data) {
        let results = [];
        for (const i in data) {
            if (data[i].title == input) {
                results.push(data[i]);
                document.getElementById('searchInputField').value = 'I found these: ';
                break;
            }
        }
        if (results.length == 0) {
            document.getElementById('searchInputField').value = 'No match :(';
        }
        resultTable(results);
    }

    function resultDirector(data) {
        let results = [];
        for (const i in data) {
            for (const j in data[i].directors) {
                if (data[i].directors[j] == input) {
                    results.push(data[i]);
                    document.getElementById('searchInputField').value = 'I found these: ';
                }
            }
        }
        if (results.length == 0) {
            document.getElementById('searchInputField').value = 'No match :(';
        }
        resultTable(results);
    }

    function resultCast(data) {
        let results = [];
        for (const i in data) {
            for (const j in data[i].cast) {
                if (data[i].cast[j].name == input) {
                    results.push(data[i]);
                    document.getElementById('searchInputField').value = 'I found these: ';
                }
            }
        }
        if (results.length == 0) {
            document.getElementById('searchInputField').value = 'No match :(';
        }
        resultTable(results);
    }

    function resultTable(results) {
        let tmp = '';
        let tmpDir = '';
        for (let i = 0; i < results.length; i++) {
            let charCast = [];
            let charDir = [];
            let div = document.createElement('div');
            div.className = 'movies';
            let img = document.createElement('img');
            img.src = '/img/covers/' + formatTitle(results[i].title) + '.jpg';
            img.alt = results[i].name;
            let pTitle = document.createElement('p');
            pTitle.textContent = 'Cím: ' + results[i].title;
            let pTime = document.createElement('p');
            pTime.textContent = 'Hossz: ' + results[i].timeInMinutes + ' perc';
            let pPrem = document.createElement('p');
            pPrem.textContent = 'Premier: ' + results[i].premierYear;
            let pCat = document.createElement('p');
            pCat.textContent = 'Kategória: ' + results[i].categories.join(', ');
            let pDir = document.createElement('p');
            for (var j in results[i].directors) {
                tmpDir = results[i].directors[j];
                charDir.push(tmpDir);
            }
            pDir.textContent = 'Rendező: ' + charDir.join(', ');
            let pCast = document.createElement('p');
            for (var j in results[i].cast) {
                tmp = results[i].cast[j];
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
            document.getElementsByClassName('results')[0].appendChild(div);
        }
    }
}

function clearTable() {
    document.getElementById('forDelete').style.display = 'none';
}

function statDetails(data) {
    let sum = 0;
    let avg = 0;
    for (let i = 0; i < data.length; i++) {
        if (data[i].timeInMinutes !== Number) {
            data[i].timeInMinutes = parseInt(data[i].timeInMinutes);
        }
        sum = sum + data[i].timeInMinutes;
    }
    avg = (sum / data.length) / 60;
    document.getElementById('runtime').innerHTML = `Az összes film hossza: ${(sum/60).toFixed(2)} óra.`;
    document.getElementById('avg').innerHTML = `Az összes film hosszának átlaga: ${avg.toFixed(2)} óra.`;

    function filterCast(data) {
        let noOfCast = new Map();
        for (let i = 0; i < data.length; i++) {
            for (let j = 0; j < data[i].cast; j++) {
                if (noOfCast.has(data[i].cast[j].name)) {
                    let currentValue = noOfCast.get(data[i].cast[j].name) + 1;
                    noOfCast.set(data[i].cast[j].name, currentValue);
                } else {
                    noOfCast.set(data[i].cast[j].name, 1);
                }
            }
        }
        for (let i of noOfCast) {
            console.log(`Színész neve: ${i[0]}. Filmjeinek száma: ${i[1]}.`);
        }
        console.log(noOfCast);
    };
    filterCast(data);

    /*     let data1 = [];
        let dataname = [];
        for (let i in data) {
            for (let j in data[i].cast) {
                if (!data1.includes(data[i].cast[j].name)) {
                    data1.push(data[i].cast[j].name);
                    dataname.push({
                        name: data[i].cast[j].name,
                        movie: 0
                    });
                }
                for (let k in dataname) {
                    for (let l in dataname[k].cast) {
                        if (dataname[k].cast[l].name == data[k].cast[l].name) {
                            dataname[k].cast[l].movie++;
                        }
                    }
                }
            }

        }
        console.log(dataname); */
}