import webbrowser
import datetime
import pyautogui as pyto
import time
from pandas import *

link = 'https://meet.google.com/arf-ysse-tws'

def in_meet():                   
    print("Abriendo clase...")
    webbrowser.open(link)
    time.sleep(5)
    pyto.hotkey('ctrlleft', 'd')
    pyto.hotkey('ctrlleft', 'e')
    time.sleep(1)
    pyto.moveTo(1334,566)                         
    pyto.click()
    time.sleep(3)
    pyto.hotkey('ctrlleft', 'altleft', 'c')
    time.sleep(2)
    pyto.write("Bienvenidos a la clase de Arquitectura de Computadoras 2!!!")
    time.sleep(1)
    pyto.press("enter")

def out_meet():
    pyto.moveTo(1218,970)
    pyto.click()
    time.sleep(1)

""" input = input("¿Quieres abrir la clase? (s/n): ")
in_meet()
time.sleep(20)                        
out_meet()
           """