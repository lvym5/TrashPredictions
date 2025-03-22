idf_component_register(SRCS "trashPredictions.c" "httpClient.c"
                    INCLUDE_DIRS "."
                    REQUIRES esp_http_client esp-tls ezWifi
                    EMBED_TXTFILES ca_cert.pem)
