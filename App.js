import React, { useState, useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import MapViewDirections from 'react-native-maps-directions';

const API_KEY = ''; //ADD GOOGLE MAPS API KEY HERE

const INITIAL_REGION = {
  latitude: 30.04,
  longitude: 31.38,
  latitudeDelta: 2,
  longitudeDelta: 2,
};

export default function App() {
  const [origin, setOrigin] = useState();
  const [destination, setDestination] = useState();
  const mapRef = useRef(null);

  const animateCameraToLocation = (location) => {
    if (mapRef.current) {
      mapRef.current.animateCamera({
        center: location,
        zoom: 15,
        altitude: 750
      });
    }
  };

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={StyleSheet.absoluteFill}
        initialRegion={INITIAL_REGION}
        showsUserLocation
        showsMyLocationButton
        showsTraffic
      >
         {origin !== undefined && (
          <Marker coordinate={origin}/>
        )}
        {destination !== undefined && (
          <Marker coordinate={destination}/>
        )}
        {origin != undefined && destination != undefined ? (
          <MapViewDirections
            origin={origin}
            destination={destination}
            apikey={API_KEY}
            strokeColor="hotpink"
            strokeWidth={4}
          />
        ) : null}
      </MapView>
      <View style={styles.searchContainer}>
        <GooglePlacesAutocomplete
          placeholder="From"
          onPress={(data, details = null) => {
            const location = {
              latitude: details.geometry.location.lat,
              longitude: details.geometry.location.lng,
            };
            setOrigin(location);
            animateCameraToLocation(location);
          }}
          fetchDetails
          query={{
            key: API_KEY,
            language: 'en',
          }}
          styles={{
            textInputContainer: styles.topTextInputContainer,
            textInput: styles.textInput,
            listView: styles.listView,
          }}
        />
        <GooglePlacesAutocomplete
          placeholder="To"
          onPress={(data, details = null) => {
            const location = {
              latitude: details.geometry.location.lat,
              longitude: details.geometry.location.lng,
            };
            setDestination(location);
            animateCameraToLocation(location);
          }}
          fetchDetails
          query={{
            key: API_KEY,
            language: 'en',
          }}
          styles={{
            textInputContainer: styles.textInputContainer,
            textInput: styles.textInput,
            listView: styles.listView,
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchContainer: {
    position: 'absolute',
    top: 10,
    width: '100%',
  },
  textInputContainer: {
    backgroundColor: 'rgba(0,0,0,0)',
    borderTopWidth: 0,
    borderBottomWidth: 0,
    marginHorizontal: 10,
  },
  topTextInputContainer: {
    backgroundColor: 'rgba(0,0,0,0)',
    borderTopWidth: 0,
    borderBottomWidth: 0,
    marginHorizontal: 10,
    paddingTop: 30
  },
  textInput: {
    backgroundColor: '#FFFFFF',
    height: 44,
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    fontSize: 18,
    flex: 1,
  },
  listView: {
    backgroundColor: '#FFFFFF',
  },
});

