import { StatusBar } from "expo-status-bar";
import { StyleSheet, ImageBackground } from "react-native";
import { StartGameScreen } from "./screens/StartGameScreen";
import { GameScreen } from "./screens/GameScreen";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { SafeAreaView } from "react-native";
import Colors from "./constants/Colors";
import { GameOverScreen } from "./screens/GameOverScreen";

export default function App() {
  const [userNumber, setUserNumber] = useState();
  const [gameIsOver, setGameIsOver] = useState(true);

  function pickedNumberHandler(number) {
    setUserNumber(number);
    setGameIsOver(false);
  }

  function gameOverHandler() {
    setGameIsOver(true);
  }

  let screen = <StartGameScreen onConfirmNumber={pickedNumberHandler} />;

  if (userNumber) {
    screen = (
      <GameScreen
        userNumber={userNumber}
        onGameOver={gameOverHandler}
      />
    );
  }

  if (gameIsOver && userNumber) {
    screen = <GameOverScreen />;
  }

  return (
    <LinearGradient
      colors={[Colors.primary900, Colors.accent500]}
      style={styles.rootScreen}
    >
      <ImageBackground
        source={require("./assets/background.png")}
        resizeMode="cover"
        style={styles.rootScreen}
        imageStyle={styles.backgroundImage}
      >
        <SafeAreaView style={styles.rootScreen}>{screen}</SafeAreaView>
      </ImageBackground>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1,
  },
  backgroundImage: {
    opacity: 0.35,
  },
});
