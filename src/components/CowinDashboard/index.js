import './index.css'

import {Component} from 'react'

import Loader from 'react-loader-spinner'
import VaccinationCoverage from '../VaccinationCoverage'
import VaccinationByAge from '../VaccinationByAge'
import VaccinationByGender from '../VaccinationByGender'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class CowinDashboard extends Component {
  state = {
    apiCallStatus: apiStatusConstants.initial,
    dashboardData: {},
  }

  componentDidMount() {
    this.getVaccinationData()
  }

  getVaccinationData = async () => {
    this.setState({apiCallStatus: apiStatusConstants.inProgress})

    const response = await fetch('https://apis.ccbp.in/covid-vaccination-data')

    if (response.ok) {
      const data = await response.json()

      const modifiedData = {
        last7DaysVaccination: data.last_7_days_vaccination.map(eachDay => ({
          dose1: eachDay.dose_1,
          dose2: eachDay.dose_2,
          vaccineDate: eachDay.vaccine_date,
        })),
        vaccinationByAge: data.vaccination_by_age,
        vaccinationByGender: data.vaccination_by_gender,
      }
      console.log(modifiedData)
      this.setState({
        dashboardData: modifiedData,
        apiCallStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiCallStatus: apiStatusConstants.failure})
    }
  }

  renderLoaderView = () => (
    <div data-testid="loader" className="loader-container">
      <Loader type="ThreeDots" color="#ffffff" height={80} width={80} />
    </div>
  )

  renderFailedView = () => (
    <div className="failed-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
        className="failed-view-img"
      />
      <h1 className="failed-view-description">Something went wrong</h1>
    </div>
  )

  renderDashboards = () => {
    const {dashboardData} = this.state
    return (
      <div>
        <VaccinationCoverage
          barGraphData={dashboardData.last7DaysVaccination}
        />
        <VaccinationByGender
          genderPiechartData={dashboardData.vaccinationByGender}
        />
        <VaccinationByAge agePiechartData={dashboardData.vaccinationByAge} />
      </div>
    )
  }

  renderDashboardResults = () => {
    const {apiCallStatus} = this.state

    switch (apiCallStatus) {
      case apiStatusConstants.success:
        return this.renderDashboards()
      case apiStatusConstants.failure:
        return this.renderFailedView()
      case apiStatusConstants.inProgress:
        return this.renderLoaderView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="app-container">
        <div className="dashboard-container">
          <div className="logo-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/cowin-logo.png"
              alt="website logo"
              className="logo-img"
            />
            <h1 className="cowin-dashboard">Co-WIN</h1>
          </div>
          <h1 className="description">CoWIN Vaccination in India</h1>
          {this.renderDashboardResults()}
        </div>
      </div>
    )
  }
}

export default CowinDashboard
