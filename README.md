# spongebob-memory-game
This is a memory game where a player can challenge his memory by finding the pairs of cards turning them around. The faster the player finds the pairs the better the score. If the game is executed in multi-player mode, the player with most pairs wins when there are no more pairs to find.

# How to run the node and react app?
 
0. Node for prod: ```npm run start```
1. Node for development: ```npm run dev```
2. React: ```npm start```

# Links to main pages

0. Home page: http://localhost:3000/single-player-top-scores
1. Single player game: http://localhost:3000/single-player
2. Multi player game: http://localhost:3000/multi-player
3. Top 10 score board for single players: http://localhost:3000/single-player-top-scores

# Done

0. Create the git directory
1. Create 2 directories - 1 for back end (node rest api) and 1 for front end (react js)
2. Create db and tables (user, score, user_score)
3. Install node in server directory: npm init
4. Install node dependencies: npm install express mysql cors nodemon --save
5. Create index.js file for node and setup express, mysql, cors, nodemon
6. Install the react: npx create-react-app .
7. Install axios dependency: npm install axios - nope - bonus points for not using any react library - instead write your own router component
8. Create the app entry screen where user selects player mode
9. Create the game settings page (user enters name to form and gets stored to db or gets alredy enterd user) with a button to start the game
10. Create game page with fixed grid and cards displayed randomly (flexible UI), with timer and moves counter
11. Create the logic to hide the cards and flip them on click (add +1 to moves locally)
12. Create the logic if cards are the same, to remove them from the arary of showed cards and to add +1 to the number of pairs
13. Add timer for single mode. At the last found pair the time should stop and get stored to db for the user score
14. Add the high score page at the end for the single player scores (based on time used)

# TODO

15. Add the multiplayer turn based functionality (each has 2 moves, if the cards are the same, the player have 2 more moves until the cards run out or the player doesnt find a pair. Each par is added to the sum of collected pairs for the user. Once all pairs are discovered the game is finnished. The winner is the person with the most amount of pairs. The score of each user is stored to the db for multiplayer score board)


# Work tracking

0. Start at 17:30 on 3.4.2022 
1. Stopped at 19:15 on 3.4.2022 (total 1h 45 min)
2. Start at 9:45 on 4.4.2022
3. Stopped at 10:25 on 4.4.2022 (total 2h 25 min)
4. Start at 16:30 on 4.4 and stopped at 23:30 for a research (total 9h 25 min)
5. Start at 8:30 on 5.4.2022
6. Stopped at 10:00 on 5.4.2022 (total 11h)
7. Start at 20:20 on 5.4.2022
8. Stop at 21:20 on 5.4.2022 (total 12h)

# Possible improvements

0. Improve UI :D
1. Create sequelize db models instead of mysql plain queries
2. Create prod and dev environment files (dotenv) and setup build scripts
3. Create authentication for the game so the scores can be saved for the loggedin user (rewards for players, email notifications on score board changes, challenges from other players to fight against winner and take over the score board first place - additional points to overcome the winner)
4. Add different difficulties for the game (easy/medium/professional)
5. Add noises for when the player wins the game and some animation effects (better user engadgement and addiction/reward for the brain)
6. Create admin area so the admin can change name of the game and images used for the memory and colors of UI
7. Surprise memory reorder of cards during the game
8. Surprise bomb under the card that uncovers more cards sourrounding it
9. Surprise gift on multiplayer mode that a user have more possible moves on his turn
10. Winner animation
11. Enable music for game time (on the settings page)
12. Code tests
13. Validations of inputs
14. User names should be unique and the system should be able to handle storing of score based on user id or unique user name
15. Error pages
16. Error handling
17. Add restart button for the game