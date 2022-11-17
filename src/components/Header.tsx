import Link from 'next/link'
import React from 'react'

interface PropsHeader {
	updater: (status: boolean) => void
	updater2: (status: boolean) => void
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
					<Link href='/'>
						<div className='flex cursor-pointer'>
							<div className="text-center">
								<button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" type="button" data-drawer-target="drawer-example" data-drawer-show="drawer-example" aria-controls="drawer-example" onClick={() => this.props.updater(true)}>
									Afficher la liste
								</button>
							</div>
						</div>
					</Link>
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
			<div className={`px-3 pt-2 pb-4 ${this.state.isOpen ? 'block' : 'hidden'} xl:flex`}>

				<button type='button' onClick={event => this.props.updater2(true)}>
					<div className='block text-white text-sm font-semibold rounded px-2 py-1 mt-1 hover:bg-gray-700 xl:mt-0 xl:ml-2 cursor-pointer'>
						<span className='pr-1 text-sm '>PANIER</span>
						<svg xmlns="http://www.w3.org/2000/svg" className="inline-block" width={24} height={24} viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
							<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
							<circle cx={6} cy={19} r={2}></circle>
							<circle cx={17} cy={19} r={2}></circle>
							<path d="M17 17h-11v-14h-2"></path>
							<path d="M6 5l14 1l-1 7h-13"></path>
						</svg>
					</div>
				</button>
			</div>

		</header>
	}

}