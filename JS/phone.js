const notifyError = document.getElementById('notify-error');
const notifyEmpty = document.getElementById('notify-empty');

const searchPhone = () => {
    const searchInput = document.getElementById('search-input');
    let searchText = searchInput.value;
    // clearing input field
    searchInput.value = '';

    // handling error & fetching data
    if (searchText === '') {
        notifyEmpty.style.display = 'block';
        notifyError.style.display = 'none';
    }
    else if (searchText !== '') {
        notifyEmpty.style.display = 'none';
        // fetch & load data
        const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
        fetch(url)
            .then(response => response.json())
            .then(data => displayPhone(data.data))
    }
}

const displayPhone = phones => {
    const searchResult = document.getElementById('search-results');
    for (const phone of phones) {
        const div = document.createElement('div');
        // console.log(phone);
        div.classList.add('col');
        div.innerHTML = `
            <div class="card card-style">
                <img class="p-3" src="${phone.image}" class="card-img-top" alt="...">
                <div class="card-body text-center">
                    <h5 class="card-title">${phone.phone_name}</h5>
                    <button class="btn btn-outline-dark rounded-pill px-5">Details</button>
                </div>
            </div>
        `;
        searchResult.appendChild(div);
    }
}