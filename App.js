import { StatusBar } from "expo-status-bar";
import { StyleSheet, ImageBackground } from "react-native";
import { StartGameScreen } from "./screens/StartGameScreen";
import { GameScreen } from "./screens/GameScreen";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { SafeAreaView } from "react-native";
import Colors from "./constants/Colors";
import { GameOverScreen } from "./screens/GameOverScreen";
import { useFonts } from "expo-font";

export default function App() {
  const [userNumber, setUserNumber] = useState();
  const [gameIsOver, setGameIsOver] = useState(true);
  const [guessRounds, setGuessRounds] = useState(0);

  const [fontsLoaded] = useFonts({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
  });
  if (!fontsLoaded) {
    return; //continue with splash
  }

  function pickedNumberHandler(number) {
    setUserNumber(number);
    setGameIsOver(false);
  }

  function gameOverHandler(numberOfRounds) {
    setGameIsOver(true);
    setGuessRounds(numberOfRounds);
  }

  function startNewGameHandler() {
    setUserNumber(null);
    setGuessRounds(0);
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
    screen = (
      <GameOverScreen
        roundsNumber={guessRounds}
        userNumber={userNumber}
        onStartNewGame={ startNewGameHandler }
        
      />
    );
  }

  return (
    <>
      <StatusBar style="light" />
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
    </>
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
