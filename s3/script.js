var allProducts = "";

function getJson(){
    return '{ ' +
		'"products" : ' +
			'[' +
				'{ "productName":"Wireless headset" , "productPrice":"200" , "pictureUrl":"1.jpg"},' +
				'{ "productName":"Bluetooth mouse" , "productPrice":"400" , "pictureUrl":"2.jpg" },' +
				'{ "productName":"QHD monitor" , "productPrice":"1500" , "pictureUrl":"3.jpg" },' +
				'{ "productName":"Wireless keyboard" , "productPrice":"150" , "pictureUrl":"4.jpg"},' +
				'{ "productName":"Bluetooth speaker" , "productPrice":"300" , "pictureUrl":"5.jpg" },' +
				'{ "productName":"OLED monitor" , "productPrice":"1500" , "pictureUrl":"6.jpg" }' +
			'], ' +
		'"store": "Kaufland"' +
    '}';
}

function displayProducts(){
    var data = JSON.parse(getJson());
	allProducts = "";
    data.products.forEach(addProduct);
	document.getElementById("productList").innerHTML = allProducts;
}

function addProduct(product){
            allProducts += "<div class='product'><h2>" + product.productName + "</h2>" + 
        + "<img src='img/" + product.pictureUrl + "' alt='" + product.productName + 
        + "' style='width:150px;height:150px;'><h3>" + product.productPrice + "</h3>"
        + "<button class='btnAddProduct' data-productname='" + product.productName + 
        "'>Add to Cart</button></div>";
}

document.addEventListener('click', function(e) {
    if(e.target.className==='btnAddProduct'){
    	document.getElementById('echo').innerHTML=e.target.dataset.productname + " was succesfully added to cart!";
	 }
})

function openNav() {
    document.getElementById("mySidenav").style.width = "200px";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}