import React, { useState, useEffect } from "react";

// =========================================================================
// 1. GameCharacter Class Definition
// =========================================================================

/**
 * Represents a game character with health and attack capabilities.
 * This class encapsulates the character's state and behavior.
 */
class GameCharacter {
  // Private field for the character's health, ensuring encapsulation.
  #health;

  /**
   * Constructor for the GameCharacter class.
   * @param {string} name - The name of the character.
   * @param {number} initialHealth - The starting health of the character.
   * @param {number} attackPower - The amount of damage the character deals.
   */
  constructor(name, initialHealth, attackPower) {
    this.name = name;
    this.#health = initialHealth; // Initialize private health
    this.attackPower = attackPower;
  }

  /**
   * Getter for the character's current health.
   * Allows reading the health value from outside the class.
   * @returns {number} The current health.
   */
  get health() {
    return this.#health;
  }

  /**
   * Setter for the character's health.
   * Includes validation to ensure health doesn't go below zero.
   * @param {number} newHealth - The new health value to set.
   */
  set health(newHealth) {
    // Ensure health is a non-negative number.
    this.#health = Math.max(0, newHealth);
  }

  /**
   * Reduces the character's health by a specified amount.
   * @param {number} amount - The amount of damage to take.
   */
  takeDamage(amount) {
    if (amount > 0) {
      this.health -= amount; // Use the setter to ensure health doesn't go below 0
      console.log(`${this.name} took ${amount} damage. Health: ${this.health}`);
    }
  }

  /**
   * Simulates this character attacking a target character.
   * @param {GameCharacter} targetCharacter - The character to attack.
   */
  attack(targetCharacter) {
    console.log(
      `${this.name} attacks ${targetCharacter.name} for ${this.attackPower} damage!`
    );
    targetCharacter.takeDamage(this.attackPower);
  }

  /**
   * Checks if the character is still alive.
   * @returns {boolean} True if health is greater than 0, false otherwise.
   */
  isAlive() {
    return this.#health > 0;
  }

  /**
   * Returns a plain JavaScript object representation of the character's state.
   * Useful for storing in React state as plain objects.
   * @returns {object} A plain object with character data.
   */
  toPlainObject() {
    return {
      name: this.name,
      health: this.#health, // Directly access private field for serialization
      attackPower: this.attackPower,
    };
  }
}

// =========================================================================
// 2. React App Component: Game Logic and UI
// =========================================================================

/**
 * The main application component for the Character Battle Game.
 * Manages game state, character instances, and renders the UI.
 */
function App() {
  // State for the two characters, storing their data as plain objects.
  const [heroData, setHeroData] = useState({
    name: "Hero",
    health: 100,
    attackPower: 15,
  });
  const [monsterData, setMonsterData] = useState({
    name: "Monster",
    health: 120,
    attackPower: 10,
  });

  // State to track whose turn it is ('hero' or 'monster')
  const [turn, setTurn] = useState("hero");

  // State for game messages (e.g., who attacked whom, winner)
  const [message, setMessage] = useState("Battle starts! Hero's turn.");

  // State to track if the game is over
  const [gameOver, setGameOver] = useState(false);

  /**
   * Resets the game to its initial state.
   */
  const resetGame = () => {
    setHeroData({ name: "Hero", health: 100, attackPower: 15 });
    setMonsterData({ name: "Monster", health: 120, attackPower: 10 });
    setTurn("hero");
    setMessage("Battle starts! Hero's turn.");
    setGameOver(false);
  };

  /**
   * Handles an attack action from the current attacker to the target.
   * @param {object} attackerData - Plain data object of the attacker.
   * @param {object} targetData - Plain data object of the target.
   * @param {Function} setAttackerData - React setter for the attacker's data state.
   * @param {Function} setTargetData - React setter for the target's data state.
   */
  const handleAttack = (
    attackerData,
    targetData,
    setAttackerData,
    setTargetData
  ) => {
    if (gameOver) return; // Prevent actions if game is over

    // Create GameCharacter instances from current state data for logic execution
    const currentAttacker = new GameCharacter(
      attackerData.name,
      attackerData.health,
      attackerData.attackPower
    );
    const currentTarget = new GameCharacter(
      targetData.name,
      targetData.health,
      targetData.attackPower
    );

    // Perform the attack using the class method (this modifies currentTarget's internal #health)
    currentAttacker.attack(currentTarget);

    // Update React state with the *new plain object representation* of the updated instances
    // The attacker's health doesn't change from its own attack, but we update its data for consistency
    setAttackerData(currentAttacker.toPlainObject());
    setTargetData(currentTarget.toPlainObject()); // Convert updated target back to plain object

    // Update message
    setMessage(`${currentAttacker.name} attacked ${currentTarget.name}!`);

    // Switch turn
    setTurn(turn === "hero" ? "monster" : "hero");
  };

  /**
   * Effect hook to check for game over conditions whenever hero or monster health changes.
   */
  useEffect(() => {
    // Create temporary instances from current state data for checking game over conditions
    const currentHero = new GameCharacter(
      heroData.name,
      heroData.health,
      heroData.attackPower
    );
    const currentMonster = new GameCharacter(
      monsterData.name,
      monsterData.health,
      monsterData.attackPower
    );

    if (!currentHero.isAlive()) {
      setMessage(
        `${currentHero.name} has been defeated! ${currentMonster.name} wins!`
      );
      setGameOver(true);
    } else if (!currentMonster.isAlive()) {
      setMessage(
        `${currentMonster.name} has been defeated! ${currentHero.name} wins!`
      );
      setGameOver(true);
    } else {
      // If game is not over, update turn message
      if (!gameOver) {
        // Only update if game isn't already over
        setMessage((prevMsg) =>
          prevMsg.includes("attacked")
            ? prevMsg
            : `${turn === "hero" ? heroData.name : monsterData.name}'s turn.`
        );
      }
    }
  }, [
    heroData.health,
    monsterData.health,
    gameOver,
    turn,
    heroData.name,
    monsterData.name,
  ]); // Dependencies

  // =========================================================================
  // 3. UI Rendering
  // =========================================================================

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-700 text-white flex flex-col items-center justify-center p-4 font-inter">
      <h1 className="text-5xl font-extrabold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 rounded-lg p-2">
        Character Battle
      </h1>

      <div className="bg-gray-800 rounded-xl shadow-2xl p-8 w-full max-w-4xl flex flex-col md:flex-row items-center justify-around space-y-8 md:space-y-0 md:space-x-8 border border-purple-700">
        {/* Hero Card */}
        <CharacterCard characterData={heroData} currentTurn={turn} />

        {/* VS Separator */}
        <div className="text-6xl font-bold text-gray-500 hidden md:block">
          VS
        </div>
        <div className="text-4xl font-bold text-gray-500 md:hidden">VS</div>

        {/* Monster Card */}
        <CharacterCard characterData={monsterData} currentTurn={turn} />
      </div>

      {/* Game Messages */}
      <div className="mt-8 bg-gray-800 rounded-xl shadow-xl p-6 w-full max-w-md text-center border border-pink-700">
        <p className="text-2xl font-semibold mb-4">{message}</p>
        {gameOver && (
          <button
            onClick={resetGame}
            className="mt-4 px-6 py-3 bg-gradient-to-r from-green-500 to-teal-500 text-white font-bold rounded-lg shadow-lg hover:from-green-600 hover:to-teal-600 transition transform hover:scale-105 active:scale-95"
          >
            Play Again
          </button>
        )}
      </div>

      {/* Action Buttons */}
      <div className="mt-8 flex space-x-4">
        <button
          onClick={() =>
            handleAttack(heroData, monsterData, setHeroData, setMonsterData)
          }
          disabled={turn !== "hero" || gameOver}
          className={`px-8 py-4 rounded-xl text-xl font-bold shadow-lg transition transform ${
            turn === "hero" && !gameOver
              ? "bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 hover:scale-105 active:scale-95"
              : "bg-gray-600 cursor-not-allowed opacity-50"
          }`}
        >
          Hero Attack
        </button>
        <button
          onClick={() =>
            handleAttack(monsterData, heroData, setMonsterData, setHeroData)
          }
          disabled={turn !== "monster" || gameOver}
          className={`px-8 py-4 rounded-xl text-xl font-bold shadow-lg transition transform ${
            turn === "monster" && !gameOver
              ? "bg-gradient-to-r from-red-500 to-orange-600 hover:from-red-600 hover:to-orange-700 hover:scale-105 active:scale-95"
              : "bg-gray-600 cursor-not-allowed opacity-50"
          }`}
        >
          Monster Attack
        </button>
      </div>
    </div>
  );
}

/**
 * Reusable component to display a character's card.
 * @param {object} props - Component props.
 * @param {object} props.characterData - The plain data object of the character to display.
 * @param {string} props.currentTurn - The name of the character whose turn it is.
 */
function CharacterCard({ characterData, currentTurn }) {
  const isCurrentTurn = characterData.name.toLowerCase() === currentTurn;
  // Max health for health bar calculation (assuming initial values are max)
  const maxHealth = characterData.name === "Hero" ? 100 : 120;
  const healthPercentage = (characterData.health / maxHealth) * 100;

  return (
    <div
      className={`bg-gray-700 rounded-xl p-6 w-full md:w-64 text-center shadow-lg transition-all duration-300 ${
        isCurrentTurn
          ? "border-4 border-yellow-400 scale-105"
          : "border border-gray-600"
      }`}
    >
      <h2 className="text-3xl font-bold mb-3 text-yellow-300">
        {characterData.name}
      </h2>
      <div className="mb-4">
        <p className="text-lg font-semibold">Health: {characterData.health}</p>
        <div className="w-full bg-gray-600 rounded-full h-4 mt-2">
          <div
            className="h-4 rounded-full transition-all duration-500"
            style={{
              width: `${healthPercentage}%`,
              backgroundColor:
                healthPercentage > 50
                  ? "#4CAF50"
                  : healthPercentage > 20
                  ? "#FFC107"
                  : "#F44336",
            }}
          ></div>
        </div>
      </div>
      <p className="text-md text-gray-300">
        Attack Power: {characterData.attackPower}
      </p>
    </div>
  );
}

export default App;
