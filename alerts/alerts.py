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
status = requests.head('http://www.spotify-ppm.com/').status_code
if status != 200:
    # and set the environment variables. See http://twil.io/secure
    account_sid = os.environ['TWILIO_ACCOUNT_SID']
    auth_token = os.environ['TWILIO_AUTH_TOKEN']
    client = Client(account_sid, auth_token)

    # Send an alert text through Twilio
    message = client.messages.create(
        body="ALERT FOR spotify-ppm. HEAD request returned status=" + status + " at " + current_time,
        from_=os.environ['TWILIO_FROM'],
        to=os.environ['TWILIO_TO']
    )

    # TODO: auto re-deploy
else:
    print("status=200, all good")

