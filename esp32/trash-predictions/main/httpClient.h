#ifndef HTTP_CLIENT_HEADER_GUARD
#define HTTP_CLIENT_HEADER_GUARD

#include <sdkconfig.h>
#include <stdint.h>

#define MAX_HTTP_OUTPUT_BUFFER 2048 // 2kB
#define REPORT_ENDPOINT CONFIG_REPORT_ENDPOINT

extern const char ca_cert_pem_start[] asm("_binary_ca_cert_pem_start");
extern const char ca_cert_pem_end[]   asm("_binary_ca_cert_pem_end");

void contactReportEndpoint(uint32_t *data);

#endif