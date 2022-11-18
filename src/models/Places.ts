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
	formation = 'Formation',
	modalite = 'ModaliteAccess',
	ville = 'Localisation',
	validation = 'ValidationAcquis'
}

export type FiltersValues = {
	filter: Filters
	value: string
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
	coordinates: Coordinates
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

	public static readonly getList = (FiltersValues?: FiltersValues[] | null, term?: string | Coordinates) => {
		let filteredData = data2
		if(FiltersValues && FiltersValues != null){
			FiltersValues.map(filtervalue => {
				if(filtervalue.value != '---'){
					filteredData = filteredData.filter(data => data.place[filtervalue.filter] == filtervalue.value )
				}
			})
		}
		const list: List[] = []
		if(typeof term == 'string' && term != ''){
			filteredData.filter(value => 
				(value.place.IntituleFormation.toLowerCase().includes(term.toLowerCase()) || value.place.LibelleEtablissement.toLowerCase().includes(term.toLowerCase()) || value.place.Localisation.toLowerCase().includes(term.toLowerCase()) || value.place.NomOrganisme.toLowerCase().includes(term.toLowerCase())) 
			).map(value => {
				list.push({
					id: value.id,
					formation: value.place.IntituleFormation,
					etablissement: value.place.LibelleEtablissement != '' ? value.place.LibelleEtablissement : value.place.NomOrganisme,
					ville: value.place.Localisation,
					coordinates: value.place.Localisation == 'National' ? {latitude: 46.603354, longitude: 1.8883335} : value.coordinates
				})
			})
		}else if(typeof term == 'object'){
			filteredData.filter(value => (value.coordinates.latitude == term.latitude && value.coordinates.longitude == term.longitude)
			).map(value => {
				list.push({
					id: value.id,
					formation: value.place.IntituleFormation,
					etablissement: value.place.LibelleEtablissement != '' ? value.place.LibelleEtablissement : value.place.NomOrganisme,
					ville: value.place.Localisation,
					coordinates: value.coordinates
				})
			})
		}else{
			filteredData.map(value => {
				list.push({
					id: value.id,
					formation: value.place.IntituleFormation,
					etablissement: value.place.LibelleEtablissement != '' ? value.place.LibelleEtablissement : value.place.NomOrganisme,
					ville: value.place.Localisation,
					coordinates: value.coordinates
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
					place.coordinates.latitude = value.place.Localisation == 'National' ? 46.603354 : value.coordinates.latitude
					place.coordinates.longitude = value.place.Localisation == 'National' ? 1.8883335 : value.coordinates.longitude
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

	public static readonly getFilterItems = (filter: Filters) => {
		//@ts-ignore
		const values = [...new Set(data2.map(value => {
			if(value.place[filter] != '') return value.place[filter][0].toUpperCase()+value.place[filter].slice(1)
		}))]
		return values
	}

}