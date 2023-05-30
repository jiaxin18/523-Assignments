# Final Project


## Explain the working of your App.
1) translate English to another language, and use audio on the phone to speak it out (text-to-speech)
2) use the microphone on the phone for English speech recognition to present as text, and 
translate it to another language (speech-to-text)
3) use the camera on the phone to text recognition, and then translate to another language
Native APIs: camera, speech, microphone, audio 
External APIs: language translation, text-to-speech, speech-to-text, text recognition

### How many hours it took you to complete building it.
40-60 hours


### What were the most challenging parts.
1. Select the corresponding pronunciation for different languages. Only the corresponding language id in the IOS language package can read the corresponding language, for example, en-us speech can only read the en-us text correctly, not fr-fr or any other language text.
2. Handle the permission conflict between microphone (react-native-voice API) and device’s audio (text-to-speech API) in IOS.
3. When the dropdown menu is opened, its content is obscured by other components on the page.


### Mention all the websites and other resources you used to build this App.
https://www.react-native-vision-camera.com/docs/guides/frame-processor-plugin-list
https://blog.logrocket.com/react-native-visioncamera-demo-alternatives/
https://github.com/mrousavy/react-native-vision-camera
https://www.npmjs.com/package/react-native-tts
https://github.com/KoreanThinker/react-native-translator
https://github.com/hossein-zare/react-native-dropdown-picker
https://www.npmjs.com/package/@react-native-community/voice
https://github.com/rodgomesc/vision-camera-ocr
https://github.com/software-mansion/react-native-reanimated
https://reactnavigation.org/docs/material-bottom-tab-navigator
https://blog.openreplay.com/doing-speech-to-text-with-react-native/
https://reactnative.dev/docs/navigation
https://github.com/react-native-voice/voice/issues/146
https://stackoverflow.com/questions/73611332/is-there-a-way-to-decrease-the-height-of-dropdown-picker-react-native-dropdown
https://oblador.github.io/react-native-vector-icons/

