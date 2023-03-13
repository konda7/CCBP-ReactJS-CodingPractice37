import './index.css'

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Legend,
  ResponsiveContainer,
} from 'recharts'

const VaccinationCoverage = props => {
  const {barGraphData} = props

  const dataFormatter = number => `${number.toString()}k`

  return (
    <div className="vaccination-by-coverage-container">
      <h1 className="vaccination-by-coverage-heading">Vaccination Coverage</h1>
      <ResponsiveContainer width="100%" height={500}>
        <BarChart
          data={barGraphData}
          width={1000}
          height={300}
          margin={{
            top: 5,
          }}
        >
          <XAxis
            dataKey="vaccineDate"
            tick={{
              stroke: '#6c757d',
              strokeWidth: 1,
              fontSize: 15,
              fontFamily: 'Roboto',
            }}
          />
          <YAxis
            tickFormatter={dataFormatter}
            tick={{
              stroke: '#6c757d',
              strokeWidth: 0.5,
              fontSize: 15,
              fontFamily: 'Roboto',
            }}
          />
          <Legend
            wrapperStyle={{
              padding: 30,
              textAlign: 'center',
              fontSize: 12,
              fontFamily: 'Roboto',
            }}
          />
          <Bar dataKey="dose1" name="Dose 1" fill="#5a8dee" barSize="20%" />
          <Bar dataKey="dose2" name="Dose 2" fill=" #f54394" barSize="20%" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default VaccinationCoverage
