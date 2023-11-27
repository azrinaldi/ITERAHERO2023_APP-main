import { View } from 'react-native';
import LottieView from 'lottie-react-native';
const Loading = () => {
    return (
        <View style={{ height: '100%', width: '100%', justifyContent: 'center', alignItems: 'center' }}>
            <LottieView source={require('../../assets/loading/loadingMonitor.json')} autoPlay loop />
        </View>
    )
}
export default Loading