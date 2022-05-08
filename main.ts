//           VOLIČ          #
// A - vybere voliče
// B - odešle volbu
// pin1 - Ukaže, kdo má kolik voleb (pro obě konzole)
// ####################x
//           SERVER          #
// pin0 - vypne/zapne možnost volit
// pin1 - Ukaže, kdo má kolik voleb (pro obě konzole)
// pin2 - vše restartuje
let vol = -1
let x = "A"
let top = false
let pouzito = false
let volby = {
    "A" : 0,
    "B" : 0,
    "C" : 0,
    "D" : 0,
}

input.onButtonPressed(Button.B, function on_button_pressed_b() {
    
    if (top == true && pouzito == false) {
        radio.sendString(x)
        pouzito = true
        for (let i = 0; i < 2; i++) {
            basic.showString(x)
            basic.pause(100)
            led.enable(false)
            basic.pause(100)
            led.enable(true)
        }
    }
    
})
input.onButtonPressed(Button.A, function on_button_pressed_a() {
    
    if (top == true && pouzito == false) {
        vol += 1
        if (vol == 4) {
            vol = 0
        }
        
        if (vol == 0) {
            x = "A"
        }
        
        if (vol == 1) {
            x = "B"
        }
        
        if (vol == 2) {
            x = "C"
        }
        
        if (vol == 3) {
            x = "D"
        }
        
        basic.showString(x)
    }
    
})
radio.onReceivedNumber(function on_received_number(receivedNumber: number) {
    
    if (receivedNumber == 1) {
        top = false
    } else if (receivedNumber == 2) {
        pouzito = false
        basic.showString("")
        x = "A"
        vol = -1
    } else {
        top = true
    }
    
})
// ######################xxxx
basic.forever(function on_forever() {
    radio.setGroup(77)
})
basic.forever(function on_forever2() {
    radio.setGroup(77)
})
// ###############################################xx
radio.onReceivedString(function on_received_string(receivedString: string) {
    
    if (receivedString == "A") {
        volby["A"] += 1
    }
    
    if (receivedString == "B") {
        volby["B"] += 1
    }
    
    if (receivedString == "C") {
        volby["C"] += 1
    }
    
    if (receivedString == "D") {
        volby["D"] += 1
    }
    
})
let zap = false
input.onPinPressed(TouchPin.P0, function on_pin_pressed_p0() {
    
    if (zap) {
        radio.sendNumber(1)
        zap = false
        basic.showString("N")
    } else {
        radio.sendNumber(0)
        basic.showString("Y")
        zap = true
    }
    
    basic.pause(100)
    basic.showString("")
})
input.onPinPressed(TouchPin.P2, function on_pin_pressed_p2() {
    
    radio.sendNumber(2)
    volby = {
        "A" : 0,
        "B" : 0,
        "C" : 0,
        "D" : 0,
    }
    
    basic.showString("R")
    basic.pause(100)
    basic.showString("")
})
input.onPinPressed(TouchPin.P1, function on_pin_pressed_p1() {
    basic.showString("A")
    basic.pause(100)
    basic.showNumber(volby["A"])
    basic.pause(100)
    basic.showString("B")
    basic.pause(100)
    basic.showNumber(volby["B"])
    basic.pause(100)
    basic.showString("C")
    basic.pause(100)
    basic.showNumber(volby["C"])
    basic.pause(100)
    basic.showString("D")
    basic.pause(100)
    basic.showNumber(volby["D"])
    basic.pause(100)
    basic.showString("")
})
