import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Flag from "./components/Flag";
import Maps from "./components/Maps";

const Stack = createNativeStackNavigator();

export default function App() {
  const [barberLocation, setBarberLocation] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const [userLocation, setUserLocation] = useState({
    latitude: -6.175392,
    latitudeDelta: 0.0922,
    longitude: 106.827153,
    longitudeDelta: 0.0421,
  });
  const [errorMsg, setErrorMsg] = useState(null);
  const [position, setPosition] = useState("");
  useEffect(() => {
    
    const intervalId = setInterval(() => {
      // Code to be executed repeatedly
      (async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          setErrorMsg("Permission to access location was denied");
          return;
        }

        // let location = await Location.getCurrentPositionAsync({});
        await Location.watchPositionAsync(
          { enableHighAccuracy: true, timeInterval: 20 },
          (location) => {
            const docRef = doc(db, "Barbers", "1");
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
      })();
    }, 15000);

    // Clear the interval when the component unmounts or when the dependencies change
    return () => clearInterval(intervalId);
  }, [barberLocation]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      // Code to be executed repeatedly
      (async () => {
        try {
          const docRef = doc(db, "Barbers", "1");
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            console.log(docSnap.data());
            setBarberLocation({
              ...barberLocation,
              latitude: docSnap.data().location.latitude,
              longitude: docSnap.data().location.longitude,
            });
          } else {
            console.log("No such document!");
          }
        } catch (err) {}
      })();
    }, 15000);

    // Clear the interval when the component unmounts or when the dependencies change
    return () => clearInterval(intervalId);
  }, [barberLocation]);
  // (async ()=>{
  //     try {
  //       const washingtonRef = doc(db, "Barbers", "1");
  //         await updateDoc(washingtonRef, {
  //           name: "yanto"
  //         });
  //     } catch (err) {

  //     }
  //   })();

  console.log(barberLocation, "<<<< barber");
  console.log(userLocation, "<<< user");
  const mapRef = useRef();
  // const {pickupCords, dropLocationCors} = state
  // const {}
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Maps"
          options={{ headerShown: false }}
          component={Maps}
        />
        <Stack.Screen
          name="Flags"
          options={{ headerShown: false }}
          component={Flag}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
