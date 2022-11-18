import React from 'react'
import { MapContainer, TileLayer, Marker, ZoomControl } from 'react-leaflet'
import L from 'leaflet'
import PlacesModel, { CartPoint, Filters, PlaceCoord } from '../models/Places'

interface PropsMap {
  updater: (latitude: number, longitude: number) => void
  mapRef: (map: L.Map | null) => void
  points: CartPoint[]
}

interface StateMap {
  position: number[]
}

export default class Map extends React.Component<PropsMap, StateMap> {
  private  map: L.Map | null = null
  constructor(props: PropsMap) {
    super(props)
    this.state = {
      position: [46.603354, 1.8883335]
    }

  }

  componentDidMount = () => {
    
  }

  render: () => React.ReactNode = () => {
    return <MapContainer
      center={[46.603354, 1.8883335]} zoom={6}
      scrollWheelZoom={true}
      style={{ height: '83.2vh' }}
      className='z-0'
      zoomControl={false}
      ref={map => this.props.mapRef(map)}
    >
      <ZoomControl position='topright' />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"

      />

      {
        this.props.points.map((point, index) => {
          return <Marker
            key={index}
            position={[point.coordinates.latitude, point.coordinates.longitude]}
            title={point.totalItems > 0 ? point.cityName + ': ' + point.totalItems as unknown as string : ''}
            eventHandlers={{
              click: (event) => {
                this.props.updater(event.latlng.lat, event.latlng.lng)
              },
            }}
            icon={new L.Icon({
              iconUrl: '/map-pin-solid.svg',
              iconSize: [25, 30], //width, height
              iconAnchor: [12.5, 30], //-1 * margin-left, -1 * margin-top
              popupAnchor: [0, -30],
              tooltipAnchor: [0, -30],
            })}
          >
          </Marker>
        })
      }
    </MapContainer>

  }
}