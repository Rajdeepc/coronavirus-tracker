import React, { useState, useEffect } from "react";
import "./App.css";
import ListBox from "./components/Atoms/ListBox/ListBox";
import { fetchService } from "./utils/services";
import FilterCoronaByState from "./components/Atoms/Filter/Filter";
import { Row,Container, Col } from "react-bootstrap";
import ReactNavbar from './components/molecules/navbar'
import moment from 'moment';

function App() {
  const [corona, setCorona] = useState([]);
  const [countryList, setCountries] = useState([]);
  const [lastUpdatedTime, setLastUpdatedTime] = useState("");
  const [coronaListImage, setCoronaListImage] = useState("");

  useEffect(() => {
    (async () => {
      const coronaList = await fetchService("https://covid19.mathdro.id/api");
      let tempCorona = [];
      if (coronaList) {
        let confirmedCases = Object.assign(
          { type: "confirmed" },
          coronaList.confirmed
        );
        let recoveredCases = Object.assign(
          { type: "recovered" },
          coronaList.recovered
        );
        let deathCases = Object.assign({ type: "deaths" }, coronaList.deaths);
        tempCorona.push(confirmedCases, recoveredCases, deathCases);
      }
      setCorona(tempCorona);
      setCoronaListImage(coronaList.image);
      setLastUpdatedTime(coronaList.lastUpdate);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const listOfCountries = await fetchService(
        "https://covid19.mathdro.id/api/countries"
      );
      setCountries(listOfCountries.countries);
    })();
  }, []);

  return (
    <>
    <ReactNavbar lastUpdatedTime={moment(lastUpdatedTime).format('MMMM Do YYYY, h:mm:ss a')}/>
    <Container fluid>

    
    <Row>
      <Col>
        <div className="App">
          <Row>
            <Col>
              <div className="findCoronaByState">
                <div>
                  <img src={coronaListImage} alt="" />
                </div>
                <FilterCoronaByState countryList={countryList} />
              </div>
            </Col>
            <Col>
              <div className="statusOfCorona">
                {corona.length
                  ? corona.map(item => {
                      return (
                        <ListBox
                          coronaItem={item}
                          lastUpdatedTime={lastUpdatedTime}
                        />
                      );
                    })
                  : null}
              </div>
            </Col>
          </Row>
        </div>
      </Col>
    </Row>
    </Container>
    </>
  );
}

export default App;
