import React from 'react'

export default class Filter extends React.Component<{ updater: (term: string | undefined) => void }> {
  private input: HTMLInputElement | null = null

  constructor(props: { updater: (term: string | undefined) => void }) {
    super(props)
  }

  render = () => {
    return <div className="flex items-center pt-10">
      <label htmlFor='simple-search' className="sr-only">Recherche</label>
      <div className="relative w-full">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <svg aria-hidden="true" className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
        </div>
        <input ref={input => this.input = input} type="text" id="simple-search" className="border text-sm rounded-lg block w-full pl-10 p-2.5  bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500" placeholder="Recherche" required />
      </div>
      <button onClick={event => this.props.updater(this.input?.value)} type="button" className="p-2.5 ml-2 text-sm font-medium text-white rounded-lg border border-blue-700 focus:ring-4 focus:outline-none bg-blue-600 hover:bg-blue-700 focus:ring-blue-800">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
        <span className="sr-only">Recherche</span>
      </button>
    </div>


  }
}