import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Image,
  Animated,
  Easing,
  TouchableOpacity,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import {LinearTextGradient} from 'react-native-text-gradient';

const App = () => {
  const data = [
    {
      moodSmall: 'awful',
      moodBig: 'AWFUL',
      moodBackground: ['#ff704d', '#ff5c33', '#e62e00'],
      moodEmoji: require('./img/awful.png'),
      saveButton: 'rgba(255, 133, 102,0.4)',
      bottomStrip: '#cc2900',
      textColor: ['#ffc2b3', '#ff5c33'],
      sliderButton: 'rgb(255, 194, 179)',
    },
    {
      moodSmall: 'bad',
      moodBig: 'BAD',
      moodBackground: ['#ff8533', '#ff6600', '#e65c00'],
      moodEmoji: require('./img/bad.png'),
      saveButton: 'rgba(255, 133, 51,0.4)',
      bottomStrip: '#cc5200',
      textColor: ['#ffb380', '#ff8533'],
      sliderButton: 'rgb(255, 179, 128)',
    },
    {
      moodSmall: 'okay',
      moodBig: 'OKAY',
      moodBackground: ['#ff9933', '#ff8c1a', '#e67300'],
      moodEmoji: require('./img/okay.png'),
      saveButton: 'rgba(255, 166, 77,0.4)',
      bottomStrip: '#cc6600',
      textColor: ['#ffcc99', '#ff9933'],
      sliderButton: 'rgb(255, 206, 153)',
    },
    {
      moodSmall: 'good',
      moodBig: 'GOOD',
      moodBackground: ['#ffd633', '#ffcc00', '#cca300'],
      moodEmoji: require('./img/good.png'),
      saveButton: 'rgba(255, 219, 77,0.4)',
      bottomStrip: '#b38f00',
      textColor: ['#ffeb99', '#ffd11a'],
      sliderButton: 'rgb(255, 235, 153)',
    },
    {
      moodSmall: 'great',
      moodBig: 'GREAT',
      moodBackground: ['#ffff66', '#ace600', '#99cc00'],
      moodEmoji: require('./img/great.png'),
      saveButton: 'rgba(255, 219, 77,0.4)',
      bottomStrip: '#86b300',
      textColor: ['#d2ff4d', '#c6ff1a'],
      sliderButton: 'rgb(210, 255, 77)',
    },
  ];

  const [state, updateState] = useState(data[2]);

  const opacity = useState(new Animated.Value(1))[0];

  const size = opacity.interpolate({
    inputRange: [0, 1],
    outputRange: [200, 160],
  });

  const moodSelected = i => {
    updateState(data[i]);

    opacity.setValue(0);
    Animated.timing(opacity, {
      toValue: 1,
      duration: 500,
      useNativeDriver: false,
      easing: Easing.linear,
    }).start();
  };

  return (
    <View>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <SafeAreaView>
        <ScrollView contentInsetAdjustmentBehavior="automatic">
          <View style={styles.body}>
            <Text
              style={{
                fontSize: 22,
                fontWeight: 'bold',
                color: 'gray',
                marginTop: 34,
                marginLeft: 14,
              }}>
              Hey Sanul
            </Text>
            <Text style={{fontSize: 28, fontWeight: 'bold', marginLeft: 14}}>
              How are you feeling?
            </Text>
            <View style={styles.card}>
              <LinearGradient
                colors={state.moodBackground}
                style={styles.linearGradient}>
                <LinearTextGradient
                  style={{
                    fontSize: 86,
                    textAlign: 'center',
                    fontWeight: 'bold',
                  }}
                  locations={[0.37, 0.86]}
                  colors={state.textColor}
                  start={{x: 0.5, y: 0}}
                  end={{x: 0.5, y: 1}}>
                  <Text>{state.moodBig}</Text>
                </LinearTextGradient>

                <Animated.Image
                  style={{
                    opacity,
                    width: size,
                    height: size,
                    marginBottom: 60,
                    marginTop: -44,
                  }}
                  source={state.moodEmoji}
                />

                <View
                  style={{
                    width: '90%',
                    height: 4,
                    backgroundColor: 'rgba(242, 242, 242,0.7)',
                    marginVertical: 14,
                    borderRadius: 20,
                    position: 'absolute',
                    bottom: 30,
                  }}>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <TouchableOpacity
                      style={{
                        backgroundColor: state.sliderButton,
                        width: 14,
                        height: 14,
                        borderRadius: 14 / 2,
                        marginLeft: 0,
                        marginTop: -4,
                      }}
                      onPress={() => moodSelected(0)}
                    />
                    <TouchableOpacity
                      style={{
                        backgroundColor: state.sliderButton,
                        width: 18,
                        height: 18,
                        borderRadius: 18 / 2,
                        marginLeft: 10,
                        marginTop: -6,
                      }}
                      onPress={() => moodSelected(1)}
                    />
                    <TouchableOpacity
                      style={{
                        backgroundColor: state.sliderButton,
                        width: 22,
                        height: 22,
                        borderRadius: 22 / 2,
                        marginLeft: 10,
                        marginTop: -8,
                      }}
                      onPress={() => moodSelected(2)}
                    />
                    <TouchableOpacity
                      style={{
                        backgroundColor: state.sliderButton,
                        width: 26,
                        height: 26,
                        borderRadius: 26 / 2,
                        marginLeft: 10,
                        marginTop: -10,
                      }}
                      onPress={() => moodSelected(3)}
                    />
                    <TouchableOpacity
                      style={{
                        backgroundColor: state.sliderButton,
                        width: 30,
                        height: 30,
                        borderRadius: 30 / 2,
                        marginLeft: 10,
                        marginTop: -12,
                      }}
                      onPress={() => moodSelected(4)}
                    />
                  </View>
                </View>
              </LinearGradient>
              <View
                style={{
                  backgroundColor: state.bottomStrip,
                  paddingVertical: 10,
                  marginTop: -4,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text
                    style={{
                      marginLeft: 26,
                      fontSize: 20,
                      marginTop: 4,
                      color: 'white',
                    }}>
                    I'm feeling{' '}
                    <Text style={{fontWeight: 'bold'}}>{state.moodSmall}</Text>
                  </Text>
                  <TouchableOpacity
                    style={{
                      color: 'white',
                      fontWeight: 'bold',
                      backgroundColor: state.saveButton,
                      width: 66,
                      marginRight: 26,
                      paddingVertical: 8,
                      borderRadius: 12,
                    }}>
                    <Text
                      style={{
                        textAlign: 'center',
                        fontSize: 18,
                        fontWeight: 'bold',
                        color: 'white',
                      }}>
                      SAVE
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: 'white',
  },
  card: {
    flex: 1,
    backgroundColor: 'white',
    marginVertical: 12,
    height: 380,
    borderRadius: 12,
    marginHorizontal: 14,
    overflow: 'hidden',
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
