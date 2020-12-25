from datetime import datetime

now = datetime.now()

current_time = now.strftime("%H:%M:%S")
print("Scheduled job, run at: ", current_time)