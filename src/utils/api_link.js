//const link = 'https://iterahero.herokuapp.com/api/v1'
//const link = 'https://iterahero.fly.dev/api/v1'
//const link = 'https://iterahero2023.fly.dev/api/v1';
const link = 'https://iterahero-e1a0e90da51e.herokuapp.com/api/v1';

export const loginApi = link + '/login';
export const listGreenHouse = link + '/greenhouse';
export const dashboardApi = link + '/dashboard';
export const greenhouseByUserId = link + '/greenhouse/';
export const controllingApi = link + '/actuator?by_greenhouse_id=';
export const monitoringApi = link + '/sensor?by_id_greenhouse=';
export const deleteGreenHouse = link + '/greenhouse/';
export const updateGreenHouse = link + '/greenhouse/';

export const sensorBroker = link + '/sensor_broker?id_sensor=';
export const grafikSensor = link + '/grafik/';
export const subGrafikSensor = '?getDateQuery=';
export const riwayat = (id, month, year) => {
  return link + '/history/sensor/' + id + '?Month=' + month + '&Year=' + year;
};
export const yearData = link + '/grafik/year/';
export const switchAkuator = link + '/actuator-log';
export const akuatorBroker = link + '/actuator-broker?id_actuator='; //+id
export const notificationCount = link + '/notification-count';
export const listNotification = link + '/notification?by_user_id=1';
export const nullCount = link + '/notification-update';

export const listTandon = link + '/tandonUtama';

export const AktuatorGreenhouse = link + '/greenhouse/';
export const AktuatorTandon = link + '/tandonUtama/';
export const switchAkuatorTandon = link + '/kontrol';

export const listSensorTandon = link + '/tandonUtama/';
export const listSensorGreenhouse = link + '/greenhouse/';
export const valueSensor = link + '/logging/sensor';

export const resepPupuk = link + '/resep';
export const apiSimpanResep = link + '/resep';

export const apiPeracikan = link + '/peracikan';

export const apiPenjadwalan = link + '/penjadwalan';
