import serial
#import time

# Arduino official doc:https://www.arduino.cc/en/serial/begin
# by default Arduino set 8 bit frame, parity none and 1 stop bit

puerto = serial.Serial(
    port="COM2",
    baudrate=9600,
    bytesize=serial.EIGHTBITS,
    parity=serial.PARITY_NONE,
    stopbits=serial.STOPBITS_ONE,
)

try:
    x = -1
    puerto.write(x.to_bytes(4, byteorder="little", signed=True))
    y = -1
    puerto.write(y.to_bytes(4, byteorder="little", signed=True))
    puerto.close()

except serial.SerialException:
    print("Port is not available")

except serial.portNotOpenError:
    print("Attempting to use a port that is not open")
    print("End of script")
