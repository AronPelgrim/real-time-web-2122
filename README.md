# Rijksquiz
The course Real-Time Web is about learning how to build a real-time application.

## Concept: Rijksmuseum quiz 1
I want to create a multyplayer quiz using the Rijksdata API. Each user will get to see three paintings and one artist. One of these paintings matches the artist. Following that, the user will have to choose which painting matches the artist. If the user gets the answer right, they will get a point.

## Concept: Rijksmuseum quiz 2
I want to create a multyplayer quiz using the Rijksdata API. Each user user will get to see the three paintings of the same artist. The user will have to guess which artist matches these three paintings. The user will get three chances to get the answer right. If the user gets the answer right, they will get a point.

## Concept: Rijksmuseum quiz 3 (chosen)
I want to create a multyplayer quiz using the Rijksdata API. Each user user will get to see a painting and the name of the artist. Then, the user can guess the name of the painting out of three answers. If the user gets the answer right, they will get a point.

## Sketch
<img width="600" alt="Schermafbeelding 2022-03-08 144013" src="https://user-images.githubusercontent.com/74137185/165086114-31c71b25-cfbe-4b4c-a6e3-9e1457a0e6e3.jpg">

## Chosen API
For this project, I'm using the Rijksdata API. To start using the data, you need to obtain an API key by registering for a Rijksstudio account. You will be given a key instantly upon request, which you can find at the advanced settings of your Rijksstudio account. Some of the data elements that you can use from the API are the ```webImage``` to obtain the image, ```title``` for a short description, ```longTitle``` for a long description, ```principalOrFirstMaker``` for the name of the artist and ```id```, for the id of the painting.

## Wishlist
**Must haves**
- [ ] Choosing a username.
- [ ] Chat function for answers.
- [ ] Showing images with API.
- [ ] Check if anwser matches the painting.

**Should haves**
- [ ] Show user if other user is connected.
- [ ] Show user if other user is disconnected.
- [ ] Have a scoreboard.
- [ ] Give feedback of the right answer if answer is wrong.
- [ ] Give feedback if the answer is correct.
- [ ] Button to go to next question.

**Could haves**
- [ ] Go to next question with right answer.
- [ ] Giving a hint with wrong answer.

**Would haves**
- [ ] Filter for quiz categories.
- [ ] Create groups for different quizzes.

## Any issues?
You can create an issue in this repository to let me know what's wrong.

 ## License
[MIT](https://github.com/AronPelgrim/real-time-web-2122/blob/main/LICENSE)