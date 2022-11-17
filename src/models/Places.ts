import data from '../data/csv.json'
import data2 from '../data/data.json'

export type Place = {
	Formation: string,
	Structure: string,
	LibelleEtablissement: string,
	LibelleDepartement: string,
	CycleFormation: string
	Objectif: string,
	Contenu: string,
	TypeOrganisme: string,
	NomOrganisme: string,
	IntituleFormation: string,
	Localisation: string,
	ValidationAcquis: string,
	Duree: string | number,
	ModaliteAccess: string,
	Url: string
}

export enum Filters {
	family = 'Family',
	incontournable = 'Incontournable',
	type = 'Type'
}

export type Coordinates = {
	longitude: number
	latitude: number
}

export type PlaceCoord = {
	id: number
	place: Place
	coordinates: Coordinates
}

export type CartPoint = {
	cityName: string
	totalItems: number
	coordinates: Coordinates
}

export type List = {
	id: number
	formation: string
	etablissement: string
	ville: string
}

export default abstract class PlacesModel {

	public static readonly getCoordinatesOfCities = () => {
		const places: PlaceCoord[] = []
		let i = 0
		data.map(value => {
			let place: string = ''
			if (value.Localisation != 'National') {
				place = value.Localisation
			} else {
				place = 'France'
			}
			fetch('https://api.mapbox.com/geocoding/v5/mapbox.places/' + place + '.json?access_token=pk.eyJ1IjoiZ2lsbGVzY2VkcmljIiwiYSI6ImNrejhvYnpzMTFrdGwyb3J4d3BqYTl4NmQifQ.rGtqc2TbSbUh54VCRcIWeQ&country=FR')
				.then(result => result.json()
					.then(result => {
						if (result.features[0]) {
							places.push(
								{
									id: i,
									place: value,
									coordinates: {
										longitude: result.features[0].center[0],
										latitude: result.features[0].center[1],
									}
								}
							)
							i++
						}
					})
					.catch(error => {
						console.log(error)
					}))
				.catch(error => {
					console.log(error)
				})

		})
		console.log(places)
		return places
	}

	public static readonly getList = (term?: string | Coordinates) => {
		const list: List[] = []
		if(typeof term == 'string' && term != ''){
			data2.filter(value => 
				(value.place.IntituleFormation.toLowerCase().includes(term.toLowerCase()) || value.place.LibelleEtablissement.toLowerCase().includes(term.toLowerCase()) || value.place.Localisation.toLowerCase().includes(term.toLowerCase()) || value.place.NomOrganisme.toLowerCase().includes(term.toLowerCase())) 
			).map(value => {
				list.push({
					id: value.id,
					formation: value.place.IntituleFormation,
					etablissement: value.place.LibelleEtablissement != '' ? value.place.LibelleEtablissement : value.place.NomOrganisme,
					ville: value.place.Localisation
				})
			})
		}else if(typeof term == 'object'){
			data2.filter(value => (value.coordinates.latitude == term.latitude && value.coordinates.longitude == term.longitude)
			).map(value => {
				list.push({
					id: value.id,
					formation: value.place.IntituleFormation,
					etablissement: value.place.LibelleEtablissement != '' ? value.place.LibelleEtablissement : value.place.NomOrganisme,
					ville: value.place.Localisation
				})
			})
		}else{
			data2.map(value => {
				list.push({
					id: value.id,
					formation: value.place.IntituleFormation,
					etablissement: value.place.LibelleEtablissement != '' ? value.place.LibelleEtablissement : value.place.NomOrganisme,
					ville: value.place.Localisation
				})
			})
		}
		return list
	}

	public static readonly getCities = () => {
		return data2.map(value => value.place.Localisation)
	}

	public static readonly getPlacesWithAllCities = () => {
		const cities = this.getCities()
		let places: CartPoint[] = []
		cities.map(city => {
			const place: CartPoint = {
				cityName: city,
				totalItems: 0,
				coordinates: {
					longitude: 0,
					latitude: 0
				}
			}
			data2.map(value => {
				if (city == value.place.Localisation) {
					place.totalItems = place.totalItems + 1
					place.coordinates.latitude = value.coordinates.latitude
					place.coordinates.longitude = value.coordinates.longitude
				}
			})
			places.push(place)
		})
		places = places.filter((value, index, self) =>
			index === self.findIndex((t) => (
				t.cityName === value.cityName && t.totalItems === value.totalItems
			))
		)
		//console.log(places)
		return places
	}

}