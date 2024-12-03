const supabase = require('../config');

const UserController = {

    /* User table columns:
user_id - primary
event_id - foreign connected to event
personal_un
random_un
icon_id
icon
messages
random_icon_id
random_icon
*/

    //methods:
    //1) Push message
    //- text field always displayed at bottom of screen
    //- user is atomatically "clicked" into the field (boolean default to true)
    //- if user is clicked into the field
    //- flashing curser, text goes into text field
    //- on enter
    //- push message to board

    //2) React to message
    //- on click of message content
    //- render a display of already used emojis and a plus icon on right side(stretch)
    //- on click of previously used emoji
    //- increase counter
    //- on click of plus icon
    //- render a panel of emoji options
    //- on click of emoji from panel
    //- render that emoji attached to the message content

    //3) Comment on message
    //- on click of message content
    //- render a comment icon with a counter display on left side
    //- on click of comment icon
    //- display all comments with empty text field at bottom of thread with 'Push message' functionality

    //4) Report user
    //- on click of prof pic.
    //- Render "Report User" button
    //- on click of button
    //- Render "Reason for report" text box
    //- on enter
    //- send notification to manager dashboard with message content, message user, and reason for report

}    