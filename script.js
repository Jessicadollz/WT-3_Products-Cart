document.addEventListener('DOMContentLoaded', () => {
    const products = [
        {id: 1, name: 'Product-1', price: 100},
        {id: 2, name: 'Product-2', price: 200},
        {id: 3, name: 'Product-3', price: 300},
    ];

    const cart = {};

    function updateCart() {
        const cartList = document.getElementById('cart-list');
        const totalPriceEl = document.getElementById('total-price');
        cartList.innerHTML = '';
        let total = 0;

        if (Object.keys(cart).length === 0) {
            cartList.textContent = 'No Product added to the cart';
        } else {
            for (const [id, qty] of Object.entries(cart)) {
                const product = products.find(p => p.id == id);
                const cartItem = document.createElement('div');
                cartItem.className = 'cart-item';
                cartItem.textContent = `${product.name} (${qty} x ${product.price})`;

                 cartList.appendChild(cartItem);
                total += product.price * qty;
            }
        }
        totalPriceEl.textContent = `Total: ${total}`;
    }

    function updateQuantityDisplay(productId) {
        const quantityEl = document.getElementById(`quantity-${productId}`);
        quantityEl.textContent = cart[productId] || 0;
    }

    document.querySelectorAll('.increment').forEach(button => {
        button.addEventListener('click', () => {
            const id = button.getAttribute('data-id');
            cart[id] = (cart[id] || 0) + 1;
            updateQuantityDisplay(id);
            updateCart();
        });
    });

    document.querySelectorAll('.decrement').forEach(button => {
        button.addEventListener('click', () => {
            const id = button.getAttribute('data-id');
            if (cart[id]) {
                cart[id] -= 1;
                if (cart[id] === 0) delete cart[id];
                updateQuantityDisplay(id);
                updateCart();
            }
        });
    });

    updateCart();
});