'use strict';


function repos(username) {
    console.log('repos ran');
   
    const url = `https://api.github.com/users/${username}/repos`
    console.log(url);

    fetch(url)

        .then(response => {
            if (response.ok) {
                return response.json();
            }

            throw new Error(response.statusText);
        })

        .then(responseJson => results(responseJson))
        .catch(err => {
            displayError(err.message);
        });
}

function results(responseJson) {
    console.log('results ran');

    $(responseJson).ready(function () {
        $('.loading').addClass('hidden')
    })
    console.log(responseJson)
    console.log(responseJson.length)
    console.log(responseJson[0].owner.login)
    
    let user = responseJson[0].owner.login
    let userinfo = `
        <h4>User: <span class="user">${user}</span></h4>
        <h4><span class="user">Repos: ${responseJson.length}</span></h4>
        <ul class="results-list"></ul>
    `
    $('.results').append(userinfo)
  
    for (let i = 0; i < responseJson.length; i++) {
        $('.results').append(`
        <div class="result-item"><li><h4>${responseJson[i].name}</h4>
        <a href="${responseJson[i].html_url}">${responseJson[i].html_url}</a>
        <p>${responseJson[i].description}</p>
        </li></div>
        `)
    }
 
    $('.results').removeClass('hidden')

}

function error(error) {
    console.log('error ran');
    $('.results').html(`<h3 class="error">Something went wrong: ${error}</h3>`)
    $('.loading').addClass('hidden');
    $('.results').removeClass('hidden')
}

function getSearchPhrase() {
    return (['Search', 'Find','Look up','Go','Check','Push this button','Don\'t push this button'])[Math.floor(Math.random() * 7)];
}


function watchForm() {
    
    $('#form').submit(event => {
        
        event.preventDefault();
        console.log('form ran');
        
        let searchPhrase = getSearchPhrase()
        console.log(searchPhrase)
        /
        $('#find').html(searchPhrase)
       
        $('.results').empty().addClass('hidden')
       
        const username = $('.js-username').val();
        console.log(username);
    
        $('.loading').removeClass('hidden');
        setTimeout(function () {

            repos(username);
        }, 1000)
    });
}

$(watchForm);
