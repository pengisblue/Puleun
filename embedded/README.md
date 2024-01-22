# 임베디드

------

## 멤버

- 한성주

- 김연빈


----


## 라즈베리파이

### 시작 시 해야 할 일

1. 가상환경 실행

```bash
source myenv/bin/activate
```

------

### 마이크

-------

### 스피커

--------

### 3.5인치 TFT LCD 스크린 

---------

### 블루투스

1. 라즈베리와 아두이노 블루투스 연결

```bash
// 라즈베리파이 업데이트
Sudo apt-get update
Sudo apt-get upgrade

// 필요한 라이브러리 설치
Sudo apt-get install bluetooth blueman bluez
Sudo apt-get install python-bluetooth

// 재부팅
Sudo reboot
```

2. 블루투스 페어링

- 블루투스 검색
```bash
sudo bluetoothctl

power on
scan on
```

- 블루투스 연결
```bash
pair MAC주소
```

- 핀 코드 입력
```bash
Enter PIN code:
```

- 신뢰
```bash
trust MAC주소
```

#### 블루투스가 안 될 시

```bash
sudo apt install python3-bluez
```

---------

## 아두이노

--------

### 블루투스

- HC-06 모듈

- 시리얼 모니터를 켜고 AT를 입력했을 때 OK 라고 뜨면 연결 성공

------

### 온습도 센서

-----

### 토양 수분 센서

------

### 서보 모터

-------

### 초음파 센서

