import React from 'react'
import Sidebar from './SideBar'
import Map from './Map'
import Header from './Header'
import Footer from './Footer'
import PlacesModel, { CartPoint, Coordinates, FiltersValues, List } from '../models/Places'
import Modal from './Cart'


interface PropsMain {

}

interface StateMain {
	sidebarIsOpen: boolean
	cartIsOpen: boolean
	items: List[]
	searchTerm: string | undefined | Coordinates
	filtersValues: FiltersValues[] | null
	points: CartPoint[]
	cities: string[]
}

export default class Main extends React.Component<PropsMain, StateMain>{
	private map: L.Map | null = null
	constructor(props: PropsMain) {
		super(props)
		this.state = {
			sidebarIsOpen: true,
			cartIsOpen: false,
			items: [],
			searchTerm: '',
			filtersValues: null,
			points: [],
			cities: [],
		}
	}

	componentDidMount = () => {
		const items = PlacesModel.getList()
		const points = PlacesModel.getPlacesWithAllCities()
		this.setState({ items: items, points: points })
	}

	componentDidUpdate = () => {
		const items = PlacesModel.getList(this.state.filtersValues, this.state.searchTerm)
		if (JSON.stringify(items) != JSON.stringify(this.state.items)) {
			this.setState({
				items: items, points: items.map(value => {
					return {
						cityName: value.ville,
						totalItems: 0,
						coordinates: value.coordinates
					}
				})
			})
			if (items.length == 1 && items[0] && items[0].ville != 'National') this.map?.flyTo([items[0].coordinates.latitude, items[0].coordinates.longitude], 12)
			else this.map?.flyTo([46.603354, 1.8883335], 6)
		}
	}

	render = () => {
		return <>
			<Header
				updater={status => this.setState({ sidebarIsOpen: status })}
				updater2={status => this.setState({ cartIsOpen: status })}
				updater3={filtersValues => this.setState({ filtersValues: filtersValues })}
				sidebarIsOpen={this.state.sidebarIsOpen}
			/>
			<main>
				<Modal
					isOpen={this.state.cartIsOpen}
					updater={status => this.setState({ cartIsOpen: status })}
				/>
				<Sidebar
					isOpen={this.state.sidebarIsOpen}
					updater={status => this.setState({ sidebarIsOpen: status })}
					items={this.state.items}
					updater2={term => this.setState({ searchTerm: term })}
				/>
				<Map updater={(latitude: number, longitude: number) => this.setState({
					searchTerm: {
						latitude: latitude,
						longitude: longitude
					}
				})}
					mapRef={map => this.map = map}
					points={this.state.points}
				/>
			</main>
			<Footer />
		</>
	}
}
