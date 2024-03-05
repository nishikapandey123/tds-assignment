$(document).ready(function () {
    $.get('/getData', function (data) {
        
        $('#dataTable tbody').empty();

        data.forEach(function (item) {
            $('#dataTable tbody').append(`<tr>
                <td>${item.clientName || 'N/A'}</td>
                <td>${item.guardianType || 'N/A'}</td>
                <td>${item.guardianName || 'N/A'}</td>
                <td>${item.dob || 'N/A'}</td>
                <td>${item.mobileNo || 'N/A'}</td>
                <td>${item.additionalMobileNo || 'N/A'}</td>
                <td>${item.address || 'N/A'}</td>
                <td>${item.state || 'N/A'}</td>
                <td>${item.district || 'N/A'}</td>
                <td>${item.city || 'N/A'}</td>
                <td>${item.nextFollowUpDate || 'N/A'}</td>
            </tr>`);
        });

        $('#dataTable').DataTable();
    });
});
