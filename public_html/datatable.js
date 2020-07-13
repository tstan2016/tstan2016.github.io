//Function to initialize DataTable.js to child-table
function callDataTable() {
    $('#child-table').DataTable({
        retrieve: true,
        "order": [[ 1, "desc" ]],
        "language": {
            "lengthMenu": "Display _MENU_ records per page",
            "zeroRecords": "No records available, please reset the search keyword filter",
            "info": "Showing page _PAGE_ of _PAGES_",
            "infoEmpty": "No records available",
            "infoFiltered": "(filtered from _MAX_ total records)"
        }});
}


//Child row details
function format(d) {
    // `d` is the original data object for the row
    var customDescription = d.description;

//    Remove the <br>
//    customDescription = customDescription.replace(/[<]br[^>]*[>]/gi, ""); 
    //Remove the <p>
    customDescription = customDescription.replace(/(<p[^>]+?>|<p>|<\/p>)/img, "");

    //Only show first 100 letters of description, similar to ellipsis formatting in css
    //console.log(customDescription.substring(0,100)+"..."+customDescription.substring(customDescription.length-4,customDescription.length));

    const container = document.createElement('div');
    container.setAttribute('class', 'container');
    const card = document.createElement('div');
    card.setAttribute('class', 'card');

    const h3 = document.createElement('h3');
    h3.textContent = d.name;

    const cardContent = document.createElement('div');
    cardContent.setAttribute('class', 'card-content');

    const divImage = document.createElement('div');
    divImage.setAttribute('class', 'card-image-container');
    divImage.innerHTML = "<img src=\"" + d.photo + "\" alt='" + d.name + " Image'>";

    const divDescription = document.createElement('div');
    divDescription.setAttribute('class', 'card-description-container');
    divDescription.innerHTML = "Description:<br/>" + customDescription;

    container.appendChild(card);
    card.appendChild(h3);
    card.appendChild(cardContent);
    cardContent.appendChild(divImage);
    cardContent.appendChild(divDescription);

    //Create secondary table for user review
    var tempTableData = reviewData[d.name];
    if (tempTableData.length !== 0) {
        var childTable = document.createElement("table");
        childTable.setAttribute("id", "child-table");
        childTable.setAttribute("class", "display nowrap");
        childTable.style.width = '90%';

        for (var reviews of tempTableData) {
            var trow = childTable.insertRow();
            for (var element in reviews) {
                var cell = trow.insertCell();
                if (element === "user") {
                    var string = (reviews[element].name + " (" + (reviews[element].location + ")"));
                    var text = document.createTextNode(string);
                    cell.appendChild(text);
                } else {
                    var text = document.createTextNode(reviews[element]);
                    cell.appendChild(text);
                }
            }
        }
        var thead = childTable.createTHead();
        var trow = thead.insertRow();
        var theadProperty = Object.keys(tempTableData[0]);
        for (var header of theadProperty) {
            var th = document.createElement("th");
            var text = document.createTextNode(header);
            th.appendChild(text);
            trow.appendChild(th);
        }
        cardContent.appendChild(document.createElement('p'));
        cardContent.appendChild(childTable);

    } else {
        var alertDiv = document.createElement('div');
        alertDiv.innerHTML = "<br>This hotel does not have review yet<br><br>";
        cardContent.appendChild(alertDiv);
    }

    return container;
}

//Dictionary to handle user reviews in child-table
var reviewData = {};

$(document).ready(function () {
    $.ajax({
        type: 'GET',
        url: 'https://5df9cc6ce9f79e0014b6b3dc.mockapi.io/hotels/en',
        mimeType: 'json',
        success: function (data) {
            $.each(data, function (i, data) {
                var body = "<tr><td></td>";
                body += "<td>" + data.id + "</td>";
                body += "<td>" + data.name + "</td>";
                body += "<td>" + data.rating + "</td>";
                body += "<td>" + data.stars + "</td>";
                body += "<td>" + data.price + "</td>";
                body += "<td>" + data.address + "</td>";
                body += "<td>" + data.photo + "</td>";
                body += "<td>" + data.description + "</td>";
                body += "</tr>";
                //Populate the dictionary for child row details
                reviewData[data.name] = data.reviews;
                $("#hotel-table tbody").append(body);
            });
            /*DataTables instantiation. Hides photo and description from main table*/
            var table = $("#hotel-table").DataTable({
                "columns": [
                    {
                        "className": 'details-control',
                        "orderable": false,
                        "data": null,
                        "defaultContent": ''
                    },
                    {"data": "id"},
                    {"data": "name"},
                    {"data": "rating"},
                    {"data": "stars"},
                    {"data": "price"},
                    {"data": "address"},
                    {"data": "photo"},
                    {"data": "description"}
                ],
                "columnDefs": [
                    {
                        "targets": [7],
                        "visible": false,
                        "searchable": false
                    },
                    {
                        "targets": [8],
                        "visible": false,
                        "searchable": false
                    }
                ],
                "language": {
                    "lengthMenu": "Display _MENU_ records per page",
                    "zeroRecords": "No records available, please reset the search keyword filter",
                    "info": "Showing page _PAGE_ of _PAGES_",
                    "infoEmpty": "No records available",
                    "infoFiltered": "(filtered from _MAX_ total records)"
                }
            });
            // Add event listener for opening and closing details
            $('#hotel-table tbody').on('click', 'td.details-control', function () {
                var tr = $(this).closest('tr');
                var row = table.row(tr);
                
                if (row.child.isShown()) {
                    // This row is already open - close it
                    row.child.hide();
                    tr.removeClass('shown');
                } else {
                    //Make sure only open 1 child table at one time
                    if (document.getElementsByClassName('shown').length > 0) {
                        var elements = document.getElementsByClassName('shown');
                        while(elements.length > 0){
                            table.row(elements[0]).child.hide();
                            elements[0].classList.remove('shown');
                        }
                    }
                    // Open this row
                    row.child(format(row.data())).show();
                    tr.addClass('shown');
                    callDataTable();
                }
            });
        },
        error: function () {
            alert('Fail! Please check the endpoint');
        }
    });

});