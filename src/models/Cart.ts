import data from '../data/data.json'
import Storage from '../modules/storage/SessionStorage'
import GoodPracticesModel, { Filters, GoodPractices } from './GoodPractices'

export type Cart = { id: string }

export default class CartModel {
	private static cart: Cart[] = GoodPracticesModel.getGoodPracticesWithFilter(Filters.incontournable, Filters.incontournable).map(practice => {
		return { id: practice.Id }
	})

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

	public static readonly remove = (id: string) => {
		let isIncontournable = false
		data.map(value => {
			if (value.Id == id && value.Incontournable == Filters.incontournable.toUpperCase()) isIncontournable = true
		})
		if (isIncontournable) return false
		CartModel.cart = CartModel.cart.filter(value => value.id != id)
		this.save()	
		return true
	}

	public static readonly save = () => {
		Storage.set('cart', CartModel.cart)
	}

	public static readonly getGoodPractices = (itemOffset: number = 0, endOffset: number = 21) => {
		const cartIds: Cart[] = this.get()
		const cartPractices: GoodPractices[] = []
		cartIds.map((cartElement) => {
			cartPractices.push(data.filter(value => value.Id == cartElement.id)[0])
		})
		return cartPractices.reverse().slice(itemOffset, endOffset)
	}

	public static readonly getGoodPracticesSize = () => (this.get() as Cart[]).length

}