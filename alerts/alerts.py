"""
    Python script that pings http://www.spotify-ppm.com/ to check if it's down.
    This script is scheduled run as a task on a configured time interval.
"""

from datetime import datetime
from pytz import timezone
import os

import requests
from twilio.rest import Client

# get current time in EST
current_time = datetime.now(
        tz=timezone('US/Eastern')
    ).strftime(
        format='%Y-%m-%d %H:%M:%S %Z%z'
    )
print("Scheduled job, run at: ", current_time)

# HEAD request for http://www.spotify-ppm.com/ and check status code
client_status = requests.head('http://www.spotify-ppm.com/').status_code
server_status = requests.head('https://spotify-ppm-server.herokuapp.com/').status_code

client_down = client_status != 200
server_down = server_status != 200

if client_down or server_down:    
    # and set the environment variables. See http://twil.io/secure
    account_sid = os.environ['TWILIO_ACCOUNT_SID']
    auth_token = os.environ['TWILIO_AUTH_TOKEN']
    client = Client(account_sid, auth_token)

    info = "ALERT FOR spotify-ppm. "
    if client_down and server_down:
        info += "Both client and server are down. HEAD requests returned statuses client=" + str(client_status) + " server=" + str(server_status) + ". "
    elif client_down:
        info += "Client down. HEAD request returned status=" + str(client_status) + ". "
    else: # server down
        info += "Server down. HEAD request returned status=" + str(server_status) + ". "
    info += "Test run on " + current_time

    # Send an alert text through Twilio
    message = client.messages.create(
        body=info,
        from_=os.environ['TWILIO_FROM'],
        to=os.environ['TWILIO_TO']
    )

    print("Alert sent through TWILIO: " + info)

    # TODO: auto re-deploy
else:
    print("status=200, all good")

