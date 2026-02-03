---
title: "Building My First DIY Drone: From 3D Printing to First Flight"
date: 2025-12-28
description: "How I built my first DIY drone from scratch using 3D printing, off-the-shelf electronics, Betaflight, and a lot of soldering, debugging, and trial and error."
---

## Introduction

Last year, I fell down the rabbit hole of 3D printing.

In the beginning, I was pretty satisfied with just downloading models and printing them. Especially with my beginner printer, there was already enough to fiddle around with and optimize on the machine itself.

But after I had sorted that out, I went down an even deeper rabbit hole: people on YouTube building actual machines and gadgets like drones with their printers. And since I’ve always loved building stuff, I thought that nowadays I don’t have to disassemble old electronic hardware to collect motors, LEDs, and boards anymore. I can just order what I need on AliExpress and see if this is still as fun as I remember.

I got the final kick-off by watching some videos from a guy called [Michael Rechtin](https://www.youtube.com/@michaelrechtin) on YouTube, who seems to be living the dream. One of the videos was this one:  
https://www.youtube.com/watch?v=h6chNEaXb-o

And I immediately thought:

> "Okay… I need to try this."

This post is a walkthrough of that journey — starting with printing the frame, ordering parts, soldering everything together, and finally getting the thing into the air.

It’s part story, part guide (pointing out the traps I walked into), and hopefully useful if you’re thinking about building one yourself.

## 3D Printing the Frame

The first step was the body.

Instead of buying a pre-made kit, I wanted to print the frame myself, just like the guy in the video. Even though five minutes of drone research tells you that everyone discourages doing this… I still went for it. Mostly because:

- it’s cheaper  
- it’s customizable  
- and I got into this hobby because of the printer, so why not  

Thankfully, the guy in the video shared his models. So I grabbed those and started with the bare minimum: the center part and the arms.

Model:  
https://makerworld.com/en/models/236234-100mph-fpv-race-quad#profileId-269467

After a few failed prints and some tweaking, I finally had a full frame ready on my desk.

Holding it in my hands for the first time felt surprisingly satisfying. Like: *okay, this might actually work.*



## Choosing the Components

Next step: electronics and parts.

And oh boy — this is a rabbit hole on its own. People discuss endlessly what to buy, what not to buy, where to save money, and where not to.

Since it’s my first drone and I don’t have much experience, I just wanted something simple that I could start with without spending too much money. That’s why I skipped the video module and focused only on what’s necessary to get the thing flying.

### Parts List

Here’s what I got:

- ELRS receiver  
- Flight controller  
- Motors  
- Battery  
- Remote control  

### Tools

And of course, this was the perfect excuse to buy some nice new tools: a soldering iron, a mat to protect my desk, flux pens to prepare the pads, a helping hand, etc.

At some point my wife got a bit skeptical since I received a package from AliExpress almost every day.

- Soldering equipment  



## Assembly & Soldering

This was the most “engineering” part of the project, and it was a lot of fun. But it wasn’t as easy as expected to find good tutorials. So I mostly rewatched videos of people assembling the same flight controller I had and tried to follow their steps.

Even though I was sure I followed the manual, I mixed up the cables when connecting the ELRS receiver to the flight controller. Here, **R needs to go to T and T needs to go to R**.

So yeah, in summary, it was pretty much a lot of this:

- soldering  
- testing  
- unplugging  
- resoldering  
- questioning life choices  

### Steps I followed

1. Mount motors to the frame  
2. Solder the DC cables to the ESC module of the flight controller (by far the hardest part — took me 2–3 attempts as a soldering beginner)  
3. Attach ESCs to the main body, but don’t screw everything down yet  
4. Route the cables through the arms and solder the motors to the ESCs  
5. Connect ESCs with the FC and test everything (via Bluetooth or cable)  
6. Add the ELRS receiver and solder it to the FC  

The most common mistake here is incorrect wiring. Remember the rule: **Output goes to Input**.

- **5V (RX)** → **5V (FC)**  
- **GND (RX)** → **GND (FC)**  
- **TX (RX)** → **RX (FC)** *(cross them!)*  
- **RX (RX)** → **TX (FC)** *(cross them!)*  
- *Note: If you use pads T6/R6, you are using UART 6.*

7. Clean up wiring so nothing interferes with the props  

If you’ve never soldered before: practice first.  
I bought a small practice board and was still 50/50 on whether my joints looked okay-ish or terrible.

Cable management also matters more than you think — loose wires + spinning props = bad day (and weird noises).



## Binding the Controller & First Setup

Once the hardware was done, it was time for software. I connected the FC to my computer and went to https://app.betaflight.com/, where I was able to connect to the board.

Eventually:

- motors spun  
- controls responded  
- nothing smoked  

Success ✅

Next step was connecting the controller to the FC. Here’s a quick walkthrough on getting your drone in the air with the SpeedyBee stack and ELRS.

### Betaflight configuration

**Ports Tab:**  
Find the UART you soldered to (e.g., UART 6). Enable **Serial Rx**. Save & Reboot.

**Receiver Tab:**

- Receiver Mode: **Serial (via UART)**  
- Provider: **CRSF** (ELRS uses the Crossfire protocol)

### Binding (WiFi method)

The easiest way to bind without button-mashing:

1. **Receiver:** Power on the drone, wait 60s until the LED blinks fast. Connect to WiFi network `ExpressLRS RX` (PW: `expresslrs`). Open `10.0.0.1` in your browser and set a custom **Binding Phrase**.  
2. **Radio:** Open the ExpressLRS Lua Script → WiFi Connectivity → Enable. Connect to the radio WiFi. Go to `10.0.0.1` and enter the **exact same Binding Phrase**.  
3. **Result:** The LED on the receiver should turn solid blue.

The last step is arming — and this sounds as dangerous as it is. Be careful with the props.

- **Channel Map:** Ensure sticks move the correct bars. If mixed up, use **AETR1234**  
- **Modes:** Assign **ARM** to an AUX switch  
- **Props:** Mount correctly (text facing up) and match the Betaflight diagram  

You can also check the setup page in Betaflight for any arming flags if the motors don’t spin.



## 🚀 First Flight

The first takeoff was… terrifying.

I triple-checked everything, placed it on the ground, armed the motors, and slowly increased throttle.

For half a second nothing happened.

Then it lifted.

And just hovered there.

Not going to lie — that moment felt *awesome*.

Something that was just a pile of plastic and parts a week ago was now flying.

Built by me.



## Final Thoughts and Next Steps

I have tons of pet projects, so I’m not sure how far I’ll go with this one. But building this drone was one of the most satisfying side projects I’ve done in a while.

It combines:

- hardware  
- software  
- 3D printing  
- electronics  
- and a bit of chaos  

Basically everything I love about engineering.

If you’re on the fence: just try it.

Worst case, you learn a ton.  
Best case, you build something that flies.

Both are pretty great outcomes.

I’m still debating whether a camera setup is worth it. Next, I might look into building a self-driving car project — and maybe come back to this afterward.