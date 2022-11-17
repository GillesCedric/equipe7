import React from "react";

interface PropsModal {
  isOpen: boolean
  updater: (status: boolean) => void
}

export default class Modal extends React.Component<PropsModal>{
  constructor(props: PropsModal) {
    super(props)
  }

  render = () => {
    return (
      <>
        {this.props.isOpen && (
          <>
            <div
              className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
            >
              <div className="relative w-auto my-6 mx-auto max-w-3xl">
                {/*content*/}
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-auto bg-white outline-none focus:outline-none">
                  {/*header*/}
                  <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">


                    <h3 className="text-2xl font-semibold">
                      Votre Panier
                    </h3>
                    <input type="email" name="mail" id="" placeholder="Adresse mail pour devis" className="placeholder:italic placeholder:text-slate-400 block bg-white w-30 border border-slate-300 rounded-md py-2 ml-4 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm" />
                    <button
                      className="bg-blue-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-5 py-3  h-10 rounded shadow hover:shadow-lg outline-none focus:outline-none ml-1  mb-1 ease-linear transition-all duration-150 flex"
                      type="button"
                    //onClick={() => setShowModal(false)}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width={14} height={17} fill="white" viewBox="0 0 384 512"><path d="M498.1 5.6c10.1 7 15.4 19.1 13.5 31.2l-64 416c-1.5 9.7-7.4 18.2-16 23s-18.9 5.4-28 1.6L284 427.7l-68.5 74.1c-8.9 9.7-22.9 12.9-35.2 8.1S160 493.2 160 480V396.4c0-4 1.5-7.8 4.2-10.7L331.8 202.8c5.8-6.3 5.6-16-.4-22s-15.7-6.4-22-.7L106 360.8 17.7 316.6C7.1 311.3 .3 300.7 0 288.9s5.9-22.8 16.1-28.7l448-256c10.7-6.1 23.9-5.5 34 1.4z" />
                      </svg>
                      <span className="pl-2">Demander devis</span>

                    </button>
                  </div>
                  {/*body*/}
                  <div className="relative p-6 flex-auto overflow-y-auto h-64">
                    <ul className="my-4 space-y-3 ">
                      <li>
                        <a href="#" className="flex items-center p-3 text-base font-bold text-gray-900 bg-gray-50 rounded-lg hover:bg-gray-100 group hover:shadow">
                          <div>  <p className=" text-blue-500  w-96"> Intitulé de la formation </p> <br />
                            <p className=" text-sm"> Cycle de formation </p> <br />
                            <p className=" text-sm"> Formation : </p> <br />
                            <p className=" text-sm"> Par : <span className=" text-blue-500"> Etablissement </span>
                            </p>
                          </div>
                          <span className="inline-flex items-center justify-center px-2 py-0.5 ml-3 text-xs font-medium text-gray-500  rounded">
                            <button type="button" > <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} className="hover:fill-red-500" viewBox="0 0 448 512"><path d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3zM32 128H416V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z" />
                            </svg>
                            </button>
                          </span>
                        </a>
                      </li>

                    </ul>
                  </div>
                  {/*footer*/}
                  <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                    <button
                      className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => this.props.updater(false)}
                    >
                      Fermer
                    </button>

                    <button
                      className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-5 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 flex"
                      type="button"
                    //onClick={() => setShowModal(false)}
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
        )}
      </>
    )
  }
}