import random

def spin_slot_machine(balance):
    # List of symbols and their corresponding payouts
    symbols = {
        '🍒': 10,  # payout 10x
        '🔔': 20,  # payout 20x
        '🍋': 5,   # payout 5x
        '⭐': 30,  # payout 30x
        '🍊': 3,   # payout 3x
        '💎': 50   # payout 50x
    }
    
    # Cost to play each spin
    cost_per_spin = 5
    balance -= cost_per_spin
    
    # Spin the slot machine by selecting random symbols
    slots = [random.choice(list(symbols.keys())) for _ in range(3)]
    
    # Display the spin result
    print("Slots: ", " | ".join(slots))
    
    # Determine if the player wins
    if slots[0] == slots[1] == slots[2]:
        win_amount = symbols[slots[0]] * cost_per_spin
        balance += win_amount
        print(f"Jackpot! You won {win_amount}!")
    else:
        print("Try again!")

    return balance

# Main game loop
if __name__ == "__main__":
    balance = 100  # Starting money
    print(f"Welcome to the Slot Machine! You start with ${balance}.")
    
    while balance >= 5:  # Ensuring the player can afford at least one spin
        play_again = input("Play a spin for $5? (y/n): ")
        if play_again.lower() != 'y':
            break
        
        balance = spin_slot_machine(balance)
        print(f"Your current balance is: ${balance}")
        
    print("Thanks for playing! Your final balance is: $", balance)
