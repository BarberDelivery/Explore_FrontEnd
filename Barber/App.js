import { StatusBar } from 'expo-status-bar';
import { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
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
    latitude: -6.175392, 
    latitudeDelta: 0.0922, 
    longitude: 106.827153, 
    longitudeDelta: 0.0421
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

      // let location = await Location.getCurrentPositionAsync({});
      let location = await Location.watchPositionAsync(
        { enableHighAccuracy: true, distanceInterval: 10 },
        (location) => {
          // setLocation(location);
          return location
        }
      );
      // console.log( {
      //   latitude : location.coords.latitude,
      //   longitude : location.coords.latitude
      // }, '<<<< ini gps');
      const docRef = doc(db, "Barbers", "1");
       await updateDoc(docRef, {
        location : {
          latitude : location.coords.latitude,
          longitude : location.coords.longitude
        }
      })

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
          latitude : docSnap.data().location.latitude,
          longitude : docSnap.data().location.longitude
        })
        
      } else {
        console.log("No such document!");
      }
    } catch (err) {
      
    }
  })();

  },[]);
// (async ()=>{
//     try {
//       const washingtonRef = doc(db, "Barbers", "1");
//         await updateDoc(washingtonRef, {
//           name: "yanto"
//         });
//     } catch (err) {
      
//     }
//   })();
  

  console.log(barberLocation, '<<<< barber');
  console.log(userLocation, '<<< user');
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
            coordinate={barberLocation}
          >
            <Image source={{
                      uri: 'https://cdn-icons-png.flaticon.com/512/1986/1986937.png',
                    }}
            style={{height: 35, width:35 }} />
          </Marker>
          <Marker 
            coordinate={userLocation}
          />
          <MapViewDirections
            origin={barberLocation}
            destination={userLocation}
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

     
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

