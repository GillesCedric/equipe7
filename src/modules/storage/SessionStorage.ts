/**
 * @class Storage
 * @author Gilles Cédric
 * @description this class is used to manage the local or the session storage in the application
 * @exports
 * @default
 * @since 23/05/2022
 */
export default class SessionStorage {

	/**
	 * @method get
	 * @description this method is used to get a specific cookies in the navigator
	 * @param {string} name the name of the cookies
	 * @public
	 * @static
	 * @readonly
	 * @returns {any} the cookies
	 */
	public static readonly get = (name: string): any => {
		const value = sessionStorage.getItem(name)
		if (value) return JSON.parse(value)
		return null
	}

	/**
	 * @method set
	 * @description this method is used to set a specific cookies in the navigator
	 * @param {string} name the name of the cookies
	 * @param {string | number} value the value of the cookies
	 * @public
	 * @static
	 * @readonly
	 * @returns {void} the cookies
	 */
	public static readonly set = (name: string, value: string | object): void => {
		return sessionStorage.setItem(name, typeof value == 'string' ? value : JSON.stringify(value))
	}

	/**
	 * @method remove
	 * @description this method is used to get all the cookies in the navigator
	 * @param {string} name the name of the cookies
	 * @public
	 * @static
	 * @readonly
	 * @returns {void} the cookies
	 */
	public static readonly remove = (name: string): void => {
		sessionStorage.removeItem(name)
	}

	/**
	 * @method isExist
	 * @description this method is used to is a cookies is already defined in the navigator
	 * @param {string} name the name of the cookies
	 * @public
	 * @static
	 * @readonly
	 * @returns {boolean} if the cookies is defined or not
	 */
	public static readonly clear = (): void => {
		return sessionStorage.clear()
	}

}