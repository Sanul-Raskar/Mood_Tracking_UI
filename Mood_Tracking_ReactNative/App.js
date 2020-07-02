import React, {useState, useEffect} from 'react';
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

const MoodTracker = () => {
  const data = [
    {
      moodSmall: 'awful',
      moodBig: 'AWFUL',
      moodBackground: ['#ffad99', '#ff5c33', '#cc2900'],
      moodEmoji: require('./img/awful.png'),
      saveButton: 'rgba(255, 133, 102,0.4)',
      bottomStrip: '#b32400',
      textColor: ['#ffd6cc', '#ff704d'],
      sliderButton: 'rgb(255, 194, 179)',
    },
    {
      moodSmall: 'bad',
      moodBig: 'BAD',
      moodBackground: ['#ffc299', '#ff8533', '#cc5200'],
      moodEmoji: require('./img/bad.png'),
      saveButton: 'rgba(255, 133, 51,0.4)',
      bottomStrip: '#b34700',
      textColor: ['#ffe0cc', '#ff944d'],
      sliderButton: 'rgb(255, 179, 128)',
    },
    {
      moodSmall: 'okay',
      moodBig: 'OKAY',
      moodBackground: ['#ffe5cc', '#ff9933', '#cc6600'],
      moodEmoji: require('./img/okay.png'),
      saveButton: 'rgba(255, 166, 77,0.4)',
      bottomStrip: '#b35900',
      textColor: ['#fff2e6', '#ffb366'],
      sliderButton: 'rgb(255, 206, 153)',
    },
    {
      moodSmall: 'good',
      moodBig: 'GOOD',
      moodBackground: ['#fff0b3', '#ffdb4d', '#cca300'],
      moodEmoji: require('./img/good.png'),
      saveButton: 'rgba(255, 219, 77,0.4)',
      bottomStrip: '#997a00',
      textColor: ['#fffae6', '#ffe680'],
      sliderButton: 'rgb(255, 235, 153)',
    },
    {
      moodSmall: 'great',
      moodBig: 'GREAT',
      moodBackground: ['#80ffbf', '#33ff99', '#00cc66'],
      moodEmoji: require('./img/great.png'),
      saveButton: 'rgba(77, 255, 166,0.4)',
      bottomStrip: '#00b359',
      textColor: ['#e6fff2', '#4dffa6'],
      sliderButton: 'rgb(153, 255, 204)',
    },
  ];

  const profileURL =
    'https://avatars1.githubusercontent.com/u/19240647?s=460&u=4149d5117d3c4fc2bfa3fe70c3d1525c2f9e2635&v=4';

  const [state, updateState] = useState(data[2]);

  const opacity = useState(new Animated.Value(1))[0];
  const transformAnimate = useState(new Animated.Value(1))[0];
  const translateText = useState(new Animated.Value(0))[0];
  const textOpacity = useState(new Animated.Value(1))[0];

  const translateBigText = useState(new Animated.Value(0))[0];
  const bigTextOpacity = useState(new Animated.Value(1))[0];

  const imageScaling = useState(new Animated.Value(1))[0];

  const [activeCounter, updateCounter] = useState(2);

  const size = opacity.interpolate({
    inputRange: [0, 1],
    outputRange: [200, 160],
  });

  useEffect(() => {
    moodSelected();
  }, [activeCounter]);

  const emojiScaleDown = () => {
    Animated.timing(imageScaling, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
      easing: Easing.cubic,
    }).start();
  };

  const emojiScaleUp = () => {
    Animated.timing(imageScaling, {
      toValue: 1.22,
      duration: 100,
      useNativeDriver: true,
      easing: Easing.cubic,
    }).start(() => {
      updateState(data[activeCounter]);
      emojiScaleDown();
    });
  };

  const bigTextTranslateY = () => {
    translateBigText.setValue(40);
    bigTextOpacity.setValue(0);

    Animated.parallel([
      Animated.timing(bigTextOpacity, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
        easing: Easing.cubic,
      }).start(),
      Animated.timing(translateBigText, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true,
        easing: Easing.linear,
      }).start(),
    ]).start();
  };

  const smallTextTranslateY = () => {
    textOpacity.setValue(0);
    translateText.setValue(40);

    Animated.parallel([
      Animated.timing(textOpacity, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
        easing: Easing.cubic,
      }).start(),
      Animated.timing(translateText, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true,
        easing: Easing.linear,
      }).start(),
    ]).start();
  };

  const moodSelected = () => {
    emojiScaleUp();
    Animated.parallel([
      bigTextTranslateY(),
      smallTextTranslateY(),
      scaleAnimation(),
    ]).start();
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
            <Text style={styles.text1}>Hey Sanul</Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginRight: 16,
                marginBottom: 4,
              }}>
              <Text style={styles.text2}>How're you feeling?</Text>
              <Image style={styles.profileImg} source={{uri: profileURL}} />
            </View>
            <Animated.View
              style={[styles.card, {transform: [{scale: transformAnimate}]}]}>
              <LinearGradient
                colors={state.moodBackground}
                style={styles.linearGradient}>
                <Animated.View
                  style={{
                    opacity: bigTextOpacity,
                    transform: [{translateY: translateBigText}],
                  }}>
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
                </Animated.View>

                <Animated.Image
                  style={[
                    styles.emojiImg,
                    {
                      transform: [{scale: imageScaling}],
                    },
                  ]}
                  source={state.moodEmoji}
                />

                <View style={styles.sliderBar}>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <TouchableOpacity
                      style={[
                        styles.sliderButton0Passive,
                        {backgroundColor: state.sliderButton},
                      ]}
                      onPress={() => updateCounter(0)}>
                      {activeCounter == 0 && (
                        <View
                          style={[
                            styles.sliderButton0Active,
                            {borderColor: state.bottomStrip},
                          ]}
                        />
                      )}
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[
                        styles.sliderButton1Passive,
                        {
                          backgroundColor: state.sliderButton,
                        },
                      ]}
                      onPress={() => updateCounter(1)}>
                      {activeCounter == 1 && (
                        <View
                          style={[
                            styles.sliderButton1Active,
                            {
                              borderColor: state.bottomStrip,
                            },
                          ]}
                        />
                      )}
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[
                        styles.sliderButton2Passive,
                        {
                          backgroundColor: state.sliderButton,
                        },
                      ]}
                      onPress={() => updateCounter(2)}>
                      {activeCounter == 2 && (
                        <View
                          style={[
                            styles.sliderButton2Active,
                            {
                              borderColor: state.bottomStrip,
                            },
                          ]}
                        />
                      )}
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[
                        styles.sliderButton3Passive,
                        {
                          backgroundColor: state.sliderButton,
                        },
                      ]}
                      onPress={() => updateCounter(3)}>
                      {activeCounter == 3 && (
                        <View
                          style={[
                            styles.sliderButton3Active,
                            {
                              borderColor: state.bottomStrip,
                            },
                          ]}
                        />
                      )}
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[
                        styles.sliderButton4Passive,
                        {
                          backgroundColor: state.sliderButton,
                        },
                      ]}
                      onPress={() => updateCounter(4)}>
                      {activeCounter == 4 && (
                        <View
                          style={[
                            styles.sliderButton4Active,
                            {
                              borderColor: state.bottomStrip,
                            },
                          ]}
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
                  <Text style={styles.text3}>I'm feeling </Text>
                  <Animated.Text
                    style={[
                      styles.smallMoodText,
                      {
                        opacity: textOpacity,
                        transform: [{translateY: translateText}],
                      },
                    ]}>
                    {state.moodSmall}
                  </Animated.Text>
                  <TouchableOpacity
                    style={[
                      styles.savebutton,
                      {
                        backgroundColor: state.saveButton,
                      },
                    ]}
                    onPress={() => scaleAnimation()}>
                    <Text style={styles.saveButtonText}>SAVE</Text>
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

  text1: {
    fontSize: 22,
    color: 'gray',
    marginTop: 34,
    marginLeft: 16,
  },
  text2: {fontSize: 28, fontWeight: 'bold', marginLeft: 16},
  text3: {
    marginLeft: 26,
    fontSize: 20,
    marginTop: 4,
    color: 'white',
  },
  profileImg: {width: 50, height: 50, borderRadius: 50 / 2},
  linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emojiImg: {width: 160, height: 160, marginBottom: 76, marginTop: -44},
  sliderBar: {
    width: '90%',
    height: 4,
    backgroundColor: 'rgba(242, 242, 242,0.7)',
    marginVertical: 14,
    borderRadius: 20,
    position: 'absolute',
    bottom: 30,
  },
  sliderButton0Passive: {
    width: 20,
    height: 20,
    borderRadius: 20 / 2,
    marginLeft: 0,
    marginTop: -8,
    zIndex: 10,
  },
  sliderButton0Active: {
    backgroundColor: 'white',
    width: 40,
    height: 40,
    borderRadius: 40 / 2,
    marginLeft: -12,
    marginTop: -12,
    borderWidth: 4,
  },
  sliderButton1Passive: {
    width: 26,
    height: 26,
    borderRadius: 26 / 2,
    marginLeft: 10,
    marginTop: -11,
    zIndex: 10,
  },
  sliderButton1Active: {
    backgroundColor: 'white',
    width: 40,
    height: 40,
    borderRadius: 40 / 2,
    marginLeft: -8,
    marginTop: -7,
    borderWidth: 4,
  },
  sliderButton2Passive: {
    width: 30,
    height: 30,
    borderRadius: 30 / 2,
    marginLeft: 10,
    marginTop: -12.6,
    zIndex: 10,
  },
  sliderButton2Active: {
    backgroundColor: 'white',
    width: 40,
    height: 40,
    borderRadius: 40 / 2,
    marginLeft: -6,
    marginTop: -4,
    borderWidth: 4,
  },
  sliderButton3Passive: {
    width: 34,
    height: 34,
    borderRadius: 34 / 2,
    marginLeft: 10,
    marginTop: -14.6,
    zIndex: 10,
  },
  sliderButton3Active: {
    backgroundColor: 'white',
    width: 40,
    height: 40,
    borderRadius: 40 / 2,
    marginLeft: -2,
    marginTop: -2.6,
    borderWidth: 4,
  },
  sliderButton4Passive: {
    width: 38,
    height: 38,
    borderRadius: 38 / 2,
    marginLeft: 8,
    marginTop: -16,
    zIndex: 10,
  },
  sliderButton4Active: {
    backgroundColor: 'white',
    width: 44,
    height: 44,
    borderRadius: 44 / 2,
    marginLeft: -1,
    marginTop: -3,
    borderWidth: 4,
  },
  smallMoodText: {
    fontWeight: 'bold',
    marginLeft: -64,
    fontSize: 20,
    marginTop: 4,
    color: 'white',
  },
  savebutton: {
    color: 'white',
    fontWeight: 'bold',
    width: 66,
    marginRight: 26,
    paddingVertical: 8,
    borderRadius: 12,
  },
  saveButtonText: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default MoodTracker;
