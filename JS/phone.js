const notifyResult = document.getElementById('notify-result');
const notifyEmpty = document.getElementById('notify-empty');

const searchPhone = () => {
    const searchInput = document.getElementById('search-input');
    let searchText = searchInput.value;
    // clearing input field
    searchInput.value = '';

    // handling error & fetching data
    if (searchText.toLowerCase() === '') {
        notifyEmpty.style.display = 'block';
        notifyResult.style.display = 'none';
    }
    else if (searchText.toLowerCase() !== '') {
        notifyEmpty.style.display = 'none';
        notifyResult.style.display = 'none';
        spinner('block');

        // fetch & load data
        const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
        fetch(url)
            .then(response => response.json())
            .then(result => displayPhone(result.data))
    }
}

// spinner
const spinner = displaySpinner => {
    const spinner = document.getElementById('spinner');
    spinner.style.display = displaySpinner;
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
        for (const phone of phones.slice(0, 20)) {
            details.textContent = '';
            const div = document.createElement('div');
            div.classList.add('col');
            div.innerHTML = `
                <div class="card card-style">
                    <img class="p-3" src="${phone.image}" class="card-img-top" alt="...">
                    <div class="card-body text-center">
                        <h6 class="card-title">${phone.brand}</h6>
                        <h5 class="card-title">${phone.phone_name}</h5>
                        <a onclick="phoneDetails('${phone.slug}')" role="button" class="btn btn-outline-dark rounded-pill px-5" href="#detail-top">Detail</a>
                    </div>
                </div>
            `;
            searchResult.appendChild(div);
        }
    }
    spinner('none');
}

const phoneDetails = phoneId => {
    const detailsURL = `https://openapi.programming-hero.com/api/phone/${phoneId}`
    fetch(detailsURL)
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
            <img class="p-3 img-fluid" src="${phoneDetail.image}" class="card-img-top" alt="...">
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
                <a onclick="closeButton()" role="button" class="btn btn-outline-dark rounded-pill px-5" href="#detail-top">Close</a>
            </div>
        </div>
    `;
    details.appendChild(divDetail);
}

// closing button
const closeButton = () => {
    details.innerHTML = '';
}