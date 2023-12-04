import {
  CHOICE_MENU_BERANDA,
  CHOICE_MENU_GH,
  CHOICE_MENU_TANDON,
  CHOICE_DETAIL,
  GET_FIRST_GREENHOUSE,
  GET_API_LIST_GREENHOUSE,
  GET_API_GREENHOUSE_BY_ID,
  GET_API_MONITORING_BY_ID,
  GET_API_CONTROLLING_BY_ID,
  GET_FIRST_TANDON,
  GET_API_LIST_TANDON,
  GET_AKTUATOR_TANDON_BY_ID,
  GET_API_DASHBOARD,
  GET_FIRST_DASHBOARD,
  GET_RESEP_PUPUK,
  GET_JADWAL,
  GET_LIST_SENSOR_TANDON,
  GET_VALUE_SENSOR,
  GET_LIST_SENSOR_GREENHOUSE,
  GET_LIST_AKTUATOR_GREENHOUSE,
} from './action';

const initialState = {
  menuMoCon: 'monitoring',
  menuGraRi: 'graphic',
  menuGreTa: 'greenhouse',
  menuTandon: 'peracikan',

  dataListTandon: [],
  dataAktuatorTandonById: [],

  dataListGreenHouse: [],

  dataDashboard: [],
  dataGreenHouseById: [],
  dataMonitoringByid: [],
  dataControllingByid: [],

  dataResepPupuk: [],
  dataJadwal: [],
  dataListAktuatorGreenhouse: [],
  dataListSensorGreenhouse: [],
  dataListSensorTandon: [],
  dataValueSensor: [],
};

function userReducer(state = initialState, action) {
  switch (action.type) {
    case CHOICE_MENU_BERANDA:
      return {...state, menuGreTa: action.data};
    case CHOICE_MENU_GH:
      return {...state, menuMoCon: action.data};
    case CHOICE_MENU_TANDON:
      return {...state, menuTandon: action.data};
    case CHOICE_DETAIL:
      return {...state, menuGraRi: action.data};
    case GET_API_LIST_GREENHOUSE:
      return {...state, dataListGreenHouse: action.data};
    case GET_API_DASHBOARD:
      return {...state, dataDashboard: action.data};
    case GET_API_GREENHOUSE_BY_ID:
      return {...state, dataGreenHouseById: action.payload};
    case GET_API_MONITORING_BY_ID:
      return {...state, dataMonitoringByid: action.payload};
    case GET_API_CONTROLLING_BY_ID:
      return {...state, dataControllingByid: action.payload};
    case GET_FIRST_GREENHOUSE:
      return {...state, dataListGreenHouse: action.payload};
    case GET_FIRST_DASHBOARD:
      return {...state, dataDashboard: action.payload};
    case GET_FIRST_TANDON:
      return {...state, dataListTandon: action.payload};
    case GET_API_LIST_TANDON:
      return {...state, dataListTandon: action.data};
    case GET_AKTUATOR_TANDON_BY_ID:
      return {...state, dataAktuatorTandonById: action.payload};
    case GET_RESEP_PUPUK:
      return {...state, dataResepPupuk: action.payload};
    case GET_JADWAL:
      return {...state, dataJadwal: action.payload};
    case GET_LIST_SENSOR_GREENHOUSE:
      return {...state, dataListSensorGreenhouse: action.payload};
    case GET_LIST_SENSOR_TANDON:
      return {...state, dataListSensorTandon: action.payload};
    case GET_VALUE_SENSOR:
      return {...state, dataValueSensor: action.payload};
    case GET_LIST_SENSOR_GREENHOUSE:
      return {...state, dataListSensorGreenhouse: action.payload};
    case GET_LIST_AKTUATOR_GREENHOUSE:
      return {...state, dataListAktuatorGreenhouse: action.payload};
    default:
      return state;
  }
}

export default userReducer;
