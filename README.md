# Workout App! 
Will eventually come up with a better name for this lol. This is an app that I'd love to use to track my workouts. 

**The Problem:** My workouts are random and scattered- I don't have a set routine. I also don't have a way to track my progress on what I do manage to do. 

**The Solution:** I want a simple interface that I can pull up at the beginning of my workouts. It'll let me choose what I'm doing, and will give me recommended workouts to try. I can also type in the information on what I did, so that it can be stored.

## Here's the dirty task list for an MVP!
(dirty since it's not really organized)
- [ x ] System design: Checkout the Figma board [here](https://www.figma.com/file/l9aY9IuyPcvyllklZaKl8T/Workout-App-System-Design?type=whiteboard&node-id=0%3A1&t=hweT5HwSWKRYeiS0-1)
- [ ] Initialization
  -  [ ] set up frontend, backend, db, and ensure they're all connected
  -  [ ] set up basic file structure
  -  [ ] Stack is going to be Next.js + tRPC + Prisma ORM
- [ ] Design
  - [ ] Build out basic UI / UX wireframe in Figma
  - [ ] Code out wireframe 
  - [ ] Componentize the code
- [ ] Functionality
  - [ ] handle user choices 
    - [ ] allow user to choose intensity of workout (light, medium, heavy)
    - [ ] allow user to choose how long they want to workout for (30, 45, 60, 90 or 120 min)
    - [ ] allow user to select whether they have access to equipment or not
    - [ ] allow user to select type of workout ( hypertrophy, endurance )
  - [ ] interface with [Exercise API](https://api-ninjas.com/api/exercises) and get data on exercises, and allow for querying from frontend dropdown
  - [ ] group muscle groups / requests: aka "pull day" should include bicep and back exercises 
  - [ ] allow for user to input data on what they did (each workout has reps, sets, and weight)
  - [ ] allow user to replace an excercise with another one
  - [ ] build a workout for a user based on their choices 
    - [ ] create a "coach" that will give the user a workout based on their choices, that's more so an abstraction of the logic i'll use to do this, eventually if the app grows the coach can evolve and woohoo AI!
  - [ ] once user is done with workout, it should be stored in database 
  - [ ] there should be a page where the user can see their past workouts
  - [ ] there should be a page where the user can see their progress on a specific exercise (probably not an MVP thing)
  - [ ] there should be a page where the user can see their progress on a specific muscle group (probably not an MVP thing)

- [ ] Testing
  -  [ ] let's try to use Jest
  -  [ ] build out tests for each component 
  -  [ ] maybe not necessary for MVP, but some tests for Coach would be nice


### Knowledge Bank I'm using to develop this
* [Utlize proper workout structure and exercise order](https://us.humankinetics.com/blogs/excerpt/utilize-proper-workout-structure-and-exercise-order#:~:text=The%20order%20of%20exercises%20within,should%20dictate%20the%20exercise%20order.)

