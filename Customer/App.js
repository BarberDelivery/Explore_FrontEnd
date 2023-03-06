import { StatusBar } from 'expo-status-bar';
import { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { GOOGLE_MAPS_APIKEY } from './keyMap';
import * as Location from 'expo-location';

import db from "./config/firebase";
import { doc, getDoc, query, where, onSnapshot, collection, updateDoc  } from "firebase/firestore";

export default function App() {

    const [barberLocation, setBarberLocation] = useState({
        latitude : 0,
        longitude : 0,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    })

  const [userLocation, setUserLocation] = useState(
   {
      latitude : 0,
      longitude : 0,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    }
  );
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      // console.log(location);
      setUserLocation({
        ...userLocation,
        latitude : location.coords.latitude,
        longitude : location.coords.longitude
      });
    })();
  }, []);



  useEffect(()=> {
    (async ()=>{
    try {
      const docRef = doc(db, "Barbers", "1");
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        console.log( docSnap.data());
        setBarberLocation({
          ...barberLocation,
          latitude : docSnap?.data()?.location?.latitude,
          longitude : docSnap?.data()?.location?.longitude
        })
        if('distance sampe'){
          setActivty(null)
        }else{
          setActivty(
            docRef
          )
        }
      } else {
        console.log("No such document!");
      }
    } catch (err) {
      
    }
  })();

  },[])

  

  // console.log(userLocation);
    const mapRef = useRef()
    // const {pickupCords, dropLocationCors} = state
  // const {}
  return (
    <View style={styles.container}>
            <MapView
            showsUserLocation={true}
            ref={mapRef}
            style={StyleSheet.absoluteFill}
              initialRegion={barberLocation}
        >
          <Marker 
            coordinate={userLocation}
          />
          <Marker 
            coordinate={barberLocation}
          >
            <Image source={{
                      uri: 'https://cdn-icons-png.flaticon.com/512/1986/1986937.png',
                    }}
            style={{height: 35, width:35 }} />
          </Marker>
          <MapViewDirections
            origin={userLocation}
            destination={barberLocation}
            apikey={GOOGLE_MAPS_APIKEY}
            strokeWidth={3}
            strokeColor="red"
            optimizeWaypoints={true}
            onReady={result => {
              mapRef.current.fitToCoordinates(result.coordinates, {
                edgePadding : {
                  right : 30,
                  botton : 300,
                  left : 30,
                  top : 100
                }
              })
            }}
          />

        </MapView>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

