import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import Voice from '@react-native-community/voice';
import DropDownPicker from 'react-native-dropdown-picker';

const App = () => {
  const [text, setText] = useState('');
  const [result, setResult] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [currentExample, setCurrentExample] = useState('');
  const [items, setItems] = useState([
    {label: 'select language', value: ''},
    {label: 'Arabic', value: 'ar'},
    {label: 'Chinese (Simplified)', value: 'zh-CN'},
    {label: 'Czech', value: 'cs'},
    {label: 'Danish', value: 'da'},
    {label: 'Dutch', value: 'nl'},
    {label: 'Hebrew', value: 'he'},
    {label: 'Finnish', value: 'fi'},
    {label: 'French', value: 'fr'},
    {label: 'German', value: 'de'},
    {label: 'Greek', value: 'el'},
    {label: 'Hungarian', value: 'hu'},
    {label: 'Indonesian', value: 'id'},
    {label: 'Italian', value: 'it'},
    {label: 'Japanese', value: 'ja'},
    {label: 'Korean', value: 'ko'},
    {label: 'Norwegian', value: 'no'},
    {label: 'Spanish', value: 'es'},
  ]);

  const translateText = async (text: string) => {
    if (currentExample !== '') {
      const apiKey = 'AIzaSyCVL6U956LvuHCeMEaXKVvWssRY7DJmvZU';
      const url = `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`;
      const data = {
        q: text,
        target: currentExample, //targetLanguage,
      };
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      const json = await response.json();
      setText(json.data.translations[0].translatedText);
    }
  };

  const speechStartHandler = (e: any) => {
    console.log('speechStart successful', e);
  };
  const speechEndHandler = (e: any) => {
    setLoading(false);
    console.log('stop handler', e);
  };
  const speechResultsHandler = (e: {value: any[]}) => {
    const text = e.value[0];
    setResult(text);
  };
  const startRecording = async () => {
    setLoading(true);
    try {
      await Voice.start('en-Us');
    } catch (error) {
      console.log('error', error);
    }
  };
  const stopRecording = async () => {
    try {
      await Voice.stop();
      setLoading(false);
    } catch (error) {
      console.log('error', error);
    }
  };
  const clear = () => {
    setResult('');
  };
  useEffect(() => {
    Voice.onSpeechStart = speechStartHandler;
    Voice.onSpeechEnd = speechEndHandler;
    Voice.onSpeechResults = speechResultsHandler;
    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const handleChangePicketSelect = () => {
    translateText(result);
  };

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <Text style={styles.headingText}>Voice to Text Recognition</Text>
        <View style={styles.textInputStyle}>
          <TextInput
            value={result}
            multiline={true}
            placeholder="Say something!"
            style={{
              flex: 1,
              height: '100%',
            }}
            onChangeText={text => setResult(text)}
          />
        </View>
        <View style={styles.btnContainer}>
          {isLoading ? (
            <ActivityIndicator size="large" color="black" />
          ) : (
            <TouchableOpacity onPress={startRecording} style={styles.speak}>
              <Text style={{color: 'white', fontWeight: 'bold'}}>Speak</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity style={styles.stop} onPress={stopRecording}>
            <Text style={{color: 'white', fontWeight: 'bold'}}>Stop</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.clear} onPress={clear}>
            <Text style={{color: 'white', fontWeight: 'bold'}}>Clear</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.dropdownPickerWrapper}>
          <Text
            style={{
              paddingLeft: 10,
              paddingRight: 20,
              paddingTop: 14,
              //fontWeight: 'bold',
              fontSize: 16,
            }}>
            Translate to :
          </Text>
          <DropDownPicker
            open={open}
            value={currentExample}
            items={items}
            setItems={setItems}
            setOpen={setOpen}
            setValue={setCurrentExample}
            onChangeValue={handleChangePicketSelect}
            maxHeight={150}
          />
        </View>
        <View style={styles.textOutputStyle}>
          <TextInput
            value={text}
            multiline={true}
            style={{
              flex: 1,
              height: '100%',
            }}
            //onChangeText={text => setResult(text)}
          />
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
    marginVertical: 16,
    marginTop: 0,
    fontWeight: 'bold',
    fontSize: 26,
    color: '#694fad',
  },
  textInputStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    height: 150,
    borderRadius: 20,
    paddingVertical: 16,
    paddingHorizontal: 16,
    shadowOffset: {width: 0, height: 1},
    shadowRadius: 2,
    elevation: 2,
    shadowOpacity: 0.4,
    color: '#000',
  },
  textOutputStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    marginTop: 17,
    height: 150,
    borderRadius: 20,
    paddingVertical: 16,
    paddingHorizontal: 16,
    shadowOffset: {width: 0, height: 1},
    shadowRadius: 2,
    elevation: 2,
    shadowOpacity: 0.4,
    color: '#000',
  },
  speak: {
    backgroundColor: '#694fad',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
    borderRadius: 8,
  },
  stop: {
    backgroundColor: '#c71585',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
    borderRadius: 8,
  },
  clear: {
    backgroundColor: '#694fad',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
    borderRadius: 58,
  },
  btnContainer: {
    display: 'flex',
    flexDirection: 'row',
    with: '50%',
    justifyContent: 'space-evenly',
    marginTop: 24,
  },
  dropdownPickerWrapper: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingTop: 14,
    zIndex: 9,
    width: '60%',
  },
});
export default App;
