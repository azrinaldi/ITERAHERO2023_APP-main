import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    height: '70%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  monitor: {
    height: '65%',
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 10,
  },
  formula: {
    height: '35%',
  },
  tandon: {
    width: '59%',
    marginRight: '2%',
  },
  sensor: {
    width: '39%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  cardTandon: {
    width: '100%',
    height: '100%',
    backgroundColor: '#ffff',
    borderRadius: 10,
    borderColor: '#171717',
    shadowOpacity: 1,
    elevation: 1,
    shadowRadius: 1,
    padding: 10,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginRight: 10,
  },
  cardSensor: {
    width: '100%',
    height: '31%',
    backgroundColor: '#ffff',
    borderRadius: 10,
    borderColor: '#171717',
    shadowOpacity: 1,
    elevation: 1,
    shadowRadius: 1,
    padding: 5,
    alignItems: 'center',
  },
  cardFormula: {
    width: '100%',
    height: 70,
    backgroundColor: '#ffff',
    borderRadius: 10,
    borderColor: '#171717',
    shadowOpacity: 1,
    elevation: 1,
    shadowRadius: 1,
    marginBottom: 10,
    padding: 10,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  value: {
    fontSize: 28,
    fontFamily: 'Montserrat Bold 700',
  },
  status: {
    padding: 4,
  },
  img: {
    marginVertical: 10,
    width: 200,
    height: 170,
  },
  activityIndicator: {
    position: 'absolute',
    top: '37%',
    left: '45%',
  },
  icon: {
    alignItems: 'center',
  },
});

export default styles;
