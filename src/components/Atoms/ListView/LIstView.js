import React from "react";
import CoronaNumberLabel from "../CoronaNumberLabel/CoronaNumberLabel";
import { ListGroup, Card } from "react-bootstrap";

const CoronaStatusListView = ({ data, coronaItemType }) => {
  return (
    <Card.Body>
      <ListGroup>
        {data.length > 0
          ? data.map((item,index) => {
              return (
                <CoronaNumberLabel
                  key={index}
                  item={item}
                  coronaItemType={coronaItemType}
                />
              );
            })
          : null}
      </ListGroup>
      
    </Card.Body>
  );
};

export default CoronaStatusListView;
