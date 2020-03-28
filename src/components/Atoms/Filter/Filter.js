import React, { useEffect, useState } from "react";
import { fetchService } from "../../../utils/services";
import { Table, Form, Container, Row } from 'react-bootstrap';
import PropTypes from 'prop-types'; // ES6

const FilterCoronaByState = ({ countryList }) => {
  const [selectedCountry, setSelectedCountry] = useState("Albania");
  const [coronaByState, setCoronaByState] = useState([]);

  useEffect(() => {
    if (selectedCountry) {
      (async () => {
        const coronaListByCountry = await fetchService(
          `https://covid19.mathdro.id/api/countries/${selectedCountry}`
        );
        if (Object.keys(coronaListByCountry).length !== 0) {
          const coronaListByState = await fetchService(
            coronaListByCountry.confirmed.detail
          );
          setCoronaByState(coronaListByState);
        }
      })();
    }
  }, [selectedCountry]);

  const onFilterChange = event => {
    setSelectedCountry(event.target.value);
  };

  return (
    <React.Fragment>
      <Container>
        <Row>
          <Form>
            <Form.Group controlId="exampleForm.SelectCustom">
              <Form.Label><h5>Select Country to see statewise count:</h5></Form.Label>
              <Form.Control as="select" placeholder="select" onChange={(event) => onFilterChange(event)}>
                {countryList.length !== 0 && (
                  countryList.map(item => {
                    return (
                      <option value={item.iso3} key={item.iso2}>
                        {item.name}
                      </option>
                    );
                  })
                )}

              </Form.Control>
            </Form.Group>
          </Form>
          </Row>
        </Container>
    <div>
      <Table striped bordered hover>

        <thead>
          <tr>
            <th>State Name</th>
            <th>Confirmed</th>
            <th>Active</th>
            <th>Recovered</th>
            <th>Deaths</th>
          </tr>
        </thead>
        <tbody>
          {coronaByState.length > 0
            ? coronaByState.map(item => {
              return (
                <tr>
                  <td>{item.provinceState}</td>
                  <td>{item.confirmed}</td>
                  <td>{item.active}</td>
                  <td>{item.recovered}</td>
                  <td>{item.deaths}</td>
                </tr>
              );
            })
            : null}
        </tbody>
      </Table>
    </div>
        
    </React.Fragment >
  );
};


FilterCoronaByState.propTypes = {
  countryList: PropTypes.arrayOf
}

FilterCoronaByState.defaultProps = {
  countryList:[]
}

export default FilterCoronaByState;
