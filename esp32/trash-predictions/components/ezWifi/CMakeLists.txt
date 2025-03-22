idf_component_register(SRCS "ezWifi.c"
                    INCLUDE_DIRS "include"
                    REQUIRES esp_wifi nvs_flash wpa_supplicant)
