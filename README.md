# Feel the Sound.

#### The problem
In the beginning of May one of our developers had heard about a deaf woman, living in Vilnius countryside, growing a child. Due to her hearing impairements she is not able to know when her baby is crying and shouting. The sad part is, that **the government might take her child away** as she can hardly take after him.


#### The solution
We have developed an app called Feel the Sound. It is a web application which can work in two ways:
* Listen to sounds around it
* Transmit the sound and vibrate if the sound level is too high

The app can be used with either one or two devices. Single device mode is especially well suited for deaf people who have their children nearbly, whereas multiple device mode works as an improved baby monitor - it vibrates when the sound level is too high.

![Application screenshot](readme/screenshot.png?raw=true "Application screenshot")



#### The architecture
The application consists of two parts:
* Angular 2 based web app
* Spring Boot based backend

The backend simply transmits sound buffer to other devices as per request.

![Architecture overview](readme/architecture.jpg?raw=true "Architecture")


#### 3rd party libraries used
- JQuery (www.jquery.com)
- AudioContext-MonkeyPatch (https://cwilso.github.io/AudioContext-MonkeyPatch/AudioContextMonkeyPatch.js)
- UIKit frontend framework (www.getuikit.com)
- Angular2 (www.angular.io)
