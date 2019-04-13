// Products.js

import { Moltin } from 'services' 
import { $, $all, on } from 'utils' 
import { addToCart } from 'ProductForm'

const $products = $('.products')

const render = (products) => {
	let html = products.map(product => {
		return `
			<div class="product">
				<h2>${product.name}</h2>
				${form(product)}
			</div>
		`
	}).join('')

	$products.innerHTML = html;
}

const form = (product) => {
	return `
		<form class="product__form" action="/api/cart/add" method="post">
			<p>
				<input name="name" value="${product.name}" type="hidden">
				<input name="id" value="${product.id}" type="hidden">
			</p>
			<input type="submit" value="Add to cart">
		</form>
	`
}

const events = () => {
	const $productForms = $all('.product__form')

	$productForms.forEach(form => {
		if (!form.length) return

		on(form, 'submit', addToCart)
	})
}

Moltin.Products.All().then((response) => {
	render(response.data)
	events()
})