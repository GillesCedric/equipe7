import data from '../data/data.json'

export type GoodPractices = {
	Family: string,
	Id: string,
	Planet: string,
	People: string,
	Prosperity: string,
	Recommendation: string,
	Criteria: string,
	Justification: string,
	Stage: string,
	Tests: {
		1: string,
		2: string,
		3: string
	}
	Correspondence: string,
	Link: string,
	Type: string,
	Difficulty: string,
	Goal: string,
	Incontournable: string,
	Tags: string,
	Actors: string,
	Indicators: {
		_: string,
		X: string,
		Y: string
	}
	Priority: string,
	Recurrence: string,
	UseCase: string,
	Example: string,
	Limit: string,
	Automatizable: string,
	AutomatizationScript: string,
	AutomatizationLevel: string,
	AutomatizationInformation: string
}

export enum Filters {
	family = 'Family',
	incontournable = 'Incontournable',
	type = 'Type'
}

export default abstract class GoodPracticesModel {

	/**
	 * @description this __OBJECT__ is used to get the products from the database
	 * @param {number} index the index of the page that should be rendered
	 * @param {number} amount the number of products that should be rendered per page
	 * @returns {Products} the sorted list of products
	 */
	static readonly getGoodPractices = (itemOffset: number = 0, endOffset: number = 21): GoodPractices[] => data.slice(itemOffset, endOffset)

	static readonly getGoodPracticesWithFilter = (filter: Filters, value: string, itemOffset?: number, endOffset?: number): GoodPractices[] => {
		if (itemOffset || endOffset) return data.filter(practice => practice[filter] == value.toUpperCase()).slice(itemOffset, endOffset)
		return data.filter(practice => practice[filter] == value.toUpperCase())
	}

	static readonly getRecommendationsWithFilter = (filter: Filters, value: string): string[] => {
		const recommendations: string[] = []
		data.filter(practice => practice[filter] == value.toUpperCase()).map(practice => {
			recommendations.push(practice.Recommendation)
		})
		return recommendations.filter((recommendation, index) => recommendations.indexOf(recommendation) == index)
	}

	static readonly getGoodPracticesSize = () => data.length

	static readonly getGoodPracticesWithFilterSize = (filter: Filters, value: string): number => data.filter(practice => practice[filter] == value.toUpperCase()).length

}