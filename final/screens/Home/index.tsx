import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../RootStackPrams';

type mainScreenProp = StackNavigationProp<RootStackParamList, 'Home'>;

const App = () => {
  const navigation = useNavigation<mainScreenProp>();
  return (
    <View style={styles.container}>
      <SafeAreaView>
        <View>
          <Text style={styles.headingText}>Home</Text>
          <TouchableOpacity
            style={styles.buttonStyle}
            onPress={() => navigation.navigate('Speech')}>
            <Text style={styles.buttonTextStyle}>Text to Voice</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonStyle}
            onPress={() => navigation.navigate('Text')}>
            <Text style={styles.buttonTextStyle}>Voice to Text</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonStyle}
            onPress={() => navigation.navigate('Camera')}>
            <Text style={styles.buttonTextStyle}>Text Recognition</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffe4e1',
    padding: 24,
  },
  headingText: {
    alignSelf: 'center',
    marginVertical: 10,
    marginTop: 10,
    fontWeight: 'bold',
    fontSize: 26,
    color: '#694fad',
  },
  buttonStyle: {
    justifyContent: 'center',
    marginTop: 35,
    marginLeft: 35,
    padding: 35,
    backgroundColor: '#a9a9a9',
    borderRadius: 38,
    width: '80%',
  },
  buttonTextStyle: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 22,
  },
});

export default App;
