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
    puerto.write(b"\x00")
    size = 2
    puerto.write(size.to_bytes(4))
    color = 1
    puerto.write(color.to_bytes(4))
    puerto.close()

except serial.SerialException:
    print("Port is not available")

except serial.portNotOpenError:
    print("Attempting to use a port that is not open")
    print("End of script")
