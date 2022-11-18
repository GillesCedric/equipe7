import React from 'react'
import { FiltersValues } from '../models/Places'
import Filters from './Filters'

interface PropsHeader {
	updater: (status: boolean) => void
	updater2: (status: boolean) => void
	updater3: (filtersValues: FiltersValues[]) => void
	sidebarIsOpen: boolean
}

export default class Header extends React.Component<PropsHeader, { isOpen: boolean }> {

	constructor(props: PropsHeader) {
		super(props)
		this.state = {
			isOpen: false
		}
	}

	render: () => React.ReactNode = () => {
		return <header className='z-10 mb-50 w-full bg-gray-800 xl:flex xl:justify-between xl:items-center xl:px-4 xl:py-3'>
			<div className="flex items-center justify-between px-4 py-3 xl:p-0">
				<div className='text-white'>
					{
						!this.props.sidebarIsOpen ? <div className='flex cursor-pointer'>
							<div className="text-center">
								<button aria-label='open-list' className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" type="button" data-drawer-target="drawer-example" data-drawer-show="drawer-example" aria-controls="drawer-example" onClick={() => this.props.updater(true)}>
									Afficher la liste
								</button>
							</div>
						</div> : <div className='flex cursor-pointer'>
							<div className="text-center text-base ml-16">
								DESIGN 4 GREEN
							</div>
						</div>
					}
				</div>
				<div className='xl:hidden'>
					<button aria-label='menu' type="button" onClick={() => this.setState({ isOpen: !this.state.isOpen })} className='block text-gray-500 hover:text-white focus:outline-none'>
						<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 fill-current" width={24} height={24} viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
							<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
							{
								!this.state.isOpen && <>
									<line x1={4} y1={6} x2={20} y2={6}></line>
									<line x1={4} y1={12} x2={20} y2={12}></line>
									<line x1={4} y1={18} x2={20} y2={18}></line>
								</>
							}
							{
								this.state.isOpen && <>
									<line x1={18} y1={6} x2={6} y2={18}></line>
									<line x1={6} y1={6} x2={18} y2={18}></line>
								</>
							}
						</svg>
					</button>
				</div>
			</div >
			<Filters updater={filtersValues => this.props.updater3(filtersValues)} />
			<div className={`px-3 pt-2 pb-4 ${this.state.isOpen ? 'block' : 'hidden'} xl:flex`}>
				<button aria-label='panier' type='button' onClick={event => this.props.updater2(true)}>
					<div className='block text-white text-sm font-semibold rounded px-2 py-1 mt-1 hover:bg-gray-700 xl:mt-0 xl:ml-2 cursor-pointer'>
						<span className='pr-1 text-base '>PANIER</span>
						<svg xmlns="http://www.w3.org/2000/svg" className="inline-block" width={24} height={24} viewBox="0 0 576 512" strokeWidth="2" fill="white" strokeLinecap="round" strokeLinejoin="round">
							<path d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z" />
						</svg>
					</div>
				</button>
			</div>

		</header>
	}

}