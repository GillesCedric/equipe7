import React from 'react'
import { GoodPractices as GoodPracticesType } from '../models/GoodPractices'
import GoodPractice from './GoodPractice'

interface PropsGoodAccordion {
  recommendations: string[]
  goodPractices: GoodPracticesType[]
}

type Item = {
  index: number,
  isOpen: boolean
}

interface StateGoodAccordion {
  current: Item[]
  recommendations: string[]
}

export default class Accordion extends React.Component<PropsGoodAccordion, StateGoodAccordion> {
  constructor(props: PropsGoodAccordion) {
    super(props)
    this.state = {
      recommendations: [],
      current: this.props.recommendations.map((value, index) => {
        return { index: index, isOpen: false }
      })
    }
  }

  private readonly update = (id: number) => {
    const current = this.state.current
    current[id].isOpen = !current[id].isOpen
    this.setState({ current: current })
  }

  render = () => {
    return <div className='pt-40'>
      {
        this.props.recommendations.map((recommendation, index) => {
          const childrens = this.props.goodPractices.filter(practice => practice.Recommendation == recommendation)
          return <AccordionItem
            key={index}
            title={recommendation}
            childrens={childrens}
            current={this.state.current[index]}
            id={index}
            updater={(id) => this.update(id)}
          />
        })
      }
    </div>
  }

}

interface PropsGoodAccordionItem {
  title: string
  childrens: GoodPracticesType[]
  current: { index: number, isOpen: boolean }
  id: number
  updater: (id: number) => void
}

class AccordionItem extends React.Component<PropsGoodAccordionItem> {
  constructor(props: PropsGoodAccordionItem) {
    super(props)
  }

  render = () => {
    return <>
      <div onClick={() => this.props.updater(this.props.id)} className={`flex group cursor-pointer w-11/12 mx-auto h-40 sm:h-32 justify-between items-center p-2 mb-2 bg-blue-900 hover:bg-gray-800 hover:shadow-lg text-white text-xl ${this.props.id == 0 ? 'rounded-t-md' : ''}`}>
        <div className="flex group cursor-pointer">
          <div className="text-white-600 font-semibold pl-10 group-hover:text-white">
            {this.props.id + 1 + '. ' + this.props.title}
          </div>
        </div>
        <div className="flex items-center justify-center pr-10 w-2">
          {this.props.current.index == this.props.id && this.props.current.isOpen ?
            <div className='ml-4'>{'>'}</div>
            :
            <div className='ml-4'>
              &#8964;
            </div>
          }
        </div>
      </div>
      {this.props.current.index === this.props.id && this.props.current.isOpen && (
        <div className="flex justify-center mx-auto bg-blue-900 mb-2 -mt-2 w-11/12 h-auto">
          <GoodPractice goodPractices={this.props.childrens} family={false} incontournable />
        </div>
      )}
    </>
  }
}