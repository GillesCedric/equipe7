import Link from 'next/link'
import React from 'react'
import CartModel from '../models/Cart'
import { GoodPractices as GoodPracticesType } from '../models/GoodPractices'

interface PropsGoodPractices {
  goodPractices: GoodPracticesType[]
  family: boolean
  incontournable: boolean
}

export default class GoodPractice extends React.Component<PropsGoodPractices> {
  constructor(props: PropsGoodPractices) {
    super(props)
  }

  private readonly addToCart = (id: string) => {
    CartModel.add({ id })
  }

  render: () => React.ReactNode = () => {
    return <div className="py-12 min-h-screen gap-10 flex-wrap flex justify-center font-semibold">
      {
        this.props.goodPractices.map((practice, index) =>
          <div key={index} className="w-80 h-96 p-2 bg-white rounded-xl transform transition-all hover:-translate-y-2 duration-300 shadow-lg hover:shadow-2xl pb-5">
            <Link href={`${practice.Id}`}>
              <div className='cursor-pointer'>
                <div className="m-2 h-auto flex-wrap flex gap-2">
                  {this.props.family && <span className="text-white bg-gray-500 px-3 py-1 rounded-md">{practice.Family}</span>}
                  <span className={`text-white ${practice.Type == 'CONSEIL' ? 'bg-green-700' : 'bg-blue-600'} px-3 py-1 rounded-md`}>{practice.Type == 'RECO' ? 'RECOMMENDATION' : practice.Type}</span>
                  {this.props.incontournable && practice.Incontournable == 'INCONTOURNABLE' && <span className="text-white bg-red-600 px-3 py-1 rounded-md">{practice.Incontournable}</span>}
                </div>
                <div className={`p-2 ${practice.Incontournable == '' ? 'h-60' : 'h-48'}`}>
                  <h2 className="font-bold text-lg mb-2 ">{practice.Id}</h2>
                  <p className="text-xl text-gray-600">{practice.Criteria}</p>
                </div>
              </div>
            </Link>
            <div className="m-2 float-right relative">
              <button name={`addToCart-${index}`} type='button' role='button' className="inline-block px-3 py-1 bg-blue-600 text-white font-semibold text-sm leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out" onClick={event => this.addToCart(practice.Id)}>
                Ajouter au Panier
                <svg xmlns="http://www.w3.org/2000/svg" className="inline-block mx-2" width={24} height={24} viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                  <circle cx={6} cy={19} r={2}></circle>
                  <circle cx={17} cy={19} r={2}></circle>
                  <path d="M17 17h-11v-14h-2"></path>
                  <path d="M6 5l6.005 .429m7.138 6.573l-.143 .998h-13"></path>
                  <path d="M15 6h6m-3 -3v6"></path>
                </svg>
              </button>
            </div>
          </div>
        )
      }
    </div>
  }
}