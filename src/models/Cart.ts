import data from '../data/data.json'
import Storage from '../modules/storage/SessionStorage'
import { PlaceCoord } from './Places'

export type Cart = { id: number }

export default class CartModel {
	private static cart: Cart[] = []

	public static readonly get = () => {
		const cart = Storage.get('cart')
		if (cart) return cart
		return CartModel.cart
	}

	public static readonly add = async (practice: Cart) => {
		let isExist = false
		CartModel.cart.map(value => {
			if (value.id == practice.id) {
				isExist = true
				return
			}
		})
		if (!isExist) {
			CartModel.cart.push(practice)
			this.save()
			return true
		}
		return false
	}

	public static readonly remove = (id: number) => {
		let cart = this.get() as Cart[]
		cart = cart.filter(value => value.id != id)
		CartModel.cart = cart
		//console.log(CartModel.cart)
		this.save()
		return true
	}

	public static readonly save = () => {
		Storage.set('cart', CartModel.cart)
	}

	public static readonly getItems = () => {
		const cartIds: Cart[] = this.get()
		const cartItems: PlaceCoord[] = []
		cartIds.map((cartElement) => {
			cartItems.push(data.filter(value => value.id == cartElement.id)[0])
		})
		return cartItems.reverse()
	}

}