import { NextComponentType } from 'next'
import React from 'react'
import Filter from './Filter'
import { List } from '../models/Places'
import CartModel from '../models/Cart'


interface PropsComponentItem {
  item: List
}

interface StateComponentItem {

}
export default class ComponentItem extends React.Component<PropsComponentItem, StateComponentItem>{
  constructor(props: PropsComponentItem) {
    super(props)

  }

  private readonly addToCart = (id: number) => {
    CartModel.add({ id: id })
  }

  render = () => {
    return <li className='pb-4 mb-4 space-y-2 border-b border-gray-700 text-gray-100'>
      <span className="w-max font-semibold">{this.props.item.formation}</span>
      <p className="w-max text-sm mt-2 ">Par : <span className=""> {this.props.item.etablissement} </span></p>
      <p className="w-max text-sm mt-2">Ville : {this.props.item.ville}</p>
      <button aria-label='addtocart' onClick={event => this.addToCart(this.props.item.id)} type='button' className="flex border border-gray-700 items-center p-2 text-sm font-normal rounded-lg transition duration-75 text-white group mt-3 bg-blue-600 hover:bg-blue-700">
        <svg aria-hidden="true" className="flex-shrink-0 w-6 h-6 transition duration-75 text-white" fill="currentColor" viewBox="0 0 576 512" xmlns="http://www.w3.org/2000/svg"><path d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96zM252 160c0 11 9 20 20 20h44v44c0 11 9 20 20 20s20-9 20-20V180h44c11 0 20-9 20-20s-9-20-20-20H356V96c0-11-9-20-20-20s-20 9-20 20v44H272c-11 0-20 9-20 20z" clipRule="evenodd"></path></svg>
        <span className="ml-3 text-base">Ajouter au panier</span>
      </button>
    </li>
  }
}