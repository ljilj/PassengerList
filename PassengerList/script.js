// Class Passenger
class Passenger {
    constructor(firstName, lastName, passportNumber){
        this.firstName = firstName;
        this.lastName = lastName;
        this.passportNumber = passportNumber;
    }
}

// Class UI
class UI {
    static displayPassenger() {
        const passengers = Store.getPassenger();
        passengers.forEach((passenger) => UI.addPassengerToList(passenger));
    }

    static addPassengerToList(passenger) {
        const list = document.querySelector('#passenger-list');
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${passenger.firstName}</td>
            <td>${passenger.lastName}</td>
            <td>${passenger.passportNumber}</td>
            <td>
                <a href="#" class="btn btn-danger btn-sm delete">
                    <i class="fas fa-trash"></i>
                </a>
            </td>
        `;

        list.appendChild(row);
    }

    static deletePassenger(el) {
        if(el.classList.contains('delete')) {
            el.parentElement.parentElement.remove();
        }
    }

    static showAlert(message, className) {
        const div = document.createElement('div');
        div.className = `alert alert-${className}`;
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector('.container');
        const form = document.querySelector('#passenger-form');
        container.insertBefore(div, form);

        setTimeout(() => document.querySelector('.alert').remove(), 4000);
    }

    static clearFields() {
        document.querySelector('#firstName').value = '';
        document.querySelector('#lastName').value = '';
        document.querySelector('#number').value = '';
    }
}


// Store Class
class Store {
    static getPassenger() {
        let passengers;
        if(localStorage.getItem('passengers') === null) {
            passengers = [];
        } else {
            passengers = JSON.parse(localStorage.getItem('passengers'));
        }
        return passengers;
    }

    static addPassenger(passenger) {
        const passengers = Store.getPassenger();
        passengers.push(passenger);
        localStorage.setItem('passengers', JSON.stringify(passengers));
    }

    static removePassenger(passportNumber) {
        const passengers = Store.getPassenger();
        passengers.forEach((passenger, index) => {
            if(passenger.passportNumber === passportNumber) {
                passengers.splice(index, 1);
            }
        });
        localStorage.setItem('passengers', JSON.stringify(passengers));
    }
}


// Event - display passenger
document.addEventListener('DOMContentLoaded', UI.displayPassenger);

// Event - add a passenger
document.querySelector('#passenger-form').addEventListener('submit', (e) => {
    e.preventDefault();

    const firstName = document.querySelector('#firstName').value;
    const lastName = document.querySelector('#lastName').value;
    const passportNumber = document.querySelector('#number').value;

    if(firstName === ''  ||  lastName === ''  ||  passportNumber === '') {
        UI.showAlert('Please fill in all fields', 'danger');
    } else {
        const passenger = new Passenger(firstName, lastName, passportNumber);

        UI.addPassengerToList(passenger);

        Store.addPassenger(passenger);

        UI.showAlert('Passenger Added', 'success');

        UI.clearFields();
    }
});

// Event - remove a passenger
document.querySelector('#passenger-list').addEventListener('click', (e) => {
    UI.deletePassenger(e.target);

    UI.showAlert('Passenger Removed', 'success');
});