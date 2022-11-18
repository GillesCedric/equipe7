import { NextComponentType } from 'next'
import React from 'react'
import Filter from './Filter'
import ComponentItem from './ComponentItem'
import { List } from '../models/Places'


interface PropsSideBar {
	items: List[]
	isOpen: boolean
	updater: (status: boolean) => void
	updater2: (term: string | undefined) => void
}

interface StateSideBar {
	//items: List[]
	//searchTerm: string | undefined
}
export default class SideBar extends React.Component<PropsSideBar, StateSideBar>{
	constructor(props: PropsSideBar) {
		super(props)
		this.state = {
			//items: [],
			//searchTerm: ''
		}

	}

	componentDidMount = () => {
		//console.log(this.props.items)
		//this.setState({items: this.props.items})
	}

	render = () => {
		return <aside className="z-50" aria-label="Sidebar">
			{
				this.props.isOpen && <>
					<div id="drawer-example" className="overflow-x-hidden absolute z-40 h-5/6 p-4 overflow-y-auto w-80 bg-gray-800" tabIndex={-1} aria-labelledby="drawer-label">
						<button aria-label='close-menu' onClick={() => this.props.updater(false)} type="button" data-drawer-dismiss="drawer-example" aria-controls="drawer-example" className="text-gray-400 bg-transparent rounded-lg text-sm p-1.5 absolute top-2.5 right-2.5 inline-flex items-center hover:bg-gray-600 hover:text-white" >
							<svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
							<span className="sr-only">Close menu</span>
						</button>
						<Filter updater={term => this.props.updater2(term)} />
						<div className="py-4 px-3 rounded bg-gray-800">
							<ul>
								{
									this.props.items.length > 0 ?
										this.props.items.map((item, index) => {
											return <ComponentItem item={item} key={index} />
										}) : <li className='text-center text-gray-100 text-lg font-semibold mt-32'>
											Aucun Résultat
										</li>
								}
							</ul>
						</div>
					</div>
				</>
			}
		</aside>
	}
}
