const notifyResult = document.getElementById('notify-result');
const notifyEmpty = document.getElementById('notify-empty');

const searchPhone = () => {
    const searchInput = document.getElementById('search-input');
    let searchText = searchInput.value;
    // clearing input field
    searchInput.value = '';

    // handling error & fetching data
    if (searchText === '') {
        notifyEmpty.style.display = 'block';
        notifyResult.style.display = 'none';
    }
    else if (searchText !== '') {
        notifyEmpty.style.display = 'none';

        // fetch & load data
        const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
        fetch(url)
            .then(response => response.json())
            .then(result => displayPhone(result.data))
    }
}

const displayPhone = phones => {
    const searchResult = document.getElementById('search-results');
    searchResult.textContent = '';

    // handling error & display results
    if (phones.length === 0) {
        notifyResult.style.display = 'block';
    }
    else if (phones.length !== 0) {
        notifyResult.style.display = 'none';

        // display results
        for (const phone of phones) {
            const div = document.createElement('div');
            div.classList.add('col');
            div.innerHTML = `
                <div class="card card-style">
                    <img class="p-3" src="${phone.image}" class="card-img-top" alt="...">
                    <div class="card-body text-center">
                        <h6 class="card-title">${phone.brand}</h6>
                        <h5 class="card-title">${phone.phone_name}</h5>
                        <button onclick="phoneDetails(${phone.slug})" class="btn btn-outline-dark rounded-pill px-5">Details</button>
                    </div>
                </div>
            `;
            phoneDetails(phone.slug)
            searchResult.appendChild(div);
        }
    }
}

const phoneDetails = phoneId => {
    const urlDetails = `https://openapi.programming-hero.com/api/phone/${phoneId}`
    fetch(urlDetails)
        .then(response => response.json())
        .then(result => displayPhoneDetails(result.data))
}

const details = document.getElementById('phone-details');

// display details
const displayPhoneDetails = phoneDetail => {
    details.textContent = '';
    const divDetail = document.createElement('div');
    divDetail.innerHTML = `
        <div class="card card-style">
            <img class="p-3" src="${phoneDetail.image}" class="card-img-top" alt="...">
            <div class="card-body text-center">
                <h6 class="card-title">${phoneDetail.brand}</h6>
                <h5 class="card-title">${phoneDetail.name}</h5>
                <p class="card-text fw-bold">${phoneDetail.releaseDate}</p>
                <p class="card-text font-bold">${phoneDetail.mainFeatures.displaySize} Display</p>
                <p class="card-text font-bold">${phoneDetail.mainFeatures.chipSet} Processor</p>
                <p class="card-text font-bold">${phoneDetail.mainFeatures.storage}</p>
                <p class="card-text font-bold">${phoneDetail.mainFeatures.memory}</p>
                <p class="card-text font-bold">${phoneDetail.mainFeatures.sensors}</p>
                <p class="card-text font-bold">${phoneDetail.others.USB} Port</p>
                <p class="card-text font-bold">WiFi: ${phoneDetail.others.WLAN}</p>
                <p class="card-text font-bold">Bluetooth: ${phoneDetail.others.Bluetooth}</p>
                <p class="card-text font-bold">GPS: ${phoneDetail.others.GPS}, NFC: ${phoneDetail.others.NFC}, Radio: ${phoneDetail.others.Radio}</p>
                <button onclick="closeButton()" class="btn btn-outline-dark rounded-pill px-5">Close</button>
            </div>
        </div>
    `;
    details.appendChild(divDetail);
}

// closing button
const closeButton = () => {
    details.style.display = 'none';
}