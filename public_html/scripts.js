//var request = new XMLHttpRequest();
//request.open('GET', 'https://5df9cc6ce9f79e0014b6b3dc.mockapi.io/hotels/en', true);
//request.onload = function () {
//
//    // Begin accessing JSON data here
//    var data = JSON.parse(this.response);
//    table = document.getElementById("hotelTable");
//    tbody = table.getElementsByTagName('tbody')[0];
//    if (request.status >= 200 && request.status < 400) {
//        data.forEach(hotel=>{
//            var tr = document.createElement('tr');
//            
//            var id = document.createElement('td');
//            var name = document.createElement('td');
//            var rating = document.createElement('td');
//            var stars = document.createElement('td');
//            var address = document.createElement('td');
//            var photo = document.createElement('td');
//            var price = document.createElement('td');
//            var description = document.createElement('td');
//            var reviews = document.createElement('td');
//            
//            id.appendChild(document.createTextNode(hotel.id));
//            name.appendChild(document.createTextNode(hotel.name));
//            rating.appendChild(document.createTextNode(hotel.rating));
//            stars.appendChild(document.createTextNode(hotel.stars));
//            address.appendChild(document.createTextNode(hotel.address));
//            photo.appendChild(document.createTextNode(hotel.photo));
//            price.appendChild(document.createTextNode(hotel.price));
//            description.appendChild(document.createTextNode(hotel.description));
//            reviews.appendChild(document.createTextNode(hotel.reviews));
//            
//            tr.appendChild(id);
//            tr.appendChild(name);
//            tr.appendChild(rating);
//            tr.appendChild(stars);
//            tr.appendChild(address);
//            tr.appendChild(photo);
//            tr.appendChild(price);
//            //tr.appendChild(description);
//            //tr.appendChild(reviews);
//            tbody.appendChild(tr);
//        });
//    } else {
//        alert("It's not working! Please check your endpoint")
//    }
//}
//
//request.send();
