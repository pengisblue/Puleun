#include <TaskScheduler.h>
#include <DHT.h>

// DHT 센서 설정
#define DHTPIN A0
#define DHTTYPE DHT11
DHT dht(DHTPIN, DHTTYPE);

// 토양 수분 센서 설정
const int MOISTURE_SENSOR_PIN = A1;
const int MOISTURE_THRESHOLD = 100; // 급격한 변화를 감지할 임계값
int lastMoistureLevel = 0; // 마지막으로 측정된 수분 수준
bool rapidChangeDetected = false; // 급변 감지 플래그

Scheduler runner;

// 온습도 센서 데이터 읽기
void readHumiditySensor() {
  float humidity = dht.readHumidity();
  float temperature = dht.readTemperature();

  if (isnan(humidity) || isnan(temperature)) {
    Serial.println("Failed to read from DHT sensor!");
    return;
  }

  Serial.print("Humidity: ");
  Serial.print(humidity);
  Serial.print(" %, Temp: ");
  Serial.print(temperature);
  Serial.println(" C");
}

// 토양 수분 센서 데이터 읽기 및 급변 감지
void readMoistureSensor() {
  int moistureLevel = analogRead(MOISTURE_SENSOR_PIN);
  Serial.print("Soil Moisture Level: ");
  Serial.println(moistureLevel);

  if (abs(moistureLevel - lastMoistureLevel) > MOISTURE_THRESHOLD) {
    rapidChangeDetected = true;
    Serial.println("Rapid change in soil moisture detected!");
  } else {
    rapidChangeDetected = false; // 추가: 변화가 없을 경우 플래그 초기화
  }

  lastMoistureLevel = moistureLevel;
}

Task taskReadHumidity(1000, TASK_FOREVER, &readHumiditySensor);
Task taskReadMoisture(1000, TASK_FOREVER, &readMoistureSensor); // 1초마다 수분 센서 읽기

void setup() {
  Serial.begin(9600);
  dht.begin();

  runner.init();
  runner.addTask(taskReadHumidity);
  runner.addTask(taskReadMoisture);
  taskReadHumidity.enable();
  taskReadMoisture.enable();
}

void loop() {
  runner.execute();
}
