The Spåkula Project is the result of a tradition within my friend group. Every new years eve, we try to predict what will happen in the coming year, in a wide variety of fields and made a bet about who predicts the most things. For years, this has been done with pen and paper.

Feel free to check it out at:

---

**_ spaakula.netlify.app _**

---

If you'd rather spend some time playing with it, you can run it locally.

First, you will have to create a firebase project and in the setup process allow it to read and write to webapps.

You can then copy the firebaseConfig variable from the firebase console into the local file firebase-config.js located in the src-folder.

Set up a firestore database in the console of your app. Make a collection, "questions" and fill it with a few documents fields "correctAnswer", "questionNo" and "questionEn", all of datatype string.

For example:

| correctAnswer |            questionNo             |           questionEn            |
| :-----------: | :-------------------------------: | :-----------------------------: |
|      yes      |          Er jorda rund?           |       Is the Earth round?       |
|     :---:     |               :---:               |              :---:              |
|      no       |        Er solen en planet?        |      Is the Sun a planet?       |
|     :---:     |               :---:               |              :---:              |
|    unknown    | Finnes det liv på andre planeter? | Is there life on other planets? |
|     :---:     |               :---:               |              :---:              |
|      yes      |           Er vann vått?           |          Is water wet?          |
|     :---:     |               :---:               |              :---:              |
|      no       |  Kan mennesker puste under vann?  | Can humans breathe underwater?  |

Then in a command line tool, run the follwoing commands

npm install

npm run dev

The project will now be hosted on your localhost.
