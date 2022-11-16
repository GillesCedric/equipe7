import React from 'react'
import ReactPaginate from 'react-paginate'
import CartModel from '../../models/Cart'
import { GoodPractices as GoodPracticesType } from '../../models/GoodPractices'
import GoodPractice from './GoodPractice'

interface PropsGoodPractices {
  itemsPerPage: number
}

interface StateGoodPractices {
  currentItems: GoodPracticesType[]
  totalItems: number
  pageCount: number
  itemOffset: number
}

export default class GoodPractices extends React.Component<PropsGoodPractices, StateGoodPractices> {
  constructor(props: PropsGoodPractices) {
    super(props)
    this.state = {
      currentItems: [],
      totalItems: 0,
      pageCount: 0,
      itemOffset: 0
    }
  }

  componentDidUpdate = () => {
    const endOffset = this.state.itemOffset + this.props.itemsPerPage,
      currentItems = CartModel.getGoodPractices(this.state.itemOffset, endOffset),
      pageCount = Math.ceil(this.state.totalItems / this.props.itemsPerPage)
    if (JSON.stringify(this.state.currentItems) != JSON.stringify(currentItems)) this.setState({ currentItems: currentItems })
    if (this.state.pageCount != pageCount) this.setState({ pageCount: pageCount })
  }

  componentDidMount = () => {
    const currentItems = CartModel.getGoodPractices()
    const totalItems = CartModel.getGoodPracticesSize()
    this.setState({ currentItems: currentItems, totalItems: totalItems })
    this.setState({ pageCount: Math.ceil(totalItems / this.props.itemsPerPage) })
  }

  private readonly handlePageClick = (event: { selected: number }) => {
    const newOffset = (event.selected * this.props.itemsPerPage) % this.state.totalItems
    this.setState({ itemOffset: newOffset })
    window.scrollTo({ top: 0, behavior: 'smooth' })

  }

  private readonly update = (id: string) => {
    CartModel.remove(id)
    this.forceUpdate()
  }

  render: () => React.ReactNode = () => {
    return <div className='bg-gray-100 w-full pt-28'>
      <div className='flex justify-end mr-8 mt-5'>
      <button name='report' type='button' role='button' className="px-6 py-3 bg-blue-600 text-white font-semibold text-base leading-tight uppercase rounded-sm shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out" >Générer un rapport</button>
      </div>
      <GoodPractice goodPractices={this.state.currentItems} updater={id => this.update(id)} />
      <div className='flex justify-end mr-8 my-5'>
      <button name='report' type='button' role='button' className="px-6 py-3 bg-blue-600 text-white font-semibold text-base leading-tight uppercase rounded-sm shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out" >Générer un rapport</button>
      </div>
      <ReactPaginate
        breakLabel="..."
        nextLabel="»"
        onPageChange={this.handlePageClick}
        pageRangeDisplayed={5}
        pageCount={this.state.pageCount}
        previousLabel="«"
        renderOnZeroPageCount={undefined}
        containerClassName='flex justify-end rounded-md shadow-sm'
        pageClassName='py-2 px-4 mx-px  mb-12 sm:mt-5 text-sm font-medium text-gray-900 bg-white rounded-md border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 hidden sm:block'
        previousClassName='px-5 py-2 mx-8 mb-12 sm:mt-5 sm:py-1 sm:px-4 sm:mx-px text-lg font-medium text-gray-900 bg-white rounded-md border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700'
        nextClassName='px-5 py-2 mx-8 mb-12 sm:mt-5 sm:py-1 sm:px-4 sm:mx-px sm:mr-28 text-lg font-medium text-gray-900 bg-white rounded-md border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700'
        breakClassName='py-1 px-4 mx-px mb-12 sm:mt-5 text-lg font-medium text-gray-900 bg-white rounded-md border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 hidden sm:block'
        activeClassName='bg-blue-700 text-gray-100'
      />
    </div>

  }
}