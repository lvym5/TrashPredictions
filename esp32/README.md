# TrashPredictions ESP32

The source code for an ESP32 to get trashcan fullness data and log it to an external endpoint.

## Options

Configurable through `idf.py menuconfig`

- Wifi EAP, bool: Whether or not to use EAP
- Wifi SSID, string: The SSID of the target AP
- Wifi ID, string, IF Wifi EAP is set true: The ID for the Wifi connection
- Wifi User, string - nullable: The username for the Wifi connection
- Wifi Pass, string - nullable: The password for the Wifi connection
- Wifi Retrys, int: Number of times to retry the Wifi connection if disconnected
- Report Endpoint, string: Domain to which to report the data.
- Sensor ID, string: The ID of this sensor.
