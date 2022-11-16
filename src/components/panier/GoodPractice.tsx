import Link from 'next/link'
import React from 'react'
import CartModel from '../../models/Cart'
import { GoodPractices as GoodPracticesType } from '../../models/GoodPractices'

interface PropsGoodPractices {
  goodPractices: GoodPracticesType[]
  updater: (id: string) => void
}

export default class GoodPractice extends React.Component<PropsGoodPractices> {
  constructor(props: PropsGoodPractices) {
    super(props)
  }

  private readonly removeToCart = (id: string) => {
    this.props.updater(id)
  }

  render: () => React.ReactNode = () => {
    return <div className="py-12 min-h-screen gap-6 flex-wrap flex justify-center font-semibold">
      {
        this.props.goodPractices.map((practice, index) =>
          <div key={index} className="w-96 h-96 p-2 bg-white rounded-xl transform transition-all hover:-translate-y-2 duration-300 shadow-lg hover:shadow-2xl pb-5">
            <Link href={`${practice.Id}`}>
              <div className='cursor-pointer'>
                <div className="m-2 h-auto flex-wrap flex gap-2">
                  <span className="text-white bg-gray-500 px-3 py-1 rounded-md">{practice.Family}</span>
                  <span className={`text-white ${practice.Type == 'CONSEIL' ? 'bg-green-700' : 'bg-blue-600'} px-3 py-1 rounded-md`}>{practice.Type == 'RECO' ? 'RECOMMENDATION' : practice.Type}</span>
                  {practice.Incontournable == 'INCONTOURNABLE' && <span className="text-white bg-red-600 px-3 py-1 rounded-md">{practice.Incontournable}</span>}
                </div>
                <div className={`p-2 h-52`}>
                  <h2 className="font-bold text-lg mb-2 ">{practice.Id}</h2>
                  <p className="text-xl text-gray-600">{practice.Criteria}</p>
                </div>
              </div>
            </Link>
            <div className="m-2 float-right relative">
              <button name={`addToCart-${index}`} type='button' role='button' className="inline-block px-3 py-1 bg-blue-600 text-white font-semibold text-sm leading-tight uppercase rounded-sm shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out" onClick={event => this.removeToCart(practice.Id)}>
                Retirer du panier
                <svg xmlns="http://www.w3.org/2000/svg" className="inline-block mx-2" width={24} height={24} viewBox="0 0 448 512" fill="white"><path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" /></svg>
              </button>
            </div>
          </div>
        )
      }
    </div>
  }
}