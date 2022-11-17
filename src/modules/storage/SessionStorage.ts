export default class SessionStorage {

	public static readonly get = (name: string): any => {
		const value = sessionStorage.getItem(name)
		if (value) return JSON.parse(value)
		return null
	}

	public static readonly set = (name: string, value: string | object): void => {
		return sessionStorage.setItem(name, typeof value == 'string' ? value : JSON.stringify(value))
	}

	public static readonly remove = (name: string): void => {
		sessionStorage.removeItem(name)
	}

	public static readonly clear = (): void => {
		return sessionStorage.clear()
	}

}