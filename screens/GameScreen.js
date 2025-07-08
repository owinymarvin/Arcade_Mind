import { Text, View, StyleSheet, Alert, Button } from "react-native";
import { Title } from "../components/ui/Title";
import { useState, useEffect } from "react";
import { NumberContainer } from "../components/game/NumberContainer";
import { PrimaryButton } from "../components/ui/PrimaryButton";
import { InstructionText } from "../components/ui/InstructionText";
import { Card } from "../components/ui/Card";
import Ionicons from "@expo/vector-icons/Ionicons";

function generateRandomBetween(min, max, exclude) {
  const randNum = Math.floor(Math.random() * (max - min)) + min;
  if (randNum === exclude) {
    return generateRandomBetween(min, max, exclude);
  } else {
    return randNum;
  }
}

let minBoundary = 1;
let maxBoundary = 100;

export function GameScreen({ userNumber, onGameOver }) {
  const initialGuess = generateRandomBetween(1, 100, userNumber);
  const [currentGuess, setCurrentGuess] = useState(initialGuess);
  const [guessRounds, setGuessRounds] = useState([initialGuess]);

  useEffect(() => {
    if (currentGuess === userNumber) {
      onGameOver();
      minBoundary = 1;
      maxBoundary = 100;
    }
  }, [currentGuess, userNumber, onGameOver]);

  function nextGuessHandler(direction) {
    if (
      (direction === "lower" && currentGuess < userNumber) ||
      (direction === "greater" && currentGuess > userNumber)
    ) {
      Alert.alert("Don't lie", "You know this is wrong...", [
        { text: "Sorry!", style: "cancel" },
      ]);
      return;
    }

    if (direction === "lower") {
      maxBoundary = currentGuess;
    } else {
      minBoundary = currentGuess + 1;
    }
    const newRandNum = generateRandomBetween(
      minBoundary,
      maxBoundary,
      currentGuess
    );
    setCurrentGuess(newRandNum);
    setGuessRounds((previous) => [...previous, guessRounds]);
  }
  return (
    <View style={styles.screen}>
      <Title>Opponent's Screen</Title>
      <NumberContainer>{currentGuess}</NumberContainer>

      <Card>
        <InstructionText style={{ marginBottom: 12 }}>
          Higher or Lower?
        </InstructionText>
        <View style={styles.ButtonsContainer}>
          <View style={styles.ButtonContain}>
            <PrimaryButton onPress={nextGuessHandler.bind(this, "lower")}>
              <Ionicons
                name="remove"
                size={24}
                color="white"
              />
            </PrimaryButton>
          </View>
          <View style={styles.ButtonContain}>
            <PrimaryButton onPress={nextGuessHandler.bind(this, "greater")}>
              <Ionicons
                name="add"
                size={24}
                color="white"
              />
            </PrimaryButton>
          </View>
        </View>
      </Card>

      <View>
        {guessRounds.map((each) => (
          <Text key={each}>{each}</Text>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 30,
  },
  ButtonsContainer: {
    flexDirection: "row",
  },
  ButtonContain: {
    flex: 1,
  },
});
