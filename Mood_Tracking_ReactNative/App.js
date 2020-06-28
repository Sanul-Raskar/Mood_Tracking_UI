import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button,
  Image,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import LinearGradient from 'react-native-linear-gradient';
import {LinearTextGradient} from 'react-native-text-gradient';

const App = () => {
  const data = [
    {
      moodSmall: 'awful',
      moodBig: 'AWFUL',
      moodBackground: ['#ff8566', '#ff5c33', '#e62e00'],
      moodEmoji: './img/awful.png',
    },
    {
      moodSmall: 'bad',
      moodBig: 'BAD',
      moodBackground: ['#ff8533', '#ff6600', '#e65c00'],
      moodEmoji: './img/bad.png',
    },
    {
      moodSmall: 'okay',
      moodBig: 'OKAY',
      moodBackground: ['#ffa64d', '#ff8c1a', '#e67300'],
      moodEmoji: './img/okay.png',
    },
    {
      moodSmall: 'good',
      moodBig: 'GOOD',
      moodBackground: ['#ffdb4d', '#ffcc00', '#cca300'],
      moodEmoji: './img/good.png',
    },
    {
      moodSmall: 'great',
      moodBig: 'GREAT',
      moodBackground: ['#bfff00', '#ace600', '#99cc00'],
      moodEmoji: './img/great.png',
    },
  ];

  const awfulBackground = ['#ff8566', '#ff5c33', '#e62e00'];
  const badBackground = ['#ff8533', '#ff6600', '#e65c00'];
  const okayBackground = ['#ffa64d', '#ff8c1a', '#e67300'];
  const goodBackground = ['#ffdb4d', '#ffcc00', '#cca300'];
  const greatBackground = ['#bfff00', '#ace600', '#99cc00'];

  let [mood, updateMood] = useState('okay');
  const [moodCounter, updateMoodCounter] = useState(2);
  const [moodBig, updateMoodBig] = useState('AWFUL');
  const [background, changeBackground] = useState(okayBackground);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <View style={styles.body}>
            <Text style={{fontSize: 22, fontWeight: 'bold', color: 'gray'}}>
              Hey Sanul
            </Text>
            <Text style={{fontSize: 28, fontWeight: 'bold'}}>
              How are you feeling?
            </Text>
            <View style={styles.card}>
              <LinearGradient
                colors={awfulBackground}
                style={styles.linearGradient}>
                <LinearTextGradient
                  style={{
                    fontSize: 86,
                    textAlign: 'center',
                    fontWeight: 'bold',
                    marginBottom: -10,
                  }}
                  locations={[0, 1]}
                  colors={['red', 'blue']}
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 0}}>
                  {moodBig}
                </LinearTextGradient>
                <Image
                  style={{width: 160, height: 160}}
                  source={require('./img/awful.png')}
                />
              </LinearGradient>
              <View>
                <Text>I'm feeling {mood}</Text>
                <Button title="Save" />
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.white,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    marginTop: 30,
    backgroundColor: Colors.white,
  },
  card: {
    flex: 1,
    backgroundColor: Colors.white,
    marginVertical: 12,
    height: 400,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    marginHorizontal: 16,
    marginVertical: 12,
  },
  linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
