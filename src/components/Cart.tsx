import React from "react";
import CartModel from "../models/Cart";
import { PlaceCoord } from "../models/Places";
import CartItem from "./CartItem";
import JsPDF from "jspdf";
import autoTable from 'jspdf-autotable';

interface PropsModal {
  isOpen: boolean
  updater: (status: boolean) => void
}

interface StateModal {
  items: PlaceCoord[]
}

export default class Modal extends React.Component<PropsModal, StateModal>{
  constructor(props: PropsModal) {
    super(props)
    this.state = {
      items: []
    }
  }

  componentDidMount = () => {
    const items = CartModel.getItems()
    this.setState({ items: items })
  }

  componentDidUpdate = () => {
    const items = CartModel.getItems()
    if (JSON.stringify(items) != JSON.stringify(this.state.items)) this.setState({ items: items })
  }

  private readonly update = (id: number) => {
    CartModel.remove(id)
    this.forceUpdate()
  }

  private readonly generatePDF = () => {
    const report = new JsPDF('portrait', 'pt', 'a4');

    const values: string[][] = []

    this.state.items.map(value => {
      values.push([value.place.IntituleFormation, value.place.Formation, value.place.LibelleEtablissement != '' ? value.place.LibelleEtablissement : value.place.NomOrganisme, value.place.Localisation, value.place.Duree as string, value.place.ModaliteAccess])
    })

    autoTable(report, {
      head: [['Intitulé', 'Type', 'Etablissement', 'Ville', 'Durée (j)', 'Modalité']],
      body: values
    })

    report.text("Votre panier", 250, 25);
    report.save('report.pdf');

  }

  render = () => {
    return (
      <>
        {this.props.isOpen && <>
          <div
            className="md:justify-center md:items-center md:flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-auto bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-2xl font-semibold">
                    Votre Panier
                  </h3>
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => this.props.updater(false)}
                  >
                    Fermer
                  </button>
                </div>
                {/*body*/}
                <div className="relative md:p-6 md:flex-auto overflow-y-auto h-80">
                  <ul id="report" className="md:my-4 md:space-y-3 ">
                    {
                      this.state.items.length > 0 ?
                        this.state.items.map((item, index) => {
                          return <CartItem item={item} key={index} updater={id => this.update(id)} />
                        }) : <div className="flex justify-center mt-20 text-base">
                          Votre panier est vide
                        </div>
                    }
                  </ul></div>
                {/*footer*/}
                <div className="flex items-center md:items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">

                <a href="mailto:design4green@etik.com?subject=Demande de devis&body=Bonjour %0D%0A%0D%0AJe vous écris ce mail pour vous demander un devis en fonction de mon panier. %0D%0ACi-joint la version pdf de celui-ci. %0D%0A%0D%0ACordialement.">
                    <button
                      className="bg-blue-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-2  py-3 mr-4 md:mr-5  md:px-5 h-11 rounded shadow hover:shadow-lg outline-none focus:outline-none  mb-1 ease-linear transition-all duration-150 flex"
                      type="button"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width={14} height={17} fill="white" viewBox="0 0 384 512"><path d="M498.1 5.6c10.1 7 15.4 19.1 13.5 31.2l-64 416c-1.5 9.7-7.4 18.2-16 23s-18.9 5.4-28 1.6L284 427.7l-68.5 74.1c-8.9 9.7-22.9 12.9-35.2 8.1S160 493.2 160 480V396.4c0-4 1.5-7.8 4.2-10.7L331.8 202.8c5.8-6.3 5.6-16-.4-22s-15.7-6.4-22-.7L106 360.8 17.7 316.6C7.1 311.3 .3 300.7 0 288.9s5.9-22.8 16.1-28.7l448-256c10.7-6.1 23.9-5.5 34 1.4z" />
                      </svg>
                      <span className="pl-2">Demander devis</span>

                    </button>
                  </a>

                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-4 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 flex"
                    type="button"
                    onClick={() => this.generatePDF()}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width={14} height={17} fill="white" viewBox="0 0 384 512"><path d="M64 0C28.7 0 0 28.7 0 64V448c0 35.3 28.7 64 64 64H320c35.3 0 64-28.7 64-64V160H256c-17.7 0-32-14.3-32-32V0H64zM256 0V128H384L256 0zM216 232V334.1l31-31c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-72 72c-9.4 9.4-24.6 9.4-33.9 0l-72-72c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l31 31V232c0-13.3 10.7-24 24-24s24 10.7 24 24z" /> </svg>
                    <span className=" pl-3">Telecharger</span>

                  </button>

                </div>
              </div>
            </div>

          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
        }
      </>
    )
  }
}