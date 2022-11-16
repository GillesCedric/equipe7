import React from 'react'
import { GoodPractices as GoodPracticesType } from '../models/GoodPractices'
import Accordion from './Accordion'

interface PropsGoodPractices {
  goodPractices: GoodPracticesType[]
  recommendations: string[]
}

interface StateGoodPractices {
  goodPractices: GoodPracticesType[]
}

export default class GoodPractices extends React.Component<PropsGoodPractices, StateGoodPractices> {
  constructor(props: PropsGoodPractices) {
    super(props)
    this.state = {
      goodPractices: []
    }
  }

  render: () => React.ReactNode = () => {
    return <div className='bg-gray-100 w-full pb-12'>
      <Accordion goodPractices={this.props.goodPractices} recommendations={this.props.recommendations} />
    </div>

  }
}