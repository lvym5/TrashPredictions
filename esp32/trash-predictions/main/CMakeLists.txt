idf_component_register(SRCS "trashPredictions.c" "wifi.c" "httpClient.c"
                    INCLUDE_DIRS "."
                    REQUIRES esp_wifi nvs_flash wpa_supplicant esp_http_client esp-tls
                    EMBED_TXTFILES ca_cert.pem)
