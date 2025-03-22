#include <ezWifi.h>
#include <string.h>
#include <esp_wifi.h>
#include <esp_eap_client.h>
#include <freertos/event_groups.h>
#include <esp_log.h>
#include <nvs_flash.h>

static const char* TAG = "ezWifi";

static EventGroupHandle_t wifi_event_group;
static const int CONNECTED_BIT = BIT0;

static void wifiEventHandler(void* arg, esp_event_base_t event_base, int32_t event_id, void* event_data) {
    static uint_least8_t retryCount = 0;

    if (event_base == WIFI_EVENT && event_id == WIFI_EVENT_STA_START) {
        esp_wifi_connect();
    } else if (event_base == IP_EVENT && event_id == IP_EVENT_STA_GOT_IP) {
        ESP_LOGI(TAG, "Connected to wifi");
        xEventGroupSetBits(wifi_event_group, CONNECTED_BIT);
        retryCount = 0; // reset retry count
    } else if (event_base == WIFI_EVENT && event_id == WIFI_EVENT_STA_DISCONNECTED) {
        if (retryCount++ < WIFI_RETRYS) {
            ESP_LOGI(TAG, "Disconnected from wifi. Retrying in 5 seconds...");
            vTaskDelay(pdMS_TO_TICKS(5000));
            esp_wifi_connect();
        } else {
            ESP_LOGI(TAG, "Failed to connect to wifi after %d attempts", WIFI_RETRYS);
        }
        xEventGroupClearBits(wifi_event_group, CONNECTED_BIT);
    }
}

bool wifiConnected(void) {
    // check if connected
    return CONNECTED_BIT & xEventGroupGetBits(wifi_event_group);
}

uint8_t getSignalStrength(void) {
    if (!wifiConnected())
        return 0;
        
    wifi_ap_record_t ap_info;
    esp_wifi_sta_get_ap_info(&ap_info);
    return ap_info.rssi;
}

void wifiStart(void) {
    ESP_ERROR_CHECK(nvs_flash_init());

    ESP_ERROR_CHECK(esp_netif_init());
    wifi_event_group = xEventGroupCreate();
    xEventGroupClearBits(wifi_event_group, CONNECTED_BIT); // ensure we don't think we're connected
    ESP_ERROR_CHECK(esp_event_loop_create_default());
    assert(esp_netif_create_default_wifi_sta());

    wifi_init_config_t wifi_init_config = WIFI_INIT_CONFIG_DEFAULT();
    ESP_ERROR_CHECK(esp_wifi_init(&wifi_init_config));
    ESP_ERROR_CHECK(esp_event_handler_register(WIFI_EVENT, ESP_EVENT_ANY_ID, &wifiEventHandler, NULL));
    ESP_ERROR_CHECK(esp_event_handler_register(IP_EVENT, IP_EVENT_STA_GOT_IP, &wifiEventHandler, NULL));
    ESP_ERROR_CHECK(esp_wifi_set_storage(WIFI_STORAGE_RAM));
    wifi_config_t wifi_config = {
        .sta = {
            .ssid = WIFI_SSID,
        }
    };
    ESP_ERROR_CHECK(esp_wifi_set_mode(WIFI_MODE_STA));
    ESP_ERROR_CHECK(esp_wifi_set_config(WIFI_IF_STA, &wifi_config));

    if (WIFI_PASS[0] != '\0') // ensure cred is not empty string, will break following function if strlen == 0
        ESP_ERROR_CHECK(esp_eap_client_set_password((uint8_t*)WIFI_PASS, strlen(WIFI_PASS)));
    
    #if defined(CONFIG_WIFI_EAP)
    if (WIFI_ID[0] != '\0') // ensure cred is not empty string, will break following function if strlen == 0
        ESP_ERROR_CHECK(esp_eap_client_set_identity((uint8_t*)WIFI_ID, strlen(WIFI_ID)));
    if (WIFI_USER[0] != '\0') // ensure cred is not empty string, will break following function if strlen == 0
        ESP_ERROR_CHECK(esp_eap_client_set_username((uint8_t*)WIFI_USER, strlen(WIFI_USER)));
    ESP_ERROR_CHECK(esp_wifi_sta_enterprise_enable());
    #endif
    ESP_ERROR_CHECK(esp_wifi_start());
    ESP_LOGI(TAG, "Wifi started");
}