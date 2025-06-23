let medicines = [];
let courseDuration = 0;

function getMedicineDetails() {
    let numMedicinesInStock = document.getElementById('numMedicinesInStock').value;
    courseDuration = document.getElementById('courseDuration').value;

    if (numMedicinesInStock > 0 && courseDuration > 0) {
        document.getElementById('medicineForm').classList.add('hidden');
        let medicineDetailsDiv = document.getElementById('medicineDetails');
        medicineDetailsDiv.classList.remove('hidden');
        generateMedicineInputFields(numMedicinesInStock);
    }
}

function generateMedicineInputFields(numMedicinesInStock) {
    let medicinesDiv = document.getElementById('medicines');
    medicinesDiv.innerHTML = '';

    for (let i = 0; i < numMedicinesInStock; i++) {
        let medicineDiv = document.createElement('div');
        medicineDiv.innerHTML = `
            <h3>Medicine ${i + 1}</h3>
            <label for="name${i}">Name of Medicine:</label>
            <input type="text" id="name${i}" required>

            <label for="productionDate${i}">Production Date (YYYY-MM-DD):</label>
            <input type="date" id="productionDate${i}" required>

            <label for="expiryDate${i}">Expiry Date (YYYY-MM-DD):</label>
            <input type="date" id="expiryDate${i}" required>

            <label for="courseStartDate${i}">Course Start Date (YYYY-MM-DD):</label>
            <input type="date" id="courseStartDate${i}" required>

            <label for="stockQuantity${i}">Stock Quantity Available (days):</label>
            <input type="number" id="stockQuantity${i}" required min="1">
        `;
        medicinesDiv.appendChild(medicineDiv);
    }
}

function checkStock() {
    medicines = [];
    let numMedicinesInStock = document.getElementById('numMedicinesInStock').value;
    let today = new Date(); // Get today's system date

    for (let i = 0; i < numMedicinesInStock; i++) {
        let name = document.getElementById(`name${i}`).value;
        let productionDate = new Date(document.getElementById(`productionDate${i}`).value);
        let expiryDate = new Date(document.getElementById(`expiryDate${i}`).value);
        let courseStartDate = new Date(document.getElementById(`courseStartDate${i}`).value);
        let stockQuantity = parseInt(document.getElementById(`stockQuantity${i}`).value);

        medicines.push({
            name,
            productionDate,
            expiryDate,
            courseStartDate,
            stockQuantity
        });
    }

    let reminderMessage = '';
    let allMedicinesSafe = true;

    medicines.forEach(medicine => {
        let totalMedicineRequired = courseDuration;  // Assuming 1 medicine per day
        let totalMedicineStock = medicine.stockQuantity;

        // Calculate medicine depletion date
        let stockEndDate = new Date(medicine.courseStartDate);
        stockEndDate.setDate(stockEndDate.getDate() + totalMedicineStock);

        // Calculate alert date (5 days before stock runs out)
        let reminderDate = new Date(stockEndDate);
        reminderDate.setDate(reminderDate.getDate() - 5);

        // Days remaining for stock to end
        let daysLeftForStock = Math.ceil((stockEndDate - today) / (1000 * 60 * 60 * 24));

        // Days remaining for expiry
        let daysLeftForExpiry = Math.ceil((medicine.expiryDate - today) / (1000 * 60 * 60 * 24));

        // Stock depletion warnings
        if (daysLeftForStock > 5) {
            reminderMessage += `Stock for ${medicine.name} is sufficient.<br>`;
        } else if (daysLeftForStock > 0) {
            reminderMessage += `Stock for ${medicine.name} will end in ${daysLeftForStock} days. Please reorder.<br>`;
            allMedicinesSafe = false;
        } else {
            reminderMessage += `Stock for ${medicine.name} has finished. Please refill immediately!<br>`;
            allMedicinesSafe = false;
        }

        // Expiry warnings
        if (daysLeftForExpiry <= 5 && daysLeftForExpiry > 0) {
            reminderMessage += `The expiry date for ${medicine.name} is in ${daysLeftForExpiry} days. Use with caution.<br>`;
            allMedicinesSafe = false;
        } else if (daysLeftForExpiry <= 0) {
            reminderMessage += `The expiry date for ${medicine.name} has passed. DO NOT USE expired medicine!<br>`;
            allMedicinesSafe = false;
        }
    });

    // Display messages
    let resultDiv = document.getElementById('resultMessage');
    let messageDiv = document.getElementById('message');

    if (reminderMessage) {
        resultDiv.classList.remove('hidden');
        messageDiv.innerHTML = reminderMessage;
        document.getElementById('medicineDetails').classList.add('hidden');
    } else {
        resultDiv.classList.remove('hidden');
        messageDiv.innerHTML = "All medicines have sufficient stock and are safe to use!";
        messageDiv.classList.add('success');
        document.getElementById('medicineDetails').classList.add('hidden');
    }
}

function endCourse() {
    // Reset the form to start a new course
    alert("Your course has been restarted.");
    document.getElementById('resultMessage').classList.add('hidden');
    document.getElementById('medicineForm').classList.remove('hidden');
    document.getElementById('numMedicinesInStock').value = '';
    document.getElementById('courseDuration').value = '';
    document.getElementById('medicines').innerHTML = ''; // Clear any previously generated medicine fields
}
