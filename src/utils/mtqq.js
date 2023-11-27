import AsyncStorage from "@react-native-async-storage/async-storage";
import init from 'react_native_mqtt';
import uuid from 'react-native-uuid';
// import { AsyncStorage } from "react-native";

const topicsub = 'led1client'
const topic = 'ledserver'

init({
    size: 10000,
    storageBackend: AsyncStorage,
    defaultExpires: 1000 * 3600 * 24,
    enableCache: true,
    sync: {}
});

const [isLED1Disabled, setIsLED1Disabled] = useState(false)
useEffect(() => {
    console.log('mounted'),
        setIsLED1Disabled(true)
}, [])

const onMessageArrived = (message) => {
    console.log('onMessageArrived: ' + message.payloadSting)
    if (message.payloadSting == 'led:pong') {
        onLED1Connect()
    }
}
const onLED1Connect = () => {
    console.log('led connected')
    setIsLED1Disabled(false)
}

const onConnect = () => {
    console.log('onConnect')
    client.subscribe(topicsub),
        client.publish(topic, 'ping')
}

const onLight = () => {
    client.publish(topic, 'power')
}


const client = new Paho.MQTT.Client('168.123.2.23', 9001, 'clienname')
client.onMessageArrived = onMessageArrived
client.connect({
    onSuccess: onConnect,
    useSSL: false,
    userName: 'mqttusername',
    password: 'mqttpassword'
})