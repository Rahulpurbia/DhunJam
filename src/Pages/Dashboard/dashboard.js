import React, { useState, useEffect } from "react"
import axios from "axios"
import "./dashboard.css"
import Rupee from "../../Images/rupee.png"
import CustomInput from "../../Components/CustomInput"
import PrimaryBtn from "../../Components/PrimaryBtn"

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isDiabled, setIsDisabled] = useState(false)

  const maxValue = Math.max(
    dashboardData?.amount?.category_6,
    dashboardData?.amount?.category_7,
    dashboardData?.amount?.category_8,
    dashboardData?.amount?.category_9,
    dashboardData?.amount?.category_10
  )

  const fetchDashboardData = () => {
    setIsLoading(true)
    axios
      .get("https://stg.dhunjam.in/account/admin/4")
      .then((response) => {
        if (response.data.status == 200) {
          setDashboardData(response.data.data)
        }
      })
      .catch((error) => {
        console.log(error)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  const updateDashboardData = () => {
    axios.put("https://stg.dhunjam.in/account/admin/4", {
      charge_customers: dashboardData?.charge_customers,
      amount: {
        category_6: dashboardData?.amount?.category_6,
        category_7: dashboardData?.amount?.category_7,
        category_8: dashboardData?.amount?.category_8,
        category_9: dashboardData?.amount?.category_9,
        category_10: dashboardData?.amount?.category_10,
      },
    })
  }

  const handleChange = (e) => {
    const inputValue = e.target.value
    const inputName = e.target.name
    setDashboardData({ ...dashboardData, amount: { ...dashboardData.amount, [inputName]: inputValue } })
  }

  const handleRadioButtons = (e) => {
    setDashboardData({ ...dashboardData, charge_customers: e.target.value === "yes" ? true : false })
  }

  useEffect(() => {
    fetchDashboardData()
  }, [])

  useEffect(() => {
    setIsDisabled(() => {
      return (
        (dashboardData?.charge_customers && dashboardData?.amount?.category_6 <= 99) ||
        dashboardData?.amount?.category_7 <= 79 ||
        dashboardData?.amount?.category_8 <= 59 ||
        dashboardData?.amount?.category_9 <= 39 ||
        dashboardData?.amount?.category_10 <= 19
      )
    })
  }, [dashboardData?.amount, dashboardData?.charge_customers])

  return (
    <div className="minheight-100  dark-background center">
      {isLoading ? (
        <div className="mt-10">....Loading </div>
      ) : (
        <div className="width-600">
          <h3 className="heading text-center">
            {dashboardData.name}, {dashboardData.location} on Dhun Jam
          </h3>

          <div className="d-flex gap-5 justify-content-center mt-10">
            <div className="flex-1 text-left">Do you want to charge your customers for requesting songs?</div>
            <div className="d-flex gap-2 flex-1 justify-content-center">
              <div className="d-flex align-items-center gap-1">
                <input
                  type="radio"
                  name="charge_customers"
                  id="charge_yes"
                  checked={dashboardData.charge_customers === true}
                  value="yes"
                  onChange={handleRadioButtons}
                />
                <label htmlFor="charge_yes">Yes</label>
              </div>
              <div className="d-flex align-items-center gap-1">
                <input
                  type="radio"
                  name="charge_customer"
                  id="charge_no"
                  value="no"
                  checked={dashboardData.charge_customers === false}
                  onChange={handleRadioButtons}
                />
                <label htmlFor="charge_no">No</label>
              </div>
            </div>
          </div>
          <div className="d-flex gap-5 justify-content-between mt-10 align-items-center">
            <div className={`flex-1 text-left ${!dashboardData?.charge_customers ? "disable-color" : ""}`}>Custom song request amount-</div>
            <CustomInput
              type="number"
              name="category_6"
              className="flex-1"
              value={dashboardData?.amount?.category_6}
              handleChange={handleChange}
              disabled={!dashboardData?.charge_customers}
            />
          </div>
          <div className="d-flex gap-5 justify-content-between mt-10 align-items-center">
            <div className={`flex-1 text-left ${!dashboardData?.charge_customers ? "disable-color" : ""}`}>Regular song request amount, from hight to low-</div>
            <div className="flex-1 d-flex gap-2">
              <CustomInput
                type="number"
                name="category_7"
                className="flex-1 small-input"
                value={dashboardData?.amount?.category_7}
                handleChange={handleChange}
                disabled={!dashboardData?.charge_customers}
              />
              <CustomInput
                type="number"
                name="category_8"
                className="flex-1 small-input"
                value={dashboardData?.amount?.category_8}
                handleChange={handleChange}
                disabled={!dashboardData?.charge_customers}
              />
              <CustomInput
                type="number"
                name="category_9"
                className="flex-1 small-input"
                value={dashboardData?.amount?.category_9}
                handleChange={handleChange}
                disabled={!dashboardData?.charge_customers}
              />
              <CustomInput
                type="number"
                name="category_10"
                className="flex-1 small-input"
                value={dashboardData?.amount?.category_10}
                handleChange={handleChange}
                disabled={!dashboardData?.charge_customers}
              />
            </div>
          </div>

          {dashboardData?.charge_customers && (
            <div className="position-relative">
              <div className="graph-y-axis">
                <img src={Rupee} alt="rupee" />
              </div>
              <div>
                <div className="graph-section">
                  <div style={{ height: `${(dashboardData?.amount?.category_6 / maxValue) * 350}px` }}></div>
                  <div style={{ height: `${(dashboardData?.amount?.category_7 / maxValue) * 350}px` }}></div>
                  <div style={{ height: `${(dashboardData?.amount?.category_8 / maxValue) * 350}px` }}></div>
                  <div style={{ height: `${(dashboardData?.amount?.category_9 / maxValue) * 350}px` }}></div>
                  <div style={{ height: `${(dashboardData?.amount?.category_10 / maxValue) * 350}px` }}></div>
                </div>
                <div className="graph-x-axis">
                  <span>Custom</span>
                  <span>Category1</span>
                  <span>Category2</span>
                  <span>Category3</span>
                  <span>Category4</span>
                </div>
              </div>
            </div>
          )}
          <PrimaryBtn text="Save" className="mt-30" onClick={updateDashboardData} disable={isDiabled} />
        </div>
      )}
    </div>
  )
}

export default Dashboard
