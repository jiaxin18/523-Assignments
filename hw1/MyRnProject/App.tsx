/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState} from 'react';
import {
  StyleSheet,
  Button,
  FlatList,
  Text,
  TextInput,
  View,
} from 'react-native';

function App() {
  const [text, onChangeText] = useState('');
  const [tdata, setdata] = useState([{key: 'item1'}, {key: 'item2'}]);
  function add_items(n: string) {
    var newa = [...tdata, {key: n}];
    setdata(newa);
    onChangeText('');
  }
  function del_items(index: number) {
    const newitem = [...tdata];
    newitem.splice(index, 1);
    setdata(newitem);
  }
  return (
    <View>
      <Text style={styles.font}>Hello!</Text>
      <Text style={styles.font}>Please enter the text below:</Text>
      <TextInput
        // eslint-disable-next-line react-native/no-inline-styles
        style={{height: 40, borderColor: 'gray', borderWidth: 1}}
        // eslint-disable-next-line @typescript-eslint/no-shadow
        onChangeText={text => onChangeText(text)}
        defaultValue={text}
      />
      <Button onPress={() => add_items(text)} title="Add" color="#841584" />
      <Text style={styles.font2}>
        There are total {tdata.length} items in the list.
      </Text>
      <FlatList
        data={tdata}
        renderItem={({item, index}) => (
          <View style={styles.fixToText}>
            <Text>{item.key}</Text>
            <Button onPress={() => del_items(index)} title="Del" />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  fixToText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  font: {
    color: '#FF7700',
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center',
    textShadowColor: '#C0C0C0',
    textShadowRadius: 2,
    textShadowOffset: {width: 2, height: 2},
  },
  font2: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default App;
