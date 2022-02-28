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
        const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
        fetch(url)
            .then(response => response.json())
            .then(data => console.log(data))
    }
}