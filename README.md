## NYU Short-Term Intensive Training Front End Engineer Application Challenge (Whew!)
This is a brief coding challenge to pull events from around a user's neighborhood using the Yelp API.

### [Live Demo](https://nyu-stit-frontend-challenge.herokuapp.com/)

### Takeaways
It took me a bit longer than the suggested 2-4hr time frame. The Yelp Fusion API was not friendly to work with, particularly for Events. Searching businesses seemed to have more documentation and example code. But hey, we code to solve problems, right? I still have much to learn about routing API calls, I will say I struggle with sending keys through headers. Additionally ran into difficulty after POSTing back with the lat/long coordinates to get res.render or res.redirect to register a call in the browser, which is currently worked around with a timer, I would much rather have this be a proper callback to sync with the API actually sending data.

Once I have everything hooked up properly the data becomes fun to work with. Nothing quite as satisfying as fighting through the difficulties and having a full page suddenly populated with info. At which point it becomes a matter of usability. How do you take this data from the mystical cloud and provide users with the tools to go have fun? That is all what I ran out of time for. I would expand on this by adding a proper CSS file and switching the stacked layout to floating tiles instead. The listing could use work also, RapidAPI doesn't seem to return dates or times in the ranges I specified with parameters.

[Challenge Instructions](https://docs.google.com/document/d/1RBsMGSew9RYg5MRr5Xgcn11yyhGirhLobAkSqdOVEGg/edit)
