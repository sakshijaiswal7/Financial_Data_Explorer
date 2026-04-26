import React, { useState } from 'react'
import { companyname } from './utils/company'
import { secapi } from './services/secApisedgar'
import './App.css'

const App = () => {
  const [company, setCompany] = useState('')
  const [select, setSelect] = useState('')
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  const handlechange = async (e) => {
    const newValue = e.target.value;
    console.log(newValue)
    setCompany(newValue)

    const ciknum = companyname[newValue];
    setSelect(ciknum)
    setError(false)
    setLoading(true);


    try {

      const response = await secapi(ciknum)
      setData(response)

    } catch (err) {
      setError(true)
      setData(null)

    } finally {
      setLoading(false)
    }

  }
  const gaap = data?.facts?.["us-gaap"]

  const revenue =
    gaap?.Revenues ||
    gaap?.RevenueFromContractWithCustomerExcludingAssessedTax ||
    gaap?.SalesRevenueNet;

  const revenueData = revenue?.units?.USD || [];
  const assetsData = gaap?.Assets?.units?.USD || [];
  const liabilitiesData = gaap?.Liabilities?.units?.USD || [];

  return (

    <div  className="container">
     <div className="header">
    <h1>FINANCIAL DATA EXPLORER</h1>
    <h3>Sec Edgar Filings</h3>
  </div>
  <div className="search-box">
      <select value={company} onChange={handlechange}>
        <option value="">Select company</option>
        <option value="apple">Apple</option>
        <option value="tesla">Tesla</option>
        <option value="microsoft">Microsoft</option>
        <option value="google">Google</option>
        <option value="amazon">Amazon</option>
        <option value="meta">Meta</option>
        <option value="netflix">Netflix</option>
        <option value="nvidia">Nvidia</option>
        <option value="adobe">Adobe</option>
      </select>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p>Please check your internet connection</p>}
      {!loading &&
        !error && data && (
          <div>
            <div>
              <h2>Revenue</h2>
              <table border="1">
                <thead>
                  <tr>
                    <th>Year</th>
                    <th>Value</th>
                  </tr>
                </thead>
                <tbody>
                  {revenueData.slice(0, 5).map((item, index) => (
                    <tr key={index}>
                      <td>{item.end}</td>
                      <td>{item.val}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div>
              <h2>Assets</h2>
              <table border="1">
                <thead>
                  <tr>
                    <th>Year</th>
                    <th>Value</th>
                  </tr>
                </thead>
                <tbody>
                  {assetsData.slice(0, 5).map((item, index) => (
                    <tr key={index}>
                      <td>{item.end}</td>
                      <td>{item.val}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div>
              <h2>Liabilities</h2>
              <table border="1">
                <thead>
                  <tr>
                    <th>Year</th>
                    <th>Value</th>
                  </tr>
                </thead>
                <tbody>
                  {liabilitiesData.slice(0, 5).map((item, index) => (
                    <tr key={index}>
                      <td>{item.end}</td>
                      <td>{item.val}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}


    </div>
  )
}

export default App