import {BackHandler, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    marginBottom: 10,
  },
  header: {
    height: '25%',
    backgroundColor: 'black',
  },
  imageBackgroundPlus: {
    backgroundColor: '( rgba(0, 0, 0, 0.4)',
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 15,
  },
  backView: {
    width: '70%',
    flexDirection: 'row',
  },
  monitoringAndControlling: {
    width: '100%',
    height: '75%',
    paddingHorizontal: 10,
  },
});

export default styles;
