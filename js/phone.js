
const loadPhone = async (searchText, isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
    const data = await res.json();
    const phones = data.data;
    displayPhones(phones, isShowAll);
}

const displayPhones = (phones, isShowAll) => {

    const phoneContainer = document.getElementById('phone-container');
    // clear container before adding new search
    phoneContainer.textContent = '';

    // show all button if phones > 12
    const showAll = document.getElementById('show-all');
    if (phones.length > 12 && !isShowAll) {
        showAll.classList.remove('hidden');
    }
    else {
        showAll.classList.add('hidden');
    }

    // show only 12 element of data
    if (!isShowAll) {
        phones = phones.slice(0, 12);
    }

    phones.forEach(phone => {
        const phoneCard = document.createElement('div');
        phoneCard.classList = `card w-96 p-4 bg-red-100 shadow-xl`;
        phoneCard.innerHTML = `
            <figure><img src="${phone.image}" alt="Shoes" /></figure>
            <div class="card-body">
                <h2 class="card-title">${phone.phone_name}</h2>
                <p>If a dog chews shoes whose shoes does he choose?</p>
                <div class="card-actions justify-end">
                <button class="btn btn-primary">Buy Now</button>
                </div>
            </div>
        `
        phoneContainer.appendChild(phoneCard)
    });
    loadingSpinner(false);
}

function phoneSearch(isShowAll) {
    loadingSpinner(true);
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    loadPhone(searchText, isShowAll);

}
// loading spinner
const loadingSpinner = (isLoading) => {
    const spinnerLoading = document.getElementById('loading-spinner');
    if (isLoading) {
        spinnerLoading.classList.remove('hidden');
    }
    else {
        spinnerLoading.classList.add('hidden');
    }
}

const handleShowAll = () => {
    phoneSearch(true);
}