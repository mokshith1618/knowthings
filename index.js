function comedy() {
    document.getElementById('jokeBtn').onclick = function() {
        document.getElementById('spinner').classList.toggle("d-none");
        let options = {
            method: "GET"
        };
        fetch("https://apis.ccbp.in/jokes/random", options)
            .then(function(response) {
                return response.json();
            })
            .then(function(jsonData) {
                document.getElementById('spinner').classList.toggle("d-none");
                document.getElementById("jokeText").textContent = JSON.stringify(jsonData.value);
            });
    };
}
comedy();

function searchengine() {
    let searchInputE1 = document.getElementById('searchInput');
    let resultContainer = document.getElementById('searchResults');

    function eachItem(searchData) {
        let {
            title,
            link,
            description
        } = searchData;
        //1.create item container
        let itemContainer = document.createElement('div');
        itemContainer.classList.add('result-item');
        resultContainer.appendChild(itemContainer);
        //2.create title
        let mainHeading = document.createElement('a');
        mainHeading.classList.add('result-title');
        mainHeading.textContent = title;
        mainHeading.href = link;
        mainHeading.target = "_blank";
        itemContainer.appendChild(mainHeading);

        let break1 = document.createElement('br');
        itemContainer.appendChild(break1);
        //3.create link
        let url = document.createElement("a");
        url.classList.add('result-url');
        url.textContent = link;
        url.href = link;
        url.target = "_blank";
        itemContainer.appendChild(url);

        let break2 = document.createElement('br');
        itemContainer.appendChild(break2);
        //4.create description
        let descriptionPara = document.createElement("p");
        descriptionPara.classList.add('link-description');
        descriptionPara.textContent = description;
        itemContainer.appendChild(descriptionPara);
    }

    function createItems(data) {
        document.getElementById("spinnerwiki").classList.toggle("d-none");
        for (let item of data) {
            eachItem(item);
        }
    }

    function searchResults(inputVal) {
        let options = {
            method: "GET"
        };
        fetch("https://apis.ccbp.in/wiki-search?search=" + inputVal, options)
            .then(function(response) {
                return response.json();
            })
            .then(function(jsonData) {
                console.log(jsonData);
                createItems(jsonData['search_results']);
            });
    }

    searchInputE1.addEventListener("keydown", function(event) {
        resultContainer.textContent = "";
        document.getElementById("spinnerwiki").classList.toggle("d-none");
        if (event.key === 'Enter') {
            searchResults(searchInputE1.value);
        }
    });
}
searchengine();

function geography() {
    let searchInputE1 = document.getElementById('searchInputgeo');
    let resultCountriesE1 = document.getElementById('resultCountries');
    let spinnerE1 = document.getElementById('spinnergeo');
    searchInputE1.value = "";

    function relevantResults(result) {
        //create container
        let resultContainer = document.createElement('div');
        resultContainer.classList.add('col-12', 'col-md-5', 'mr-auto', 'ml-auto', 'd-flex', 'flex-row', 'country-card');
        resultCountriesE1.appendChild(resultContainer);
        //create flag
        let resultFlag = document.createElement('img');
        resultFlag.src = result.flag;
        resultFlag.classList.add('country-flag', 'mt-auto', 'mb-auto');
        resultContainer.appendChild(resultFlag);
        //create content container
        let contentContainer = document.createElement('div');
        contentContainer.classList.add('d-flex', 'flex-column', 'ml-4');
        resultContainer.appendChild(contentContainer);
        //create name
        let resultName = document.createElement('p');
        resultName.textContent = result.name;
        resultName.classList.add('country-name');
        contentContainer.appendChild(resultName);
        //create population
        let resultPopulation = document.createElement('p');
        resultPopulation.textContent = result.population;
        resultPopulation.classList.add('country-population');
        contentContainer.appendChild(resultPopulation);
    }

    function allResults(resultslist) {
        for (let item of resultslist) {
            let itemName = item.name.toLowerCase();
            if (itemName.includes(searchInputE1.value.toLowerCase())) {
                relevantResults(item);
            }
        }
    }

    function getResults() {
        spinner.classList.toggle('d-none');
        let options = {
            method: "GET"
        };
        fetch("https://restcountries.eu/rest/v2/all?fields=name;population;flag", options)
            .then(function(response) {
                return response.json();
            })
            .then(function(jsonData) {
                spinner.classList.toggle('d-none');
                allResults(jsonData);
            });
    }
    getResults();
    searchInputE1.addEventListener("keydown", function(event) {
        resultCountriesE1.textContent = '';
        getResults();
    });
}
geography();
function numberfact() {
    let inputNum = document.getElementById('userInput');
    let factResult = document.getElementById('fact');
    let loading = document.getElementById('spinnernum');

    inputNum.addEventListener("keydown", function(event) {
        factResult.textContent = "";
        if (event.key === 'Enter') {
            loading.classList.toggle('d-none');
            let options = {
                method: "GET"
            };
            fetch("https://apis.ccbp.in/numbers-fact?number=" + inputNum.value, options)
                .then(function(response) {
                    loading.classList.toggle('d-none');
                    return response.json();
                })
                .then(function(jsonData) {
                    factResult.textContent = jsonData.fact;
                });
        }
    });
}
numberfact();