from datetime import datetime
import requests

now = datetime.now()

current_time = now.strftime("%H:%M:%S")
print("Scheduled job, run at: ", current_time)

