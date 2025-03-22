#include "trashPredictions.h"
#include "wifi.h"
#include "httpClient.h"
#include <stdio.h>
#include <stdbool.h>
#include <freertos/FreeRTOS.h>
#include <freertos/task.h>
#include <esp_err.h>
#include <ultrasonic.h>
#include <esp_log.h>

#define ULTRASONIC_TRIGGER_PIN 5
#define ULTRASONIC_ECHO_PIN    18
#define SENSOR_MAX_DISTANCE_CM 500 // 5 meter max
#define COLLECTION_PERIOD_MS   60000 // one minute

const char* TAG = "TrashPredictions";

static void logTrashData(uint32_t* data) {
    contactReportEndpoint(data);
    ESP_LOGI(TAG, "Distance: %d cm", *data);
}

static void ultrasonicMonitor(void *pvParameters) {
    ultrasonic_sensor_t ultrasonicSensor = {
        .trigger_pin = ULTRASONIC_TRIGGER_PIN,
        .echo_pin    = ULTRASONIC_ECHO_PIN
    };

    ultrasonic_init(&ultrasonicSensor);

    uint32_t distance;
    while (true) {
        esp_err_t err = ultrasonic_measure_cm(&ultrasonicSensor, SENSOR_MAX_DISTANCE_CM, &distance);

        if (err != ESP_OK)
            switch (err) {
                case (ESP_ERR_ULTRASONIC_PING_TIMEOUT):
                    ESP_LOGE(TAG, "Device is not responding");
                    break;
                case (ESP_ERR_ULTRASONIC_ECHO_TIMEOUT):
                    ESP_LOGE(TAG, "Distance is too big");
                    break;
                case (ESP_ERR_ULTRASONIC_PING):
                    ESP_LOGE(TAG, "Invalid state--previous ping not ended");
                    break;
            }
        else {
            logTrashData(&distance);
            // contactReportEndpoint(&distance);
            // ESP_LOGI(TAG, "Distance: %d cm", distance);
        }
        
        ESP_LOGI(TAG, "Stack high water mark: %d", uxTaskGetStackHighWaterMark(NULL));
        vTaskDelay(pdMS_TO_TICKS(COLLECTION_PERIOD_MS));
    }
}

void app_main(void) {
    wifiStart();
    while (!wifiConnected())
        vTaskDelay(pdMS_TO_TICKS(1000));
    xTaskCreate(&ultrasonicMonitor, "ultrasonic", 4096, NULL, 5, NULL);
}
