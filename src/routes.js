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

import {
  ViewEvent,
  NewEvent,
  ViewImages
} from 'views'

var routes = [
  {
    path: "/view-event",
    name: "View Event",
    icon: "tim-icons icon-chart-pie-36",
    component: ViewEvent,
    layout: "/admin",
  },
  {
    path: "/view-image",
    name: "Images",
    icon: "tim-icons icon-image-02",
    component: ViewImages,
    layout: "/admin",
  },
  {
    path: "/new-event",
    name: "Create Event",
    icon: "tim-icons icon-single-02",
    component: NewEvent,
    layout: "/admin",
  },

];
export default routes;
