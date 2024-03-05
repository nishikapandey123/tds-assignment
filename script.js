// Function to display validation error popup
function displayValidationError(message) {
    alert(`Validation Error: ${message}`);
}

// Function to handle form submission
function saveData() {
    var clientName = $('#clientName').val();
    var guardianType = $('#guardianType').val();
    var guardianName = $('#guardianName').val();
    var dob = $('#dob').val();
    var mobileNo = $('#mobileNo').val();
    var additionalMobileNo = $('#additionalMobileNo').val();
    var address = $('#address').val();
    var state = $('#state').val();
    var district = $('#district').val();
    var city = $('#city').val();
    var nextFollowUpDate = $('#nextFollowUpDate').val();

    // Basic validation
    if (!/^[A-Za-z ]+$/.test(clientName)) {
        displayValidationError('Client Name should contain only alphabetic characters');
        return;
    }

    if (!/^[A-Za-z ]+$/.test(guardianName)) {
        displayValidationError('Guardian Name should contain only alphabetic characters');
        return;
    }

    if (!/^[0-9]+$/.test(mobileNo) || mobileNo.length !== 10) {
        displayValidationError('Mobile No. should contain only numeric characters and be 10 digits long');
        return;
    }

    if (!/^[0-9]+$/.test(additionalMobileNo) || additionalMobileNo.length !== 10) {
        displayValidationError('Additional Mobile No. should contain only numeric characters and be 10 digits long');
        return;
    }

    if (!/^[A-Za-z ]+$/.test(state)) {
        displayValidationError('State should contain only alphabetic characters');
        return;
    }

    if (!/^[A-Za-z ]+$/.test(district)) {
        displayValidationError('District should contain only alphabetic characters');
        return;
    }

    if (!/^[A-Za-z ]+$/.test(city)) {
        displayValidationError('City should contain only alphabetic characters');
        return;
    }

    // Send data to Python backend (using AJAX or other method)
    $.ajax({
        url: '/saveData',
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({
            clientName: clientName,
            guardianType: guardianType,
            guardianName: guardianName,
            dob: dob,
            mobileNo: mobileNo,
            additionalMobileNo: additionalMobileNo,
            address: address,
            state: state,
            district: district,
            city: city,
            nextFollowUpDate: nextFollowUpDate
        }),
        success: function (data) {
            alert('Data saved successfully!');
            
            // After successfully saving data, redirect to the report page
            redirectToReport();
        },
        error: function (error) {
            console.error('Error saving data:', error);
        }
    });
}

// Function to redirect to the report page
function redirectToReport() {
    window.location.href = 'report.html';
}

// Function to handle Enter key press for form navigation
$('form').on('keypress', 'input', function (e) {
    if (e.which === 13) {
        e.preventDefault();
        var $this = $(e.target);
        var index = $('form input').index($this) + 1;

        // Move to the next input field
        $('form input:eq(' + index + ')').focus();
    }
});
