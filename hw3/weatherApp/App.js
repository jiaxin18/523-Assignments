import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  TextInput,
  Button,
  StyleSheet,
  PermissionsAndroid,
  ToastAndroid,
} from 'react-native';
import axios from 'axios';
import Geolocation from 'react-native-geolocation-service';

const App = () => {
  const [apiData, setApiData] = useState({});
  const [getState, setGetState] = useState('');
  const [state, setState] = useState('');
  const apiKey = '4a0ded407f1745d0a63c2a07e2eb9897';
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${state}&appid=${apiKey}`;

  const AskPermission = async permission => {
    try {
      const granted = await PermissionsAndroid.request(permission, {
        title: 'Location Permission',
        message: 'Allow Location Permission.',
        //   buttonNeutral: "Ask Me Later",
        //   buttonNegative: "Cancel",
        buttonPositive: 'OK',
      });
      if (granted === true || granted === PermissionsAndroid.RESULTS.GRANTED) {
        // console.warn("Permission Granted");
      } else {
        // console.warn("Permission Denied");
      }
    } catch (err) {
      console.warn(err);
    }
  };

  useEffect(() => {
    try {
      axios
        .get(apiUrl)
        .then(response => {
          console.log(response.data);
          setApiData(response.data);
          setGetState('');
        })
        .catch(error => {
          setApiData({});
          ToastAndroid.showWithGravity(
            //'Error' + error,
            'Error: Please enter a correct city name!',
            ToastAndroid.SHORT,
            ToastAndroid.CENTER,
          );
        });
    } catch (err) {
      ToastAndroid.showWithGravity(
        'Error' + err,
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
    }
  }, [apiUrl]);

  useEffect(() => {
    let permission = PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION;
    if (AskPermission(permission)) {
      Geolocation.getCurrentPosition(
        position => {
          //console.log(position);
          fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}`,
          )
            .then(res => res.json())
            .then(data => setApiData(data));
        },
        error => {
          console.log(error.code, error.message);
        },
        {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
      );
    }
  }, []);

  const submitHandler = () => {
    setState(getState);
    setGetState('');
  };

  const kelvinToFarenheit = k => {
    return (k - 273.15).toFixed(2);
  };

  return (
    <View>
      <View style={styles.container}>
        <View style={styles.searchBox}>
          <TextInput
            style={styles.inputText}
            onChangeText={getState => setGetState(getState)}
            defaultValue={getState}
          />
        </View>
        <Button
          color="#808080"
          title="Search"
          onPress={() => submitHandler(getState)}
        />
      </View>
      <View>
        {apiData.main ? (
          <>
            <View style={styles.item}>
              <Text>City Name: {apiData.name}</Text>
            </View>
            <View style={styles.item}>
              <Text>
                Current Temperature: {kelvinToFarenheit(apiData.main.temp)}&deg;
                C
              </Text>
            </View>
            <View style={styles.item}>
              <Text>
                Min Temperature: {kelvinToFarenheit(apiData.main.temp_min)}&deg;
                C
              </Text>
            </View>
            <View style={styles.item}>
              <Text>
                Max Temperature: {kelvinToFarenheit(apiData.main.temp_max)}&deg;
                C
              </Text>
            </View>
            <View style={styles.item}>
              <Text>Weather Condition: {apiData.weather[0].main}</Text>
            </View>
          </>
        ) : (
          <>
            <View style={styles.item}>
              <Text>City Name: N/A</Text>
            </View>
            <View style={styles.item}>
              <Text>Current Temperature: N/A</Text>
            </View>
            <View style={styles.item}>
              <Text>Min Temperature: N/A</Text>
            </View>
            <View style={styles.item}>
              <Text>Max Temperature: N/A</Text>
            </View>
            <View style={styles.item}>
              <Text>Weather Condition: N/A</Text>
            </View>
          </>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 0,
    height: 58,
    backgroundColor: '#e6c3c3',
    alignItems: 'center',
  },
  searchBox: {
    height: 40,
    flexDirection: 'row',
    flex: 1,
    borderRadius: 5,
    backgroundColor: 'white',
    alignItems: 'center',
    marginLeft: 8,
    marginRight: 8,
  },
  inputText: {
    flex: 1,
    backgroundColor: 'transparent',
    fontSize: 15,
  },
  container2: {
    flex: 1,
    marginTop: 0,
  },
  item: {
    backgroundColor: '#e6cfe6',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});

export default App;
