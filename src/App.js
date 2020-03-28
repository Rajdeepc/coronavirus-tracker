import React, { useState,Suspense, useEffect } from "react";
import "./App.css";
import ListBox from "./components/Atoms/ListBox/ListBox";
import { fetchService } from "./utils/services";
import { Row,Container, Col } from "react-bootstrap";
import ReactNavbar from './components/molecules/navbar'
import moment from 'moment';

const FilterCoronaByState = React.lazy(() => import("./components/Atoms/Filter/Filter"));


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
                <Suspense fallback={<div>Loading.....</div>}>
                    <FilterCoronaByState countryList={countryList} />
                </Suspense>
               
              </div>
            </Col>
            <Col>
              <div className="statusOfCorona">
                {corona.length
                  ? corona.map(item => {
                      return (
                        <ListBox
                          key={item.countryRegion}
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
