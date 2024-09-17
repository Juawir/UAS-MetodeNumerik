import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import Ionicons from "@expo/vector-icons/Ionicons";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import XLSX from "xlsx";

const Home = () => {
  const [x0, setX0] = useState("");
  const [tol, setTol] = useState("");
  const [iterations, setIterations] = useState([]);
  const [root, setRoot] = useState(null);

  const a = 12;
  const b = 3;

  const iterativeFormula = (x) => {
    return (1 / b) * (2 * x + a / x ** 2);
  };

  const iterativeMethod = async (x0, tol) => {
    x0 = parseFloat(x0);
    tol = parseFloat(tol);

    const results = [];
    let iter_count = 0;
    let x = x0;
    let error = tol + 1;

    while (error > tol) {
      let x1 = iterativeFormula(x);
      error = Math.abs(x1 - x);

      results.push({
        iter_count: iter_count + 1,
        x: x.toFixed(5),
        x1: x1.toFixed(5),
        x2: (x ** 2).toFixed(5),
        error: error.toFixed(5),
      });

      x = x1;
      iter_count += 1;
    }

    setIterations(results);
    setRoot(x);
  };

  const downloadExcel = async () => {
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(iterations);
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    const wbout = XLSX.write(wb, { type: "base64", bookType: "xlsx" });

    const uri = FileSystem.cacheDirectory + "iterative_method.xlsx";
    await FileSystem.writeAsStringAsync(uri, wbout, {
      encoding: FileSystem.EncodingType.Base64,
    });

    await Sharing.shareAsync(uri, {
      mimeType:
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      dialogTitle: "Download Hasil Iteratif",
      UTI: "com.microsoft.excel.xlsx",
    });
  };

  return (
    <View style={{ flex: 1 }}>
      <StatusBar
        style="auto"
        translucent={true}
        backgroundColor="transparent"
      />
      <View style={{ flex: 1 }}>
        <View
          style={{
            backgroundColor: "rgb(133, 193, 233 )",
            width: "100%",
            height: "10%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* isi navbar atas*/}
          <Text
            style={{ textAlign: "center", fontWeight: "500", fontSize: 14 }}
          >
            Aplikasi Mini Metode Numerik {"\n"} Metode Iteratif
          </Text>
        </View>
        <View
          style={{
            backgroundColor: "white",
            width: "100%",
            height: "80%",
            alignItems: "center",
          }}
        >
          <View
            style={{
              marginHorizontal: "10%",
              backgroundColor: "white",
              width: "90%",
              height: "100%",
              padding: 20,
            }}
          >
            {/* isi program disini */}
            <ScrollView>
              <Text style={styles.title}>Metode Iteratif Newton Raphson</Text>
              <TextInput
                style={styles.input}
                placeholder="Masukkan tebakan awal x0"
                keyboardType="numeric"
                value={x0}
                onChangeText={setX0}
              />
              <TextInput
                style={styles.input}
                placeholder="Masukkan toleransi"
                keyboardType="numeric"
                value={tol}
                onChangeText={setTol}
              />
              <TouchableOpacity
                style={styles.button}
                onPress={() => iterativeMethod(x0, tol)}
              >
                <Text style={styles.buttonText}>Hitung Akar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, { marginTop: 10 }]}
                onPress={downloadExcel}
              >
                <Text style={styles.buttonText}>Unduh Hasil</Text>
              </TouchableOpacity>
              {iterations.length > 0 && (
                <View>
                  <Text style={styles.result}>
                    Akar ditemukan: {root.toFixed(5)}
                  </Text>
                  <Text style={styles.subtitle}>Iterasi:</Text>
                  <View style={styles.tableHeader}>
                    <Text style={styles.tableHeaderCell}>Iterasi</Text>
                    <Text style={styles.tableHeaderCell}>x</Text>
                    <Text style={styles.tableHeaderCell}>x1</Text>
                    <Text style={styles.tableHeaderCell}>x^2</Text>
                    <Text style={styles.tableHeaderCell}>Galat</Text>
                  </View>
                  {iterations.map((iter) => (
                    <View key={iter.iter_count} style={styles.tableRow}>
                      <Text style={styles.tableCell}>{iter.iter_count}</Text>
                      <Text style={styles.tableCell}>{iter.x}</Text>
                      <Text style={styles.tableCell}>{iter.x1}</Text>
                      <Text style={styles.tableCell}>{iter.x2}</Text>
                      <Text style={styles.tableCell}>{iter.error}</Text>
                    </View>
                  ))}
                </View>
              )}
            </ScrollView>
          </View>
        </View>
        <View
          style={{
            backgroundColor: "rgb(133, 193, 233 )",
            width: "100%",
            height: "10%",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "row",
          }}
        >
          <TouchableOpacity>
            <Ionicons
              name="arrow-back-circle-sharp"
              size={50}
              color="black"
              style={{ marginRight: 30 }}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons
              name="chatbubbles-sharp"
              size={50}
              color="black"
              style={{ marginLeft: 30 }}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: "blue",
    padding: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  result: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 20,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#ddd",
    paddingVertical: 5,
  },
  tableHeaderCell: {
    flex: 1,
    textAlign: "center",
    fontWeight: "bold",
  },
  tableRow: {
    flexDirection: "row",
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  tableCell: {
    flex: 1,
    textAlign: "center",
  },
});

export default Home;
