import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import * as Speech from 'expo-speech';

const AudioPlayer = ({ chapter, isPlaying, onPlayPause, onStop, playbackRate, setPlaybackRate }) => {
  return (
    <View style={styles.playerContainer}>
      <Text style={styles.chapterTitle}>{chapter.title}</Text>
      <View style={styles.controls}>
        <TouchableOpacity onPress={onPlayPause}>
          <Icon name={isPlaying ? 'pause' : 'play'} size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity onPress={onStop}>
          <Icon name="stop" size={24} color="red" />
        </TouchableOpacity>
      </View>
      <View style={styles.rateSelector}>
        <Text style={styles.rateText}>Playback Speed: {playbackRate}x</Text>
        <TouchableOpacity onPress={() => setPlaybackRate(playbackRate - 0.1)}>
          <Text style={styles.rateButton}>-</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setPlaybackRate(playbackRate + 0.1)}>
          <Text style={styles.rateButton}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  playerContainer: {
    backgroundColor: '#1E293B',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  chapterTitle: {
    color: 'white',
    fontSize: 18,
    marginBottom: 10,
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '40%',
  },
  rateSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  rateText: {
    color: 'white',
    marginRight: 10,
  },
  rateButton: {
    color: '#3B82F6',
    marginHorizontal: 5,
  },
});

export default AudioPlayer;
