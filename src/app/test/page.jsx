
export default function Test(){

  const { google } = require('googleapis');

  const youtube = google.youtube({
    version: 'v3',
    auth: process.env.REACT_APP_YOUTUBE_API_KEY
  });
  
  const video = youtube.videos.list({
    id: '7EM_l03ZS2A', // YouTube Resource Id
    part: 'snippet', // Basic Resource Info
  }).then((response) => console.log( // https://i.ytimg.com/vi/7EM_l03ZS2A/default.jpg
    response.data.items[0].snippet.thumbnails.default.url
  ));


  return(
      <main>
        <h1>TEST</h1>

      </main>
  )
}
