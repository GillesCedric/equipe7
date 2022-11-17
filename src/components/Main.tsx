import React from 'react'
import Sidebar from './SideBar'
import Map from './Map'
import Header from './Header'
import Footer from './Footer'
import PlacesModel, { Coordinates, List } from '../models/Places'
import Modal from './Modal'


interface PropsMain {

}

interface StateMain {
	sidebarIsOpen: boolean
	cartIsOpen: boolean
	items: List[]
	searchTerm: string | undefined | Coordinates
}

export default class Main extends React.Component<PropsMain, StateMain>{
	constructor(props: PropsMain) {
		super(props)
		this.state = {
			sidebarIsOpen: true,
			cartIsOpen: false,
			items: [],
			searchTerm: ''
		}
	}

	componentDidMount = () => {
		const items = PlacesModel.getList()
		this.setState({ items: items })
	}

	componentDidUpdate = () => {
		const items = PlacesModel.getList(this.state.searchTerm)
		console.log(this.state.searchTerm)
		if (JSON.stringify(items) != JSON.stringify(this.state.items)) this.setState({ items: items })
	}

	render = () => {
		return <>
			<Header
				updater={status => this.setState({ sidebarIsOpen: status })}
				updater2={status => this.setState({ cartIsOpen: status })}
			/>
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
			})} />
			<Footer />
		</>
	}
}
