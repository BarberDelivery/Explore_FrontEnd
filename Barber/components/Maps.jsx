import { StatusBar } from "expo-status-bar";
import { useEffect, useRef, useState } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import MapView, { Marker } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import { GOOGLE_MAPS_APIKEY } from "../keyMap";
import * as Location from "expo-location";
import axios from "axios";

import db from "../config/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";

export default function Maps({ navigation }) {
  const [barberLocation, setBarberLocation] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const [userLocation, setUserLocation] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const mapRef = useRef();
  const [errorMsg, setErrorMsg] = useState(null);
  const [position, setPosition] = useState("");
  useFocusEffect(
    useCallback(() => {
      (async () => {
        try {
          let { status } = await Location.requestForegroundPermissionsAsync();
          if (status !== "granted") {
            throw { msg: "Permission to access location was denied" };
          }
          return;
        } catch (err) {
          console.log(err);
        }
      })();

      const intervalId = setInterval(() => {
        (async () => {
          try {
            await Location.watchPositionAsync(
              { enableHighAccuracy: true, timeInterval: 20 },
              (location) => {
                const docRef = doc(db, "Barbers", "1"); //masukin id barber sendiri
                (async () => {
                  await updateDoc(docRef, {
                    location: {
                      latitude: location.coords.latitude,
                      longitude: location.coords.longitude,
                    },
                  });
                })();
              }
            );
            const docRef = doc(db, "Barbers", "1"); //masukin id barber sendiri
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
              console.log(docSnap.data());
              setBarberLocation({
                ...barberLocation,
                latitude: docSnap.data().location.latitude,
                longitude: docSnap.data().location.longitude,
              });
              const apiKey = GOOGLE_MAPS_APIKEY;
              const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${
                docSnap.data().location.latitude
              },${docSnap.data().location.longitude}&destinations=${
                userLocation.latitude
              },${userLocation.longitude}&key=${apiKey}`;
              const config = {
                method: "get",
                url: url,
                headers: {},
              };
              let { data } = await axios(config);
              console.log(data, "<< ini data axios");

              let distance;
              if (data) {
                if (
                  data.rows[0].elements[0].distance?.text.split(" ")[1] === "km"
                ) {
                  distance =
                    +data?.rows[0]?.elements[0]?.distance?.text?.split(" ")[0] *
                    1000;
                } else {
                  distance =
                    +data?.rows[0]?.elements[0]?.distance?.text?.split(" ")[0];
                }
                console.log(distance < 30, distance, "<<<<< distance ");
              }

              if (distance < 30) {
                navigation.navigate("Flags");
              }
            } else {
              console.log("No such document!");
            }
          } catch (err) {
            console.log(err);
          }
        })();
      }, 15000);

      return () => clearInterval(intervalId);
    }, [])
  );

  useEffect(() => {
    (async () => {
      const docRef = doc(db, "Customers", "1"); //masukin id user tujuan
      const docSnap = await getDoc(docRef);
      setUserLocation({
        ...userLocation,
        latitude: docSnap.data().location.latitude,
        longitude: docSnap.data().location.longitude,
      });
    })();
  }, []);

  return (
    <View style={styles.container}>
      <MapView
        showsUserLocation={true}
        ref={mapRef}
        style={StyleSheet.absoluteFill}
        initialRegion={barberLocation}
      >
        <Marker coordinate={barberLocation}>
          <Image
            source={{
              uri: "https://cdn-icons-png.flaticon.com/512/1986/1986937.png",
            }}
            style={{ height: 35, width: 35 }}
          />
        </Marker>
        <Marker coordinate={userLocation} />
        <MapViewDirections
          origin={barberLocation}
          destination={userLocation}
          apikey={GOOGLE_MAPS_APIKEY}
          strokeWidth={3}
          strokeColor="red"
          optimizeWaypoints={true}
          onReady={(result) => {
            mapRef.current.fitToCoordinates(result.coordinates, {
              edgePadding: {
                right: 30,
                botton: 300,
                left: 30,
                top: 100,
              },
            });
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
