import React, { useEffect, useState } from "react";
import { fetchService } from "../../../utils/services";
import CoronaStatusListView from "../ListView/LIstView";
import { ListGroup,Card } from "react-bootstrap";

import "./ListBox.css";
const ListBox = ({ coronaItem ,lastUpdatedTime}) => {
  console.log(coronaItem);

  const [coronaListItems, setCoronaListItems] = useState([]);
  useEffect(() => {
    (async () => {
      const coronaTypeList = await fetchService(coronaItem.detail);
      if (coronaTypeList.length > 0) {
        setCoronaListItems(coronaTypeList);
      }
    })();
  }, []);

  return (
    <div className="box-grid">
      <Card>
                    
        <ListGroup.Item>
          <p className="coronaType">Total {coronaItem.type}</p>
          <h3
            className={`numberCoronaStyle ${
              coronaItem.type === "confirmed"
                ? "confirmedStyle"
                : coronaItem.type === "recovered"
                ? "recoveredStyle"
                : "deathStyle"
            }`}
          >
            {coronaItem.value}
          </h3>
        </ListGroup.Item>
        </Card>
        <CoronaStatusListView
          data={coronaListItems}
          coronaItemType={coronaItem.type}
          lastUpdatedAt={lastUpdatedTime}
        />
     
    </div>
  );
};

export default ListBox;
