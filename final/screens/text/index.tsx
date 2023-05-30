/* eslint-disable prettier/prettier */
import React from 'react';
import {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TextInput,
  Keyboard,
  TouchableOpacity,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Slider from '@react-native-community/slider';

// import Tts Text to Speech
import Tts from 'react-native-tts';
import {TranslatorProvider} from 'react-native-translator';
import DropDownPicker from 'react-native-dropdown-picker';

const App = () => {
  const [ttsStatus, setTtsStatus] = useState('initiliazing');
  const [selectedVoice, setSelectedVoice] = useState('');
  const [speechRate, setSpeechRate] = useState(0.5);
  const [speechPitch, setSpeechPitch] = useState(1);
  const [text, setText] = useState('');

  //const [value, setValue] = useState('');
  const [result, setResult] = useState('');
  //console.log('value:', value, 'result:', result);
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

  useEffect(() => {
    Tts.addEventListener('tts-start', _event => setTtsStatus('started'));
    Tts.addEventListener('tts-finish', _event => setTtsStatus('finished'));
    Tts.addEventListener('tts-cancel', _event => setTtsStatus('cancelled'));
    Tts.setDefaultRate(speechRate);
    Tts.setDefaultPitch(speechPitch);
    //Tts.getInitStatus().then(initTts);
    return () => {
      Tts.removeEventListener('tts-start', _event => setTtsStatus('started'));
      Tts.removeEventListener('tts-finish', _event => setTtsStatus('finished'));
      Tts.removeEventListener('tts-cancel', _event =>
        setTtsStatus('cancelled'),
      );
    };
  }, []);

  const onVoicePress = async (voice: { id: any; name?: string; language: any; }) => {
    try {
      await Tts.setDefaultLanguage(voice.language);
    } catch (err) {
      // Samsung S9 has always this error:
      // "Language is not supported"
      console.log('setDefaultLanguage error ', err);
    }
    await Tts.setDefaultVoice(voice.id);
    setSelectedVoice(voice.id);
  };

  const readText = async () => {
    Tts.stop();
    Tts.speak(result);
  };

  const updateSpeechRate = async (rate: React.SetStateAction<number>) => {
    await Tts.setDefaultRate(rate);
    setSpeechRate(rate);
  };

  const updateSpeechPitch = async (rate: React.SetStateAction<number>) => {
    await Tts.setDefaultPitch(rate);
    setSpeechPitch(rate);
  };

  const translateText = async (text: string) => {
    if (currentExample !== ''){
      const apiKey = 'AIzaSyCVL6U956LvuHCeMEaXKVvWssRY7DJmvZU';
      const url = `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`;
      const data = {
        q: text,
        target: currentExample,//targetLanguage,
      };
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      const json = await response.json();
      setResult(json.data.translations[0].translatedText);
      if (currentExample === 'zh-CN'){
        const i = {id: 'com.apple.speech.synthesis.voice.tingting', name: 'Ting-Ting', language: 'zh-CN'};
        onVoicePress(i);
      } else if (currentExample === 'ar') {
        const i = {id: 'com.apple.speech.synthesis.voice.maged', name: 'Maged', language: 'ar-SA'};
        onVoicePress(i);
      } else if (currentExample === 'cs') {
        const i = {id: 'com.apple.speech.synthesis.voice.zuzana', name: 'Zuzana', language: 'cs-CZ'};
        onVoicePress(i);
      } else if (currentExample === 'da') {
        const i = {id: 'com.apple.speech.synthesis.voice.sara', name: 'Sara', language: 'da-DK'};
        onVoicePress(i);
      } else if (currentExample === 'nl') {
        const i = {id: 'com.apple.speech.synthesis.voice.xander', name: 'Xander', language: 'nl-NL'};
        onVoicePress(i);
      } else if (currentExample === 'he') {
        const i = {id: 'com.apple.speech.synthesis.voice.carmit', name: 'Carmit', language: 'he-IL'};
        onVoicePress(i);
      } else if (currentExample === 'fi') {
        const i = {id: 'com.apple.speech.synthesis.voice.satu', name: 'Satu', language: 'fi-FI'};
        onVoicePress(i);
      } else if (currentExample === 'fr') {
        const i = {id: 'com.apple.speech.synthesis.voice.thomas', name: 'Thomas', language: 'fr-FR'};
        onVoicePress(i);
      } else if (currentExample === 'de') {
        const i = {id: 'com.apple.speech.synthesis.voice.anna', name: 'Anna', language: 'de-DE'};
        onVoicePress(i);
      } else if (currentExample === 'el') {
        const i = {id: 'com.apple.speech.synthesis.voice.melina', name: 'Melina', language: 'el-GR'};
        onVoicePress(i);
      } else if (currentExample === 'hu') {
        const i = {id: 'com.apple.speech.synthesis.voice.mariska', name: 'Mariska', language: 'hu-HU'};
        onVoicePress(i);
      } else if (currentExample === 'id') {
        const i = {id: 'com.apple.speech.synthesis.voice.damayanti', name: 'Damayanti', language: 'id-ID'};
        onVoicePress(i);
      } else if (currentExample === 'it') {
        const i = {id: 'com.apple.speech.synthesis.voice.alice', name: 'Alice', language: 'it-IT'};
        onVoicePress(i);
      } else if (currentExample === 'ja') {
        const i = {id: 'com.apple.speech.synthesis.voice.kyoko', name: 'Kyoko', language: 'ja-JP'};
        onVoicePress(i);
      } else if (currentExample === 'ko') {
        const i = {id: 'com.apple.speech.synthesis.voice.yuna', name: 'Yuna', language: 'ko-KR'};
        onVoicePress(i);
      } else if (currentExample === 'no') {
        const i = {id: 'com.apple.speech.synthesis.voice.nora', name: 'Nora', language: 'no-NO'};
        onVoicePress(i);
      } else if (currentExample === 'es') {
        const i = {id: 'com.apple.speech.synthesis.voice.monica', name: 'Mónica', language: 'es-ES'};
        onVoicePress(i);
      } else {
        const i = {id: 'com.apple.speech.synthesis.voice.Alex', name: 'Alex', language: 'en-US'};
        onVoicePress(i);
      }
    }
  };

 const handleChangePicketSelect = () => {
    translateText(text);
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <Text style={styles.titleText}>
          Text to Speech Conversion
        </Text>
        <View style={styles.textInput}>
        <TextInput
          onChangeText={text => setText(text)}
          style={{
            flex: 1,
            height: '100%',
          }}
          value={text}
          onSubmitEditing={Keyboard.dismiss}
          multiline={true}
          placeholder="Type to translate..."
        />
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
            maxHeight={250}
          />
        </View>
        <View style={styles.textOutputStyle}>
        <TextInput
          //onChangeText={text => setText(text)}
          value={result}
          multiline={true}
          style={{
            flex: 1,
            height: '100%',
          }}
        />
        </View>
        <View style={styles.s}>
          <View>
        <View style={styles.sliderContainer}>
          <Text style={styles.sliderLabel}>
            {`Speed: ${speechRate.toFixed(2)}`}
          </Text>
          <Slider
            style={styles.slider}
            minimumValue={0.01}
            maximumValue={0.99}
            value={speechRate}
            onSlidingComplete={updateSpeechRate}
          />
        </View>
        <View style={styles.sliderContainer}>
          <Text style={styles.sliderLabel}>
            {`Pitch: ${speechPitch.toFixed(2)}`}
          </Text>
          <Slider
            style={styles.slider}
            minimumValue={0.5}
            maximumValue={2}
            value={speechPitch}
            onSlidingComplete={updateSpeechPitch}
          />
        </View>
        </View>
        <TouchableOpacity style={styles.buttonStyle} onPress={readText}>
          {`${ttsStatus || ''}` === 'started' ? (
            <MaterialCommunityIcons name="volume-high" color="#694fad" size={26} />
          ) : (<MaterialCommunityIcons name="volume-medium" color="#694fad" size={26} />)
          }
          <Text style={styles.buttonTextStyle}>Read</Text>
        </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#ffe4e1',
    padding: 24,
  },
  titleText: {
    alignSelf: 'center',
    marginVertical: 16,
    marginTop: 0,
    fontWeight: 'bold',
    fontSize: 26,
    color: '#694fad',
  },
  buttonStyle: {
    justifyContent: 'flex-start',
    padding: 10,
    marginLeft: 20,
    backgroundColor: '#ffe4e1',
    borderRadius: 68,
  },
  buttonTextStyle: {
    color: '#daa520',
    textAlign: 'center',
  },
  buttonImageIconStyle: {
    padding: 10,
    margin: 5,
    height: 25,
    width: 25,
    resizeMode: 'stretch',
  },
  buttonIconSeparatorStyle: {
    backgroundColor: '#fff',
    width: 1,
    height: 40,
  },
  sliderContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: 240,
    padding: 5,
  },
  sliderLabel: {
    textAlign: 'center',
    marginRight: 10,
  },
  slider: {
    flex: 1,
  },
  textInput: {
    height: 100,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 20,
    paddingVertical: 16,
    paddingHorizontal: 16,
    shadowOffset: {width: 0, height: 1},
    shadowRadius: 2,
    elevation: 2,
    shadowOpacity: 0.4,
    color: '#000',
  },
  dropdownPickerWrapper: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingTop: 14,
    zIndex: 9,
    width: '60%',
  },
  s: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingTop: 14,
    width: '60%',
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
});

export default function () {
  return (
    <TranslatorProvider>
      <App />
    </TranslatorProvider>
  );
}
