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
      moodBackground: ['#ff9980', '#ff5c33', '#cc2900'],
      moodEmoji: require('./img/awful.png'),
      saveButton: 'rgba(255, 133, 102,0.4)',
      bottomStrip: '#b32400',
      textColor: ['#ffc2b3', '#ff704d'],
      sliderButton: 'rgb(255, 194, 179)',
    },
    {
      moodSmall: 'bad',
      moodBig: 'BAD',
      moodBackground: ['#ffb380', '#ff8533', '#cc5200'],
      moodEmoji: require('./img/bad.png'),
      saveButton: 'rgba(255, 133, 51,0.4)',
      bottomStrip: '#b34700',
      textColor: ['#ffd1b3', '#ff8533'],
      sliderButton: 'rgb(255, 179, 128)',
    },
    {
      moodSmall: 'okay',
      moodBig: 'OKAY',
      moodBackground: ['#ffbf80', '#ff9933', '#cc6600'],
      moodEmoji: require('./img/okay.png'),
      saveButton: 'rgba(255, 166, 77,0.4)',
      bottomStrip: '#b35900',
      textColor: ['#ffd9b3', '#ffa64d'],
      sliderButton: 'rgb(255, 206, 153)',
    },
    {
      moodSmall: 'good',
      moodBig: 'GOOD',
      moodBackground: ['#ffe680', '#ffd633', '#cca300'],
      moodEmoji: require('./img/good.png'),
      saveButton: 'rgba(255, 219, 77,0.4)',
      bottomStrip: '#997a00',
      textColor: ['#fff0b3', '#ffdb4d'],
      sliderButton: 'rgb(255, 235, 153)',
    },
    {
      moodSmall: 'great',
      moodBig: 'GREAT',
      moodBackground: ['#80ffbf', '#33ff99', '#00cc66'],
      moodEmoji: require('./img/great.png'),
      saveButton: 'rgba(77, 255, 166,0.4)',
      bottomStrip: '#00b359',
      textColor: ['#b3ffd9', '#4dffa6'],
      sliderButton: 'rgb(153, 255, 204)',
    },
  ];

  const [state, updateState] = useState(data[2]);

  const opacity = useState(new Animated.Value(1))[0];
  const transformAnimate = useState(new Animated.Value(1))[0];
  const translateText = useState(new Animated.Value(0))[0];
  const textOpacity = useState(new Animated.Value(1))[0];

  const [activeCounter, updateCounter] = useState(2);

  const size = opacity.interpolate({
    inputRange: [0, 1],
    outputRange: [200, 160],
  });

  const moodSelected = i => {
    updateCounter(i);
    updateState(data[i]);

    textOpacity.setValue(0);
    translateText.setValue(40);
    Animated.timing(textOpacity, {
      toValue: 1,
      duration: 400,
      useNativeDriver: true,
      easing: Easing.cubic,
    }).start();

    Animated.timing(translateText, {
      toValue: 0,
      duration: 400,
      useNativeDriver: true,
      easing: Easing.linear,
    }).start();

    opacity.setValue(0);
    Animated.timing(opacity, {
      toValue: 1,
      duration: 400,
      useNativeDriver: false,
      easing: Easing.linear,
    }).start();
    scaleAnimation();
  };

  const scaleAnimation = () => {
    Animated.timing(transformAnimate, {
      toValue: 0.98,
      timing: 200,
      useNativeDriver: true,
      easing: Easing.cubic,
    }).start(() => {
      Animated.timing(transformAnimate, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
        easing: Easing.cubic,
      }).start();
    });
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
                color: 'gray',
                marginTop: 34,
                marginLeft: 16,
              }}>
              Hey Sanul
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginRight: 16,
                marginBottom: 4,
              }}>
              <Text style={{fontSize: 28, fontWeight: 'bold', marginLeft: 16}}>
                How're you feeling?
              </Text>
              <Image
                style={{width: 50, height: 50, borderRadius: 50 / 2}}
                source={{
                  uri:
                    'https://avatars1.githubusercontent.com/u/19240647?s=460&u=4149d5117d3c4fc2bfa3fe70c3d1525c2f9e2635&v=4',
                }}
              />
            </View>
            <Animated.View
              style={[styles.card, {transform: [{scale: transformAnimate}]}]}>
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
                    marginBottom: 76,
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
                        zIndex: 10,
                      }}
                      onPress={() => moodSelected(0)}>
                      {activeCounter == 0 && (
                        <View
                          style={{
                            backgroundColor: 'white',
                            width: 40,
                            height: 40,
                            borderRadius: 40 / 2,
                            marginLeft: -12,
                            marginTop: -14,
                            borderWidth: 4,
                            borderColor: state.bottomStrip,
                          }}
                        />
                      )}
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{
                        backgroundColor: state.sliderButton,
                        width: 18,
                        height: 18,
                        borderRadius: 18 / 2,
                        marginLeft: 10,
                        marginTop: -6,
                        zIndex: 10,
                      }}
                      onPress={() => moodSelected(1)}>
                      {activeCounter == 1 && (
                        <View
                          style={{
                            backgroundColor: 'white',
                            width: 40,
                            height: 40,
                            borderRadius: 40 / 2,
                            marginLeft: -10,
                            marginTop: -10,
                            borderWidth: 4,
                            borderColor: state.bottomStrip,
                          }}
                        />
                      )}
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{
                        backgroundColor: state.sliderButton,
                        width: 22,
                        height: 22,
                        borderRadius: 22 / 2,
                        marginLeft: 10,
                        marginTop: -8,
                        zIndex: 10,
                      }}
                      onPress={() => moodSelected(2)}>
                      {activeCounter == 2 && (
                        <View
                          style={{
                            backgroundColor: 'white',
                            width: 40,
                            height: 40,
                            borderRadius: 40 / 2,
                            marginLeft: -8,
                            marginTop: -8,
                            borderWidth: 4,
                            borderColor: state.bottomStrip,
                          }}
                        />
                      )}
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{
                        backgroundColor: state.sliderButton,
                        width: 26,
                        height: 26,
                        borderRadius: 26 / 2,
                        marginLeft: 10,
                        marginTop: -10,
                        zIndex: 10,
                      }}
                      onPress={() => moodSelected(3)}>
                      {activeCounter == 3 && (
                        <View
                          style={{
                            backgroundColor: 'white',
                            width: 40,
                            height: 40,
                            borderRadius: 40 / 2,
                            marginLeft: -8,
                            marginTop: -7,
                            borderWidth: 4,
                            borderColor: state.bottomStrip,
                          }}
                        />
                      )}
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{
                        backgroundColor: state.sliderButton,
                        width: 30,
                        height: 30,
                        borderRadius: 30 / 2,
                        marginLeft: 10,
                        marginTop: -12,
                        zIndex: 10,
                      }}
                      onPress={() => moodSelected(4)}>
                      {activeCounter == 4 && (
                        <View
                          style={{
                            backgroundColor: 'white',
                            width: 40,
                            height: 40,
                            borderRadius: 40 / 2,
                            marginLeft: -6,
                            marginTop: -4,
                            borderWidth: 4,
                            borderColor: state.bottomStrip,
                          }}
                        />
                      )}
                    </TouchableOpacity>
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
                  </Text>
                  <Animated.Text
                    style={{
                      fontWeight: 'bold',
                      marginLeft: -64,
                      fontSize: 20,
                      marginTop: 4,
                      color: 'white',
                      opacity: textOpacity,
                      transform: [{translateY: translateText}],
                    }}>
                    {state.moodSmall}
                  </Animated.Text>
                  <TouchableOpacity
                    style={{
                      color: 'white',
                      fontWeight: 'bold',
                      backgroundColor: state.saveButton,
                      width: 66,
                      marginRight: 26,
                      paddingVertical: 8,
                      borderRadius: 12,
                    }}
                    onPress={() => scaleAnimation()}>
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
            </Animated.View>
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
    marginHorizontal: 16,
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
