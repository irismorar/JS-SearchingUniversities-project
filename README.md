# JS-SearchingUniversities-project
Build a small application to search universities by name and display the results in a table.

Requirements:
* the UI contains a text input where the user can type their search string and a search button right next to it
* when the user presses the search button, the application tries to find the universities that match their search term
* when the text input is empty, the search button is disabled
* while the universities are being searched, a loading indicator is displayed instead of the table; this should be a spinner, not a text (see "Resources" below)
* when the universities are found, the text input is reset to an empty value so that the user can easily search again
* the table contains three columns: "University name", "Country" and "Web pages"; all this data can be fetched from the universities URL (see "Resources" below)
* the web pages of universities should be rendered as a anchor tags (i.e. "links") that open the link in a new browser tab
* in the universities data, the web page addresses are provided in an array because one university might have multiple web pages - you should display all of them as separate anchor tags, on separate lines (but in the same table cell)

Resources:
* use the fetch API to fetch the universities data; the universities data URL is http://universities.hipolabs.com/search?name=<search string>, where <search string> is the user's search term