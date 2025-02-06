# Welcome to **Fulll's Exercises** Repository!

> _"May the force be with me !"_

---

### **Part 1: Algorithms** 🤯
First up: the **FizzBuzz** challenge! I've implemented a clean and readable solution. I hope you'll enjoy my approach!

**🔍 Quick recap of FizzBuzz:**
- Numbers divisible by **3**? Say _Fizz!_
- Numbers divisible by **5**? Say _Buzz!_
- Both? So **FizzBuzz!** 🎉

_The goal was simple, but I made a solution that's documented and maintainable._

### **Part 2: Backend ** 
For the main part of the challenge, I designed and implemented a backend system to manage a fleet of vehicles. The system supports registering vehicles, managing multiple fleets, and ensuring vehicles can be registered in different fleets without duplication.

🚧 Note:
I did not fully implement the localization feature in Step 2. However, in terms of structure and business logic, I believe the codebase already covers most of the essential concepts. The logic for vehicle localization would simply involve adding similar query and command handlers to handle location data in the same way as the vehicle and fleet features.

---

## 🔧 Project Structure
Here's a quick guide :

```
fulll/
├── Algo/
│   ├── fizzbuzz.js
│   └── fizzbuzz.md
├── Backend/
│   └── node/
│       ├── data/         #data storage via sqlite
│       └── src/
│           ├── App/      # Application logic (Commands, Handlers, Queries)
│           ├── cli/      # commande line interface files
│           ├── Domain/   # Domain entities and core business rules
│           └── Infra/    # Infrastructure (repositories, database connection)
└── tests/                # BDD tests with Cucumber

```

- **`algo/`**: Contains the FizzBuzz solution.
- **`backend/`**: Contains the Parking solution.

---
## **⏱️ Development Time** 
The total time spent on developing and testing the solution was approximately 8 hours. This includes:

Reading Documentation
Designing the architecture.
Writing BDD tests.
Implementing core features.
Debugging and refining the code.

---

### _"Thank you, for this kind of technical tests !"_

