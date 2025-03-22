#ifndef WIFI_HEADER_GUARD
#define WIFI_HEADER_GUARD

#include <sdkconfig.h>
#include <stdbool.h>

#define WIFI_SSID     CONFIG_WIFI_SSID
#define WIFI_ID       CONFIG_WIFI_ID
#define WIFI_USER     CONFIG_WIFI_USER
#define WIFI_PASS     CONFIG_WIFI_PASS
#define WIFI_RETRYS   CONFIG_WIFI_RETRYS

void wifiStart(void);
bool wifiConnected(void);

#endif