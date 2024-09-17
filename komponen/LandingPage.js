import { StatusBar } from "expo-status-bar";
import { FontAwesome5 } from "@expo/vector-icons";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  TextInput,
  TouchableOpacity,
} from "react-native";

// function App() {
//   const hover = Gesture.Hover();

//   return (
//     <GestureDetector gesture={hover}>
//     </GestureDetector>
//   );
// }

export default function LandingPage() {
  return (
    <View style={{ flex: 1 }}>
      <StatusBar
        style="auto"
        translucent={true}
        backgroundColor="transparent"
      />
      <ImageBackground
        source={require("../assets/image/landingpage.jpg")}
        resizeMode="cover"
        style={{
          width: "100%",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
        blurRadius={2}
      >
        <View
          style={{
            backgroundColor: "rgba(70, 105, 255, 0.5)",
            width: "70%",
            height: "50%",
            borderColor: "red",
            alignItems: "center",
            justifyContent: "flex-end",
            borderRadius: 10,
            elevation: 10,
          }}
        >
          <Text
            style={{
              textAlign: "justify",
              marginBottom: "50%",
              color: "white",
              fontWeight: "bold",
              fontSize: 16,
            }}
          >
            Aplikasi Ujian Akhir semester 4 {"\n"} simulasi program yang
            berbentuk {"\n"}aplikasi yang dirancang untuk {"\n"} menjawab ujian
            akhir semester {"\n"}yang diberikan bu dosen
          </Text>
          <TouchableOpacity
            style={{
              backgroundColor: "#dddd",
              width: "85%",
              height: "20%",
              borderRadius: 30,
              marginBottom: "10%",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text>Coba Sekarang</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
}
