import Home from "../home";
import Dashborad from "../dashboard";

const routes = [
  { path: '/dash-board', exact:true, name: 'Dash', component: Dashborad },
  { path: '/home', exact:true, name: 'Dash', component: Home },

]
export default routes;
