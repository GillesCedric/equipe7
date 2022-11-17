import React from 'react'
import { PlaceCoord } from '../models/Places'


interface PropsCartItem {
  item: PlaceCoord
  updater: (id: number) => void
}

interface StateCartItem {

}

export default class CartItem extends React.Component<PropsCartItem, StateCartItem>{
  constructor(props: PropsCartItem) {
    super(props)
  }

  private readonly removeToCart = (id: number) => {
    //CartModel.remove(id)
    this.props.updater(id)
  }

  render = () => {
    return <li>
      <div className="flex items-center p-3 text-base font-bold text-gray-900 bg-gray-50 rounded-lg hover:bg-gray-100 group hover:shadow">
        <div className='w-96'>  <p className=" text-blue-500">{this.props.item.place.IntituleFormation}</p>
          <p className=" text-sm">Type : {this.props.item.place.Formation}</p>
          <p className=" text-sm">Par : {this.props.item.place.LibelleEtablissement != '' ? this.props.item.place.LibelleEtablissement : this.props.item.place.NomOrganisme}</p>
          <p className=" text-sm">Ville : {this.props.item.place.Localisation}</p>
          <p className=" text-sm">Durée : {this.props.item.place.Duree} j</p>
          <p className=" text-sm">Modalité d'accès : {this.props.item.place.ModaliteAccess}</p>
          <p className=" text-sm">URL du site : <span className=" text-blue-500">{this.props.item.place.Url}</span></p>
        </div>
        <span className="inline-flex items-center justify-center px-2 py-0.5 text-xs font-medium text-gray-500 rounded ml-10">
          <button type="button" onClick={event => this.removeToCart(this.props.item.id)} > <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="red" className="hover:fill-red-600" viewBox="0 0 448 512"><path d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3zM32 128H416V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z" />
          </svg>
          </button>
        </span>
      </div>
    </li>
  }
}