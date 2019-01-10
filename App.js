class Product{
	constructor(name, price, year){
		this.name = name;
		this.price = price;
		this.year = year;
	}
}

class UI{
	appendList(product){
		const productList = document.getElementById('product-list');
		this.addButtonRemoveAll(productList);
		this.addProduct(product, productList);
	}
	addProduct(product, productList){
		const element = document.createElement('div');
		element.innerHTML = `
			<div class="card text-center mb-4">
				<div class="card-body">
					<strong>Product name:</strong> ${product.name}
					<strong>Product price:</strong> ${product.price}
					<strong>Product year:</strong> ${product.year}
					<a href="" class="btn btn-danger" name="delete">Delete</a>
				</div>
			</div>
		`;
		productList.appendChild(element);
	}
	resetForm(){
		document.getElementById('product-form').reset();
	}
	deleteProduct(element){
		if (element.name === 'delete') {
			element.parentElement.parentElement.parentElement.remove();
			this.showMessage('Product Deleted Successfully', 'danger');
		}else if (element.name === 'deleteAll') {
			const list = document.getElementById('product-list');
			while (list.hasChildNodes()) {
			list.removeChild(list.childNodes[0])
		}
		}
	}

	showMessage(message, cssClass){
		const div = document.createElement('div');
		div.className = `alert alert-${cssClass} mt-4`;
		div.appendChild(document.createTextNode(message));
		//mostrando en el DOM
		const container = document.querySelector('.container');
		const app = document.querySelector('#App');
		container.insertBefore(div, app);
		setTimeout(function(){
			document.querySelector('.alert').remove();
		},1000);
	}
	addButtonRemoveAll(productList){
		const button = document.getElementById('btnRemoveAll');
		if (button == null) {
			const newButton = document.createElement('a');
			newButton.innerHTML = `
				<a href="" class="btn btn-dark" id="btnRemoveAll" name="deleteAll">Delete all</a>
			`;
			productList.appendChild(newButton);
		}
		
	}
}


//Eventos del DOM
document.getElementById('product-form')
	.addEventListener('submit', function(e){
		const name = document.getElementById('name').value;
		const price = document.getElementById('price').value;
		const year = document.getElementById('year').value;
		const product = new Product(name,price,year);
		const ui = new UI();
		if (name===''||price===''||year==='') {
			return ui.showMessage('Please complete fields', 'warning');
		}
		ui.appendList(product);
		ui.resetForm();
		ui.showMessage('Product added successfully', 'success')
		e.preventDefault();
	})

document.getElementById('product-list')
	.addEventListener('click', function(e){
		const ui = new UI();
		ui.deleteProduct(e.target);
		//ui.deleteAll(e.target);
		e.preventDefault();
	});