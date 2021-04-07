/*!

=========================================================
* Black Dashboard React v1.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/black-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/black-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { useState } from "react";

import { SelectEvent } from '../contexts/SeletedEvent';
import { OnEventList } from '../contexts/OnEventList';
import {EventList, EventDisplay} from '../components';

function Dashboard() {
  const [ selectEvent, setSelectEvent ] = useState( null );
  const [ onEventList, setOnEventList] = useState( true );

  return (
    <SelectEvent.Provider value={{ selectEvent, setSelectEvent }}>
      <OnEventList.Provider value={{onEventList, setOnEventList}}>
      {
        (onEventList)?<EventList/>:<EventDisplay/>
      }
      </OnEventList.Provider>
    </SelectEvent.Provider>
  );
}

export default Dashboard;
