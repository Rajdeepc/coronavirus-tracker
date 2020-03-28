import React from 'react';
import '../ListBox/ListBox.css'
import {ListGroup} from 'react-bootstrap';
import PropTypes from 'prop-types'; // ES6


const CoronaNumberLabel = ({item , coronaItemType}) => {
    console.log(typeof item)
    return (
        <ListGroup.Item>
            <span className={coronaItemType === 'confirmed' ? 'confirmedStyle' : coronaItemType === 'recovered' ? 'recoveredStyle' : 'deathStyle'}>{coronaItemType === 'confirmed' ? item.confirmed : coronaItemType === 'recovered' ? item.recovered : item.deaths}</span> <span>{item.provinceState} {item.countryRegion}</span>
        </ListGroup.Item>
    )
}

CoronaNumberLabel.propTypes = {
    item: PropTypes.shape({
        confirmed: PropTypes.number,
        recovered: PropTypes.number,
        deaths: PropTypes.number,
        provinceState: PropTypes.string,
        countryRegion: PropTypes.string
    }),
    coronaItemType:PropTypes.string.isRequired
}

CoronaNumberLabel.defaultProps = {
    item:{},
    coronaItemType:''
}

export default CoronaNumberLabel