# rhythm-room
A real-time music listening app.    

[Rhythm Room](https://rhythmroom.herokuapp.com/) enables you to listen to music and watch videos with your friends synchronously. Create a room, invite some friends, and queue up a song from your favorite artist.

<p align="center">
  <img src="./src/assets/coding.svg" />
</p>

## About

Rhythm Room was created in one week by Samantha Prestrelski and Jeremy Nguyen at [SPIS UCSD 2021](http://spis.ucsd.edu/).   

Sam is a Math-CS major at Warren College interested in design, web development, and machine learning. She focused on API, hosting, and backend.  

Jeremy is a Math-CS major at Eleanor Roosevelt College interested in web development and cybersecurity. He mainly worked on front-end and syncing using websockets.  

### Stack

| Service                                                                          | Use                                                                                   |
|----------------------------------------------------------------------------------|---------------------------------------------------------------------------------------|
| [Express](https://expressjs.com/)                                                | Application framework                                                                 |
| [React](https://reactjs.org/)                                                    | User interface                                                                        |
| [Node.js](https://nodejs.dev/)                                                   | Web server                                                                            |
| [Heroku](https://www.heroku.com/)                                                | Hosting platform                                                                      |
| [Socket.io](https://socket.io/)                                                  | Syncing audio/video across multiple clients, making rooms and generating unique links |
| [YouTube iFrame API](https://developers.google.com/youtube/iframe_api_reference) | Embedding YouTube video and player controls                                           |
| [youtube-search](https://www.npmjs.com/package/youtube-search)                   | Searching for songs                                                                   |

<br>

## How it Works
1. The `YouTube iFrame API` is used to create an embedded player, which has customizable player controls and parameters.
2. `youtube-search` is used to search for new songs, querying the user input and returning the video ID of the first search result. `React` states are used to update the text fields once the URL and video ID have been found.
3. If a song is currently playing, newly queued songs are added to an array and played once the current video ends.
4. `Socket.io` is used to enable real-time event-based communication between the browser and server, allowing users to make and join rooms. Room links are generating using the name of the user and the name of the room.
5. `Socket.io` is used to syncing audio and video across multiple clients.
<br><br>  

## Self-Hosting through Heroku
Prequisites:  
- A [Heroku](https://devcenter.heroku.com/articles/heroku-cli) account and installed Heroku CLI tools
- A [YouTube Data API v3 Key](https://developers.google.com/youtube/v3/getting-started)
- Node and NPM for package management
  - Note: This project uses NPM for package management. If you use yarn, change the command in `package.json` to `react-scripts build && (cd server && yarn install)`  

Setup:  
1. Clone this repository.
2. In the root directory of the respository, run `heroku create`.
3. Run `git push heroku master`.  
4. Run `heroku config:set REACT_YT_API_KEY=key`, but replace `key` with your own API key.
<br><br>  

### Rate Limiting
> Projects that enable the YouTube Data API have a default quota allocation of 10,000 units per day, an amount sufficient for the majority of our API users. You can see your quota usage on the [Quotas](https://console.developers.google.com/iam-admin/quotas?pli=1&project=google.com:api-project-314373636293&folder=&organizationId=) page in the API Console.  
> &ndash; [YouTube Data API Documentation](https://developers.google.com/youtube/v3/guides/quota_and_compliance_audits)

Because of quota limits, the search function will not work if more than 100 videos are searched in one day. However, you can still play synced videos with the video URL. If you are self-hosting, generate a new API key and try again.
<br><br>

## Future Quality of Life Improvements and Extensions
As Rhythm Room was created in one week, there are other features that could be added and potential bugs. Here is a list of future improvements that could be made  

### Quality of Life
- Sync video pausing/elapsed time
- Show the videos currently in the queue
- Skip button

### Extensions
- Searchable public rooms
- Reactions such as thumbs-up, smile, laugh, etc.
- Add multiple songs from a playlist
- Chat
- Music visualizer


<br><br><br>


<p align="center">
  <img src="./src/assets/cat.svg" />
</p>
