import React from 'react'
import PlacesModel, { PlaceCoord, Filters as FiltersType, FiltersValues } from '../models/Places'


interface PropsFilters {
  //item: PlaceCoord
  updater: (filtersValues: FiltersValues[]) => void
}

interface StateFilters {

}

export default class Filters extends React.Component<PropsFilters, StateFilters>{
  private readonly formations = PlacesModel.getFilterItems(FiltersType.formation)
  private readonly modalites = PlacesModel.getFilterItems(FiltersType.modalite)
  private readonly validations = PlacesModel.getFilterItems(FiltersType.validation)
  private readonly villes = PlacesModel.getFilterItems(FiltersType.ville)

  private readonly filtersValues: FiltersValues[] = [
    {
      filter: FiltersType.formation,
      value: '---'
    },
    {
      filter: FiltersType.modalite,
      value: '---'
    },
    {
      filter: FiltersType.ville,
      value: '---'
    },
  ]

  constructor(props: PropsFilters) {
    super(props)
  }

  private readonly update = (idFilter: number, value: string) => {
    this.filtersValues[idFilter].value = value
    this.props.updater(this.filtersValues)
  }

  render = () => {
    return <>
      <FilterItem title={FiltersType.formation} values={this.formations} updater={value => this.update(0, value)} />
      <FilterItem title={FiltersType.modalite} values={this.modalites} updater={value => this.update(1, value)} />
      <FilterItem title={FiltersType.ville} values={this.villes} updater={value => this.update(2, value)} />
    </>
  }
}

interface PropsFilterItem {
  title: FiltersType
  values: string[]
  updater: (term: string) => void
}

class FilterItem extends React.Component<PropsFilterItem>{
  constructor(props: PropsFilterItem) {
    super(props)
  }

  render = () => {
    return <>
      <div className={`pt-2 pb-4 xl:ml-14`}>
        <label htmlFor={this.props.title} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{this.props.title}</label>
        <select id={this.props.title} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={event => this.props.updater(event.currentTarget.value)}>
          <option>---</option>
          {
            this.props.values.map((value, index) => {
              return <option key={index}>{value}</option>
            })
          }
        </select>
      </div>
    </>
  }
}