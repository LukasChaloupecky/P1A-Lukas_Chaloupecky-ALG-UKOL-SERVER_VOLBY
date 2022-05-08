#          VOLIČ          #
#A - vybere voliče
#B - odešle volbu
#pin1 - Ukaže, kdo má kolik voleb (pro obě konzole)
#####################x
#          SERVER          #
#pin0 - vypne/zapne možnost volit
#pin1 - Ukaže, kdo má kolik voleb (pro obě konzole)
#pin2 - vše restartuje



vol = -1
x = "A"
top = False
pouzito = False
volby = {"A":0, "B":0, "C":0, "D":0}
def on_button_pressed_a():
    global x, vol
    if top == True and pouzito == False:
        vol += 1
        if vol == 4:
            vol = 0
        if vol == 0:
            x = "A"
        if vol == 1:
            x = "B"
        if vol == 2:
            x = "C"
        if vol == 3:
            x = "D"
        basic.show_string(x)
        
def on_button_pressed_b():
    global pouzito, x
    if top == True and pouzito == False:
        radio.send_string(x)
        pouzito = True
        
        for i in range(2):
            basic.show_string(x)
            basic.pause(100)
            led.enable(False)
            basic.pause(100)
            led.enable(True)

input.on_button_pressed(Button.B, on_button_pressed_b)
input.on_button_pressed(Button.A, on_button_pressed_a)
def on_received_number(receivedNumber):
    global top, pouzito, x, vol
    if receivedNumber == 1:
        top = False
    elif receivedNumber == 2:
        pouzito = False
        basic.show_string("")
        x = "A"
        vol = -1
    else:
        top = True

radio.on_received_number(on_received_number)

#######################xxxx
def on_forever():
    radio.set_group(77)
basic.forever(on_forever)
def on_forever2():
    radio.set_group(77)
basic.forever(on_forever2)


################################################xx
def on_received_string(receivedString):
    global volby
    if receivedString == "A":
        volby["A"] += 1
    if receivedString == "B":
        volby["B"] += 1
    if receivedString == "C":
        volby["C"] += 1
    if receivedString == "D":
        volby["D"] += 1
radio.on_received_string(on_received_string)

zap = False
def on_pin_pressed_p0():
    global zap
    if zap:
        radio.send_number(1)
        zap = False
        basic.show_string("N")
    else:
        radio.send_number(0)
        basic.show_string("Y")
        zap = True
    basic.pause(100)
    basic.show_string("")

input.on_pin_pressed(TouchPin.P0, on_pin_pressed_p0)
def on_pin_pressed_p1():
    basic.show_string("A")
    basic.pause(100)
    basic.show_number(volby["A"])
    basic.pause(100)
    basic.show_string("B")
    basic.pause(100)
    basic.show_number(volby["B"])
    basic.pause(100)
    basic.show_string("C")
    basic.pause(100)
    basic.show_number(volby["C"])
    basic.pause(100)
    basic.show_string("D")
    basic.pause(100)
    basic.show_number(volby["D"])
    basic.pause(100)
    
    basic.show_string("")
def on_pin_pressed_p2():
    global volby
    radio.send_number(2)
    volby = {"A":0, "B":0, "C":0, "D":0}
    basic.show_string("R")
    basic.pause(100)
    basic.show_string("")


input.on_pin_pressed(TouchPin.P2, on_pin_pressed_p2)
input.on_pin_pressed(TouchPin.P1, on_pin_pressed_p1)
###############################x



