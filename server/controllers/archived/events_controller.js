const supabase = require('../../config');

// event_id = int8 (auto-generated)
// event_name = text
// event_code = numeric (any num)
// event_theme = text 
// QR_code_id = text
// QR_code_image = text
// start_date = timestampz
// end_date = timestampz
// personal_un = bool 
// personal_pic = bool
// blocked = json 
// event_manager = int8
// messages_array = json 

const eventsController = {

    // initial method: 
    // 1) insert: 
    // name 
    // password/event code 
    // image 
    // start date 
    // end date 
    // [] personal username
    // [] personal profile pic 
    // theme 

    // store values in database 

    // generate qr code:
    // 2) insert:
    // should invoke qr gen file 
    // store in database 
    // send asset to frontend (png/jpeg)

    // copy qr code:
    // 3) read:
    // find qr code associated w/event 
    // retrieve asset 
    // store & send 

    // blocked:
    // if FALSE:
    // no issue, regular functionality
    // if TRUE:
    // revokes ability to send messages  

    // messages:
    // stack structure
    // compare messages sent by timestamp 
    // oldest higher  
    // newest bottom 


    // (auto) delete event:
    // checks event end date --> if expired, follows protocol: 
    // deletes history of messages
    // resets event settings 
    // sets qr code to empty field 

    // (manual) delete event:
    // deletes history of messages
    // resets event settings 
    // sets qr code to empty field 

}




