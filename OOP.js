// Product Class
class Product {
    constructor(id, name, price) {
        this.id = id;
        this.name = name;
        this.price = price;
    }
}

// ShoppingCartItem Class
class ShoppingCartItem {
    constructor(product, quantity = 1) {
        this.product = product;
        this.quantity = quantity;
    }

    getTotalPrice() {
        return this.product.price * this.quantity;
    }
}

// ShoppingCart Class
class ShoppingCart {
    constructor() {
        this.items = [];
    }

    addItem(product) {
        const CurrentItem = this.items.find(item => item.product.id === product.id);
        if (CurrentItem) {
            CurrentItem.quantity++;
        } else {
            this.items.push(new ShoppingCartItem(product));
        }
        this.displayCart();
    }

    removeItem(productId) {
        this.items = this.items.filter(item => item.product.id !== productId);
        this.displayCart();
    }

    getTotal() {
        return this.items.reduce((total, item) => total + item.getTotalPrice(), 0);
    }

    displayCart() {
        const cartList = document.querySelector('.cart-items ul');
        cartList.innerHTML = '';
        this.items.forEach(item => {
            const li = document.createElement('li');
            li.innerHTML = `
                ${item.product.name} (${item.quantity}) - ${item.getTotalPrice()} $
                <button class="btn btn-sm btn-danger btn-remove" data-id="${item.product.id}">Remove</button>
            `;
            cartList.appendChild(li);
        });
        document.querySelector('.total-price').innerText = `${this.getTotal()} $`;
    }
}

// Initialize ShoppingCart
const cart = new ShoppingCart();

// Product Data
const products = [
    new Product(1, 'Laptop', 2000),
    new Product(2, 'Mouse', 50),
    new Product(3, 'Casque', 150)
];

// Add event listeners to buttons
document.querySelectorAll('.btn-add').forEach(button => {
    button.addEventListener('click', () => {
        const productId = parseInt(button.closest('.product').dataset.id);
        const product = products.find(prod => prod.id === productId);
        cart.addItem(product);
    });
});

// Remove item
document.querySelector('.cart-items').addEventListener('click', e => {
    if (e.target.classList.contains('btn-remove')) {
        const productId = parseInt(e.target.dataset.id);
        cart.removeItem(productId);
    }
});
