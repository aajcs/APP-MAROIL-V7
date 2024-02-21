/* eslint-disable prefer-const */
/* eslint-disable no-sequences */
/* eslint-disable no-tabs */
/* eslint-disable react/no-unknown-property */
/* eslint-disable no-unused-vars */
/* eslint-disable dot-notation */
/* eslint-disable react/prop-types */

import React, { memo, useContext, useEffect } from 'react'
import { BarcoContext } from '../contexts/BarcoContext'
import { ReporteCargaGOMContext } from '../contexts/ReporteCargaGOMContext'
import {
  ZoomableGroup,
  ComposableMap,
  Geographies,
  Geography,
  Annotation,
  Sphere,
  Graticule,
  Marker
} from 'react-simple-maps'
import { scaleLinear } from 'd3-scale'
import buqueMapa from '../assetsControl/buqueMapa.png'
import banderaMapa from '../assetsControl/BanderaMapa'
import featureJson from '../assetsControl/features.json'

const geoUrl = featureJson

const rounded = (num) => {
  if (num > 1000000000) {
    return Math.round(num / 100000000) / 10 + 'Bn'
  } else if (num > 1000000) {
    return Math.round(num / 100000) / 10 + 'M'
  } else {
    return Math.round(num / 100) / 10 + 'K'
  }
}
const countries = [
  {
    ISO3: 'USA',
    name: 'United States',
    region: 'US',
    population_density: '1234923'
  },
  {
    ISO3: 'CAN',
    name: 'Canadá',
    region: 'US',
    population_density: '3334923'
  },
  {
    ISO3: 'GRL',
    name: 'Groenlandia',
    region: 'US',
    population_density: '1234923'
  },
  {
    ISO3: 'ATA',
    name: 'Antártida',
    region: 'Antártida',
    population_density: '1234923'
  },
  {
    ISO3: 'ALB',
    name: 'Albania',
    region: 'EMEA',
    population_density: '1234923'
  },
  {
    ISO3: 'DZA',
    name: 'Algeria',
    region: 'EMEA',
    population_density: '2234923'
  },
  {
    ISO3: 'AND',
    name: 'Andorra',
    region: 'EMEA',
    population_density: '2234923'
  },
  {
    ISO3: 'AGO',
    name: 'Angola',
    region: 'EMEA',
    population_density: '5234923'
  },
  {
    ISO3: 'AUT',
    name: 'Austria',
    region: 'EMEA',
    population_density: '3234923'
  },
  {
    ISO3: 'BHR',
    name: 'Bahrain',
    region: 'EMEA',
    population_density: '3234923'
  },
  {
    ISO3: 'BLR',
    name: 'Belarus',
    region: 'EMEA',
    population_density: '1234923'
  },
  {
    ISO3: 'BEL',
    name: 'Belgium',
    region: 'EMEA',
    population_density: '2234923'
  },
  {
    ISO3: 'BEN',
    name: 'Benin',
    region: 'EMEA',
    population_density: '4234923'
  },
  {
    ISO3: 'BIH',
    name: 'Bosnia and Herzegovina',
    region: 'EMEA',
    population_density: '1234923'
  },
  {
    ISO3: 'BWA',
    name: 'Botswana',
    region: 'EMEA',
    population_density: '4234923'
  },
  {
    ISO3: 'BGR',
    name: 'Bulgaria',
    region: 'EMEA',
    population_density: '3234923'
  },
  {
    ISO3: 'BFA',
    name: 'Burkina Faso',
    region: 'EMEA',
    population_density: '1234923'
  },
  {
    ISO3: 'BDI',
    name: 'Burundi',
    region: 'EMEA',
    population_density: '2234923'
  },
  {
    ISO3: 'CMR',
    name: 'Cameroon',
    region: 'EMEA',
    population_density: '2234923'
  },
  {
    ISO3: 'CPV',
    name: 'Cape Verde',
    region: 'EMEA',
    population_density: '2234923'
  },
  {
    ISO3: 'CAF',
    name: 'Central African Republic',
    region: 'EMEA',
    population_density: '4234923'
  },
  {
    ISO3: 'TCD',
    name: 'Chad',
    region: 'EMEA',
    population_density: '6234923'
  },
  {
    ISO3: 'COM',
    name: 'Comoros',
    region: 'EMEA',
    population_density: '4234923'
  },
  {
    ISO3: 'HRV',
    name: 'Croatia',
    region: 'EMEA',
    population_density: '1234923'
  },
  {
    ISO3: 'CYP',
    name: 'Cyprus',
    region: 'EMEA',
    population_density: '3234923'
  },
  {
    ISO3: 'CZE',
    name: 'Czechia',
    region: 'EMEA',
    population_density: '6234923'
  },
  {
    ISO3: 'COD',
    name: 'Democratic Republic of Congo',
    region: 'EMEA',
    population_density: '5234923'
  },
  {
    ISO3: 'DNK',
    name: 'Denmark',
    region: 'EMEA',
    population_density: '3234923'
  },
  {
    ISO3: 'DJI',
    name: 'Djibouti',
    region: 'EMEA',
    population_density: '4234923'
  },
  {
    ISO3: 'EGY',
    name: 'Egypt',
    region: 'EMEA',
    population_density: '4234923'
  },
  {
    ISO3: 'GNQ',
    name: 'Equatorial Guinea',
    region: 'EMEA',
    population_density: '4234923'
  },
  {
    ISO3: 'ERI',
    name: 'Eritrea',
    region: 'EMEA',
    population_density: '5234923'
  },
  {
    ISO3: 'EST',
    name: 'Estonia',
    region: 'EMEA',
    population_density: '2234923'
  },
  {
    ISO3: 'ETH',
    name: 'Ethiopia',
    region: 'EMEA',
    population_density: '5234923'
  },
  {
    ISO3: 'FRO',
    name: 'Faroe Islands',
    region: 'EMEA',
    population_density: '5234923'
  },
  {
    ISO3: 'FIN',
    name: 'Finland',
    region: 'EMEA',
    population_density: '1234923'
  },
  {
    ISO3: 'FRA',
    name: 'France',
    region: 'EMEA',
    population_density: '2234923'
  },
  {
    ISO3: 'GAB',
    name: 'Gabon',
    region: 'EMEA',
    population_density: '4234923'
  },
  {
    ISO3: 'GMB',
    name: 'Gambia',
    region: 'EMEA',
    population_density: '3234923'
  },
  {
    ISO3: 'GEO',
    name: 'Georgia',
    region: 'EMEA',
    population_density: '4234923'
  },
  {
    ISO3: 'DEU',
    name: 'Germany',
    region: 'EMEA',
    population_density: '5234923'
  },
  {
    ISO3: 'GHA',
    name: 'Ghana',
    region: 'EMEA',
    population_density: '4234923'
  },
  {
    ISO3: 'GIB',
    name: 'Gibraltar',
    region: 'EMEA',
    population_density: '3234923'
  },
  {
    ISO3: 'GRC',
    name: 'Greece',
    region: 'EMEA',
    population_density: '1234923'
  },
  {
    ISO3: 'GGY',
    name: 'Guernsey',
    region: 'EMEA',
    population_density: '0234923'
  },
  {
    ISO3: 'GIN',
    name: 'Guinea',
    region: 'EMEA',
    population_density: '5234923'
  },
  {
    ISO3: 'GNB',
    name: 'Guinea-Bissau',
    region: 'EMEA',
    population_density: '6234923'
  },
  {
    ISO3: 'HUN',
    name: 'Hungary',
    region: 'EMEA',
    population_density: '1234923'
  },
  {
    ISO3: 'ISL',
    name: 'Iceland',
    region: 'EMEA',
    population_density: '1234923'
  },
  {
    ISO3: 'IRN',
    name: 'Iran',
    region: 'EMEA',
    population_density: '3234923'
  },
  {
    ISO3: 'KAZ',
    name: 'Kazajstán',
    region: 'EMEA',
    population_density: '2234923'
  },
  {
    ISO3: 'CHN',
    name: 'China',
    region: 'EMEA',
    population_density: '4234923'
  },
  {
    ISO3: 'IND',
    name: 'India',
    region: 'EMEA',
    population_density: '1234923'
  },
  {
    ISO3: 'PRK',
    name: 'Corea del Norte',
    region: 'EMEA',
    population_density: '334923'
  },
  {
    ISO3: 'KOR',
    name: 'Corea del Sur',
    region: 'EMEA',
    population_density: '5534923'
  },
  {
    ISO3: 'LAO',
    name: 'Laos',
    region: 'EMEA',
    population_density: '4434923'
  },
  {
    ISO3: 'KHM',
    name: 'Camboya',
    region: 'EMEA',
    population_density: '3634923'
  },
  {
    ISO3: 'VNM',
    name: 'Vietnam',
    region: 'EMEA',
    population_density: '4734923'
  },
  {
    ISO3: 'BGD',
    name: 'Bangladesh',
    region: 'EMEA',
    population_density: '5534923'
  },
  {
    ISO3: 'THA',
    name: 'Tailandia',
    region: 'EMEA',
    population_density: '6634923'
  },
  {
    ISO3: 'TWN',
    name: 'Taiwán',
    region: 'EMEA',
    population_density: '2234923'
  },
  {
    ISO3: 'LKA',
    name: 'Sri Lanka',
    region: 'EMEA',
    population_density: '3234923'
  },
  {
    ISO3: 'BTN',
    name: 'Bhután',
    region: 'EMEA',
    population_density: '3234923'
  },
  {
    ISO3: 'IDN',
    name: 'Indonesia',
    region: 'EMEA',
    population_density: '3234923'
  },
  {
    ISO3: 'BRN',
    name: 'Brunéi',
    region: 'EMEA',
    population_density: '3234923'
  },
  {
    ISO3: 'PNG',
    name: 'Papúa Nueva Guinea',
    region: 'EMEA',
    population_density: '3234923'
  },
  {
    ISO3: 'PHL',
    name: 'Filipinas',
    region: 'EMEA',
    population_density: '3234923'
  },
  {
    ISO3: 'TLS',
    name: 'Timor-Leste',
    region: 'EMEA',
    population_density: '3234923'
  },

  {
    ISO3: 'COG',
    name: 'Congo',
    region: 'EMEA',
    population_density: '3234923'
  },

  {
    ISO3: 'KGZ',
    name: 'Kirguistán',
    region: 'EMEA',
    population_density: '3234923'
  },
  {
    ISO3: 'TJK',
    name: 'Tayikistán',
    region: 'EMEA',
    population_density: '3234923'
  },
  {
    ISO3: 'SLE',
    name: 'Sierra Leona',
    region: 'EMEA',
    population_density: '3234923'
  },
  {
    ISO3: 'AUS',
    name: 'Australia',
    region: 'EMEA',
    population_density: '3234923'
  },
  {
    ISO3: 'SSD',
    name: 'South Sudan',
    region: 'EMEA',
    population_density: '3234923'
  },
  {
    ISO3: 'NZL',
    name: 'Nueva Zelanda',
    region: 'EMEA',
    population_density: '3234923'
  },
  {
    ISO3: 'MYS',
    name: 'Malasia',
    region: 'EMEA',
    population_density: '3234923'
  },
  {
    ISO3: 'MMR',
    name: 'Myanmar',
    region: 'EMEA',
    population_density: '3234923'
  },
  {
    ISO3: 'NPL',
    name: 'Nepal',
    region: 'EMEA',
    population_density: '3234923'
  },
  {
    ISO3: 'PAK',
    name: 'Pakistán',
    region: 'EMEA',
    population_density: '3234923'
  },
  {
    ISO3: 'TKM',
    name: 'Turkmenistán',
    region: 'EMEA',
    population_density: '3234923'
  },
  {
    ISO3: 'AFG',
    name: 'Afganistán',
    region: 'EMEA',
    population_density: '3234923'
  },
  {
    ISO3: 'AZE',
    name: 'Azerbaiyán',
    region: 'EMEA',
    population_density: '3234923'
  },
  {
    ISO3: 'ARM',
    name: 'Armenia',
    region: 'EMEA',
    population_density: '3234923'
  },
  {
    ISO3: 'JPN',
    name: 'Japón',
    region: 'EMEA',
    population_density: '3234923'
  },
  {
    ISO3: 'UZB',
    name: 'Uzbekistán',
    region: 'EMEA',
    population_density: '3234923'
  },
  {
    ISO3: 'MNG',
    name: 'Mongolia',
    region: 'EMEA',
    population_density: '3234923'
  },
  {
    ISO3: 'RUS',
    name: 'Russia',
    region: 'EMEA',
    population_density: '3234923'
  },
  {
    ISO3: 'IRQ',
    name: 'Iraq',
    region: 'EMEA',
    population_density: '4234923'
  },
  {
    ISO3: 'IRL',
    name: 'Ireland',
    region: 'EMEA',
    population_density: '1234923'
  },
  {
    ISO3: 'IMN',
    name: 'Isle of Man',
    region: 'EMEA',
    population_density: '2234923'
  },
  {
    ISO3: 'ISR',
    name: 'Israel',
    region: 'EMEA',
    population_density: '3234923'
  },
  {
    ISO3: 'ITA',
    name: 'Italy',
    region: 'EMEA',
    population_density: '4234923'
  },
  {
    ISO3: 'CIV',
    name: "Cote d'Ivoire",
    region: 'EMEA',
    population_density: '4234923'
  },
  {
    ISO3: 'JEY',
    name: 'Jersey',
    region: 'EMEA',
    population_density: '4234923'
  },
  {
    ISO3: 'JOR',
    name: 'Jordan',
    region: 'EMEA',
    population_density: '3234923'
  },
  {
    ISO3: 'KEN',
    name: 'Kenya',
    region: 'EMEA',
    population_density: '5234923'
  },
  {
    ISO3: 'KWT',
    name: 'Kuwait',
    region: 'EMEA',
    population_density: '4234923'
  },
  {
    ISO3: 'LVA',
    name: 'Latvia',
    region: 'EMEA',
    population_density: '2234923'
  },
  {
    ISO3: 'LBN',
    name: 'Lebanon',
    region: 'EMEA',
    population_density: '4234923'
  },
  {
    ISO3: 'LSO',
    name: 'Lesotho',
    region: 'EMEA',
    population_density: '5234923'
  },
  {
    ISO3: 'LBR',
    name: 'Liberia',
    region: 'EMEA',
    population_density: '6234923'
  },
  {
    ISO3: 'LBY',
    name: 'Libya',
    region: 'EMEA',
    population_density: '3234923'
  },
  {
    ISO3: 'LIE',
    name: 'Liechtenstein',
    region: 'EMEA',
    population_density: '2234923'
  },
  {
    ISO3: 'LTU',
    name: 'Lithuania',
    region: 'EMEA',
    population_density: '1234923'
  },
  {
    ISO3: 'LUX',
    name: 'Luxembourg',
    region: 'EMEA',
    population_density: '1234923'
  },
  {
    ISO3: 'MKD',
    name: 'Macedonia',
    region: 'EMEA',
    population_density: '3234923'
  },
  {
    ISO3: 'MDG',
    name: 'Madagascar',
    region: 'EMEA',
    population_density: '5234923'
  },
  {
    ISO3: 'MWI',
    name: 'Malawi',
    region: 'EMEA',
    population_density: '5234923'
  },
  {
    ISO3: 'MLI',
    name: 'Mali',
    region: 'EMEA',
    population_density: '6234923'
  },
  {
    ISO3: 'MLT',
    name: 'Malta',
    region: 'EMEA',
    population_density: '1234923'
  },
  {
    ISO3: 'MRT',
    name: 'Mauritania',
    region: 'EMEA',
    population_density: '5234923'
  },
  {
    ISO3: 'MUS',
    name: 'Mauritius',
    region: 'EMEA',
    population_density: '4234923'
  },
  {
    ISO3: 'MDA',
    name: 'Moldova',
    region: 'EMEA',
    population_density: '4234923'
  },
  {
    ISO3: 'MCO',
    name: 'Monaco',
    region: 'EMEA',
    population_density: '4234923'
  },
  {
    ISO3: 'MNE',
    name: 'Montenegro',
    region: 'EMEA',
    population_density: '3234923'
  },
  {
    ISO3: 'MAR',
    name: 'Morocco',
    region: 'EMEA',
    population_density: '3234923'
  },
  {
    ISO3: 'MOZ',
    name: 'Mozambique',
    region: 'EMEA',
    population_density: '5234923'
  },
  {
    ISO3: 'NAM',
    name: 'Namibia',
    region: 'EMEA',
    population_density: '4234923'
  },
  {
    ISO3: 'NLD',
    name: 'Netherlands',
    region: 'EMEA',
    population_density: '3234923'
  },
  {
    ISO3: 'NER',
    name: 'Niger',
    region: 'EMEA',
    population_density: '6234923'
  },
  {
    ISO3: 'NGA',
    name: 'Nigeria',
    region: 'EMEA',
    population_density: '4234923'
  },
  {
    ISO3: 'NOR',
    name: 'Norway',
    region: 'EMEA',
    population_density: '2234923'
  },
  {
    ISO3: 'OMN',
    name: 'Oman',
    region: 'EMEA',
    population_density: '4234923'
  },
  {
    ISO3: 'PSE',
    name: 'Palestine',
    region: 'EMEA',
    population_density: '4234923'
  },
  {
    ISO3: 'POL',
    name: 'Poland',
    region: 'EMEA',
    population_density: '3234923'
  },
  {
    ISO3: 'PRT',
    name: 'Portugal',
    region: 'EMEA',
    population_density: '3234923'
  },
  {
    ISO3: 'QAT',
    name: 'Qatar',
    region: 'EMEA',
    population_density: '3234923'
  },
  {
    ISO3: 'ROU',
    name: 'Romania',
    region: 'EMEA',
    population_density: '4234923'
  },
  {
    ISO3: 'RWA',
    name: 'Rwanda',
    region: 'EMEA',
    population_density: '5234923'
  },
  {
    ISO3: 'SMR',
    name: 'San Marino',
    region: 'EMEA',
    population_density: '3234923'
  },
  {
    ISO3: 'STP',
    name: 'Sao Tome and Principe',
    region: 'EMEA',
    population_density: '4234923'
  },
  {
    ISO3: 'SAU',
    name: 'Saudi Arabia',
    region: 'EMEA',
    population_density: '3234923'
  },
  {
    ISO3: 'SEN',
    name: 'Senegal',
    region: 'EMEA',
    population_density: '5234923'
  },
  {
    ISO3: 'SRB',
    name: 'Serbia',
    region: 'EMEA',
    population_density: '4234923'
  },
  {
    ISO3: 'SVK',
    name: 'Slovakia',
    region: 'EMEA',
    population_density: '3234923'
  },
  {
    ISO3: 'SVN',
    name: 'Slovenia',
    region: 'EMEA',
    population_density: '3234923'
  },
  {
    ISO3: 'SOM',
    name: 'Somalia',
    region: 'EMEA',
    population_density: '6234923'
  },
  {
    ISO3: 'ZAF',
    name: 'South Africa',
    region: 'EMEA',
    population_density: '3234923'
  },
  {
    ISO3: 'ESP',
    name: 'Spain',
    region: 'EMEA',
    population_density: '3234923'
  },
  {
    ISO3: 'SDN',
    name: 'Sudan',
    region: 'EMEA',
    population_density: '6234923'
  },
  {
    ISO3: 'SWZ',
    name: 'Swaziland',
    region: 'EMEA',
    population_density: '5234923'
  },
  {
    ISO3: 'SWE',
    name: 'Sweden',
    region: 'EMEA',
    population_density: '3234923'
  },
  {
    ISO3: 'CHE',
    name: 'Switzerland',
    region: 'EMEA',
    population_density: '2234923'
  },
  {
    ISO3: 'SYR',
    name: 'Syria',
    region: 'EMEA',
    population_density: '4234923'
  },
  {
    ISO3: 'TZA',
    name: 'Tanzania',
    region: 'EMEA',
    population_density: '5234923'
  },
  {
    ISO3: 'TGO',
    name: 'Togo',
    region: 'EMEA',
    population_density: '5234923'
  },
  {
    ISO3: 'TUN',
    name: 'Tunisia',
    region: 'EMEA',
    population_density: '3234923'
  },
  {
    ISO3: 'TUR',
    name: 'Turkey',
    region: 'EMEA',
    population_density: '3234923'
  },
  {
    ISO3: 'UGA',
    name: 'Uganda',
    region: 'EMEA',
    population_density: '5234923'
  },
  {
    ISO3: 'UKR',
    name: 'Ukraine',
    region: 'EMEA',
    population_density: '3234923'
  },
  {
    ISO3: 'ARE',
    name: 'United Arab Emirates',
    region: 'EMEA',
    population_density: '3234923'
  },
  {
    ISO3: 'GBR',
    name: 'United Kingdom',
    region: 'EMEA',
    population_density: '2234923'
  },
  {
    ISO3: 'VAT',
    name: 'Vatican City',
    region: 'EMEA',
    population_density: '2234923'
  },
  {
    ISO3: 'ESH',
    name: 'Western Sahara',
    region: 'EMEA',
    population_density: '2234923'
  },
  {
    ISO3: 'YEM',
    name: 'Yemen',
    region: 'EMEA',
    population_density: '5234923'
  },
  {
    ISO3: 'ZMB',
    name: 'Zambia',
    region: 'EMEA',
    population_density: '5234923'
  },
  {
    ISO3: 'ZWE',
    name: 'Zimbabwe',
    region: 'EMEA',
    population_density: '5234923'
  },
  {
    ISO3: 'BLZ',
    name: 'Belize',
    region: 'LATAM',
    population_density: '4234923'
  },
  {
    ISO3: 'CRI',
    name: 'Costa Rica',
    region: 'LATAM',
    population_density: '3234923'
  },
  {
    ISO3: 'SLV',
    name: 'El Salvador',
    region: 'LATAM',
    population_density: '4234923'
  },
  {
    ISO3: 'GTM',
    name: 'Guatemala',
    region: 'LATAM',
    population_density: '4234923'
  },
  {
    ISO3: 'HND',
    name: 'Honduras',
    region: 'LATAM',
    population_density: '4234923'
  },
  {
    ISO3: 'MEX',
    name: 'Mexico',
    region: 'LATAM',
    population_density: '3234923'
  },
  {
    ISO3: 'NIC',
    name: 'Nicaragua',
    region: 'LATAM',
    population_density: '4234923'
  },
  {
    ISO3: 'PAN',
    name: 'Panama',
    region: 'LATAM',
    population_density: '4234923'
  },
  {
    ISO3: 'ARG',
    name: 'Argentina',
    region: 'LATAM',
    population_density: '3234923'
  },
  {
    ISO3: 'BOL',
    name: 'Bolivia',
    region: 'LATAM',
    population_density: '4234923'
  },
  {
    ISO3: 'BRA',
    name: 'Brazil',
    region: 'LATAM',
    population_density: '3234923'
  },
  {
    ISO3: 'CHL',
    name: 'Chile',
    region: 'LATAM',
    population_density: '3234923'
  },
  {
    ISO3: 'COL',
    name: 'Colombia',
    region: 'LATAM',
    population_density: '3234923'
  },
  {
    ISO3: 'ECU',
    name: 'Ecuador',
    region: 'LATAM',
    population_density: '4234923'
  },
  {
    ISO3: 'GUF',
    name: 'French Guiana',
    region: 'LATAM',
    population_density: '4234923'
  },
  {
    ISO3: 'GUY',
    name: 'Guyana',
    region: 'LATAM',
    population_density: '4234923'
  },
  {
    ISO3: 'PRY',
    name: 'Paraguay',
    region: 'LATAM',
    population_density: '3234923'
  },
  {
    ISO3: 'PER',
    name: 'Peru',
    region: 'LATAM',
    population_density: '4234923'
  },
  {
    ISO3: 'SUR',
    name: 'Suriname',
    region: 'LATAM',
    population_density: '4234923'
  },
  {
    ISO3: 'URY',
    name: 'Uruguay',
    region: 'LATAM',
    population_density: '3234923'
  },
  {
    ISO3: 'VEN',
    name: 'Venezuela',
    region: 'LATAM',
    population_density: '3234923'
  },
  {
    ISO3: 'BHS',
    name: 'Bahamas',
    region: 'LATAM',
    population_density: '3234923'
  },
  {
    ISO3: 'CUB',
    name: 'Cuba',
    region: 'LATAM',
    population_density: '4234923'
  },
  {
    ISO3: 'MTQ',
    name: 'Martinique',
    region: 'LATAM',
    population_density: '4234923'
  },
  {
    ISO3: 'JAM',
    name: 'Jamaica',
    region: 'LATAM',
    population_density: '4234923'
  },
  {
    ISO3: 'HTI',
    name: 'Haiti',
    region: 'LATAM',
    population_density: '5234923'
  },
  {
    ISO3: 'DOM',
    name: 'Dominican Republic',
    region: 'LATAM',
    population_density: '4234923'
  },
  {
    ISO3: 'PRI',
    name: 'Puerto Rico',
    region: 'LATAM',
    population_density: '4234923'
  },
  {
    ISO3: 'BL',
    name: 'Saint-Barthélemy',
    region: 'LATAM',
    population_density: '4234923'
  },
  {
    ISO3: 'MAF',
    name: 'Saint Martin',
    region: 'LATAM',
    population_density: '4234923'
  },
  {
    ISO3: 'FLK',
    name: 'Falkland Islands (Malvinas)',
    region: 'LATAM',
    population_density: '4234923'
  }
]
const markers = [
  {
    markerOffset: 15,
    name: 'Cuba',
    coordinates: [-79.270534, 21.632339],
    bandera: banderaMapa.banderaCuba
  },
  {
    markerOffset: 15,
    name: 'China',
    coordinates: [104.038067, 37.107905],
    bandera: banderaMapa.banderaChina
  },
  {
    markerOffset: 15,
    name: 'Iran',
    coordinates: [53.630804, 33.031623],
    bandera: banderaMapa.banderaIran
  },
  {
    markerOffset: 15,
    name: 'Turkey',
    coordinates: [39.278165, 39.257957],
    bandera: banderaMapa.banderaTurkia
  },
  {
    markerOffset: 15,
    name: 'India',
    coordinates: [78.196115, 19.330118],
    bandera: banderaMapa.banderaIndia
  },
  {
    markerOffset: 15,
    name: 'Brasil',
    coordinates: [-57.021382, -10.7305],
    bandera: banderaMapa.banderaBrasil
  },
  {
    markerOffset: 15,
    name: 'Egipto',
    coordinates: [29.021382, 22.7305],
    bandera: banderaMapa.banderaEgipto
  }
  // ,
  // {
  //   markerOffset: 15,
  //   name: 'Senegal',
  //   coordinates: [-21.021382, 10.7305],
  //   bandera: banderaMapa.banderaSenegal
  // }
]
// a6a8ab
const colosScale = scaleLinear()
  .domain([0, 6300000])
  .range(['#20262e', '#a6a8ab'])
const MapaEstadisticoList = ({ setTooltipContent }) => {
  const { barcos } = useContext(BarcoContext)
  const { reporteCargaGOMs } = useContext(ReporteCargaGOMContext)

  let catidadPorPaises = barcos.map((barcos) => {
    // reporteCargaGOMs.map((p) => (barcos ? console.log(p) : ''))
    return barcos.buquePaisDestino
  })
  let auxOtro = []
  const buqueTerminal = () => {
    barcos.forEach((dataset, i) => {
      let reporteCargaGOM = reporteCargaGOMs
      let toneladasPaises = reporteCargaGOM.filter(
        (p) => p.barcoID.id === dataset.id
      )
      // buquePaisDestino
      if (toneladasPaises.length !== 0) {
        const ultimoRegistro = toneladasPaises.length - 1
        dataset.buquePaisDestino &&
          auxOtro.push({
            pais: dataset.buquePaisDestino,
            toneladasPais: toneladasPaises[ultimoRegistro].toneladasCargadasGOM
          })
      }
    })
  }
  buqueTerminal()
  useEffect(() => {}, [barcos])
  const totalToneladasPais = auxOtro.reduce(
    (a, d) => (
      a[d.pais]
        ? (a[d.pais] += d.toneladasPais)
        : (a[d.pais] = d.toneladasPais),
      a
    ),
    {}
  )

  function contarOcurrencias(datos) {
    if (!Array.isArray(datos)) {
      throw TypeError('El argumento debe ser un arreglo.')
    }
    buqueTerminal()
    return datos.reduce((a, d) => (a[d] ? (a[d] += 1) : (a[d] = 1), a), {})
  }

  const total = contarOcurrencias(catidadPorPaises)
  // {3: 4, 5: 3, 2: 2, 7: 1, 11: 2, 13: 1}

  return (
    <>
      <ComposableMap
        width={900}
        height={400}
        data-tip=""
        // projectionConfig={{ scale: 200 }}
        projectionConfig={{
          rotate: [-10, 0, 0],
          scale: 147
        }}
      >
        <ZoomableGroup>
          <Sphere
            stroke="#000"
            strokeWidth={0.3}
            fill="#052c65"
            filter="url(#f2)"
            fillOpacity="0.05"
          />
          <Graticule stroke="#000" strokeWidth={0.3} />
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const isos = countries.find(
                  (s) => s.ISO3 === geo.properties.ISO_A3
                )
                return (
                  <>
                    <Geography
                      filter="url(#f2)"
                      fill={
                        isos
                          ? colosScale(isos['population_density'])
                          : '#bcbec0'
                      }
                      stroke="#000"
                      strokeWidth="0.2"
                      key={geo.rsmKey}
                      geography={geo}
                      onMouseEnter={() => {
                        const { NAME, POP_EST } = geo.properties
                        setTooltipContent(`${NAME} — ${rounded(POP_EST)}`)
                      }}
                      onMouseLeave={() => {
                        setTooltipContent('')
                      }}
                      style={{
                        default: {
                          outline: 'none'
                        },
                        hover: {
                          fill: '#F53',
                          outline: 'none'
                        },
                        pressed: {
                          fill: '#E42',
                          outline: 'none'
                        }
                      }}
                    />
                    {/* rutas comerciales */}
                    <Annotation
                      subject={[-64.90147, 10.128265]}
                      dx={0}
                      dy={0}
                      curve={1}
                      connectorProps={{ stroke: '#000', strokeWidth: 1.5 }}
                    >
                      {/* turkia */}
                      <path
                        d="M -0.000001 -0.000001 C 20.049 -37.1532 114.484 -66.8408 121.109 -67.1649 C 139.934 -71.9278 147.905 -71.8846 155.217 -73.797 C 186.01 -81.8504 196.905 -60.059 207.327 -80.4292"
                        stroke="red"
                        stroke-width="1"
                        fill="none"
                        stroke-dasharray="10, 5"
                      ></path>
                      {/* iran */}
                      <path
                        d="M 192.028 -71.8285 C 218.59 -67.1649 208.681 -55.7869 218.59 -40.2146 C 225.13 -29.9361 235.75 -11.5101 237.901 -7.29736 C 248.578 -4.69719 260.875 -13.2131 263.701 -20.7204 C 267.657 -31.2327 271.398 -26.7877 272.95 -33.0248 C 274.701 -45.9184 263.701 -40.2146 247.12 -51.0582 C 245.348 -52.2174 253.934 -54.6508 253.934 -60.6165"
                        stroke="red"
                        stroke-width="1"
                        fill="none"
                        stroke-dasharray="10, 5"
                      ></path>
                      {/* cuba */}
                      <path
                        d="M 0 0 C 0 -7.29736 -0.183561 -12.8903 -5.20451 -12.8903 C -23.4747 -12.8903 -45.8464 -33.0248 -25.7119 -33.0248"
                        stroke="red"
                        stroke-width="1"
                        fill="none"
                        stroke-dasharray="10, 5"
                      ></path>
                      {/* china */}
                      <path
                        d="M 0.000001 0 C -5.20451 -16.5124 -25.7119 -12.8903 -32.8897 7.5767 C -32.8897 27.2496 -74.1853 3.95458 -82.5494 -16.5124 C -96.0032 -36.6469 -108.252 -80.4292 -181.83 -93.4395"
                        stroke="red"
                        stroke-width="1"
                        fill="none"
                        stroke-dasharray="10, 5"
                      ></path>
                      <path
                        d="M 485.164 -111.445 C 468.474 -110.854 435.856 -108.931 423.639 -85.4306 C 399.455 -81.5582 411.862 -57.4644 396.69 -71.2367 C 391.751 -71.2367 396.52 -77.8688 387.932 -77.8688 C 382.572 -77.8688 382.646 -84.6871 372.193 -84.6519"
                        stroke="red"
                        stroke-width="1"
                        fill="none"
                        stroke-dasharray="10, 5"
                      ></path>
                      {/* india */}
                      <path
                        d="M 247.12 -7.29736 C 251.493 -8.60607 251.52 -9.80127 253.934 -7.29736 C 268.93 7.5767 315.944 14.1118 320 14.1118 C 327.951 14.1118 330.905 11.0532 328.084 0.000001 C 323.87 -16.5124 319.314 -22.5233 314.062 -25.5135"
                        stroke="red"
                        stroke-width="1"
                        fill="none"
                        stroke-dasharray="10, 5"
                      ></path>
                      {/* brasil */}
                      <path
                        d="M-0.54596,0.68653C16.195034,-5.213239,39.620955,-1.069509,50.42563,12.099621C63.03294,27.465868,60.004108,24.313601,58.411694,41.225266"
                        stroke="red"
                        stroke-width="1"
                        fill="none"
                        stroke-dasharray="10, 5"
                      ></path>
                    </Annotation>
                    <Annotation
                      subject={[-79.270534, 21.632339]}
                      dx={-15}
                      dy={-50}
                      curve={1}
                      connectorProps={{ stroke: '#000', strokeWidth: 1.5 }}
                    >
                      <defs>
                        <filter id="f3" x="0" y="0" width="200%" height="200%">
                          <feOffset
                            result="offOut"
                            in="SourceAlpha"
                            dx="2"
                            dy="2"
                          />
                          <feGaussianBlur
                            result="blurOut"
                            in="offOut"
                            stdDeviation="5"
                          />
                          <feBlend
                            in="SourceGraphic"
                            in2="blurOut"
                            mode="normal"
                          />
                        </filter>
                        <filter id="f2" x="0" y="0" width="200%" height="200%">
                          <feOffset
                            result="offOut"
                            in="SourceAlpha"
                            dx="2"
                            dy="2"
                          />
                          <feGaussianBlur
                            result="blurOut"
                            in="offOut"
                            stdDeviation="3"
                          />
                          <feBlend
                            in="SourceGraphic"
                            in2="blurOut"
                            mode="normal"
                          />
                        </filter>
                      </defs>
                      <rect
                        width="100"
                        height="25"
                        style={{
                          x: -100,
                          y: -18,
                          fill: 'rbg(0,0,0)',
                          fillOpacity: 0.08,
                          stroke: 'rbg(0,0,0)',
                          strokeWidth: 1,
                          strokeOpacity: 0.3
                        }}
                      ></rect>
                      <text
                        x="-8"
                        y="-10"
                        textAnchor="end"
                        alignmentBaseline="middle"
                        style={{
                          fontSize: 8,
                          fill: '#C1C0CB',
                          // fontFamily: 'barlow',
                          fontWeight: 100,
                          backgroudColor: '#000',
                          width: 200,
                          heught: 40
                        }}
                      >
                        {'Cienfuegos, Port, Cuba'}
                      </text>
                      <text
                        x="-8"
                        textAnchor="end"
                        alignmentBaseline="middle"
                        style={{
                          fontSize: 8,
                          fill: '#0fb768',
                          // fontFamily: 'barlow',
                          fontWeight: 100,
                          backgroudColor: '#000',
                          width: 200,
                          heught: 40
                        }}
                      >
                        {' '}
                        {total.CU}
                        {' Buques,'}{' '}
                        {totalToneladasPais.CU &&
                          totalToneladasPais.CU.toLocaleString('de-DE')}{' '}
                        {'TM'}
                      </text>
                    </Annotation>
                    {/* china */}
                    <Annotation
                      subject={[104.038067, 37.107905]}
                      dx={30}
                      dy={30}
                      curve={1}
                      connectorProps={{ stroke: '#000', strokeWidth: 1.5 }}
                    >
                      <rect
                        width="105"
                        height="25"
                        style={{
                          x: 0,
                          y: -18,
                          fill: 'rbg(0,0,0)',
                          fillOpacity: 0.08,
                          stroke: 'rbg(0,0,0)',
                          strokeWidth: 1,
                          strokeOpacity: 0.3
                        }}
                      ></rect>
                      <text
                        x="8"
                        y="-10"
                        textAnchor="start"
                        alignmentBaseline="middle"
                        style={{
                          fontSize: 8,
                          fill: '#C1C0CB',
                          // fontFamily: 'barlow',
                          fontWeight: 100,
                          backgroudColor: '#000',
                          width: 200,
                          heught: 40
                        }}
                      >
                        {'Quingdao, Main, Port China'}
                      </text>
                      <text
                        x="8"
                        textAnchor="start"
                        alignmentBaseline="middle"
                        style={{
                          fontSize: 8,
                          fill: '#0fb768',
                          // fontFamily: 'barlow',
                          fontWeight: 100,
                          backgroudColor: '#000',
                          width: 200,
                          heught: 40
                        }}
                      >
                        {total.CN}
                        {' Buques,'}{' '}
                        {totalToneladasPais.CN &&
                          totalToneladasPais.CN.toLocaleString('de-DE')}{' '}
                        {'TM'}
                      </text>
                    </Annotation>
                    {/* iran */}
                    <Annotation
                      subject={[53.630804, 33.031623]}
                      dx={20}
                      dy={-50}
                      curve={1}
                      connectorProps={{ stroke: '#000', strokeWidth: 1.5 }}
                    >
                      <rect
                        width="100"
                        height="25"
                        style={{
                          x: 0,
                          y: -18,
                          fill: 'rbg(0,0,0)',
                          fillOpacity: 0.08,
                          stroke: 'rbg(0,0,0)',
                          strokeWidth: 1,
                          strokeOpacity: 0.3
                        }}
                      ></rect>
                      <text
                        x="8"
                        y="-10"
                        textAnchor="start"
                        alignmentBaseline="middle"
                        style={{
                          fontSize: 8,
                          fill: '#C1C0CB',
                          // fontFamily: 'barlow',
                          fontWeight: 100,
                          backgroudColor: '#000',
                          width: 200,
                          heught: 40
                        }}
                      >
                        {'Port Irán'}
                      </text>
                      <text
                        x="8"
                        textAnchor="start"
                        alignmentBaseline="middle"
                        style={{
                          fontSize: 8,
                          fill: '#0fb768',
                          // fontFamily: 'barlow',
                          fontWeight: 100,
                          backgroudColor: '#000',
                          width: 200,
                          heught: 40
                        }}
                      >
                        {total.IR}
                        {' Buques,'}{' '}
                        {totalToneladasPais.IR &&
                          totalToneladasPais.IR.toLocaleString('de-DE')}{' '}
                        {'TM'}
                      </text>
                    </Annotation>
                    {/* turkia */}
                    <Annotation
                      subject={[39.278165, 39.257957]}
                      dx={-80}
                      dy={-50}
                      curve={1}
                      connectorProps={{ stroke: '#000', strokeWidth: 1.5 }}
                    >
                      <rect
                        width="100"
                        height="25"
                        style={{
                          x: -85,
                          y: -18,
                          fill: 'rbg(0,0,0)',
                          fillOpacity: 0.03,
                          stroke: 'rbg(0,0,0)',
                          strokeWidth: 1,
                          strokeOpacity: 0.3
                        }}
                      ></rect>
                      <text
                        x="8"
                        y="-10"
                        textAnchor="end"
                        alignmentBaseline="middle"
                        style={{
                          fontSize: 8,
                          fill: '#C1C0CB',
                          // fontFamily: 'barlow',
                          fontWeight: 100,
                          backgroudColor: '#000',
                          width: 200,
                          heught: 40
                        }}
                      >
                        {'Antalya, Port Turkey'}
                      </text>
                      <text
                        x="8"
                        textAnchor="end"
                        alignmentBaseline="middle"
                        style={{
                          fontSize: 8,
                          fill: '#0fb768',
                          // fontFamily: 'barlow',
                          fontWeight: 100,
                          backgroudColor: '#000',
                          width: 200,
                          heught: 40
                        }}
                      >
                        {' '}
                        {total.TR}
                        {' Buques,'}{' '}
                        {totalToneladasPais.TR &&
                          totalToneladasPais.TR.toLocaleString('de-DE')}{' '}
                        {'TM'}
                      </text>
                    </Annotation>
                    {/* india */}
                    <Annotation
                      subject={[78.196115, 19.330118]}
                      dx={20}
                      dy={70}
                      curve={1}
                      connectorProps={{ stroke: '#000', strokeWidth: 1.5 }}
                    >
                      <rect
                        width="100"
                        height="25"
                        style={{
                          x: 0,
                          y: -18,
                          fill: 'rbg(0,0,0)',
                          fillOpacity: 0.08,
                          stroke: 'rbg(0,0,0)',
                          strokeWidth: 1,
                          strokeOpacity: 0.3
                        }}
                      ></rect>
                      <text
                        x="8"
                        y="-10"
                        textAnchor="start"
                        alignmentBaseline="middle"
                        style={{
                          fontSize: 8,
                          fill: '#C1C0CB',
                          // fontFamily: 'barlow',
                          fontWeight: 100,
                          backgroudColor: '#000',
                          width: 200,
                          heught: 40
                        }}
                      >
                        {'Port India'}
                      </text>
                      <text
                        x="8"
                        textAnchor="start"
                        alignmentBaseline="middle"
                        style={{
                          fontSize: 8,
                          fill: '#0fb768',
                          // fontFamily: 'barlow',
                          fontWeight: 100,
                          backgroudColor: '#000',
                          width: 200,
                          heught: 40
                        }}
                      >
                        {total.IN}
                        {' Buques,'}{' '}
                        {totalToneladasPais.IN &&
                          totalToneladasPais.IN.toLocaleString('de-DE')}{' '}
                        {'TM'}
                      </text>
                    </Annotation>
                    <Annotation
                      subject={[-50.196115, -8.330118]}
                      dx={20}
                      dy={70}
                      curve={1}
                      connectorProps={{ stroke: '#000', strokeWidth: 1.5 }}
                    >
                      <rect
                        width="100"
                        height="25"
                        style={{
                          x: 0,
                          y: -18,
                          fill: 'rbg(0,0,0)',
                          fillOpacity: 0.08,
                          stroke: 'rbg(0,0,0)',
                          strokeWidth: 1,
                          strokeOpacity: 0.3
                        }}
                      ></rect>
                      <text
                        x="8"
                        y="-10"
                        textAnchor="start"
                        alignmentBaseline="middle"
                        style={{
                          fontSize: 8,
                          fill: '#C1C0CB',
                          // fontFamily: 'barlow',
                          fontWeight: 100,
                          backgroudColor: '#000',
                          width: 200,
                          heught: 40
                        }}
                      >
                        {'Port Brasil'}
                      </text>
                      <text
                        x="8"
                        textAnchor="start"
                        alignmentBaseline="middle"
                        style={{
                          fontSize: 8,
                          fill: '#0fb768',
                          // fontFamily: 'barlow',
                          fontWeight: 100,
                          backgroudColor: '#000',
                          width: 200,
                          heught: 40
                        }}
                      >
                        {total.BR}
                        {' Buques,'}{' '}
                        {totalToneladasPais.BR &&
                          totalToneladasPais.BR.toLocaleString('de-DE')}{' '}
                        {'TM'}
                      </text>
                    </Annotation>
                    <Annotation
                      subject={[30.196115, 22.330118]}
                      dx={-20}
                      dy={70}
                      curve={1}
                      connectorProps={{ stroke: '#000', strokeWidth: 1.5 }}
                    >
                      <rect
                        width="100"
                        height="25"
                        style={{
                          x: 0,
                          y: -18,
                          fill: 'rbg(0,0,0)',
                          fillOpacity: 0.08,
                          stroke: 'rbg(0,0,0)',
                          strokeWidth: 1,
                          strokeOpacity: 0.3
                        }}
                      ></rect>
                      <text
                        x="8"
                        y="-10"
                        textAnchor="start"
                        alignmentBaseline="middle"
                        style={{
                          fontSize: 8,
                          fill: '#C1C0CB',
                          // fontFamily: 'barlow',
                          fontWeight: 100,
                          backgroudColor: '#000',
                          width: 200,
                          heught: 40
                        }}
                      >
                        {'Port Egipto'}
                      </text>
                      <text
                        x="8"
                        textAnchor="start"
                        alignmentBaseline="middle"
                        style={{
                          fontSize: 8,
                          fill: '#0fb768',
                          // fontFamily: 'barlow',
                          fontWeight: 100,
                          backgroudColor: '#000',
                          width: 200,
                          heught: 40
                        }}
                      >
                        {total.EG}
                        {' Buques,'}{' '}
                        {totalToneladasPais.EG &&
                          totalToneladasPais.EG.toLocaleString('de-DE')}{' '}
                        {'TM'}
                      </text>
                    </Annotation>
                    {/* <Annotation
                      subject={[-21.196115, 12.330118]}
                      dx={-20}
                      dy={70}
                      curve={1}
                      connectorProps={{ stroke: '#000', strokeWidth: 1.5 }}
                    >
                      <rect
                        width="100"
                        height="25"
                        style={{
                          x: 0,
                          y: -18,
                          fill: 'rbg(0,0,0)',
                          fillOpacity: 0.08,
                          stroke: 'rbg(0,0,0)',
                          strokeWidth: 1,
                          strokeOpacity: 0.3
                        }}
                      ></rect>
                      <text
                        x="8"
                        y="-10"
                        textAnchor="start"
                        alignmentBaseline="middle"
                        style={{
                          fontSize: 8,
                          fill: '#C1C0CB',
                          // fontFamily: 'barlow',
                          fontWeight: 100,
                          backgroudColor: '#000',
                          width: 200,
                          heught: 40
                        }}
                      >
                        {'Port Genegal'}
                      </text>
                      <text
                        x="8"
                        textAnchor="start"
                        alignmentBaseline="middle"
                        style={{
                          fontSize: 8,
                          fill: '#0fb768',
                          // fontFamily: 'barlow',
                          fontWeight: 100,
                          backgroudColor: '#000',
                          width: 200,
                          heught: 40
                        }}
                      >
                        {total.SN}
                        {' Buques,'}{' '}
                        {totalToneladasPais.SN &&
                          totalToneladasPais.SN.toLocaleString('de-DE')}{' '}
                        {'TM'}
                      </text>
                    </Annotation> */}
                    {/* venezuela lineas de navegacion */}

                    {/* <path
                      d="m285,170 q180,-220 350,-75"
                      stroke="red"
                      stroke-width="1"
                      fill="none"
                      stroke-dasharray="10, 5"
                    ></path>
                    <path
                      d="m285,170 q150,-150 220,-85"
                      stroke="red"
                      stroke-width="1"
                      fill="none"
                      stroke-dasharray="10, 5"
                    ></path>
                    <path
                      d="m285,170 q150,-130 255,-65"
                      stroke="red"
                      stroke-width="1"
                      fill="none"
                      stroke-dasharray="10, 5"
                    ></path>
                    <path
                      d="m285,170 q10,-30 -23,-33"
                      stroke="red"
                      stroke-width="1"
                      fill="none"
                      stroke-dasharray="10, 5"
                      className="svg-elem-1"
                    ></path> */}
                    {/* <style>.cls-1{fill:#77acf1;}.cls-2{fill:#04009a;}</style> */}
                  </>
                )
              })
            }
          </Geographies>
          {markers.map(({ name, coordinates, markerOffset, bandera }) => (
            <Marker key={name} coordinates={coordinates}>
              <g
                fill="none"
                stroke="#FF5533"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                transform="translate(-12, -24)"
              >
                {/* <circle cx="12" cy="10" r="3" />
              <path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 6.9 8 11.7z" /> */}
                <image
                  className="banderaMapa"
                  x="0"
                  y="0"
                  href={bandera}
                  width="30"
                  height="30"
                  // className="Buque-china"
                />
              </g>
              {/* <image
              x="0"
              y="0"
              href={flagplaceholder}
              // width="60"
              // height="360"
              // className="Buque-china"
              className="flag flag-us"
            />
            <img
              alt={name}
              src={flagplaceholder}
              onError={(e) =>
                (e.target.src =
                  'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png')
              }
              className="flag flag-us"
            /> */}
              <text
                textAnchor="middle"
                y={markerOffset}
                style={{ fontFamily: 'system-ui', fill: '#5D5A6D' }}
              >
                {/* {name} */}
              </text>
            </Marker>
          ))}
          <Marker coordinates={[-79.270534, 21.632339]}>
            <defs></defs>
            <g>
              {/* <path
              className="Buque-china"
              fill="#FF5533"
              d="M4 10.4V4a1 1 0 0 1 1-1h5V1h4v2h5a1 1 0 0 1 1 1v6.4l1.086.326a1 1 0 0 1 .682 1.2l-1.516
              6.068A4.992 4.992 0 0 1 16 16 4.992 4.992 0 0 1 12 18a4.992 4.992 0 0 1-4-2 4.992 4.992 0 0 1-4.252 1.994l-1.516-6.068a1 1 0 0 1 .682-1.2L4 10.4zm2-.6L12 8l2.754.826 1.809.543L18 9.8V5H6v4.8zM4 20a5.978 5.978 0 0 0 4-1.528A5.978 5.978 0 0 0 12 20a5.978 5.978 0 0 0 4-1.528A5.978 5.978 0 0 0 20 20h2v2h-2a7.963 7.963 0 0 1-4-1.07A7.963 7.963 0 0 1 12 22a7.963 7.963 0 0 1-4-1.07A7.963 7.963 0 0 1 4 22H2v-2h2z"
            /> */}
              <image
                x="0"
                y="-150"
                href={buqueMapa}
                width="60"
                height="360"
                className="Buque-china"
              />
            </g>
          </Marker>
        </ZoomableGroup>
      </ComposableMap>
    </>
  )
}

export default memo(MapaEstadisticoList)
