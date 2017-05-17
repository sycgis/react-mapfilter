import React from 'react'
import {FormattedMessage, FormattedDate} from 'react-intl'
import roundTo from 'round-to'
import {fromLatLon} from 'utm'

import {parseDate} from '../../util/filter_helpers'
import {createMessage as msg} from '../../util/intl_helpers'
import {
  FIELD_TYPE_DATE,
  FIELD_TYPE_LOCATION,
  FIELD_TYPE_NUMBER,
  FORMATS_UTM,
  FORMATS_DEC_DEG,
  FORMATS_DEG_MIN_SEC
} from '../../constants'

const FormattedValue = ({value, type, coordFormat}) => {
  switch (type) {
    case FIELD_TYPE_DATE:
      return <FormattedDate
        value={parseDate(value)}
        year='numeric'
        month='long'
        day='2-digit' />
    case FIELD_TYPE_LOCATION:
      return <span>{formatLocation(value, coordFormat)}</span>
    case FIELD_TYPE_NUMBER:
      return <span>{(value || 0) + ''}</span>
    default:
      return <FormattedMessage {...msg('field_value')(value)} />
  }
}

export default FormattedValue

function formatLocation (coords, format) {
  if (!(Array.isArray(coords) && coords.length === 2)) return coords
  switch (format) {
    case FORMATS_DEC_DEG:
      return coords.map(coord => roundTo(coord, 5)).join(', ')
    case FORMATS_DEG_MIN_SEC:
      return coords.map(coord => roundTo(coord, 5)).join(', ')
    case FORMATS_UTM:
      const utm = fromLatLon(coords[1], coords[0])
      return `X ${roundTo(utm.easting, 1)}, Y ${roundTo(utm.northing, 1)} — UTM ${utm.zoneNum}${utm.zoneLetter}`
  }
}